import React from 'react';
import Category from './pages/category-list';
import Home from './pages/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
    <div className="container outer-orange">
      <div className="row">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/category" component={Category} />
          </Switch>
        </Router>
      </div>
    </div>
    );
  }
}
