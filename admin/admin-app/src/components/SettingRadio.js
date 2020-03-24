import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingRadio extends Component {
  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          {this.props.radios.map(radio => {
            return (
              <span key={radio.value}>
                <label>
                  <input
                    type="radio"
                    name={this.props.name}
                    value={radio.value}
                    checked={this.props.link.value === radio.value}
                    onChange={e => this.props.link.set(e.target.value)}
                  />
                  {radio.label}
                </label>
                <p className="description">{radio.description}</p>
              </span>
            );
          })}
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
