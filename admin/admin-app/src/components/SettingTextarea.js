import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextareaControl } from '@wordpress/components';
import checkPropLinkState from '../utils/checkPropLinkState';

class SettingTextarea extends Component {
  static defaultProps = {
    header: ' '
  };

  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header}</th>
        <td style={{ paddingTop: '0px' }}>
          <TextareaControl
            label={this.props.title}
            help={this.props.description}
            style={this.props.style}
            className={this.props.textareaClass}
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

SettingTextarea.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object,
  textareaClass: PropTypes.string,
  name: PropTypes.string,
  link: checkPropLinkState,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  description: PropTypes.node,
  children: PropTypes.node
};

export default SettingTextarea;
