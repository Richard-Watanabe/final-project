import React from 'react';
import AppContext from '../lib/app-context';
import { Redirect, Link } from 'react-router-dom';

export default class DogForm extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault();
    const { token } = this.context;
    fetch('/api/dog-name', {
      method: 'POST',
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
        this.props.history.push('/home');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/" />;
    const value = this.state.dogName;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <Link to="/home" className="go-back d-inline-block">&lt; Back to logs</Link>
            <form onSubmit={this.handleSubmit}>
              <div className="text-center name-div add-dog-contain">
                <div className="d-flex add-name-header text-nowrap">
                  <label htmlFor="name">
                    <h2>Add New Doggo</h2>
                  </label>
                </div>
                <div className="d-flex flex-column">
                  <input type="text" id="name" value={value} onChange={this.handleChange} className='form-control input-custom' placeholder="Name" maxLength="14"></input>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary box-shadow name-button">Add Doggo</button>
              </div>
            </form>
        </div>
      </div>
    );
  }
}

DogForm.contextType = AppContext;
