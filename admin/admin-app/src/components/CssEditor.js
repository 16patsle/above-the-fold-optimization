import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

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

export default CssEditor;
