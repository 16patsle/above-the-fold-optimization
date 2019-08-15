import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { getOption } from '../utils/optionUtils';
import { linkOptionState } from '../utils/linkState';
import getValueOf from '../utils/getValueOf';
import {
  adminUrl,
  siteTitle,
  abtfAdminNonce,
  ajaxUrl,
  lgCode,
  wpAbtfUri
} from '../utils/globalVars';
import newlineArrayString from '../utils/newLineArrayString';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SettingTextInput from '../components/SettingTextInput';
import SubmitButton from '../components/SubmitButton';

class ProxyView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: JSON.parse(getValueOf('#proxy_settings', 'object')),
      cacheStats: {
        files: '',
        size: '',
        date: ''
      }
    };

    this.state.options.jsProxyInclude = newlineArrayString(
      this.state.options.jsProxyInclude
    );
    this.state.options.jsProxyExclude = newlineArrayString(
      this.state.options.jsProxyExclude
    );
    this.state.options.jsProxyPreload = newlineArrayString(
      this.state.options.jsProxyPreload
    );
    this.state.options.cssProxyInclude = newlineArrayString(
      this.state.options.cssProxyInclude
    );
    this.state.options.cssProxyExclude = newlineArrayString(
      this.state.options.cssProxyExclude
    );
    this.state.options.cssProxyPreload = newlineArrayString(
      this.state.options.cssProxyPreload
    );

    this.getOption = getOption.bind(this);
    this.linkOptionState = linkOptionState.bind(this);
  }

  componentDidMount() {
    this.updateCacheStats();
  }

  async updateCacheStats() {
    this.setState({ cacheStatsLoading: true });
    const cacheStats = await (await fetch(
      ajaxUrl + '?action=abtf_cache_stats'
    )).json();

    this.setState({ cacheStats, cacheStatsLoading: false });
  }

  render() {
    const emptyCacheUrl = new URL(adminUrl);
    emptyCacheUrl.searchParams.append('page', 'pagespeed-proxy');
    emptyCacheUrl.searchParams.append('empty_cache', 1);

    return (
      <form
        method="post"
        action={adminUrl + '?action=abtf_proxy_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfAdminNonce }}></div>
        <PageContent header={__('External Resource Proxy')}>
          <Helmet>
            <title>External Resource Proxy {siteTitle}</title>
          </Helmet>
          <div style={{ float: 'right', zIndex: 9000, position: 'relative' }}>
            <img
              src={wpAbtfUri + 'admin/images/browsercache-error.png'}
              alt="Google Bot"
              width={225}
              title="Leverage browser caching"
            />
          </div>
          <p>
            The external resource proxy loads external resources such as scripts
            and stylesheets via a caching proxy.
          </p>
          <p>
            This feature enables to pass the{' '}
            <a
              href={`https://developers.google.com/speed/docs/insights/LeverageBrowserCaching?hl=${lgCode}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leverage browser caching
            </a>{' '}
            rule from Google PageSpeed Insights.
          </p>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header="Proxy Scripts"
                name="abovethefold[js_proxy]"
                link={this.linkOptionState('jsProxy')}
                label="Enabled"
                description="Capture external scripts and load the scripts through a caching proxy."
              ></SettingCheckbox>
              {this.getOption('jsProxy') ? (
                <tr valign="top" className="proxyjsoptions">
                  <td colSpan="2" style={{ paddingTop: '0px' }}>
                    <div className="abtf-inner-table">
                      <h3 className="h">
                        <span>Script Proxy Settings</span>
                      </h3>
                      <div className="inside">
                        <table className="form-table">
                          <tbody>
                            <SettingTextarea
                              header="Proxy Include List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[js_proxy_include]"
                              link={this.linkOptionState('jsProxyInclude')}
                              placeholder="Leave blank to proxy all external scripts..."
                              description={
                                <span>
                                  Enter (parts of) external javascript files to
                                  proxy, e.g.{' '}
                                  <code>google-analytics.com/analytics.js</code>{' '}
                                  or <code>facebook.net/en_US/sdk.js</code>. One
                                  script per line.
                                </span>
                              }
                            ></SettingTextarea>
                            <SettingTextarea
                              header="Proxy Exclude List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[js_proxy_exclude]"
                              link={this.linkOptionState('jsProxyExclude')}
                              description={
                                <span>
                                  Enter (parts of) external javascript files to
                                  exclude from the proxy. One script per line.
                                </span>
                              }
                            ></SettingTextarea>
                            <SettingTextarea
                              header="Proxy Preload List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[js_proxy_preload]"
                              link={this.linkOptionState('jsProxyPreload')}
                              description={
                                <span>
                                  Enter the exact url or JSON config object [
                                  <a
                                    href="#jsoncnf"
                                    onClick={function(e) {
                                      e.preventDefault();
                                      document
                                        .querySelector('#jsoncnf')
                                        .scrollIntoView();
                                    }}
                                    title="More information"
                                  >
                                    ?
                                  </a>
                                  ] of external scripts to preload for "script
                                  injected" async script capture, e.g.{' '}
                                  <code>
                                    https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
                                  </code>
                                  . This setting will enable the proxy to load
                                  the cache url instead of the WordPress PHP
                                  proxy url. One url or JSON object per line.
                                </span>
                              }
                            ></SettingTextarea>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              <SettingCheckbox
                header="Proxy Stylesheets"
                name="abovethefold[css_proxy]"
                link={this.linkOptionState('cssProxy')}
                label="Enabled"
                description="Capture external stylesheets and load the files through a caching proxy."
              ></SettingCheckbox>
              {this.getOption('cssProxy') ? (
                <tr valign="top" className="proxycssoptions">
                  <td colSpan="2" style={{ paddingTop: '0px' }}>
                    <div className="abtf-inner-table">
                      <h3 className="h">
                        <span>Stylesheet Proxy Settings</span>
                      </h3>
                      <div className="inside">
                        <table className="form-table">
                          <tbody>
                            <SettingTextarea
                              header="Proxy Include List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[css_proxy_include]"
                              link={this.linkOptionState('cssProxyInclude')}
                              placeholder="Leave blank to proxy all external stylesheets..."
                              description={
                                <span>
                                  Enter (parts of) external stylesheets to
                                  proxy, e.g.{' '}
                                  <code>googleapis.com/jquery-ui.css</code>. One
                                  stylesheet per line.
                                </span>
                              }
                            ></SettingTextarea>
                            <SettingTextarea
                              header="Proxy Exclude List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[css_proxy_exclude]"
                              link={this.linkOptionState('cssProxyExclude')}
                              description={
                                <span>
                                  Enter (parts of) external stylesheets to
                                  exclude from the proxy. One stylesheet per
                                  line.
                                </span>
                              }
                            ></SettingTextarea>
                            <SettingTextarea
                              header="Proxy Preload List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abovethefold[css_proxy_preload]"
                              link={this.linkOptionState('cssProxyPreload')}
                              description={
                                <span>
                                  Enter the exact url or JSON config object of
                                  external stylesheets to preload for "script
                                  injected" async stylesheet capture, e.g.{' '}
                                  <code>
                                    http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css
                                  </code>
                                  . This setting will enable the proxy to load
                                  the cache url instead of the WordPress PHP
                                  proxy url. One url or JSON object per line.
                                </span>
                              }
                            ></SettingTextarea>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : null}
              <tr valign="top">
                <th scope="row">&nbsp;</th>
                <td style={{ paddingTop: 0 }} id="jsoncnf">
                  <fieldset
                    style={{
                      border: 'solid 1px #efefef',
                      padding: 10,
                      margin: 0,
                      marginTop: 7,
                      background: '#f1f1f1'
                    }}
                  >
                    <h4 style={{ margin: 0, padding: 0, marginBottom: 5 }}>
                      JSON Proxy Config Object
                    </h4>
                    <p className="description" style={{ marginTop: 0 }}>
                      JSON config objects enable advanced file based proxy
                      configuration. JSON objects can be used together with
                      simple file entry and must be placed on one line (no
                      spaces are allowed).
                    </p>
                    <p className="description">
                      JSON config objects must contain a target url (the url
                      that will be downloaded by the proxy). Regular expression
                      enables to match a source URL in the HTML, e.g. an URL
                      with a cache busting date string (?time) or an url on a
                      different host. Valid parameters are <code>url</code>,{' '}
                      <code>regex</code>, <code>regex-flags</code>,{' '}
                      <code>cdn</code> and <code>expire</code> (expire time in
                      seconds).
                    </p>
                    <p
                      className="description"
                      style={{ marginBottom: 0, marginTop: 5 }}
                    >
                      Example:
                      <br />
                      <code>
                        {'{'}"regex":
                        "^https://app\\.analytics\\.com/file\\.js\\?\\d+$",
                        "regex-flags":"i", "url":
                        "https://app.analytics.com/file.js", "expire": "2592000"
                        {'}'}
                      </code>
                    </p>
                  </fieldset>
                </td>
              </tr>
              <SettingTextInput
                header="Proxy CDN"
                type="url"
                style={{ width: '100%' }}
                name="abovethefold[proxy_cdn]"
                link={this.linkOptionState('proxyCDN')}
                placeholder="Leave blank for the default WordPress (plugin modified) upload directory url..."
                description={
                  <span>
                    Enter the default CDN url for cached resources, e.g.{' '}
                    <code>
                      <strong>https://cdn.domain.com</strong>
                      /wp-content/uploads/abovethefold/proxy/.../resource.js
                    </code>
                    . You can set a custom CDN per individual resource using a
                    JSON config object.
                  </span>
                }
              ></SettingTextInput>
              <SettingTextInput
                header="Proxy URL"
                type="url"
                style={{ width: '100%' }}
                name="abovethefold[proxy_url]"
                link={this.linkOptionState('proxyURL')}
                placeholder="Leave blank for the default WordPress PHP based proxy url..."
                description={
                  <span>
                    Enter a custom proxy url to serve captured external
                    resources. There are 2 parameters that can be used in the
                    url:{' '}
                    <code>
                      {'{'}PROXY:URL{'}'}
                    </code>{' '}
                    and{' '}
                    <code>
                      {'{'}PROXY:TYPE{'}'}
                    </code>
                    .
                  </span>
                }
              >
                <p className="description">
                  E.g.:{' '}
                  <code>
                    https://nginx-proxy.mydomain.com/{'{'}PROXY:TYPE{'}'}/{'{'}
                    PROXY:URL{'}'}
                  </code>
                  . Type is the string <u>js</u> or <u>css</u>.
                </p>
              </SettingTextInput>
            </tbody>
          </table>
          <hr />
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save')}
          </SubmitButton>
          <br />
          <br />
          <h3 style={{ margin: 0, padding: 0 }} id="stats">
            Cache Stats
          </h3>
          <table
            style={
              this.state.cacheStatsLoading === true ? { opacity: 0.7 } : {}
            }
          >
            <tbody>
              <tr>
                <td
                  align="right"
                  width={70}
                  style={{ textAlign: 'right', fontSize: 14 }}
                >
                  Files:
                </td>
                <td style={{ fontSize: 14 }}>{this.state.cacheStats.files}</td>
              </tr>
              <tr>
                <td
                  align="right"
                  width={70}
                  style={{ textAlign: 'right', fontSize: 14 }}
                >
                  Size:
                </td>
                <td style={{ fontSize: 14 }}>{this.state.cacheStats.size}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} style={{ padding: 0, margin: 0, fontSize: 11 }}>
                  <p style={{ padding: 0, margin: 0, fontSize: 11 }}>
                    Stats last updated:{' '}
                    {new Date(this.state.cacheStats.date).toLocaleString()}
                  </p>
                  <hr />
                  <button
                    type="button"
                    onClick={this.updateCacheStats.bind(this)}
                    className="button button-small"
                  >
                    Refresh Stats
                  </button>
                  <a
                    href={emptyCacheUrl}
                    onClick={function(e) {
                      if (
                        !window.confirm(
                          'Are you sure you want to empty the cache directory?',
                          true
                        )
                      ) {
                        return e.preventDefault();
                      }
                    }}
                    className="button button-small"
                  >
                    Empty Cache
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </PageContent>
      </form>
    );
  }
}

export default ProxyView;
