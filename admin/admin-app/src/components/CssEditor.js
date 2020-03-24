import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MonacoEditor from 'react-monaco-editor';
import checkPropLinkState from '../utils/checkPropLinkState';

class CssEditor extends Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
  }

  onChange(newValue) {
    this.props.link.set(newValue);
  }

  render() {
    return (
      <MonacoEditor
        ref={this.editorRef}
        height="150px"
        language="css"
        value={this.props.link.value}
        options={{
          wordWrap: 'on'
        }}
        onChange={this.onChange.bind(this)}
        editorDidMount={this.props.editorDidMount}
      />
    );
  }
}

CssEditor.propTypes = {
  link: checkPropLinkState,
  editorDidMount: PropTypes.func
};

export default CssEditor;
