import React, { Component } from 'react';
import './App.css';

import LoginForm from './components/auth/LoginForm';
import PrivateRoute from './components/common/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import history from './history';
import { loadUser } from './actions/auth';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/layout/Header';
import Homepage from './components/homepage/homepage';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './components/challenges/Dashboard';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route exact path='/challenges' component={Dashboard} />
            <Route exact path='/register' component={RegisterForm} />
            <Route exact path='/login' component={LoginForm} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
