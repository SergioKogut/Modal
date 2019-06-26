import React, { Component } from 'react';
import { connect } from 'react-redux';
//import axios from 'axios';
import classnames from 'classnames';
import noPhoto from './No_image_available.png';
import get from 'lodash.get';
import * as animalActions from './reducer';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import SpinnerWidget from '../spinner';
//import { Row } from 'react-bootstrap'
import defaultPath from './No_image_available.png'
import Cropper from 'react-cropper';
import './inputDes.css'

const FormStyle = {
    // boxShadow: '0 0 5px 3px',
    margin: '20px',
    padding: '20px',
};

class AnimalCreateCropperContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            imageBase64: defaultPath,
            errors: {},
            done: false,
            isLoading: false,
            isLoadingPhoto: false,
            errorImage: false,
        };
        this.cropImage = this.cropImage.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState({
                [name]: value,
                errors,
            });
        } else {
            this.setState({ [name]: value });
        }
    };
    changeInput(e) {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({ src: reader.result });
        };
        reader.readAsDataURL(files[0]);
        this.setState({ isLoadingPhoto: true });
    }
    cropImage= ()=> {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            imageBase64: this.cropper.getCroppedCanvas().toDataURL()
        });
        this.setState({ isLoadingPhoto: false });
        this.setState({ src: '' });
    }

    rotareImage = () => {
        this.cropper.rotate(45);
    };

    onSubmitForm = e => {
        e.preventDefault();
        let errors = {};
        if (this.state.name === '') errors.name = 'Не може бути пустим!';
        if (this.state.image === '') errors.image = 'Не може бути пустим!';
        if (this.state.errorImage) errors.image = 'Не коректна адреса зображення!';

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ isLoading: true });

            const model = {
                name: this.state.name,
                image: this.state.image,
            };
            this.props.createNewAnimal(model);

        } else {
            this.setState({ errors });
        }
    };

    componentWillReceiveProps(newprops) {
        const { isSuccess, history } = newprops;
        if (isSuccess) {
            console.log("isSuccess: ", isSuccess);
            history.push('/animal');
        }
    }
    errorImage = () => {
        this.setState({ errorImage: true });
    };

    onChangeInput = e => {
        const { errors } = this.state;
        const { name, value } = e.target;
        if (!!errors[name]) {
            let clone_errors = Object.assign({}, errors);
            delete clone_errors[name];
            this.setState({
                [name]: value,
                errors: clone_errors,
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    render() {
        console.log('---AnimalCropperCreate state----', this.state);
        console.log('---AnimalCropperCreate props----', this.props);
        const { name, image, imageBase64, errors, isLoadingPhoto } = this.state;
        const { isLoading, isError } = this.props;
        return (
            <React.Fragment>

                <div className="row justify-content-md-center">
                    <div className="col ">
                        <form onSubmit={this.onSubmitForm} style={FormStyle}>
                            {!!errors.invalid
                                ? <div className="alert alert-danger">
                                    {errors.invalid}.
                  </div>
                                : ''}
                            {isError ?
                                (<div className="alert alert-danger" style={{ 'margin': '10px' }}>Завантаження  данних невдале!</div>)
                                : ''}

                            <h1 className="text-left"> Додати тварину (Cropper)</h1>
                            <div className="row justify-content-md-left">
                                <div className="col-sm-16 ">
                                    <div className="form-group">
                                        <label htmlFor="name">Назва тварини:</label>
                                        <input
                                            type="text"
                                            className={classnames('form-control', {
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
                                </div>
                                <div className='container'>
                                    <div className="Row text-left">
                                        <div className="form-group ">
                                            <label id="labelForInput" htmlFor="inputFile">
                                                {
                                                    !this.state.isLoadingPhoto ?
                                                        <img
                                                            src={imageBase64}
                                                            className="img-circle"
                                                            id="image"
                                                            alt=""
                                                            name="image"
                                                            width="250" />
                                                        : <p></p>
                                                }
                                                {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                                                <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                                            </label>
                                        </div>

                                        <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                                            <Cropper
                                                style={{ height: 400, width: 400, overflow: 'hidden' }}
                                                aspectRatio={1 / 1}
                                                rotatable = "true"
                                                preview=".img-preview"
                                                guides={false}
                                                src={this.state.src}
                                                ref={cropper => { this.cropper = cropper; }}
                                            />
                                            <p></p>
                                            <button type="button" onClick={this.cropImage} className="btn btn-primary" style={{ marginRight: '5px' }}>Crop Image</button>
                                            <button type="button" onClick={this.rotareImage} className="btn btn-primary"><i className="fa fa-repeat" aria-hidden="true" /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
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

AnimalCreateCropperContainer.propTypes = {
    history: propTypes.object.isRequired,
    createNewAnimal: propTypes.func.isRequired,
    isError: propTypes.bool.isRequired,
    isLoading: propTypes.bool.isRequired,
};


const mapState = state => {
    return {
        isLoading: get(state, 'animal.loading'),
        isError: get(state, 'animal.error'),
        isSuccess: get(state, 'animal.success'),
    };
};

const mapDispatch = (dispatch) => {
    return {
        createNewAnimal: (model) => {
            dispatch(animalActions.createNewAnimal(model));

        }
    }
}


const AnimalCreateCropperWidget = withRouter(
    connect(mapState, mapDispatch)(AnimalCreateCropperContainer)
);

export default AnimalCreateCropperWidget;
