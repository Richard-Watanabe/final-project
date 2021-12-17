import React from 'react';
import Category from './pages/category-list';
import Home from './pages/home';
import PhotoForm from './pages/photo-form';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import decodeToken from './lib/decode-token';
import AppContext from './lib/app-context';
import NameForm from './pages/name-form';
import DogForm from './pages/dog-form';
import DogList from './pages/dog-list';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      token: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('react-context-jwt');
    this.setState({
      token: token
    });
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
    const history = createBrowserHistory();
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_CODE);
    ReactGA.set({ page: history.location.pathname });
    ReactGA.pageview(history.location.pathname);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user, token });
  }

  handleSignOut() {
    window.localStorage.removeItem('react-context-jwt');
    this.setState({ user: null });
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, token } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, token, handleSignIn, handleSignOut };
    return (
    <div className="container outer-orange">
      <div className="row">
        <Router>
          <Switch>
            <AppContext.Provider value={contextValue}>
              <Route exact path="/category" component={Category} />
              <Route exact path="/addPhoto" component={PhotoForm} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/" component={SignIn} />
              <Route exact path="/name" component={NameForm} />
              <Route exact path="/add-dog" component={DogForm} />
              <Route exact path="/dog-list" component={DogList} />
            </AppContext.Provider>
          </Switch>
        </Router>
      </div>
    </div>
    );
  }
}

App.contextType = AppContext;

export default App;
