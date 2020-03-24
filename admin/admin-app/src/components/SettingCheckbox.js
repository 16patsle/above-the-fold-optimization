import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingCheckbox extends Component {
  static defaultProps = {
    label: __('Enabled', 'abtfr')
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <label>
            <input
              type="checkbox"
              name={this.props.name}
              value="1"
              checked={this.props.link.value}
              onChange={e => this.props.link.set(e.target.checked)}
            />
            {this.props.label}
          </label>
          <p className="description">{this.props.description}</p>
          {this.props.children}
        </td>
      </tr>
    );
  }
}

SettingCheckbox.propTypes = {
  header: PropTypes.string,
  name: PropTypes.string,
  link: checkPropLinkState,
  label: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingCheckbox;
