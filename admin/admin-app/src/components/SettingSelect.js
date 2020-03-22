import React, { Component } from 'react';

const optionRenderer = option => (
  <option value={option.value} key={option.value} disabled={option.disabled}>
    {option.name}
  </option>
);

class SettingSelect extends Component {
  render() {
    return (
      <tr valign="top">
        <th scope="row">{this.props.header || ' '}</th>
        <td>
          <select
            style={this.props.style}
            className={this.props.textareaClass}
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

export default SettingSelect;
