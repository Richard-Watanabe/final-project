import React from 'react';
import LogItemIcon from './log-item-icon';

export default class LogList extends React.Component {

  render() {
    return (
      <div className="d-flex flex-column text-center justify-content-center list-base">
        <ul className="ul-base">
          {
            this.props.logs.map(log => {
              const time = new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              if (new Date().toDateString() === new Date(log.createdAt).toDateString()) {
                return (
              <li key={log.logId} className="log col-md-7 align-self-end box-shadow">
                <LogItemIcon content={log.content} />
                <span className='margin-lr'>{log.content}:</span>
                {time}
              </li>
                );
              }
              return <span className="d-none" key={log.logId}></span>;
            })
          }
        </ul>
      </div>
    );
  }
}
