import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';

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
          <Button
            isLink
            onClick={() =>
              this.setState({ exampleShown: !this.state.exampleShown })
            }
          >
            {__('show example', 'abtfr')}
          </Button>
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

ApiExample.propTypes = {
  description: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default ApiExample;
