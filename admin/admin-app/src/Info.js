import React, { Component } from 'react';

class Info extends Component {
    render() {
        return (
            <div className={'info_' + this.props.color} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }
}

export default Info;
