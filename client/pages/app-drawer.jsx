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
          <h2 className="menu">Menu</h2>
          <ul onClick={this.handleClose} className="d-flex flex-column">
            <a onClick={this.handleClick} className="menu-items">
              <i className="fas fa-home menu-icon"></i>
              Home</a>
            <Link to="/addPhoto" className="menu-items"><i className="fas fa-image menu-icon image-icon"></i>
              Add/Change Photo</Link>
            <a className="menu-items" onClick={handleSignOut}>
              <i className="fas fa-sign-out-alt menu-icon"></i>
              Log Out</a>
          </ul>
        </div>
      </div>
    );
  }
}

AppDrawer.contextType = AppContext;
