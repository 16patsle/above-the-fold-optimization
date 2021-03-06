import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextControl } from '@wordpress/components';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingNumberInput extends Component {
  static defaultProps = {
    header: ' '
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <TextControl
            help={this.props.description}
            type="number"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            style={this.props.style}
            className={this.props.className}
            name={this.props.name}
            value={this.props.link.value}
            onChange={this.props.link.set}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
          />
          {this.props.children}
        </td>
      </tr>
    );
  }
}

SettingNumberInput.propTypes = {
  header: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  link: checkPropLinkState,
  placeholder: PropTypes.number,
  disabled: PropTypes.bool,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingNumberInput;
