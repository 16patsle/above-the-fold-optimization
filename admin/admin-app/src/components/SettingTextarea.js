import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <h5 className="h">{this.props.title}</h5>
          <textarea
            style={this.props.style}
            className={this.props.textareaClass}
            name={this.props.name}
            value={this.props.link.value}
            onChange={e => this.props.link.set(e.target.value)}
            placeholder={this.props.placeholder}
            disabled={this.props.disabled}
          ></textarea>
          <p className="description">{this.props.description}</p>
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
