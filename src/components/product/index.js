import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as productActions from './reducer';
import get from 'lodash.get';
import Spinner from '../spinner';
import { Redirect } from "react-router";

class ProductWidgetContainer extends Component {
    state = {}

    componentDidMount() {
        this.props.getListData();
    }

    render() {
        console.log('----state product-----', this.state);
        console.log('----Props product-----', this.props);

        const { isListLoading } = this.props;

        const listContent = this.props.list.map(item => {
            return (
                 
                <div key={item.id} className="col-lg-3 col-md-4 col-6 ">
                    <div className="d-block mb-4 h-100">
                        <img className="img-fluid img-thumbnail" style={{"boxShadow": "0 0 5px 2px" }} src={item.image} alt="" />
                        <b> {item.name}    </b>
                        <p> {item.price} грн    </p>
                        <button className="btn btn-primary"> Купити </button>
                    </div>
                </div>
            
            )
        });
        const page = isListLoading ? (
            <Spinner/>
          ) : (
            <div>
            <div className="container">

                <h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Продукти</h1>

                <hr className="mt-2 mb-5" />

                <div className="row text-center text-lg-left">

                    {listContent}
                </div>

            </div>
        </div>

          );

        return this.state.redirect ? <Redirect to="/" /> : page;
    }
}

const mapState = (state) => {
    return {
        list: get(state, 'product.list.data'),
        isListLoading: get(state, 'product.list.loading'),
        isListError: get(state, 'product.list.error')
    }
}
const mapDispatch = (dispatch) => {
    return {
        getListData: () => {
            dispatch(productActions.getListData());
        }
    }
}

const ProductWidget = connect(mapState, mapDispatch)(ProductWidgetContainer);



export default ProductWidget;
