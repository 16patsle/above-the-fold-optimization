import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { getOption } from '../utils/optionUtils';
import { linkOptionState } from '../utils/linkState';
import getValueOf from '../utils/getValueOf';
import { siteTitle, abtfAdminNonce } from '../utils/globalVars';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';

class SettingsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: JSON.parse(getValueOf('#settings_settings', 'object'))
    };

    this.clientHashes = JSON.parse(getValueOf('#client_hashes', 'object'));

    this.getOption = getOption.bind(this);
    this.linkOptionState = linkOptionState.bind(this);
  }

  render() {
    return (
      <form
        method="post"
        action={adminUrl + '?action=abtf_settings_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfAdminNonce }}></div>
        <PageContent header={__('Settings')}>
          <Helmet>
            <title>Above the Fold Optimization Settings {siteTitle}</title>
          </Helmet>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header="Admin Bar"
                name="abovethefold[adminbar]"
                label="Enabled"
                link={this.linkOptionState('adminbar')}
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
                name="abovethefold[clear_pagecache]"
                label="Enabled"
                link={this.linkOptionState('clearPageCache')}
                description={
                  <span>
                    If enabled, the page related caches of{' '}
                    <a
                      href="https://github.com/optimalisatie/above-the-fold-optimization/tree/master/trunk/modules/plugins/"
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
                name="abovethefold[debug]"
                label="Enabled"
                link={this.linkOptionState('debug')}
                description={
                  <span>
                    Show debug info in the browser console for logged in
                    admin-users.
                  </span>
                }
              ></SettingCheckbox>
            </tbody>
          </table>
          <hr />
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save')}
          </SubmitButton>
          &nbsp;
          <SubmitButton type={['large']} name="clear_pagecache">
            {__('Clear Page Caches')}
          </SubmitButton>
          <br />
          <br />
          <h1>Content Security Policy</h1>
          <p>
            Based on your current configuration, the Above The Fold Optimization
            inline client javascript can be white listed using the following
            hashes. (
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
          {this.clientHashes === 'false' ? (
            <h3 className="warning_red">
              Failed to retrieve hashes. You can find the hashes in the Dev
              Tools console in the Chrome browser.
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
                  {Object.entries(this.clientHashes).map(algorithm => {
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
                  {Object.entries(this.clientHashes).map(algorithm => {
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
  }
}

export default SettingsView;
