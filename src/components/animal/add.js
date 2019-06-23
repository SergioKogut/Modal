import React, {Component} from 'react';
import {connect} from 'react-redux';
//import axios from 'axios';
import classnames from 'classnames';
import noPhoto from './No_image_available.png';
import get from 'lodash.get';
import * as animalActions from './reducer';
import {withRouter} from 'react-router-dom';
import propTypes from 'prop-types';
import SpinnerWidget from '../spinner';

const FormStyle = {
  boxShadow: '0 0 5px 3px',
  margin: '20px',
  padding: '20px',
};

class AnimalCreateContainer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      image: '',
      errors: {},
      done: false,
      isLoading: false,
      errorImage: false,
    };
  }
  setStateByErrors = (name, value) => {
    if (!!this.state.errors[name]) {
      let errors = Object.assign ({}, this.state.errors);
      delete errors[name];
      this.setState ({
        [name]: value,
        errors,
      });
    } else {
      this.setState ({[name]: value});
    }
  };

  onSubmitForm = e => {
    e.preventDefault ();
    let errors = {};
    if (this.state.name === '') errors.name = 'Не може бути пустим!';
    if (this.state.image === '') errors.image = 'Не може бути пустим!';
    if (this.state.errorImage) errors.image = 'Не коректна адреса зображення!';

    const isValid = Object.keys (errors).length === 0;
    if (isValid) {
      this.setState ({isLoading: true});

      const model = {
        name: this.state.name,
        image: this.state.image,
      };

      this.props.createNewAnimal (model);

      if(!this.props.isError){
        this.setState ({done: true});
        this.props.createNewAnimal (model);
        this.props.history.push ('/animal');
        
      }    
     
    } else {
      this.setState ({errors});
    }
  };


  errorImage = () => {
    this.setState ({errorImage: true});
  };

  onChangeInput = e => {
    const {errors} = this.state;
    const {name, value} = e.target;
    if (!!errors[name]) {
      let clone_errors = Object.assign ({}, errors);
      delete clone_errors[name];
      this.setState ({
        [name]: value,
        errors: clone_errors,
      });
    } else {
      this.setState ({[name]: value});
    }
  };

  render () {
    console.log ('---AnimalCreate state----', this.state);
    console.log ('---AnimalCreate props----', this.props);
    const {name, image, errors} = this.state;
    const {  isLoading,isError } = this.props;
    return (
      <React.Fragment>

        <div className="row justify-content-md-center">
          <div className="col-sm-8 ">
            <form onSubmit={this.onSubmitForm} style={FormStyle}>
              {!!errors.invalid
                ? <div className="alert alert-danger">
                    {errors.invalid}.
                  </div>
                : ''}
                {isError ? 
                (<div className="alert alert-danger" style={{'margin':'10px' }}>Завантаження  данних невдале!</div>)
                 : ''}

              <h1 className="text-left"> Додати тварину</h1>
              <div className="row justify-content-md-center">
                <div className="col-sm-6 ">
                  <div className="form-group">
                    <label htmlFor="name">Назва тварини:</label>
                    <input
                      type="text"
                      className={classnames ('form-control', {
                        'is-invalid': !!errors.name,
                      })}
                      id="name"
                      name="name"
                      value={name}
                      onChange={this.onChangeInput}
                    />
                    {!!errors.name
                      ? <span className="help-block">{errors.name}</span>
                      : ''}
                  </div>

                  <div className="form-group">
                    <label htmlFor="image">Фото:</label>
                    <input
                      type="text"
                      className={classnames ('form-control', {
                        'is-invalid': !!errors.image,
                      })}
                      id="image"
                      name="image"
                      value={image}
                      onChange={this.onChangeInput}
                    />
                    {!!errors.image
                      ? <span className="help-block">{errors.image}</span>
                      : ''}
                  </div>
                </div>
                <div className="col-sm-4 ">
                  <div className="form-group">
                    <label htmlFor="photo">Попередній перегляд:</label>
                    <img
                      className="img-fluid img-thumbnail"
                      id="photo"
                      name="photo"
                      alt=""
                      src={!!image ? image : noPhoto}
                      onError={this.errorImage}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-info ">Додати</button>
              </div>
            </form>
          </div>
        </div>
        <SpinnerWidget loading={isLoading} />
      </React.Fragment>
    );
  }
}

AnimalCreateContainer.propTypes = {
  history: propTypes.object.isRequired,
  createNewAnimal:propTypes.func.isRequired,
  isError: propTypes.bool.isRequired,
  isLoading: propTypes.bool.isRequired,
};


const mapState = state => {
  return {
    //list: get (state, 'animal.list.data'),
    isLoading: get (state, 'animal.loading'),
    isError: get (state, 'animal.error'),
  };
};

const mapDispatch = (dispatch) => {
  return {
      createNewAnimal: (model) => {
          dispatch(animalActions.createNewAnimal(model));
          
      }
  }
}





const AnimalCreateWidget = withRouter (
  connect (mapState, mapDispatch) (AnimalCreateContainer)
);

export default AnimalCreateWidget;
