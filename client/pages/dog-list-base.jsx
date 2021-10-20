import React from 'react';
import AppContext from '../lib/app-context';

export default class DogListBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedDogId: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      clickedDogId: this.context.user.dogId
    });
  }

  handleClick(event) {
    const { token } = this.context;
    for (let i = 0; i < this.props.dogs.length; i++) {
      if (event.target.textContent === this.props.dogs[i].dogName) {
        fetch('/api/switch-dog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': token
          },
          body: JSON.stringify({
            clickedDogId: this.props.dogs[i].dogId
          })
        })
          .catch(err => {
            console.error(err);
          });
        this.props.history.push('/home');
      }
    }
  }

  render() {
    return (
      <div className="text-center dog-list-base">
        <ul className="ul-base-dog col-12">
          {
            this.props.dogs.map(dog => {
              if (dog.dogName === null && dog.url === null) {
                return (
                  <li key={dog.dogId} className="log dog align-items-center col-md-6 justify-content-between box-shadow">
                    <img className="dog-list-image" src={window.location.origin + '/images/placeholder.png'}/>
                    <a className='margin-lr dog-list-name' onClick={this.handleClick}>Name</a>
                  </li>
                );
              } else if (dog.dogName === null) {
                return (
                  <li key={dog.dogId} className="log dog align-items-center col-md-6 justify-content-between box-shadow">
                    <img className="dog-list-image" src={dog.url} />
                    <a className='margin-lr dog-list-name' onClick={this.handleClick}>Name</a>
                  </li>
                );
              } else if (dog.url === null) {
                return (
                  <li key={dog.dogId} className="log dog col-md-6 align-items-center justify-content-between box-shadow">
                    <img className="dog-list-image" src={window.location.origin + '/images/placeholder.png'} />
                    <a to="/home" className='margin-lr dog-list-name' onClick={this.handleClick}>{dog.dogName}</a>
                  </li>
                );
              }
              return (
              <li key={dog.dogId} className="log  dog col-md-6 align-items-center justify-content-between box-shadow">
                  <img className="dog-list-image" src={dog.url}/>
                  <a className='margin-lr dog-list-name' onClick={this.handleClick}>{dog.dogName}</a>
              </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

DogListBase.contextType = AppContext;
