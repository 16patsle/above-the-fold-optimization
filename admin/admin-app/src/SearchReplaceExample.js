import React, { Component } from 'react';

class SearchReplaceExample extends Component {
    constructor(props) {
        super(props)

        this.showString = this.props.showString || 'show string'
        this.showRegex = this.props.showRegex || 'show regular expression'

        this.state = {
            showLinkContent: this.showRegex,
            exampleHtml: this.props.children.string
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (typeof this.state.exampleHtml !== 'string') {
            this.setState({ exampleHtml: JSON.stringify(this.state.exampleHtml) });
        }

        if (this.state.exampleHtml === this.props.children.string) {
            this.setState({ exampleHtml: this.props.children.regex })
        } else {
            this.setState({ exampleHtml: this.props.children.string })
        }

        if (this.state.showLinkContent === this.showRegex) {
            this.setState({ showLinkContent: this.showString })
        } else {
            this.setState({ showLinkContent: this.showRegex })
        }
    }

    render() {
        return (
            <span>
                <strong>Example:</strong>
                <code className="clickselect" title={this.props.title} style={{ cursor: "copy" }}>
                    {this.state.exampleHtml}
                </code>
                (<a href="javascript:void(0);" onClick={this.handleClick}>
                    {this.state.showLinkContent}
                </a>)
            </span>
        );
    }
}

export default SearchReplaceExample;
