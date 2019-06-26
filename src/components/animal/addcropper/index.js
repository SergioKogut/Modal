import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import './index.css';

// import CropperWidget from './modal/index';

class AnimalAddCropperWidgetContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: null,
            src: '',
            isCropped: false,
        };
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        console.log('----submit form---');

        const model = {
            name: this.state.name,
            image: this.state.image
        };
        axios.post('https://localhost:44320/api/animal/add-base64', model)
            .then(
                (resp) => {
                    console.log('--success post--', resp.data);
                    this.props.history.push('/animal');
                },
                (err) => {
                    console.log('--err problem---', err);
                }
            );
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name, e.target.value);

    }

    onSelectImage = () => {
        console.log('-------Upload image--------');
        this.inputFileElement.click();
    }
    onChangeSelecFile = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {
            if (files[0].type.match(/^image\//)) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.setState({ src: reader.result, isCropped: true });

                };
                reader.readAsDataURL(files[0]);
            }
            else {
                alert("Невірний тип файлу");
            }
        }
        else {
            alert("Будь ласка виберіть файл");
        }

    }
    onCloseCropper = (e) => {
        e.preventDefault();
        this.setState({ isCropped: false });
    }

    cropImage = (e) => {
        e.preventDefault();
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            image: this.cropper.getCroppedCanvas().toDataURL(),
            isCropped: false
        });
    }

    render() {
        const { name, image, src, isCropped } = this.state;
        const imgDef = image !== null ? image : 'https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg';
        return (
            <React.Fragment>
                <h1>Додати фото в галерею кропер</h1>
                <form onSubmit={this.onSubmitForm}>
                    <div className="form-group">
                        <label htmlFor="name">Назва тварини:</label>
                        <input type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            onChange={this.onChangeInput}
                            value={name} />
                    </div>

                    <div className="form-group" >
                        <img className="imgUpload"
                            onClick={this.onSelectImage}
                            src={imgDef} Alt=""/>

                        <input ref={input => this.inputFileElement = input}
                            type="file"
                            onChange={this.onChangeSelecFile}
                            className="d-none" />
                    </div>
                    <button type="submit" className="btn btn-info">Додати</button>
                </form>

                <div className={classnames('croppermodal', { 'open': isCropped })}>
                    <div className="container">
                        <div className="row" style={{ marginTop: '100px' }}>
                            <div className="col-md-8">
                                <Cropper
                                    style={{ height: 400, width: '100%' }}
                                    aspectRatio={1 / 1}
                                    guides={false}
                                    viewMode={1}
                                    preview=".img-preview"
                                    src={src}
                                    ref={cropper => { this.cropper = cropper; }}
                                />

                            </div>
                            <div className="col-md-4">
                                <div>
                                    <div className="box" style={{ width: '100%' }}>
                                        <button className="btn btn-success" onClick={this.cropImage}>Обрізати фото</button>
                                        <button className="btn btn-danger" onClick={this.onCloseCropper}>Закрити</button>
                                        <br />
                                        <div style={{ marginTop: 20 }}>
                                            <div className="img-preview" style={{ height: 300 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const AnimalAddCropperWidget = AnimalAddCropperWidgetContainer;
export default AnimalAddCropperWidget;