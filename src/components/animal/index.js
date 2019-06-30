import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as animalActions from './reducer';
import get from 'lodash.get';
import propTypes from 'prop-types';
import SpinnerWidget from '../spinner';
import './inputDes.css'
import axios from 'axios';

class AnimalWidgetContainer extends Component {
  state = {
    message: 37
  };

  componentDidMount() {
    this.props.getListData();
  }
  
  componentWillReceiveProps(newprops) {
    const { isSuccess} = newprops;
    if(isSuccess)
    {
   // console.log("isSuccess: ", isSuccess);
    }
  }

  redirectToAnimal = e => {
    const { history } = this.props;
    e.preventDefault();
    console.log('-----переходимо на сторінку додавання----');
    history.push('animal/add');
  };

  redirectToAnimalCropper = e => {
    const { history } = this.props;
    e.preventDefault();
    console.log('-----переходимо на сторінку додавання----');
    history.push('animal/add/cropper');
  };

  redirectToAnimalCropperMy = e => {
    const { history } = this.props;
    e.preventDefault();
    console.log('-----переходимо на сторінку додавання з кропером----');
    history.push('animal/addcropper');
  };


  ChangeCount = (e) => {
  
  console.log('ChangeCount : ', e.target.id);
    this.props.addLikeAnimal(e.target.id);

  };

  DeleteAnimal=(e)=>{
   



  }

  ChangeMessage = () => {
    const { message } = this.state;
    this.setState({ message: message + 1 });
  };

  operationAnimal = (e, type, id) => {
    e.preventDefault();

    switch (type) {

        case 'DELETE_ANIMAL':
          console.log('Delete animal id: ', id);
              axios.delete ('https://localhost:44320/api/animal/delete/'+id)
              .then(
                  (resp) => {
                      console.log('--success delete--', resp.data);
                      this.props.history.push('/animal');
                  },
                  (err) => {
                      console.log('--err problem---', err);
                  }
              );

            break;
        case 'ADD_LIKE':
          console.log('Add like for animal with  id: ', id);
          this.props.addLikeAnimal(id);
            break;
        case 'ZOOM+':
            
            break;
        case 'ZOOM-':
            
            break;
        default:

    }
};




  render() {
    console.log('----state-----', this.state);
    console.log('----Props-----', this.props);
    const { isListLoading } = this.props;

    const listContent = this.props.list.map(item => {
      return (
        <div key={item.id} className="col-lg-3 col-md-4 col-6" style={{ boxShadow: '0 0 5px 5px', height: '250px', margin: '10px', paddingTop: '10px', borderRadius: '5px' }}>
          <div className="d-block mb-4 h-100 text-center container" >
          {/* <div className="btn btn-light x" >X</div> */}
          <button type="button" className="close"  aria-label="Close" onClick={e => this.operationAnimal(e, 'DELETE_ANIMAL', item.id)}>
               <span  aria-hidden="true">&times;</span>
          </button>
            <img
              className="img-fluid img-thumbnail "
              style={{ height: '150px' }}
              src={item.image}
              alt=""
            />
            <p> {item.name} </p>
            <p className="text-center">
              <button type="button" className="btn btn-outline-info" onClick={e => this.operationAnimal(e, 'ADD_LIKE', item.id)} style={{ width: '40%', marginRight: '5px' }}><i className="fa fa-heart"  aria-hidden="true" />  {item.imageLikeCount} </button>
              <button type="button" className="btn btn-outline-success" onClick={this.ChangeMessage} style={{ width: '40%' }} ><i className="fa fa-comment-o" aria-hidden="true" />{this.state.message} </button>
            </p>
          </div>
        </div>
      );
    });


    return (
      <div>
        <div className="container">

          <button className="btn btn-info" onClick={this.redirectToAnimal} style={{ marginRight: '5px' }} disabled>Додати тварину (попередній варіант)</button>
          {/* <button className="btn btn-info" onClick={this.redirectToAnimalCropper}  style={{ marginRight: '5px' }} disabled>Додати фото кропер</button>  */}
          <button className="btn btn-info" onClick={this.redirectToAnimalCropperMy}>Додати тварину</button>
          <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">
            Галерея тварин
          </h1>
          <hr className="mt-2 mb-5" />
          <div className="row text-center text-lg-left">
            {listContent}
          </div>
        </div>
        <SpinnerWidget loading={isListLoading} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    list: get(state, 'animal.list.data'),
    isListLoading: get(state, 'animal.list.loading'),
    isListError: get(state, 'animal.list.error'),
    isSuccess: get(state, 'animal.like.success'),
  };
};
const mapDispatch = dispatch => {
  return {
    getListData: () => 
      dispatch(animalActions.getListData()),
    addLikeAnimal: (id) => 
      dispatch(animalActions.addLikeAnimal(id))
  };
};

AnimalWidgetContainer.propTypes = {
  history: propTypes.object.isRequired,
  list: propTypes.array.isRequired,
  isListError: propTypes.bool.isRequired,
  isListLoading: propTypes.bool.isRequired,
};

const AnimalWidget = withRouter(
  connect(mapState, mapDispatch)(AnimalWidgetContainer)
);

export default AnimalWidget;
