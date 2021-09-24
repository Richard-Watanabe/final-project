import React from 'react';
import AppContext from '../lib/app-context';
import { Link } from 'react-router-dom';

export default class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleOpen() {
    this.setState({
      isOpen: true
    });
  }

  handleClose(event) {
    if (event.target.className === 'overlay open' || event.target.className === 'drawer-items') {
      this.setState({
        isOpen: false
      });
    }
  }

  handleClick(event) {
    this.setState({
      isOpen: false
    });
  }

  render() {

    const { handleSignOut } = this.context;

    let drawerContent = null;
    let overlay = null;
    if (!this.state.isOpen) {
      drawerContent = 'drawer-content close';
      overlay = 'overlay close';
    } else {
      drawerContent = 'drawer-content open';
      overlay = 'overlay open';
    }
    return (
      <div>
        <i className="fas fa-bars bar" onClick={this.handleOpen}></i>
        <div className={overlay} onClick={this.handleClose}></div>
        <div className={drawerContent}>
          <div className="d-flex justify-content-start">
          <img src={window.location.origin + '/images/logo.png'} className="menu-doggo-logo" />
          </div>
          <ul onClick={this.handleClose} className="d-flex flex-column align-items-start">
            <a onClick={this.handleClick} className="menu-items">
              <i className="fas fa-home menu-icon"></i>
              Home</a>
            <Link to="/name" className="menu-items"><i className="fas fa-pencil-alt menu-icon"></i>
              Add/Change Name</Link>
            <Link to="/addPhoto" className="menu-items"><i className="fas fa-image menu-icon image-icon"></i>
              Add/Change Photo</Link>
            <Link to="/add-dog" className="menu-items"><i className="fas fa-dog menu-icon"></i>
              Add New Doggo</Link>
            <button className="menu-items menu-button" onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt menu-icon log-out-icon"></i>
              Log Out</button>
          </ul>
        </div>
      </div>
    );
  }
}

AppDrawer.contextType = AppContext;
