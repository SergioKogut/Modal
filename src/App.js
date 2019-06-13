import React from 'react';
import { Switch,Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './components/Home';
import Register from './components/register';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Layout>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={LoginPage} />
      </Switch>
    </Layout>
    
  );
}

export default App;
