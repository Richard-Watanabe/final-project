import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import AppDrawer from './app-drawer';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      imageUrl: '',
      dogName: 'Name',
      isLoading: true
    };
  }

  componentDidMount() {
    const { token } = this.context;
    Promise.all([fetch('/api/logs', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    }), fetch('/api/photos', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    }), fetch('/api/dog-name', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })])
      .then(([res1, res2, res3]) => {
        return Promise.all([res1.json(), res2.json(), res3.json()]);
      })
      .then(([data1, data2, data3]) => {
        data2[data2.length - 1]
          ? this.setState({
            logs: data1,
            imageUrl: data2[data2.length - 1].url,
            isLoading: false
          })
          : this.setState({
            logs: data1,
            imageUrl: '/images/placeholder.png',
            isLoading: false
          });
        data3[0].dogName !== null
          ? this.setState({
            dogName: data3[0].dogName,
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

  getloaderClass() {
    if (this.state.isLoading === true) return 'lds-heart';
    return 'lds-heart hide';
  }

  render() {
    const loaderClass = this.getloaderClass();
    const { user } = this.context;
    if (!user) return <Redirect to="/" />;
    const { dogName } = this.state;
    const date = new Date();
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <AppDrawer />
            <Moment className="date" format="MM/DD/YYYY" trim>{date}</Moment>
          </div>
          <div className="d-flex justify-content-center align-items-center home-image-div">
            <img src={this.state.imageUrl} className ="d-inline-block home-image" alt="profile-dog-image"></img>
          </div>
          <div className="name d-flex justify-content-center t col-md-5">
            <div className="d-flex align-items-center name-container">
              <p>{dogName}</p>
              <Link to="/name">
                <i className="fas fa-pencil-alt name-icon"></i>
              </Link>
             </div>
          </div>
          <div className="plus-div">
            <Link to="/category" className="custom-plus-button">
              <span className="plus-span">+</span>
            </Link>
          </div>
          <div className="log-list">
            <LogList logs={this.state.logs} />
          </div>
          <div className="my-auto justify-content-center align-items-center d-flex">
            <div className={loaderClass}><div></div></div>
          </div>
        </div>
      </div>
    );
  }
}

Home.contextType = AppContext;
