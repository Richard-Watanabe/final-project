import React from 'react';
import AppContext from '../lib/app-context';

export default class DogListBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedDogId: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    // console.log(event.target.textContent);
    const { token } = this.context;
    // console.log(this.props.dogs);
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
          .then(res => {
            res.json();
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
      <div className="d-flex flex-column text-center justify-content-center list-base dog-list-base">
        <ul className="ul-base overflow">
          {
            this.props.dogs.map(dog => {
              // console.log(dog);
              if (dog.dogName === null && dog.url === null) {
                return (
                  <li key={dog.dogId} className="log col-md-7 align-items-center align-self-end justify-content-around box-shadow">
                    <img className="dog-list-image" src={window.location.origin + '/images/placeholder.png'}/>
                    <a className='margin-lr dog-list-name' onClick={this.handleClick}>Name</a>
                  </li>
                );
              } else if (dog.dogName === null) {
                return (
                  <li key={dog.dogId} className="log col-md-7 align-items-center align-self-end justify-content-around box-shadow">
                    <img className="dog-list-image" src={dog.url} />
                    <a className='margin-lr dog-list-name' onClick={this.handleClick}>Name</a>
                  </li>
                );
              } else if (dog.url === null) {
                return (
                  <li key={dog.dogId} className="log col-md-7 align-items-center align-self-end justify-content-around box-shadow">
                    <img className="dog-list-image" src={window.location.origin + '/images/placeholder.png'} />
                    <a to="/home" className='margin-lr dog-list-name' onClick={this.handleClick}>{dog.dogName}</a>
                  </li>
                );
              }
              return (
              <li key={dog.dogId} className="log col-md-7 align-items-center align-self-end justify-content-around box-shadow">
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
