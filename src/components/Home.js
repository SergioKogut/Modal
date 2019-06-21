import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, incrementValue, decrementValue } from '../reducers/counter';
import { showModal, hideModal } from '../reducers/modal';
import Notifications, { notify } from '../components/Notifications'
import Modal from './modal/Modal';
import './modal/modal.css'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ButtonStyle = {
    'marginRight': "10px",
    'marginTop': "20px"
}
const ButtonRoundStyle = {
    'height': '100px',
    'width': '100px',
    'padding': '20px',
    'borderRadius': '50%'
}

const CardStyle = {
    'padding': '30px',
    'margin': '30px',
    'borderRadius': '25px'
}


class Home extends Component {

    state = {
        valueAdd: 10,
        textMessage: 'Hello anonim!',
        colorId: '#20c997'
        //isShowModal: false
    }

   
    handleChange = (e) => {
        this.setState({ valueAdd: Number(e.target.value) });
    }
    handleChangeText = (e) => {
        this.setState({ textMessage: e.target.value });
    }
    handleChangeColor = (e) => {
        this.setState({ colorId: e.target.value });
    }

    btnToggleModalClick = () => {
        const { isShowModal } = this.state;
        this.setState({ isShowModal: !isShowModal });
    };
    btnCloseDialog = () => {
        this.btnToggleModalClick();
        notify("Good job!", '#071');
    };


    render() {
        const ModalProp = {
            message: 'Enter your message',
            urlLink: '',
            title:"Редагувати"
        }
        console.log('------- Home props------', this.props);
        const { count,isShowModal,modalMessage,urlLink } = this.props;
        const {valueAdd, textMessage, colorId } = this.state;
        return (
            <div>

                <Notifications />

                <h1>Вивчення React/Redux</h1>
                
                {/* Введення в  Redux */}
                <div className="card bg-light" style={CardStyle}>
                    <h4 className="card-title">Введення в  Redux</h4>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6 ">
                                <div className="input-group mb-2 input-group-lg">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Enter value: </span>
                                    </div>
                                    <input type="text" id="values" name="values" value={this.state.valueAdd} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <h3>Count: {count}</h3>
                            </div>
                            <div className="row">
                                <button
                                    className="btn btn-success"
                                    style={ButtonStyle}
                                    onClick={() => this.props.increment()}>
                                    <i className="fa fa-plus-circle" /> Add
                    </button>
                                <button
                                    className="btn btn-info"
                                    style={ButtonStyle}
                                    onClick={() => this.props.decrement()}>
                                    <i className="fa fa-minus-circle" /> Sub
                    </button>
                                <button
                                    className="btn btn-success"
                                    style={ButtonStyle}
                                    onClick={() => this.props.incrementValue(valueAdd)}>
                                    <i className="fa fa-plus-circle" /> Add value
                    </button>
                                <button
                                    className="btn btn-info"
                                    style={ButtonStyle}
                                    onClick={() => this.props.decrementValue(valueAdd)}>
                                    <i className="fa fa-minus-circle" /> Sub value
                    </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notification (вспливаюче віконце ) */}
                <div className="card bg-light" style={CardStyle}>
                    <h4 className="card-title">Notification (вспливаюче віконце )</h4>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6 ">
                                <div className="input-group mb-2 input-group-lg">
                                    <div className="input-group-prepend" >
                                        <span className="input-group-text" >Enter message:</span>
                                    </div>
                                    <input type="text"
                                        id="message"
                                        name="message"
                                        value={textMessage}
                                        onChange={this.handleChangeText}
                                    />
                                </div>

                                <div className="input-group mb-2 input-group-lg">
                                    <div className="input-group-prepend" >
                                        <span className="input-group-text">Enter color id:</span>
                                    </div>
                                    <input type="text"
                                        id="colorid"
                                        name="colorid"
                                        value={this.state.colorId}
                                        onChange={this.handleChangeColor}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-3 ">
                                <button className="btn btn-success"
                                    onClick={() => notify(textMessage, colorId)}
                                    data-toggle="tooltip"
                                    title="Click for see notice!"
                                    style={ButtonRoundStyle}>
                                    <i className="fa fa-hand-o-down" aria-hidden="true"></i> Click me
                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal (модальні вікна ) */}
                <div className="card bg-light" style={CardStyle}>
                    <h4 className="card-title">Modal (модальні вікна )</h4>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-3 ">
                                <div className={classnames('custommodal position-center', { 'open': isShowModal })}>
                                    <Modal/>
                                </div>
                                <br />
                                <button
                                    className="btn btn-info"
                                    style={ButtonRoundStyle}
                                    onClick={() => this.props.showModal(ModalProp)}>
                                    Modal show
                                </button>
                            </div>
                            <div className="col-sm-2 ">
                                <div className="form-group">
                                    <label htmlFor="photo">Photo:</label> 
                                    <img id='photo' alt="" src={urlLink} style={{'borderWidth':'2px','height':'135px','width':'100px'}}></img>
                                </div>
                            </div>
                            <div className="col-sm-6 ">
                                <div className="form-group">
                                    <label htmlFor="comment">Comment:</label>
                                    <textarea
                                    className="form-control"
                                    rows="5"
                                    id="comment"
                                    readOnly
                                    value={modalMessage}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateProps = (state) => {
    console.log('----redux store connect----', state);
    return {
        count: state.counter.counterStore,
        isShowModal:state.modal.showModalWindow,
        modalMessage:state.modal.modalWindow.message,
        urlLink:state.modal.modalWindow.urlLink
    };
}

Home.propTypes =
    {
        urlLink:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
        isShowModal:PropTypes.bool.isRequired,
        modalMessage:PropTypes.string.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementValue: PropTypes.func.isRequired,
        decrementValue: PropTypes.func.isRequired,
        showModal: PropTypes.func.isRequired,
        hideModal: PropTypes.func.isRequired,
    }

export default connect(mapStateProps, { 
    increment,
    decrement,
    incrementValue,
    decrementValue,
    showModal,
    hideModal })(Home);