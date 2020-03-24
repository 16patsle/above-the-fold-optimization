import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Info.css';

class Info extends Component {
  static defaultProps = {
    color: 'yellow'
  };

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

Info.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default Info;
