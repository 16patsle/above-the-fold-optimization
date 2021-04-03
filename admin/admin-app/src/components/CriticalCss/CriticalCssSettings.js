import React from 'react';
import { __ } from '@wordpress/i18n';
import { ExternalLink } from '@wordpress/components';
import useSettings, { useJSON } from '../../utils/useSettings';
import { adminUrl } from '../../utils/globalVars';
import { getJSON } from '../../utils/getSettings';
import LoadingWrapper from '../LoadingWrapper';
import Info from '../Info';
import SettingCheckbox from '../SettingCheckbox';
import SubmitButton from '../SubmitButton';
import CriticalCssEditor from './CriticalCssEditor';
import Loading from '../Loading';

const CriticalCssSettings = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();
  const {
    options: criticalCss,
    setOptions: setCriticalCss,
    shouldRender: shouldRenderCritical,
    error: criticalCssError
  } = useJSON(
    'criticalcss',
    () => {
      return getJSON('criticalcss');
    },
    'inlinecss',
    ''
  );

  return (
    <LoadingWrapper
      shouldRender={!(!shouldRender || !shouldRenderCritical)}
      error={error || criticalCssError}
    >
      {criticalCss !== '' ? (
        <CriticalCssEditor
          link={{ value: criticalCss, set: setCriticalCss }}
          title={__('Global', 'abtfr')}
          name="abtfr[css]"
          advancedEditor={getOption('csseditor')}
        >
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                name="abtfr[csseditor]"
                header={__('Use advanced CSS editor', 'abtfr')}
                link={linkOptionState('csseditor')}
                description={
                  <>
                    Use the{' '}
                    <ExternalLink href="https://microsoft.github.io/monaco-editor/">
                      Monaco editor
                    </ExternalLink>{' '}
                    with CSS error reporting.
                  </>
                }
              />
              <SettingCheckbox
                name="abtfr[http2_push_criticalcss]"
                header={__(
                  'Push Critical CSS using HTTP/2 Server Push',
                  'abtfr'
                )}
                link={linkOptionState('http2PushCriticalcss')}
                description={
                  <>
                    When enabled, the critical CSS is not inlined but instead
                    pushed together with the HTML (
                    <ExternalLink href="https://developers.google.com/web/fundamentals/performance/http2/#server_push">
                      documentation
                    </ExternalLink>
                    ).
                  </>
                }
              />
            </tbody>
          </table>
          {getOption('http2PushCriticalcss') && (
            <div style={{ marginTop: '1em' }}>
              <Info
                color="yellow"
                style={{
                  marginBottom: '1em'
                }}
              >
                <strong>Note:</strong> When using this feature, make sure that
                your server supports HTTP/2 Server Push. See the{' '}
                <a href={`${adminUrl}admin.php?page=abtfr#/http2`}>
                  HTTP/2-tab
                </a>{' '}
                for more information.
              </Info>
            </div>
          )}
          <hr />
          <SubmitButton />
          <div id="conditional">&nbsp;</div>
        </CriticalCssEditor>
      ) : (
        <Loading />
      )}
    </LoadingWrapper>
  );
};

export default CriticalCssSettings;
