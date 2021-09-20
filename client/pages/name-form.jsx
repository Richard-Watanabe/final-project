import React from 'react';
import AppContext from '../lib/app-context';
import { Redirect } from 'react-router-dom';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: '',
      dogId: 0
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
          dogName: '',
          dogId: data.dogId[0].dogId
        });
      })
      .catch(err => {
        console.error(err);
      });
    fetch('/api/dog-name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify({
        dogId: this.state.dogId
      })
    })
      .then(res => res.json())
      .finally(() => {
        this.props.history.push('/sign-in');
      })
      .catch(err => {
        console.error(err);
      });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   const { token } = this.context;
  //   Promise.all([fetch('/api/dog-name', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-Access-Token': token
  //     },
  //     body: JSON.stringify({
  //       dogName: this.state.dogName
  //     })
  //   }), fetch('/api/dog-name', {
  //     method: 'PATCH',
  //     headers: {
  //       'X-Access-Token': token
  //     },
  //     body: JSON.stringify({
  //       dogId: this.state.dogId
  //     })
  //   })])
  //     .then(([res1, res2]) => {
  //       this.setState({
  //         dogName: ''
  //       });
  //       return Promise.all([res1.json(), res2.json()]);
  //     })
  //     .then(([data1, data2]) => {
  //       console.log(data2);
  //       this.setState({
  //         dogId: data2
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       this.props.history.push('/sign-in');
  //     });
  // }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/sign-in" />;
    const value = this.state.dogName;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <div className="overlay-name">
            <form onSubmit={this.handleSubmit}>
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
