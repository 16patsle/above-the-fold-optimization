import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextControl } from '@wordpress/components';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingTextInput extends Component {
  static defaultProps = {
    header: ' ',
    type: 'text'
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td>
          <TextControl
            type={this.props.type}
            style={this.props.style}
            className={this.props.textareaClass}
            name={this.props.name}
            value={this.props.link.value}
            onChange={this.props.link.set}
            size={this.props.size}
            title={this.props.title}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
            pattern={this.props.pattern}
          />
          <p className="description">{this.props.description}</p>
          {this.props.children}
        </td>
      </tr>
    );
  }
}

SettingTextInput.propTypes = {
  header: PropTypes.string,
  type: PropTypes.oneOf(['text', 'url', 'email', 'password', 'search', 'tel']),
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  link: checkPropLinkState,
  size: PropTypes.number,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  pattern: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingTextInput;
