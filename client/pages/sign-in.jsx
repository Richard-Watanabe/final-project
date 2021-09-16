import React from 'react';
import SignInForm from './sign-in-form';
// import Redirect from './redirect';
import AppContext from '../lib/app-context';

export default class SignIn extends React.Component {

  render() {

    const { handleSignIn } = this.context;

    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="row pt-5 align-items-center">
            <header className="text-center">
              <img src={window.location.origin + '/images/logo.png'} className="doggo-logo"/>
              <p className="text-muted mb-4">Log in to start logging your doggo&#39;s daily activities!</p>
            </header>
            <div className="sign-form col-9">
              <SignInForm onSignIn={handleSignIn}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.contextType = AppContext;
