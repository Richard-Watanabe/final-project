import React from 'react';
import AuthForm from './auth-form';

export default class AuthPage extends React.Component {
  render() {

    const welcomeMessage = 'Create an account to get started!';
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="row pt-5 align-items-center">
            <header className="text-center">
              <img src={window.location.origin + '/images/logo.png'} className="doggo-logo"/>
              <p className="text-muted mb-4">{welcomeMessage}</p>
            </header>
            <div className="sign-form col-9">
              <AuthForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
