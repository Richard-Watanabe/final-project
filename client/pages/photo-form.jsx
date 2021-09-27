import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import AppContext from '../lib/app-context';
import connectionAlert from './connection-alert';

export default class PhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { token } = this.context;
    fetch('/api/photos', {
      method: 'GET',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        data[data.length - 1]
          ? this.setState({
            imageUrl: data[data.length - 1].url,
            isLoading: false
          })
          : this.setState({
            imageUrl: '/images/placeholder.png',
            isLoading: false
          });
      })
      .catch(err => {
        console.error(err);
        connectionAlert();
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const { token } = this.context;
    const FormDataObj = new FormData(event.target);
    fetch('/api/photos', {
      method: 'POST',
      body: FormDataObj,
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => {
        res.json();
        this.setState({
          isLoading: false
        });
      })
      .catch(err => console.error('Error:', err))
      .finally(() => {
        this.props.history.push('/home');
        event.target.reset();
      });
  }

  handleChange(event) {
    this.setState({
      imageUrl: URL.createObjectURL(event.target.files[0]),
      isLoading: false
    });
  }

  getloaderClass() {
    if (this.state.isLoading === true) return 'lds-heart';
    return 'lds-heart hide';
  }

  render() {
    const loaderClass = this.getloaderClass();
    const { user } = this.context;
    if (!user) return <Redirect to="/" />;
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <form onSubmit={this.handleSubmit}>
          <div className="inner-white">
            <Link to="/home" className="go-back d-inline-block">&lt; Back to logs</Link>
            <h2 className="photo-header text-center">Add/Change Photo</h2>
            <div className="d-flex justify-content-center">
              <img src={this.state.imageUrl} className="change-image"></img>
            </div>
            <div className="d-flex justify-content-around">
              <label htmlFor="file-upload" className="custom-file-upload box-shadow">
                Choose File</label>
              <input id="file-upload" className="d-none" type="file" name="image" onChange={this.handleChange}/>
              <button type="submit" className="btn btn-primary save-button box-shadow">Save</button>
            </div>
            <div className="justify-content-center align-items-center d-flex">
              <div className={`${loaderClass} photo-heart`}><div></div></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

PhotoForm.contextType = AppContext;
