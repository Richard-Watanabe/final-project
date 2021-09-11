import React from 'react';
import Moment from 'react-moment';
import LogList from './log-list';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: []
    };
  }

  componentDidMount() {
    fetch('/api/logs')
      .then(res => res.json())
      .then(data => {
        this.setState({
          logs: data
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const date = new Date();
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <div className="d-flex flex-column align-items-end inner-white">
          <Moment className="date" format="MM/DD/YYYY" trim>{date}</Moment>
          <Link to="/category" className="link-plus btn btn-small btn-outline-success"><span className="plus">+</span></Link>
          <LogList logs={this.state.logs}/>
        </div>
      </div>
    );
  }
}

export default Home;
