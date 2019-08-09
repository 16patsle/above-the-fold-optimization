import React, { Component } from 'react';

class SettingCheckbox extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header}</th>
                <td>
                    <label>
                        <input type="checkbox" name={this.props.name} value="1" checked={this.props.link.value} onChange={e => this.props.link.set(e.target.checked)} />
                        {this.props.label}
                    </label>
                    <p className="description">
                        {this.props.description}
                    </p>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default SettingCheckbox;
