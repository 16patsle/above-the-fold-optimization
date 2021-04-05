import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import checkPropLinkState from '../../utils/checkPropLinkState';
import { utmString } from '../../utils/globalVars';
import LazyCssEditor from '../LazyCssEditor';
import sizeFormat from '../../utils/sizeFormat';
import byteCount from '../../utils/byteCount';
import cssWorker from '../../utils/tools/cssWorker';
import './CriticalCssEditor.css';

const CriticalCssEditor = props => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [showEditor, setShowEditor] = useState(true);

  const [isFormatting, setFormatting] = useState(false);
  const [isMinifying, setMinifying] = useState(false);

  const formatCode = async () => {
    setFormatting(true);
    props.link.set(await cssWorker(props.link.value, 'format'));
    setFormatting(false);
  };

  const minifyCode = async () => {
    setMinifying(true);
    props.link.set(await cssWorker(props.link.value, 'minify'));
    setMinifying(false);
  };

  return (
    <li
      className={
        'menu-item menu-item-depth-0 menu-item-page pending ' +
        (editorLoaded || !props.advancedEditor
          ? 'menu-item-edit-active'
          : 'menu-item-edit-inactive')
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
          style={{ maxWidth: 'unset', cursor: 'pointer' }}
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
          {!editorLoaded && props.advancedEditor && (
            <span className="is-submenu loading-editor">
              <span style={{ color: '#ea4335' }}>
                {__('Loading editor...', 'abtfr')}
              </span>
            </span>
          )}
          <span className="item-controls">
            {props.config && (
              <Button
                isSmall
                isDestructive
                className="item-delete"
                title={__('Delete conditional Critical CSS', 'abtfr')}
                onClick={props.onDeleteClick}
              >
                ✗
              </Button>
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
            <LazyCssEditor
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
          <Button
            isSecondary
            isSmall
            onClick={formatCode}
            isBusy={isFormatting}
          >
            {__('Format', 'abtfr')}
          </Button>
          <Button isSecondary isSmall onClick={minifyCode} isBusy={isMinifying}>
            {__('Minify', 'abtfr')}
          </Button>
          <Button
            isSecondary
            isSmall
            href="https://jigsaw.w3.org/css-validator/#validate_by_input+with_options"
            target="_blank"
            rel="noopener noreferrer"
          >
            {__('Validate', 'abtfr')}
          </Button>
          <Button
            isSecondary
            isSmall
            href={`http://csslint.net/#${utmString}`}
            target="_blank"
            rel="noopener noreferrer"
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
          </Button>
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

CriticalCssEditor.propTypes = {
  itemTitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  link: checkPropLinkState,
  config: PropTypes.shape({
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }),
  onDeleteClick: PropTypes.func,
  className: PropTypes.string,
  advancedEditor: PropTypes.bool,
  children: PropTypes.node
};

export default CriticalCssEditor;
