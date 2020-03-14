import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../../utils/useLinkState';
import {
  homeUrl,
  adminUrl,
  lgCode,
  utmString,
  wpAbtfrUri
} from '../../utils/globalVars';
import Info from '../Info';
import SettingCheckbox from '../SettingCheckbox';
import SubmitButton from '../SubmitButton';
import getSettings, { getJSON } from '../../utils/getSettings';

const CriticalCssSettings = () => {
  const [options, setOption, setOptions, linkOptionState] = useLinkState();

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);
  const { data: criticalCssData, error: criticalCssError } = useSWR(
    'criticalcss',
    () => {
      return getJSON('criticalcss');
    }
  );

  if (error || criticalCssError) {
    return (
      <div>
        {sprintf(__('Error: %s', 'abtfr'), error ? error : criticalCssError)}
      </div>
    );
  }

  const loading = <div>{__('Loading...', 'abtfr')}</div>;

  if (!data || !criticalCssData) {
    return loading;
  }

  if (!options) {
    setOptions(data);
    return loading;
  }

  return (
    <li
      className="menu-item menu-item-depth-0 menu-item-page pending menu-item-edit-inactive"
      style={{ display: 'list-item', position: 'relative', top: '0px' }}
    >
      <div className="menu-item-bar criticalcss-edit-header" rel="global">
        <div
          className="menu-item-handle"
          style={{ width: 'auto!important', cursor: 'pointer' }}
        >
          <span className="item-title">
            <span className="menu-item-title">{__('Global', 'abtfr')}</span>
            <span className="is-submenu">
              {criticalCssData.inlinecss.trim() !== '' ? (
                <span>{criticalCssData.inlinecssSize}</span>
              ) : (
                <span style={{ color: '#f1b70a' }}>{__('empty', 'abtfr')}</span>
              )}
            </span>
          </span>
          <span
            className="is-submenu loading-editor"
            style={{ display: 'none' }}
          >
            <span style={{ color: '#ea4335' }}>Loading editor...</span>
          </span>
          <span className="item-controls">
            <a className="item-edit" href="javascript:void(0);">
              ^
            </a>
          </span>
        </div>
      </div>

      <div id="ccss_editor_global" className="ccss_editor">
        <textarea
          className="abtfrcss"
          id="abtfrcss"
          name="abtfr[css]"
          value={criticalCssData.inlinecss}
          data-advanced={getOption('csseditor') ? 1 : null}
        />
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
        <table className="form-table">
          <tbody>
            <SettingCheckbox
              name="abtfr[csseditor]"
              header={__('Use a CSS editor with error reporting', 'abtfr')}
              link={linkOptionState('csseditor')}
              label={__('Enabled', 'abtfr')}
              description={
                <>
                  Use a CSS editor with error reporting (
                  <a
                    href={`http://csslint.net/#${utmString}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CSS Lint
                  </a>{' '}
                  using{' '}
                  <a
                    href={`https://codemirror.net/#${utmString}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    CodeMirror
                  </a>
                  ).
                </>
              }
            />
            <SettingCheckbox
              name="abtfr[http2_push_criticalcss]"
              header={__('Push Critical CSS using HTTP/2 Server Push', 'abtfr')}
              link={linkOptionState('http2PushCriticalcss')}
              label={__('Enabled', 'abtfr')}
              description={
                <>
                  When enabled, the critical CSS is not inlined but instead
                  pushed together with the HTML (
                  <a
                    href="https://developers.google.com/web/fundamentals/performance/http2/#server_push"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    documentation
                  </a>
                  ).
                </>
              }
            />
          </tbody>
        </table>
        <div style={{ marginTop: '1em' }}>
          {getOption('http2PushCriticalcss') && (
            <Info
              color="yellow"
              style={{
                marginBottom: '1em'
              }}
            >
              <strong>Note:</strong> When using this feature, make sure that
              your server supports HTTP/2 Server Push. See the{' '}
              <a href={`${adminUrl}admin.php?page=abtfr#/http2`}>HTTP/2-tab</a>{' '}
              for more information.
            </Info>
          )}
        </div>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save', 'abtfr')}
        </SubmitButton>
        <a name="conditional">&nbsp;</a>
      </div>
    </li>
  );
};

export default CriticalCssSettings;
