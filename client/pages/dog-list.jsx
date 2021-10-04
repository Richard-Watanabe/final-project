import React from 'react';
import AppContext from '../lib/app-context';
import { Redirect, Link } from 'react-router-dom';

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
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
