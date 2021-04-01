import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioControl } from '@wordpress/components';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingRadio extends Component {
  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <RadioControl
            options={this.props.radios}
            name={this.props.name}
            selected={this.props.link.value}
            onChange={this.props.link.set}
          />
          {this.props.children}
        </td>
      </tr>
    );
  }
}

SettingRadio.propTypes = {
  header: PropTypes.string,
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
        .isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ).isRequired,
  name: PropTypes.string,
  link: checkPropLinkState,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingRadio;
