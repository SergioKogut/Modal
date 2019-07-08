import React, { Component } from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import SpinnerWidget from '../spinner';
import defaultPath from './No_image_available.png'
import Cropper from 'react-cropper';
import './inputDes.css'
//import axios from 'axios';
import propTypes from 'prop-types';
import get from 'lodash.get';
import * as girlActions from './girlReducer';
import {connect} from 'react-redux';

const imageMaxSize = 3000;



const FormStyle = {
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
            src:'',
            done: false,
            isLoading: false,
            isLoadingPhoto: false,
            errorImage: false,
        };
        this.cropImage = this.cropImage.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }

    componentWillReceiveProps(newprops) {
        const { isSuccess, history} = newprops;
        if(isSuccess)
        {
        console.log("isSuccess: ", isSuccess);
        history.push('/animal');
        }
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
    changeInput = (e) => {
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

        const currentFile = files[0];
        const currentFileSize = currentFile.size;
        if (currentFileSize>imageMaxSize ){
            reader.readAsDataURL(currentFile);
            this.setState({ isLoadingPhoto: true });
        }
        else{
            alert("Фото має бути більше 3Мb");

        };

        

    }
    cropImage = () => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            imageBase64: this.cropper.getCroppedCanvas().toDataURL()
        });
        this.setState({ isLoadingPhoto: false });
        this.setState({ src: '' });
    }

    operationImage = (e, type, value) => {
        e.preventDefault();

        switch (type) {

            case 'ROTARE_LEFT':
                this.cropper.rotate(value);
                break;
            case 'ROTARE_RIGHT':
                this.cropper.rotate(-value);
                break;
            case 'ZOOM+':
                this.cropper.zoom(value);
                break;
            case 'ZOOM-':
                this.cropper.zoom(value);
                break;
            default:

        }
    };

    onSubmitForm = e => {
        e.preventDefault();
        let errors = {};
        if (this.state.name === '') errors.name = 'Не може бути пустим!';
        if (this.state.imageBase64 === defaultPath) errors.image = 'Додайте фото!';
      

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ isLoading: true });

            e.preventDefault();
            console.log('----submit form---');

            const model = {
                name: this.state.name,
                image: this.state.imageBase64
            };
                this.props.createNewGirl(model);
            // axios.post('https://localhost:44320/api/animal/add-base64', model)
            //     .then(
            //         (resp) => {
            //             console.log('--success post--', resp.data);
            //             this.props.history.push('/animal');
            //         },
            //         (err) => {
            //             console.log('--err problem---', err);
            //         }
            //     );

        } else {
            this.setState({ errors });
        }
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
        const { name, imageBase64, errors, isLoadingPhoto } = this.state;
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

                            <h1 className="text-left"> Додати тварину</h1>
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

                                        <div className={!isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                                            <Cropper
                                                style={{ height: 400, width: 400, overflow: 'hidden' }}
                                                aspectRatio={1 / 1}
                                                preview=".img-preview"
                                                guides={false}
                                                src={this.state.src}
                                                ref={cropper => { this.cropper = cropper; }}
                                            />
                                            <p></p>
                                            <div>
                                                <button type="button" onClick={this.cropImage} className="btn btn-primary btn-crop" ><i className="fa fa-crop" aria-hidden="true"/> Crop Image</button>
                                                <button type="button" onClick={e => this.operationImage(e, 'ZOOM+', 0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-plus" aria-hidden="true" /></button>
                                                <button type="button" onClick={e => this.operationImage(e, 'ZOOM-', -0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-minus" aria-hidden="true" /></button>
                                                <button type="button" onClick={e => this.operationImage(e, 'ROTARE_LEFT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-repeat" aria-hidden="true" /></button>
                                                <button type="button" onClick={e => this.operationImage(e, 'ROTARE_RIGHT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-undo" aria-hidden="true" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <button type="submit" className="btn btn-lg btn-info ">Додати</button>
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
    createNewGirl:propTypes.func.isRequired,
    isError: propTypes.bool.isRequired,
    isLoading: propTypes.bool.isRequired,
    isSuccess: propTypes.bool.isRequired,
  };
  
  
  const mapState = state => {
    return {
      isLoading: get(state, 'girl.create.loading'),
      isError: get(state, 'girl.create.error'),
      isSuccess: get(state, 'girl.create.success'),
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
        createNewGirl: (model) => {
            dispatch(girlActions.createNewGirl(model));
            
        }
    }
  }

  
const AnimalCreateCropperWidget = withRouter(connect (mapState, mapDispatch)(AnimalCreateCropperContainer));

export default AnimalCreateCropperWidget;
