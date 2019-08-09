import React, { Component } from 'react';

class SettingNumberInput extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header || ' '}</th>
                <td>
                    <input type="number" min={this.props.min} max={this.props.max} step={this.props.step} style={this.props.style} className={this.props.textareaClass} name={this.props.name} value={this.props.link.value} onChange={e => this.props.link.set(Number(e.target.value))} placeholder={this.props.placeholder} disabled={this.props.disabled} />
                    <p className="description">
                        {this.props.description}
                    </p>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default SettingNumberInput;
