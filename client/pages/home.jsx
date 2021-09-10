import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {
    const date = new Date();
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="d-flex flex-column align-items-end inner-white">
          <Moment className="date" format="MM/DD/YYYY" trim>{date}</Moment>
          <Link to="/category" className="link-plus">
            <button className="btn btn-small btn-outline-success plus text-center">+</button>
          </Link>
          <LogList logs={this.props.logs}/>
        </div>
      </div>
    );
  }
}

export default Home;
