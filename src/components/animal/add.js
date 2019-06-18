import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router";

const FormStyle = {
    'boxShadow': '0 0 5px 3px',
    'margin': '20px',
    'padding': '20px'
};
class AnimalCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: ''
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        console.log('----submit form---');

        const model = {
            name: this.state.name,
            image: this.state.image
        };
        
        axios.post('https://localhost:44320/api/animal/add', model)
            .then(
                (resp) => {
                    console.log('--success post--', resp.data);
                    this.props.history.push('/animal');
                  // <Redirect  to="/animal"/>
                },
                (err) => {
                    console.log('--err problem---', err);
                }
            );
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        console.log('---AnimalCreate state----', this.state);
        const { name, image } = this.state;
        return (
            <React.Fragment>

                <div className="row justify-content-md-center"  >
                    <div className="col-sm-4 ">
                        <form onSubmit={this.onSubmitForm} style={FormStyle}>
                            <h1 className="text-center" >Додати тварину</h1>
                            <div className="form-group">
                                <label htmlFor="name">Назва тварини:</label>
                                <input type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={this.onChangeInput}
                                    name="name"
                                    id="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="image">Фото:</label>
                                <input type="text"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    onChange={this.onChangeInput}
                                    value={image}
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-info ">Додати</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AnimalCreate;  