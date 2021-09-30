import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';

export default class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        connectionAlert();
      });
  }

  handleDemo(event) {
    fetch('/api/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'demo',
        password: 'password1'
      })
    })
      .then(res => res.json())
      .then(result => {
        if (result.user && result.token) {
          this.props.onSignIn(result);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        connectionAlert();
      });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <form className="w-100" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input required autoFocus id="username" type="text" name="username" onChange={handleChange} className="form-control bg-light" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">Password</label>
          <input required id="password" type="password" name="password" autoComplete="off" onChange={handleChange} className="form-control bg-light" />
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <Link to="/sign-up" className="sign-link mb-5">Create Account</Link>
          </div>
          <div className="d-flex flex-column">
            <button type="submit" className="btn btn-primary box-shadow log-in-button mb-4">Login</button>
            <a onClick={this.handleDemo} className="sign-link align-self-end">Demo</a>
          </div>
        </div>
      </form>
    );
  }
}

SignInForm.contextType = AppContext;
