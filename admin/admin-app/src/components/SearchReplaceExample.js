import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import './SearchReplaceExample.css';

SyntaxHighlighter.registerLanguage('json', json);

class SearchReplaceExample extends Component {
  static defaultProps = {
    showString: __('show string', 'abtfr'),
    showRegex: __('show regular expression', 'abtfr')
  };

  constructor(props) {
    super(props);

    this.showString = this.props.showString;
    this.showRegex = this.props.showRegex;

    this.state = {
      showLinkContent: this.showRegex,
      exampleHtml: this.props.children.string
    };

    this.selectElement = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.handleClickSelect = this.handleClickSelect.bind(this);
  }

  handleClick() {
    if (typeof this.state.exampleHtml !== 'string') {
      this.setState({ exampleHtml: JSON.stringify(this.state.exampleHtml) });
    }

    if (this.state.exampleHtml === this.props.children.string) {
      this.setState({ exampleHtml: this.props.children.regex });
    } else {
      this.setState({ exampleHtml: this.props.children.string });
    }

    if (this.state.showLinkContent === this.showRegex) {
      this.setState({ showLinkContent: this.showString });
    } else {
      this.setState({ showLinkContent: this.showRegex });
    }
  }

  handleClickSelect() {
    const selection = window.getSelection();

    if (selection.rangeCount > 0) {
      selection.removeAllRanges();
    }

    const range = document.createRange();
    range.selectNode(this.selectElement.current.querySelector('code'));
    selection.addRange(range);
  }

  render() {
    return (
      <div className="searchreplaceexample" ref={this.selectElement}>
        <strong>{__('Example:', 'abtfr')}</strong>
        <SyntaxHighlighter
          title={this.props.title}
          language="json"
          style={vs}
          customStyle={{
            display: 'inline',
            padding: 0,
            background: 'none',
            cursor: 'copy'
          }}
          onClick={this.handleClickSelect}
        >
          {this.state.exampleHtml}
        </SyntaxHighlighter>
        (
        <Button isLink onClick={this.handleClick}>
          {this.state.showLinkContent}
        </Button>
        )
      </div>
    );
  }
}

SearchReplaceExample.propTypes = {
  showString: PropTypes.string,
  showRegex: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.shape({
    string: PropTypes.string,
    regex: PropTypes.string
  }).isRequired
};

export default SearchReplaceExample;
