import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';

class SettingCheckbox extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header}</th>
                <td>
                    <label>
                        <input type="checkbox" name={this.props.name} value="1" defaultChecked={this.props.defaultChecked} />
                        {this.props.label}
                    </label>
                    <p className="description">
                        {this.props.description}
                    </p>
                </td>
            </tr>
        );
    }
}

export default SettingCheckbox;
