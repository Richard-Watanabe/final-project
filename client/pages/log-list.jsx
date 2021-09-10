import React from 'react';

class LogList extends React.Component {

  render() {
    return (
  <div className="d-flex flex-column text-center justify-content-center list-base">
    <ul className="ul-base">
      {
        this.props.logs.map(log => {
          if (new Date().toDateString() === new Date(log.createdAt).toDateString()) {
            if (log.content === 'Meal') {
              return (
            <li key={log.logId} className="log">
              <i className="fas fa-drumstick-bite meal"/>
              <span className='margin-lr'>{log.content}:</span>
              {log.count}
            </li>
              );
            } else if (log.content === 'Snack') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-cookie-bite snack" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
               </li>
              );
            } else if (log.content === 'Walk') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-shoe-prints walk" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else if (log.content === 'Poo') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-poo poo" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else if (log.content === 'Puke') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-tired puke" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else if (log.content === 'Medicine') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-pills medicine" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else if (log.content === 'Wash') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-bath wash" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else if (log.content === 'Brush') {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-ruler-vertical brush" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            } else {
              return (
              <li key={log.logId} className="log">
                <i className="fas fa-dog custom-icon" />
                <span className='margin-lr'>{log.content}:</span>
                {log.count}
              </li>
              );
            }
          } else {
            return (
              <></>
            );
          }
        })
      }
    </ul>
  </div>
    );
  }
}

export default LogList;
