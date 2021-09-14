import React from 'react';
import Category from './pages/category-list';
import Home from './pages/home';
import PhotoForm from './pages/photo-form';
import AuthPage from './pages/auth';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.pathname)
    };
  }

  componentDidMount() {
    window.addEventListener('popstate', () => {
      this.setState({
        route: parseRoute(window.location.pathname)
      });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };
    return (
    <div className="container outer-orange">
      <div className="row">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/addPhoto" component={PhotoForm} />
            <AppContext.Provider value={contextValue}>
                <Route path={['/sign-up', '/sign-in']} component={AuthPage}/>
            </AppContext.Provider>
          </Switch>
        </Router>
      </div>
    </div>
    );
  }
}
