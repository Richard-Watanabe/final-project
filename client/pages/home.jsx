import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import AppDrawer from './app-drawer';
import { Link } from 'react-router-dom';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      imageUrl: ''
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
    })])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([data1, data2]) => {
        data2[data2.length - 1]
          ? this.setState({
            logs: data1,
            imageUrl: data2[data2.length - 1].url
          })
          : this.setState({
            logs: data1,
            imageUrl: '/images/placeholder.png'
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {

    // if (!this.context.user) return <Redirect to="sign-in" />;

    const date = new Date();
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="inner-white d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <AppDrawer />
            <Moment className="date" format="MM/DD/YYYY" trim>{date}</Moment>
          </div>
          <div className="d-flex justify-content-center align-items-center home-image-div">
            <img src={this.state.imageUrl} className ="d-inline-block home-image"></img>
          </div>
          <div className="plus-div">
            <Link to="/category" className="custom-plus-button plus text-center">+</Link>
          </div>
          <div className="log-list">
            <LogList logs={this.state.logs} />
          </div>
        </div>
      </div>
    );
  }
}

Home.contextType = AppContext;
