import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { lgCode, utmString } from '../../utils/globalVars';
import CssEditor from '../CssEditor';
import sizeFormat from '../../utils/sizeFormat';
import byteCount from '../../utils/byteCount';
import './CriticalCssSettings.css';

const CriticalCssEditor = props => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [showEditor, setShowEditor] = useState(true);

  return (
    <li
      className={
        'menu-item menu-item-depth-0 menu-item-page pending ' +
        (editorLoaded ? 'menu-item-edit-active' : 'menu-item-edit-inactive')
      }
      style={{ display: 'list-item', position: 'relative', top: '0px' }}
    >
      <div
        className="menu-item-bar criticalcss-edit-header"
        onClick={e => {
          e.preventDefault();
          setShowEditor(!showEditor);
        }}
      >
        <div
          className="menu-item-handle"
          style={{ width: 'auto', cursor: 'pointer' }}
        >
          <span className="item-title" title={props.itemTitle}>
            <span className="menu-item-title">{props.title}</span>
            <span className="is-submenu">
              {props.link.value.trim() !== '' ? (
                <span>{sizeFormat(byteCount(props.link.value), 2)}</span>
              ) : (
                <span style={{ color: '#f1b70a' }}>{__('empty', 'abtfr')}</span>
              )}
              {props.config && (
                <span style={{ float: 'right' }}>
                  {__('Weight:', 'abtfr')}{' '}
                  {props.config.weight !== undefined ? props.config.weight : 1}
                </span>
              )}
            </span>
          </span>
          {!editorLoaded && (
            <span className="is-submenu loading-editor">
              <span style={{ color: '#ea4335' }}>Loading editor...</span>
            </span>
          )}
          <span className="item-controls">
            {props.config && (
              <button
                type="button"
                className="item-delete button button-small button-del"
                title="Delete conditional Critical CSS"
                data-confirm="<?php echo htmlentities(__('Are you sure you want to delete this conditional Critical CSS?', 'abtfr'), ENT_COMPAT, 'utf-8'); ?>"
              >
                ✗
              </button>
            )}
            <button type="button" className="item-edit">
              ^
            </button>
          </span>
        </div>
      </div>

      <div
        id={`ccss_editor_${props.title.toLowerCase()}`}
        className={'ccss_editor ' + props.className}
        style={showEditor ? {} : { display: 'none' }}
      >
        {props.advancedEditor ? (
          <>
            <CssEditor
              link={props.link}
              editorDidMount={() => {
                setEditorLoaded(true);
              }}
            />
            <input type="hidden" name={props.name} value={props.link.value} />
          </>
        ) : (
          <textarea
            className="abtfrcss"
            name={props.name}
            value={props.link.value}
            onChange={e => props.link.set(e.target.value)}
          />
        )}
        <div className="criticalcss-buttons">
          <a
            href={`https://www.google.com/search?q=beautify+css+online&hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary button-small"
          >
            Beautify
          </a>
          <a
            href={`https://www.google.com/search?q=minify+css+online&hl=${lgCode}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary button-small"
          >
            Minify
          </a>
          <a
            href="https://jigsaw.w3.org/css-validator/#validate_by_input+with_options"
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary button-small"
          >
            Validate
          </a>
          <a
            href={`http://csslint.net/#${utmString}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary button-small"
          >
            CSS
            <span
              style={{
                color: '#768c1c',
                fontWeight: 'bold',
                marginLeft: '1px'
              }}
            >
              LINT
            </span>
          </a>
        </div>
        <div
          style={{
            clear: 'both',
            height: '1px',
            overflow: 'hidden',
            fontSize: '1px'
          }}
        >
          &nbsp;
        </div>
        <ul className="menu-item-transport" />
        {props.children}
      </div>
    </li>
  );
};

export default CriticalCssEditor;
