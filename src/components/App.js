import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import { connect } from 'react-redux'

import { fetchUser } from '../actions/main'

import Header from './layout/Header'
import CustomError from './layout/Error'
import Load from './layout/Load'

import Login from './login/Login'
import Register from './login/Register'
import Create from './create/Create'
import Tests from './tests/Tests'
import Test from './test/Test'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchUser());
  }

  render() {
    if(!this.props.receive) {
      return (
        <Load />
      )
    }
    return (
      <Router>
        <div className='app'>
          <Header />
          {this.props.error ? <CustomError /> : null}
          {this.props.load ? <Load /> : null}
          <Switch>
            <PrivateRoute path='/login' component={Login} auth={!this.props.user} redirect='/tests' />
            <PrivateRoute path='/register' component={Register} auth={!this.props.user} redirect='/tests' />
            <PrivateRoute path='/tests' component={Tests} auth={this.props.user} redirect='/login' />
            <PrivateRoute path='/test/:id' component={Test} auth={this.props.user} redirect='/login' />
            <PrivateRoute path='/create' component={Create} auth={this.props.admin} redirect='/tests' />
            {!this.props.user ?
              <Redirect to='/login' /> :
              <Redirect to='/tests' />}
          </Switch>
        </div>
      </Router>
    )
  }
}

function PrivateRoute({ component: Component, auth, redirect, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  const { user, admin, receive } = state.user
  const { error, load } = state;
  return { user, admin, error, load, receive }
}

export default connect(mapStateToProps)(App);