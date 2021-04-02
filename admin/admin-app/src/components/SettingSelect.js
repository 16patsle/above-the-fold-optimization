import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectControl } from '@wordpress/components';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingSelect extends Component {
  static defaultProps = {
    header: ' '
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <SelectControl
            help={this.props.description}
            style={this.props.style}
            className={this.props.className}
            name={this.props.name}
            value={this.props.link.value}
            onChange={this.props.link.set}
            options={this.props.options}
          />
          {this.props.children}
        </td>
      </tr>
    );
  }
}

SettingSelect.propTypes = {
  header: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  link: checkPropLinkState,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      }),
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
              .isRequired
          })
        )
      })
    ])
  ).isRequired,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingSelect;
