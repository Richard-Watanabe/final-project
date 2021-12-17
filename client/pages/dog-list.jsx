import React from 'react';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';
import DogListBase from './dog-list-base';
import { Redirect, Link } from 'react-router-dom';
import ReactGA from 'react-ga';

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    const { token } = this.context;
    fetch('/api/all-dog', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res1 => {
        return res1.json();
      })
      .then(data => {
        data
          ? this.setState({
            dogs: data
          })
          : this.setState({
            dogs: null
          });
      })
      .catch(err => {
        console.error(err);
        connectionAlert();
      });
  }

  render() {
    ReactGA.pageview(window.location.pathname + window.location.search);
    const { user } = this.context;
    if (!user) return <Redirect to="/" />;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <Link to="/home" className="go-back d-inline-block">&lt; Back to logs</Link>
            <div className="text-center name-div">
              <div className="d-flex add-name-header text-nowrap">
                <h2 className="list-header">My Doggo List</h2>
              </div>
              <div className="dog-list">
                <DogListBase dogs={this.state.dogs} history={this.props.history}/>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

DogList.contextType = AppContext;
