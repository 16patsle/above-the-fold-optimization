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
        this.editor = null
        this.changeTimeout = null;
    }

    componentDidMount() {
		/**
     	 * JSON editor
     	 */
        //const htmlSearchReplaceSrc = this.htmlSearchReplaceSrc.current
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
                statusBar: false,
            };

            let json = [];

            // Set the editor content to the searchReplaceSrc sent from the server
            if (this.props.value !== '') {
                json = this.props.value;
                if (typeof json !== 'object') {
                    try {
                        json = JSON.parse(json);
                    } catch (e) {
                        json = [];
                    }
                }
                if (!json || typeof json !== 'object') {
                    json = [];
                }
            }
            this.editor = new JSONEditor(this.editorRef.current, options, json);

            this.editor.compact(); // collapseAll();

            // set editor reference
            //this.htmlSearchReplaceSrc.dataset.jsonEditor =this.editor
            //window.jQuery('#html_search_replace_src').data('json-editor',this.editor);
        }
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
            this.changeTimeout = setTimeout(function () {
                this.changeTimeout = false;
                const t = this.editor.getText();
                // If the editor is still empty
                // set it to empty array
                if (t.trim() === '') {
                    this.editor.set([]);
                    this.props.onValueChange('[]');
                }
            }, 25);

            return;
        }

        let json;

        try {
            json = this.editor.get();
        } catch (e) {

            return;
        }
        this.props.onValueChange(JSON.stringify(json));
    }

    onModeChange(newMode, oldMode) {
        const t = this.editor.getText();
        if (t.trim() === '') {
            // If the content is empty
            // set it to an empty arrray
            this.editor.set([]);
        }
        // expand nodes in tree mode
        if (newMode === 'tree') {
            this.editor.expandAll();
        }
    }

    render() {
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
