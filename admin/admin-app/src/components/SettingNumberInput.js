import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <input
            type="number"
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            style={this.props.style}
            className={this.props.className}
            name={this.props.name}
            value={this.props.link.value}
            onChange={e => this.props.link.set(Number(e.target.value))}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
          />
          <p className="description">{this.props.description}</p>
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
