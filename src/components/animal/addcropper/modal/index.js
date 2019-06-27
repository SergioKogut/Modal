import React, { Component } from 'react';
import classnames from 'classnames';
import Cropper from 'react-cropper';



class CropperWidgetContainer extends Component {
    state = {
        //loading: true
    }
    render() { 
        const { loading, src, onClose } = this.props;
        
        return ( 
            <div className={classnames('croppermodal', { 'open': loading })}>
                <div className="container">
                    <div className="row" style={{ marginTop: '100px' }}>
                        <div className="col-md-8">
                            <Cropper
                                style={{ height: 400, width: '100%' }}
                                aspectRatio={1 / 1}
                                guides={false}
                                viewMode={1}
                                dragMode="move"
                                preview=".img-preview"
                                src={src}   
                                ref={cropper => { this.cropper = cropper; }}
                            />
                        </div>
                        <div className="col-md-4">
                            
                            <div>
                                <div className="box" style={{ width: '100%' }}>
                                    <button className="btn btn-success" style={{marginRight:'5px'}} >Обрізати фото</button>
                                    <button className="btn btn-danger" onClick={(e) => onClose(e)}>Закрити</button>
                                    <br />
                                    <div  style={{ marginTop: 20 }}>
                                        <div className="img-preview" style={{ height: 300 }} />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
const CropperWidget = CropperWidgetContainer;
 
export default CropperWidget;