import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import { adminUrl, siteTitle, abtfrAdminNonce } from '../utils/globalVars';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';
import getSettings from '../utils/getSettings';

const SettingsView = () => {
  const [options, setOption, setOptions, linkOptionState] = useLinkState();

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const loading = <div>Loading...</div>;

  if (!data) {
    return loading;
  }

  if (!options) {
    setOptions(data);
    return loading;
  }

  return (
    <form
      method="post"
      action={adminUrl + 'admin-post.php?action=abtfr_settings_update'}
      className="clearfix"
    >
      <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
      <PageContent header={__('Settings', 'abtfr')}>
        <Helmet>
          <title>ABTF Reborn Settings {siteTitle}</title>
        </Helmet>
        <table className="form-table">
          <tbody>
            <SettingCheckbox
              header="Admin Bar"
              name="abtfr[adminbar]"
              label="Enabled"
              link={linkOptionState('adminbar')}
              description={
                <span>
                  Show a <code>PageSpeed</code> menu in the top admin bar with
                  links to website speed and security tests such as Google
                  PageSpeed Insights.
                </span>
              }
            ></SettingCheckbox>
            <SettingCheckbox
              header="Clear Page Caches"
              name="abtfr[clear_pagecache]"
              label="Enabled"
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
            ></SettingCheckbox>
            <SettingCheckbox
              header="Debug Mode"
              name="abtfr[debug]"
              label="Enabled"
              link={linkOptionState('debug')}
              description={
                <span>
                  Show debug info in the browser console for logged in
                  admin-users.
                </span>
              }
            ></SettingCheckbox>
            {getOption('abtfOptionsExists') && (
              <tr valign="top">
                <th scope="row">Import Settings</th>
                <td>
                  <SubmitButton type={['large']} name="import_settings_abtf">
                    {__('Import settings from ABTF', 'abtfr')}
                  </SubmitButton>
                  <p className="description">
                    Migrate settings from the plugin Above the Fold
                    Optimization. This will overwrite all existing settings for
                    this plugin with the ones from ABTF and afterwards delete
                    the old settings.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save', 'abtfr')}
        </SubmitButton>
        &nbsp;
        <SubmitButton type={['large']} name="clear_pagecache">
          {__('Clear Page Caches', 'abtfr')}
        </SubmitButton>
        <br />
        <br />
        <h1>Content Security Policy</h1>
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
            Failed to retrieve hashes. You can find the hashes in the Dev Tools
            console in the Chrome browser.
          </h3>
        ) : (
          <span>
            <strong>Public client</strong>
            <table width="100%">
              <thead>
                <tr>
                  <td width="100" style={{ textAlign: 'center' }}>
                    Algorithm
                  </td>
                  <td>Hash</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(getOption('clientHashes')).map(algorithm => {
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
            <strong>Debug mode client (admin users only)</strong>
            <table width="100%">
              <thead>
                <tr>
                  <td width="100" style={{ textAlign: 'center' }}>
                    Algorithm
                  </td>
                  <td>Hash</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(getOption('clientHashes')).map(algorithm => {
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
  );
};

export default SettingsView;
