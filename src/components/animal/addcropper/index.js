import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

import CropperWidget from './modal/index';

class AnimalAddCropperWidgetContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            src: '',
            isCropped: false
        };
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        console.log('----submit form---');

        const model = { 
            name: this.state.name,
            image: this.state.image 
        };
        axios.post('http://localhost:100/api/gallery.php', model)
            .then(
                (resp)=>{
                    console.log('--success post--', resp.data);
                    this.props.history.push('/gallery');
                },
                (err) => {
                    console.log('--err problem---', err);
                }
            );
    }

    onChangeInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
        console.log(e.target.name, e.target.value);

    }

    onSelectImage = () =>{
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
                    //this.toggle(e);
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

    render() { 
        const {name, image, src, isCropped }= this.state;
        
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
                            src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg" />

                        <input ref={input => this.inputFileElement = input} 
                                type="file" 
                                onChange={this.onChangeSelecFile} 
                                className="d-none" />

                       
                        <CropperWidget loading={isCropped} src={src} onClose={this.onCloseCropper}/>
                    </div>
                    <button type="submit" className="btn btn-info">Додати</button>
                </form>
            </React.Fragment>
        );
    }
}
 
const AnimalAddCropperWidget = AnimalAddCropperWidgetContainer;
export default AnimalAddCropperWidget;