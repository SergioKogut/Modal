import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom"
import * as animalActions from './reducer';
import get from 'lodash.get';
import propTypes from 'prop-types';

class AnimalWidgetContainer extends Component {
    state = {}

    componentDidMount() {
        this.props.getListData();
    }
    redirectToAnimal=(e)=>{
        const {history}=this.props;
        e.preventDefault();
        console.log('-----переходимо на сторінку додавання----');
        history.push('animal/add');
    }

    render() {
        console.log('----state-----', this.state);
        console.log('----Props-----', this.props);
        const listContent = this.props.list.map(item => {
            return (
                <div key={item.id} className="col-lg-3 col-md-4 col-6">
                    <div className="d-block mb-4 h-100">
                        <img className="img-fluid img-thumbnail" style={{"boxShadow": "0 0 5px 2px" }} src={item.image} alt="" />
                        <b> {item.name}    </b>
                    </div>
                </div>
            )
        });
        return (
            <div>
                <div className="container">

                    <button  className="btn btn-info" onClick={this.redirectToAnimal}> Додати тварину</button>
                    <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

                    <hr className="mt-2 mb-5" />

                    <div className="row text-center text-lg-left">

                        {listContent}
                    </div>

                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        list: get(state, 'animal.list.data'),
        isListLoading: get(state, 'animal.list.loading'),
        isListError: get(state, 'animal.list.error')
    }
}
const mapDispatch = (dispatch) => {
    return {
        getListData: () => {
            dispatch(animalActions.getListData());
        }
    }
}

AnimalWidgetContainer.propTypes =
{
history:propTypes.object.isRequired,
list:propTypes.array.isRequired,
isListError:propTypes.bool.isRequired,
isListLoading:propTypes.bool.isRequired
}

const AnimalWidget = withRouter(connect(mapState, mapDispatch)(AnimalWidgetContainer));



export default AnimalWidget;
