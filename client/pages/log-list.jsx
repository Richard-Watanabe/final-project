import React from 'react';
import LogItemIcon from './log-item-icon';

class LogList extends React.Component {

  render() {
    return (
  <div className="d-flex flex-column text-center justify-content-center list-base">
    <ul className="ul-base">
      {
        this.props.logs.map(log => {
          if (new Date().toDateString() === new Date(log.createdAt).toDateString()) {
            return (
            <li key={log.logId} className="log">
              <LogItemIcon content={log.content} />
              <span className='margin-lr'>{log.content}:</span>
              {log.count}
            </li>
            );
          }
          return <span key={log.logId}></span>;
        }
        )
      }
    </ul>
  </div>
    );
  }
}

export default LogList;
