import React, { Component } from 'react';

class SettingTextarea extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header || ' '}</th>
                <td style={{ paddingTop: "0px" }}>
                    <h5 className="h">{this.props.title}</h5>
                    <textarea style={this.props.style} className={this.props.textareaClass} name={this.props.name} value={this.props.link.value} onChange={e => this.props.link.set(e.target.value)} placeholder={this.props.placeholder} disabled={this.props.disabled}></textarea>
                    <p className="description">
                        {this.props.description}
                    </p>
                    {this.props.children}
                </td>
            </tr>
        );
    }
}

export default SettingTextarea;