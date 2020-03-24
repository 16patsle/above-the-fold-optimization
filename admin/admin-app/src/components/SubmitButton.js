import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

class SubmitButton extends Component {
  static defaultProps = {
    type: ['primary'],
    name: 'submit',
    children: __('Save Changes', 'abtfr')
  };

  render() {
    let className = `button`;
    const types = this.props.type;
    types.forEach(type => {
      className += ` button-${type}`;
    });

    return (
      <input
        type="submit"
        name={this.props.name}
        id={this.props.id || this.props.name}
        className={className}
        value={this.props.children}
        {...this.props.attributes}
      />
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
