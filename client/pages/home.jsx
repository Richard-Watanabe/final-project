import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import AppDrawer from './app-drawer';
import { Link } from 'react-router-dom';
// import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      imageUrl: ''
    };
  }

  componentDidMount() {
    Promise.all([fetch('/api/logs'), fetch('/api/photos')])
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

export default Home;

Home.contextType = AppContext;
