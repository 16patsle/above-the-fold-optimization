import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import './JsonEditor.css';
import JsonEditorIconFix from './JsonEditorIconFix';

class JsonEditor extends Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
    this.editor = null;
    this.changeTimeout = null;
  }

  componentDidMount() {
    /**
     * JSON editor
     */
    if (this.editorRef.current) {
      this.editorRef.current.innerHTML = '';

      const options = {
        name: this.props.name,
        mode: 'code',
        modes: ['code', 'tree'], // allowed modes
        onError: this.onError.bind(this),
        onChange: this.onChange.bind(this),
        onModeChange: this.onModeChange.bind(this),
        search: false,
        schema: this.props.schema,
        navigationBar: false,
        statusBar: false
      };

      let json = this.props.objectType === 'object' ? {} : [];

      // Set the editor content to the searchReplaceSrc sent from the server
      if (this.props.value !== '') {
        json = this.props.value;
        if (typeof json !== 'object') {
          try {
            json = JSON.parse(json);
          } catch (e) {
            json = this.props.objectType === 'object' ? {} : [];
          }
        }
        if (!json || typeof json !== 'object') {
          json = this.props.objectType === 'object' ? {} : [];
        }
      }

      let empty = false;
      if (this.props.objectType === 'object') {
        if (json instanceof Array && json.length === 0) {
          json = {};
        }

        if (JSON.stringify(json) === '{}') {
          empty = true;
          options.mode = 'code';
        }
      }

      this.editor = new JSONEditor(this.editorRef.current, options, json);

      if (this.props.objectType === 'object') {
        if (options.mode === 'code') {
          if (!empty) {
            this.editor.editor.setOptions({
              maxLines: 50
            });
          }
        }
      } else {
        this.editor.compact(); // collapseAll();
      }

      // When in code mode (using ace editor), save on blur
      this.editor.aceEditor.on('blur', this.saveJSON.bind(this));
    }
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  onError(err) {
    // Log the error
    console.error('JSON', err.toString());
    alert('JSON error. Please verify your input.\n\nSee console for details.');
  }

  onChange() {
    const t = this.editor.getText();

    // If the content is empty
    if (t.trim() === '') {
      if (this.changeTimeout) {
        clearTimeout(this.changeTimeout);
      }
      // wait for copy paste action
      this.changeTimeout = setTimeout(() => {
        this.changeTimeout = false;
        const t = this.editor.getText();
        // If the editor is still empty
        // set it to empty array/object
        if (t.trim() === '') {
          this.editor.set(this.props.objectType === 'object' ? {} : []);
          //this.editor.aceEditor.moveCursorToPosition({row:1, column:2});
          this.saveJSON(this.props.objectType === 'object' ? {} : []);
        }
      }, 25);

      return;
    }

    // Only save if not in code mode.
    // Code mode is saved on blur event to not move the cursor.
    if (this.editor.getMode() !== 'code') {
      this.saveJSON();
    }
  }

  onModeChange(newMode, oldMode) {
    const t = this.editor.getText();
    if (t.trim() === '') {
      // If the content is empty
      // set it to an empty arrray
      this.editor.set(this.props.objectType === 'object' ? {} : []);
    }
    // expand nodes in tree mode
    if (newMode === 'tree') {
      this.editor.expandAll();
    }
  }

  saveJSON() {
    let json;

    try {
      json = this.editor.get();
    } catch (e) {
      return;
    }
    this.props.link.set(json);
  }

  render() {
    if (this.editor) {
      this.editor.update(this.props.link.value);
    }

    return (
      <span>
        <JsonEditorIconFix />
        <div ref={this.editorRef}>
          <div className="loading-json-editor">
            {__('Loading JSON editor...')}
          </div>
        </div>
      </span>
    );
  }
}

export default JsonEditor;
