import React from 'react';
import AuthForm from './auth-form';
import Redirect from './redirect';
import AppContext from '../lib/app-context';

export default class AuthPage extends React.Component {
  render() {

    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Sign in to start logging your doggo\'s daily activities!'
      : 'Create an account to get started!';
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="row pt-5 align-items-center">
            <header className="text-center">
              <img src={window.location.origin + '/images/logo.png'} className="doggo-logo"/>
              <p className="text-muted mb-4">{welcomeMessage}</p>
            </header>
            <div className="sign-form col-9">
              <AuthForm key={route.path} action={route.path} onSignIn={handleSignIn}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
