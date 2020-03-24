import React, { Component } from 'react';
import PropTypes from 'prop-types';
import checkPropLinkState from '../utils/checkPropLinkState';

const optionRenderer = option => (
  <option value={option.value} key={option.value} disabled={option.disabled}>
    {option.name}
  </option>
);

class SettingSelect extends Component {
  static defaultProps = {
    header: ' '
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <select
            style={this.props.style}
            className={this.props.className}
            name={this.props.name}
            value={this.props.link.value}
            onChange={e => this.props.link.set(e.target.value)}
          >
            {this.props.options.map(option => {
              if (option.options) {
                // Option is an optgroup
                return (
                  <optgroup key={option.name} label={option.name}>
                    {option.options.map(optionRenderer)}
                  </optgroup>
                );
              }

              return optionRenderer(option);
            })}
          </select>
          <p className="description">{this.props.description}</p>
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
