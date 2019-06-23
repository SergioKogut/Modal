import React from 'react';
import { Switch,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/register';
import LoginPage from './components/LoginPage';
import AnimalWidget from './components/animal'
import ProductWidget from './components/product'
import AnimalCreateWidget from './components/animal/add'
import PhotoGallery from './components/photogallery';
import BlogPost from './components/blog';

function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/animal' component={AnimalWidget} />
      <Route exact path='/product' component={ProductWidget} />
      <Route exact path='/animal/add' component={AnimalCreateWidget} />
      <Route exact path='/photogallery' component={PhotoGallery} />
      <Route exact path='/blog' component={BlogPost} />
    
      </Switch>
    </Layout>
    
  );
}

export default App;
