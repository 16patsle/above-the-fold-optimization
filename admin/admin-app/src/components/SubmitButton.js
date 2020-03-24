import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import Button from './Button';

class SubmitButton extends Component {
  static defaultProps = {
    type: ['primary', 'large'],
    name: 'is_submit',
    children: __('Save', 'abtfr')
  };

  render() {
    return (
      <Button
        type={this.props.type}
        buttonType="submit"
        element="input"
        name={this.props.name}
        id={this.props.id || this.props.name}
        className={this.props.className}
        {...this.props.attributes}
      >
        {this.props.children}
      </Button>
    );
  }
}

SubmitButton.propTypes = {
  type: PropTypes.arrayOf(PropTypes.oneOf(['primary', 'small', 'large'])),
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  attributes: PropTypes.object
};

export default SubmitButton;
