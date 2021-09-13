import React from 'react';
import { Link } from 'react-router-dom';

export default class PhotoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        data[data.length - 1]
          ? this.setState({
            imageUrl: data[data.length - 1].url
          })
          : this.setState({
            imageUrl: '/images/placeholder.png'
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const FormDataObj = new FormData(event.target);
    fetch('/api/photos', {
      method: 'POST',
      body: FormDataObj
    })
      .then(res => res.json())
      .then(data => {
        event.target.reset();
      })
      .catch(err => console.error('Error:', err))
      .finally(() => {
        this.props.history.push('/');
      });
  }

  handleChange(event) {
    this.setState({
      imageUrl: URL.createObjectURL(event.target.files[0])
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center full-screen">
        <form onSubmit={this.handleSubmit}>
          <div className="inner-white">
            <Link to="/" className="go-back d-inline-block">&lt; Back to logs</Link>
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
          </div>
        </form>
      </div>
    );
  }
}
