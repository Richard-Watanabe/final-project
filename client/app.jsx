import React from 'react';
import Category from './pages/category-list';

export default class App extends React.Component {

  render() {
    return (
    <div className="container">
      <div className="row">
        <Category />
      </div>
    </div>
    );
  }
}
