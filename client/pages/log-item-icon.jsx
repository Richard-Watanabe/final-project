import React from 'react';

class LogItemIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.content
    };
  }

  render() {
    return (
      this.state.content === 'Meal'
        ? <i className="fas fa-drumstick-bite meal"></i>
        : this.state.content === 'Snack'
          ? <i className="fas fa-cookie-bite snack"></i>
          : this.state.content === 'Walk'
            ? <i className="fas fa-shoe-prints walk"></i>
            : this.state.content === 'Poo'
              ? <i className="fas fa-poo poo"></i>
              : this.state.content === 'Puke'
                ? <i className="fas fa-tired puke"></i>
                : this.state.content === 'Medicine'
                  ? <i className="fas fa-pills medicine"></i>
                  : this.state.content === 'Wash'
                    ? <i className="fas fa-bath wash"></i>
                    : this.state.content === 'Brush'
                      ? <i className="fas fa-ruler-vertical brush"></i>
                      : <i className='fas fa-dog custom-icon'></i>
    );
  }
}

export default LogItemIcon;
