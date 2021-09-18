import React from 'react';
import SignUpForm from './sign-up-form';
import AppContext from '../lib/app-context';
import { Redirect } from 'react-router-dom';

export default class SignUp extends React.Component {

  render() {

    const { user } = this.context;
    if (user) return <Redirect to="/" />;

    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="row pt-5 align-items-center">
            <header className="text-center">
              <img src={window.location.origin + '/images/logo.png'} className="doggo-logo"/>
              <p className="text-muted mb-4">Create an account to get started!</p>
            </header>
            <div className="sign-form col-9">
              <SignUpForm history={this.props.history}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignUp.contextType = AppContext;
