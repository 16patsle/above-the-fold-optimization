import React, { Component } from 'react';

class SettingSelect extends Component {
    render() {
        return (
            <tr valign="top">
                <th scope="row">{this.props.header || ' '}</th>
                <td>
                    <select style={this.props.style} className={this.props.textareaClass} name={this.props.name} value={this.props.link.value} onChange={e => this.props.link.set(e.target.value)}>
                        {this.props.options.map(option => {
                            return <option value={option.value} key={option.value}>{option.name}</option>
                        })}
                    </select>
                    <p className="description">
                        {this.props.description}
                    </p>
                </td>
            </tr>
        );
    }
}

export default SettingSelect;
