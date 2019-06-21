import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideModal, setMessage } from '../../reducers/modal';
import propTypes from 'prop-types';

class Modal extends Component {

    state = {
        message: "your message",
        urlLink: "https://c.static-nike.com/a/images/t_PDP_1280_v1/f_auto/o85c1zecmrsre8qbf7pc/fe-nom-girls-sculpt-bra-q6FG9l.jpg",
        title:""
    }

    handleChangeText = (e) => {
        this.setState({ message: e.target.value });
    }
    handleChangePhoto = (e) => {
        this.setState({ urlLink: e.target.value });
    }
    render() {
        console.log('-------------modal props ------------', this.props);
        console.log('-------------modal state ------------', this.state);
        const { message,urlLink,title } = this.state;

        return (
            <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.props.hideModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="col-sm-12 ">
                                <div className="form-group">
                                    <label htmlFor="comment"> <i className="fa fa-pencil" /> enter comment:</label>
                                    <textarea className="md-textarea form-control"
                                        rows="5"
                                        id="comment"
                                        name="comment"
                                        value={ message}
                                        onChange={this.handleChangeText}
                                    >
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="photo"> <i className="fa fa-pencil" /> enter photo url:</label>
                                    <input className="md-textarea form-control"
                                        rows="5"
                                        id="photo"
                                        name="photo"
                                        value={ urlLink}
                                        onChange={this.handleChangePhoto}
                                    >
                                    </input>
                                </div>

                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => this.props.setMessage(this.state)}>Save changes</button>
                            <button type="button" onClick={() => this.props.hideModal()} className="btn btn-secondary" >Close</button>
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
        isShowModal: state.modal.showModalWindow,
        message:state.modal.modalWindow.message,
        urlLink:state.modal.modalWindow.urlLink,
        title:state.modal.modalWindow.title
    };
}

Modal.propTypes = {
    hideModal:propTypes.func.isRequired,
    setMessage:propTypes.func.isRequired,
    isShowModal:propTypes.bool.isRequired,
    title:propTypes.string.isRequired,
};

export default connect(mapStateProps, { hideModal, setMessage })(Modal);
