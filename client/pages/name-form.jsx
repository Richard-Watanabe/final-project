import React from 'react';
import AppContext from '../lib/app-context';
import { Redirect, Link } from 'react-router-dom';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      dogName: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { token } = this.context;
    await fetch('/api/dog-name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify({
        dogName: this.state.dogName
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          dogName: ''
        });
      })
      .finally(() => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err);
        window.alert('Sorry, there was an error connecting to the network! Please check your internet connection and try again.');
      });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/sign-in" />;
    const value = this.state.dogName;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <Link to="/" className="go-back d-inline-block">&lt; Back to logs</Link>
          <form onSubmit={this.handleSubmit}>
            <div className="text-center name-div add-dog-contain">
              <div className="d-flex add-name-header">
                <p>Add/Change Doggo Name</p>
              </div>
              <label htmlFor="name" className="add-name-label">Enter doggo name:</label>
              <input type="text" id="name" value={value} onChange={this.handleChange} className='form-control input-custom' placeholder="Name"></input>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary box-shadow name-button">Save Name</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

NameForm.contextType = AppContext;
