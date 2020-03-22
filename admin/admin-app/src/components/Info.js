import React, { Component } from 'react';
import './Info.css';

class Info extends Component {
  render() {
    let color = 'info_' + this.props.color;
    if (this.props.color === 'red') {
      color = 'warning_red';
    } else if (this.props.color === 'green') {
      color = 'ok_green';
    }

    return (
      <div className={color} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

export default Info;
