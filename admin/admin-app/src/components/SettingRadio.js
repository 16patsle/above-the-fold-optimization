import React, { Component } from 'react';

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

export default SettingRadio;
