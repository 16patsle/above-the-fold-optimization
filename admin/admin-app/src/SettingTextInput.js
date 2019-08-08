import React, { Component } from 'react';

class SettingTextInput extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header || ' '}</th>
                <td>
                    <input type={this.props.type || 'text'} style={this.props.style} className={this.props.textareaClass} name={this.props.name} defaultValue={this.props.defaultValue} onChange={this.props.onChange} placeholder={this.props.placeholder} disabled={this.props.disabled} />
                    <p className="description">
                        {this.props.description}
                    </p>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default SettingTextInput;
