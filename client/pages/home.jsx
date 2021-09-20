import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import AppDrawer from './app-drawer';
import NameForm from './name-form';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      imageUrl: '',
      dogName: ''
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
            imageUrl: data2[data2.length - 1].url
          })
          : this.setState({
            logs: data1,
            imageUrl: '/images/placeholder.png'
          });
        data3[0]
          ? this.setState({
            dogName: data3[0].dogName
          })
          : this.setState({
            dogName: ''
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/sign-in" />;
    const { dogName } = this.state;
    const date = new Date();
    if (!this.state.dogName) {
      return (
        <NameForm history={this.props.history}/>
      );
    }
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
          <div className="name d-flex justify-content-center col-md-5">
            <p className="">{dogName}</p>
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
