import React from 'react';
import Category from './pages/category-list';
import Home from './pages/home';
import PhotoForm from './pages/photo-form';
import AuthPage from './pages/auth';
import parseRoute from './lib/parse-route';
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
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'sign-in' || path === 'sign-up') {
      return <AuthPage />;
    }
  }

  render() {
    const { route } = this.state;
    return (
    <div className="container outer-orange">
      <div className="row">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/addPhoto" component={PhotoForm} />
            <Route exact path="/sign-up" component={AuthPage} route={route} />
            {this.renderPage()}
          </Switch>
        </Router>
      </div>
    </div>
    );
  }
}
