import React from 'react';
import Category from './pages/category-list';
import Home from './pages/home';
import PhotoForm from './pages/photo-form';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, handleSignIn, handleSignOut };
    return (
    <div className="container outer-orange">
      <div className="row">
        <Router>
          <Switch>
            <Route exact path="/category" component={Category} />
            <Route exact path="/addPhoto" component={PhotoForm} />
            <AppContext.Provider value={contextValue}>
                <Route exact path="/" component={Home} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/sign-in" component={SignIn} />
            </AppContext.Provider>
          </Switch>
        </Router>
      </div>
    </div>
    );
  }
}

App.contextType = AppContext;
