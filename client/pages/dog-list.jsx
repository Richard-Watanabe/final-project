import React from 'react';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';
import { Redirect, Link } from 'react-router-dom';

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    const { token } = this.context;
    Promise.all([fetch('/api/photos-list', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    }), fetch('/api/dog-name-list', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([data1, data2]) => {
        data1[data1.length - 1]
          ? this.setState({
            logs: data1,
            imageUrl: data1[data1.length - 1].url,
            isLoading: false
          })
          : this.setState({
            logs: data1,
            imageUrl: '/images/placeholder.png',
            isLoading: false
          });
        data2[0].dogName !== null
          ? this.setState({
            dogName: data2[0].dogName,
            isLoading: false
          })
          : this.setState({
            dogName: 'Name',
            isLoading: false
          });
      })
      .catch(err => {
        console.error(err);
        connectionAlert();
      });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/" />;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white">
          <Link to="/home" className="go-back d-inline-block">&lt; Back to logs</Link>
            <div className="text-center name-div add-dog-contain">
              <div className="d-flex add-name-header text-nowrap">
                <h2>My Doggo List</h2>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

DogList.contextType = AppContext;
