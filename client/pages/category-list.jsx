import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';

const allCategories = [
  {
    id: '1',
    name: 'Meal',
    class: 'fas fa-drumstick-bite meal'
  },
  {
    id: '2',
    name: 'Snack',
    class: 'fas fa-cookie-bite snack'
  },
  {
    id: '3',
    name: 'Walk',
    class: 'fas fa-shoe-prints walk'
  },
  {
    id: '4',
    name: 'Poo',
    class: 'fas fa-poo poo'
  },
  {
    id: '5',
    name: 'Puke',
    class: 'fas fa-tired puke'
  },
  {
    id: '6',
    name: 'Medicine',
    class: 'fas fa-pills medicine'
  },
  {
    id: '7',
    name: 'Wash',
    class: 'fas fa-bath wash'
  },
  {
    id: '8',
    name: 'Brush',
    class: 'fas fa-ruler-vertical brush'
  },
  {
    id: '9',
    name: 'Custom',
    class: 'fas fa-dog custom'
  }
];

export default class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenCategory: '',
      logs: []
    };
    this.addLog = this.addLog.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addLog(event) {
    event.preventDefault();
    const clickedCategory = event.target.getAttribute('clicked');
    const { token } = this.context;
    this.setState({
      chosenCategory: clickedCategory
    });
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      },
      body: JSON.stringify({
        content: clickedCategory
      })
    })
      .then(res => res.json())
      .then(data => {
        const newArray = this.state.logs.concat(data);
        this.setState({
          logs: newArray,
          chosenCategory: ''
        });
      })
      .catch(err => {
        console.error(err);
        connectionAlert();
      })
      .finally(() => {
        this.props.history.push('/');
      });
  }

  handleChange(event) {
    this.setState({
      chosenCategory: event.target.value
    });
  }

  render() {
    const { user } = this.context;
    if (!user) return <Redirect to="/sign-in" />;
    const value = this.state.chosenCategory;
    const CategoryList = allCategories.map(category => {
      if (category.name === 'Custom') {
        return (
          <li key={category.id} className="col-10 d-flex justify-content-around align-items-center text-center category box-shadow">
            <i className={`${category.class} col-1`}></i>
            <div className="col-5 d-flex">
              <input value={value} onChange={this.handleChange} className='form-control input-custom' placeholder="Custom"></input>
            </div>
            <button type="button" clicked={this.state.chosenCategory} onClick={this.addLog} className="btn btn-sm btn-success col-3 col-md-2 margin-left btn-polish box-shadow">ADD</button>
          </li>
        );
      }
      return (
        <li key={category.id} className="d-flex justify-content-around align-items-center text-center col-md-5 col-10 category box-shadow">
          <i className={`${category.class} col-1 text-shadow`}></i>
          <span className='col-5 text-center category-name'>{category.name}</span>
          <button type="button" clicked={category.name} onClick={this.addLog} className="btn btn-sm btn-success col-3 btn-polish box-shadow">ADD</button>
        </li>
      );
    });
    return (
    <div>
      <Link to="/" className="go-back d-inline-block">&lt; Back to logs</Link>
      <ul className="container d-flex flex-wrap justify-content-center py-5 full-screen">{CategoryList}</ul>
    </div>
    );
  }
}

Category.contextType = AppContext;
