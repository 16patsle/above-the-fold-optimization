import React, { Component } from 'react';

class SettingInnerTable extends Component {
  render() {
    return (
      <tr
        valign="top"
        className={this.props.className}
        style={this.props.style}
      >
        <td colSpan="2" style={{ paddingTop: '0px' }}>
          <div className="abtf-inner-table">
            <h3 className="h">
              <span>{this.props.header}</span>
            </h3>
            <div className="inside">
              <table className="form-table">
                <tbody>{this.props.children}</tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default SettingInnerTable;
