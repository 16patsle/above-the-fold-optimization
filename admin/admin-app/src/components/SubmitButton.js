import React, { Component } from 'react';

class SubmitButton extends Component {
  render() {
    let className = `button`;
    const types = this.props.type || ['primary'];
    types.forEach(type => {
      className += ` button-${type}`;
    });

    return (
      <input
        type="submit"
        name={this.props.name || 'submit'}
        id={this.props.id || this.props.name || 'submit'}
        className={className}
        value={this.props.children || 'Save Changes'}
        {...this.props.attributes}
      />
    );
  }
}

export default SubmitButton;
