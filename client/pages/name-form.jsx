import React from 'react';
import AppContext from '../lib/app-context';
import { Redirect } from 'react-router-dom';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      dogName: event.target.value
    });
  }

  render() {

    const { user } = this.context;
    if (!user) return <Redirect to="/sign-in" />;
    const value = this.state.dogName;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="overlay-name">
            <form>
              <div className="name-box box-shadow text-center">
                <p className="welcome-text">Welcome to</p>
                <div className="d-flex justify-content-center">
                  <img src={window.location.origin + '/images/logo.png'} className="name-doggo-logo" />
                </div>
                <label htmlFor="name" className="name-label">Enter doggo name:</label>
                <div className="col-8 name-div">
                  <input type="text" id="name"value={value} onChange={this.handleChange} className='form-control input-custom' placeholder="Name"></input>
                </div>
                <button type="submit" className="btn btn-primary box-shadow name-button">Start!</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

NameForm.contextType = AppContext;
