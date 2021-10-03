import React from 'react';
import AppContext from '../lib/app-context';

export default class DogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: []
    };
  }

  render() {
    return <h1></h1>;
  }
}

DogList.contextType = AppContext;
