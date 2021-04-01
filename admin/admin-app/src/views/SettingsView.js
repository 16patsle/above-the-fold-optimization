import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSettings from '../utils/useSettings';
import { adminUrl, siteTitle, abtfrAdminNonce } from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';

const SettingsView = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_settings_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Settings', 'abtfr')}>
          <Helmet>
            <title>
              {__('ABTF Reborn Settings', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('Admin Bar', 'abtfr')}
                name="abtfr[adminbar]"
                link={linkOptionState('adminbar')}
                description={
                  <span>
                    Show a <code>PageSpeed</code> menu in the top admin bar with
                    links to website speed and security tests such as Google
                    PageSpeed Insights.
                  </span>
                }
              />
              <SettingCheckbox
                header={__('Clear Page Caches', 'abtfr')}
                name="abtfr[clear_pagecache]"
                link={linkOptionState('clearPagecache')}
                description={
                  <span>
                    If enabled, the page related caches of{' '}
                    <a
                      href="https://github.com/16patsle/abtf-reborn/tree/master/modules/plugins/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      supported plugins
                    </a>{' '}
                    is cleared when updating the above the fold settings.
                  </span>
                }
              />
              <SettingCheckbox
                header={__('Debug Mode', 'abtfr')}
                name="abtfr[debug]"
                link={linkOptionState('debug')}
                description={__(
                  'Show debug info in the browser console for logged in admin-users.',
                  'abtfr'
                )}
              />
              {getOption('abtfOptionsExists') && (
                <tr valign="top">
                  <th scope="row">Import Settings</th>
                  <td>
                    <SubmitButton name="import_settings_abtf">
                      {__('Import settings from ABTF', 'abtfr')}
                    </SubmitButton>
                    <p className="description">
                      {__(
                        'Migrate settings from the plugin Above the Fold Optimization. This will overwrite all existing settings for this plugin with the ones from ABTF and afterwards delete the old settings.',
                        'abtfr'
                      )}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <hr />
          <SubmitButton />
          &nbsp;
          <SubmitButton name="clear_pagecache">
            {__('Clear Page Caches', 'abtfr')}
          </SubmitButton>
          <br />
          <br />
          <h1>{__('Content Security Policy', 'abtfr')}</h1>
          <p>
            Based on your current configuration, the ABTF Reborn inline client
            javascript can be white listed using the following hashes. (
            <a
              href="https://content-security-policy.com/faq/"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation
            </a>
            )
          </p>
          <p className="warning_red">
            <strong>Important:</strong> when you change the configuration of the
            plugin the hashes may change.
          </p>
          {getOption('clientHashes') === 'false' ? (
            <h3 className="warning_red">
              {__(
                'Failed to retrieve hashes. You can find the hashes in the Dev Tools console in the Chrome browser.',
                'abtfr'
              )}
            </h3>
          ) : (
            <span>
              <strong>{__('Public client', 'abtfr')}</strong>
              <table width="100%">
                <thead>
                  <tr>
                    <td width="100" style={{ textAlign: 'center' }}>
                      {__('Algorithm', 'abtfr')}
                    </td>
                    <td>{__('Hash', 'abtfr')}</td>
                  </tr>
                </thead>
                <tbody>
                  {getOption('clientHashes') &&
                    Object.entries(getOption('clientHashes')).map(algorithm => {
                      return (
                        <tr key={algorithm[0]}>
                          <td
                            style={{
                              fontWeight: 'bold',
                              textAlign: 'right',
                              paddingRight: '5px'
                            }}
                          >
                            {algorithm[0].toUpperCase()}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={algorithm[0] + '-' + algorithm[1].public}
                              style={{ width: '100%' }}
                              readOnly
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <strong>
                {__('Debug mode client (admin users only)', 'abtfr')}
              </strong>
              <table width="100%">
                <thead>
                  <tr>
                    <td width="100" style={{ textAlign: 'center' }}>
                      {__('Algorithm', 'abtfr')}
                    </td>
                    <td>{__('Hash', 'abtfr')}</td>
                  </tr>
                </thead>
                <tbody>
                  {getOption('clientHashes') &&
                    Object.entries(getOption('clientHashes')).map(algorithm => {
                      return (
                        <tr key={algorithm[0]}>
                          <td
                            style={{
                              fontWeight: 'bold',
                              textAlign: 'right',
                              paddingRight: '5px'
                            }}
                          >
                            {algorithm[0].toUpperCase()}
                          </td>
                          <td>
                            <input
                              type="text"
                              value={algorithm[0] + '-' + algorithm[1].debug}
                              style={{ width: '100%' }}
                              readOnly
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </span>
          )}
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default SettingsView;
