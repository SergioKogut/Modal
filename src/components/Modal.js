import React, { Component } from 'react';

class Modal extends Component {
    state = {
    }
    render() {
        console.log('-------------modal props ------------',this.props);
        return (
            <div className="modal" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=> this.props.callBackClose()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-2 input-group-lg">
                                <div className="input-group-prepend" >
                                    <span className="input-group-text" >Enter text:</span>
                                </div>
                                <input type="text"
                                    id="textmessage"
                                    name="textmessage"
                                />
                        </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Save changes</button>
                            <button type="button" onClick={()=> this.props.callBackClose()} className="btn btn-secondary" >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
