import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NavMenu extends Component {
    state = {}
    render() {
        return (
            <header>
                <nav className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3 navbar navbar-light">
                    <div className="container">
                        <Link className="navbar-brand" to="/">WebBlog </Link>
                        <button type="button" className="mr-2 navbar-toggler">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="d-sm-inline-flex flex-sm-row-reverse collapse navbar-collapse">
                            <ul className="navbar-nav flex-grow">
                                <li className="nav-item">
                                    <Link className="text-dark nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="text-dark nav-link" to="/register">Register</Link>  
                                </li>
                                <li className="nav-item">
                                    <Link className="text-dark nav-link" to="/login">Login</Link>  
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default NavMenu;