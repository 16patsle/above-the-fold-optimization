import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

class Button extends Component {
  static defaultProps = {
    type: ['primary'],
    buttonType: 'button',
    element: 'button',
    className: ''
  };

  render() {
    const classes = [
      'button',
      ...this.props.type.map(type => `button-${type}`),
      this.props.className
    ];
    const className = classes.join(' ').trim();

    if (this.props.element === 'button') {
      return (
        <button
          type={this.props.buttonType}
          name={this.props.name}
          id={this.props.id}
          className={className}
          {...this.props.attributes}
        >
          {this.props.children}
        </button>
      );
    } else if (this.props.element === 'input') {
      return (
        <input
          type={this.props.buttonType}
          name={this.props.name}
          id={this.props.id}
          className={className}
          value={this.props.children}
          {...this.props.attributes}
        />
      );
    } else if (this.props.element === 'a') {
      return (
        <a id={this.props.id} className={className} {...this.props.attributes}>
          {this.props.children}
        </a>
      );
    }
  }
}

Button.propTypes = {
  type: PropTypes.arrayOf(
    PropTypes.oneOf(['primary', 'secondary', 'small', 'large'])
  ),
  buttonType: PropTypes.oneOf(['button', 'submit', 'reset']),
  element: PropTypes.oneOf(['button', 'input', 'a']),
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  attributes: PropTypes.object
};

export default Button;
