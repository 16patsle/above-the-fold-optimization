import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';

SyntaxHighlighter.registerLanguage('javascript', javascript);

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
        {this.state.exampleShown && (
          <SyntaxHighlighter
            className="example-code"
            language="javascript"
            style={vs}
          >
            {this.props.children}
          </SyntaxHighlighter>
        )}
      </>
    );
  }
}

ApiExample.propTypes = {
  description: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default ApiExample;
