import React, { Component } from 'react';

class ApiExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      exampleShown: false
    };
  }
  render() {
    return (
      <>
        <p className="description">
          {this.props.description} (
          <button
            className="button-link"
            type="button"
            onClick={() =>
              this.setState({ exampleShown: !this.state.exampleShown })
            }
          >
            show example
          </button>
          ).
        </p>
        <pre
          style={{
            display: this.state.exampleShown ? 'block' : 'none',
            padding: 10,
            border: 'solid 1px #efefef'
          }}
        >
          {this.props.children}
        </pre>
      </>
    );
  }
}

export default ApiExample;
