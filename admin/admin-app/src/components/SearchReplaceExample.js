import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
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

  render() {
    return (
      <span>
        <strong>Example:</strong>
        <code
          className="clickselect"
          title={this.props.title}
          style={{ cursor: 'copy' }}
        >
          {this.state.exampleHtml}
        </code>
        (
        <button
          type="button"
          className="button-link"
          onClick={this.handleClick}
        >
          {this.state.showLinkContent}
        </button>
        )
      </span>
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
