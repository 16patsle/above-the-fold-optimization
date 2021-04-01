import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

class SubmitButton extends Component {
  static defaultProps = {
    name: 'is_submit',
    children: __('Save', 'abtfr')
  };

  render() {
    return (
      <Button
        isPrimary={!this.props.isSecondary}
        isSecondary={this.props.isSecondary}
        isSmall={this.props.isSmall}
        type="submit"
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
  isSecondary: PropTypes.bool,
  isSmall: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string,
  attributes: PropTypes.object
};

export default SubmitButton;
