import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import useSettings from '../utils/useSettings';
import {
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  ajaxUrl,
  lgCode,
  wpAbtfrUri
} from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SettingTextInput from '../components/SettingTextInput';
import SubmitButton from '../components/SubmitButton';

const emptyCacheUrl = new URL(adminUrl + 'admin.php');
emptyCacheUrl.searchParams.append('page', 'abtfr-proxy');
emptyCacheUrl.searchParams.append('empty_cache', 1);

const ProxyView = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();

  const {
    data: cacheStats,
    error: cacheStatsError,
    revalidate: updateCacheStats
  } = useSWR(
    ajaxUrl + '?action=abtfr_cache_stats',
    async url => await (await fetch(url)).json()
  );

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_proxy_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('External Resource Proxy', 'abtfr')}>
          <Helmet>
            <title>
              {__('External Resource Proxy', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <div style={{ float: 'right', zIndex: 9000, position: 'relative' }}>
            <img
              src={wpAbtfrUri + 'admin/images/browsercache-error.png'}
              alt="Google Bot"
              width={225}
              title="Leverage browser caching"
            />
          </div>
          <p>
            {__(
              'The external resource proxy loads external resources such as scripts and stylesheets via a caching proxy.',
              'abtfr'
            )}
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
                name="abtfr[js_proxy]"
                link={linkOptionState('jsProxy')}
                label={__('Enabled', 'abtfr')}
                description={__(
                  'Capture external scripts and load the scripts through a caching proxy.',
                  'abtfr'
                )}
              ></SettingCheckbox>
              {getOption('jsProxy') ? (
                <tr valign="top" className="proxyjsoptions">
                  <td colSpan="2" style={{ paddingTop: '0px' }}>
                    <div className="abtfr-inner-table">
                      <h3 className="h">
                        <span>{__('Script Proxy Settings', 'abtfr')}</span>
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
                              name="abtfr[js_proxy_include]"
                              link={linkOptionState('jsProxyInclude')}
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
                              name="abtfr[js_proxy_exclude]"
                              link={linkOptionState('jsProxyExclude')}
                              description={__(
                                'Enter (parts of) external javascript files to exclude from the proxy. One script per line.'
                              )}
                            ></SettingTextarea>
                            <SettingTextarea
                              header="Proxy Preload List"
                              style={{
                                width: '100%',
                                height: 50,
                                fontSize: 11
                              }}
                              name="abtfr[js_proxy_preload]"
                              link={linkOptionState('jsProxyPreload')}
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
                name="abtfr[css_proxy]"
                link={linkOptionState('cssProxy')}
                label={__('Enabled', 'abtfr')}
                description={__(
                  'Capture external stylesheets and load the files through a caching proxy.',
                  'abtfr'
                )}
              ></SettingCheckbox>
              {getOption('cssProxy') ? (
                <tr valign="top" className="proxycssoptions">
                  <td colSpan="2" style={{ paddingTop: '0px' }}>
                    <div className="abtfr-inner-table">
                      <h3 className="h">
                        <span>{__('Stylesheet Proxy Settings', 'abtfr')}</span>
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
                              name="abtfr[css_proxy_include]"
                              link={linkOptionState('cssProxyInclude')}
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
                              name="abtfr[css_proxy_exclude]"
                              link={linkOptionState('cssProxyExclude')}
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
                              name="abtfr[css_proxy_preload]"
                              link={linkOptionState('cssProxyPreload')}
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
                name="abtfr[proxy_cdn]"
                link={linkOptionState('proxyCdn')}
                placeholder="Leave blank for the default WordPress (plugin modified) upload directory url..."
                description={
                  <span>
                    Enter the default CDN url for cached resources, e.g.{' '}
                    <code>
                      <strong>https://cdn.domain.com</strong>
                      /wp-content/uploads/abtfr/proxy/.../resource.js
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
                name="abtfr[proxy_url]"
                link={linkOptionState('proxyUrl')}
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
            {__('Save', 'abtfr')}
          </SubmitButton>
          <br />
          <br />
          <h3 style={{ margin: 0, padding: 0 }} id="stats">
            Cache Stats
          </h3>
          {cacheStatsError && <div>Error: {cacheStatsError}</div>}
          {!cacheStats && !cacheStatsError ? (
            <div>Loading...</div>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td
                    align="right"
                    width={70}
                    style={{ textAlign: 'right', fontSize: 14 }}
                  >
                    Files:
                  </td>
                  <td style={{ fontSize: 14 }}>{cacheStats.files}</td>
                </tr>
                <tr>
                  <td
                    align="right"
                    width={70}
                    style={{ textAlign: 'right', fontSize: 14 }}
                  >
                    Size:
                  </td>
                  <td style={{ fontSize: 14 }}>{cacheStats.size}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={2}
                    style={{ padding: 0, margin: 0, fontSize: 11 }}
                  >
                    <p style={{ padding: 0, margin: 0, fontSize: 11 }}>
                      Stats last updated:{' '}
                      {new Date(cacheStats.date).toLocaleString()}
                    </p>
                    <hr />
                    <button
                      type="button"
                      onClick={updateCacheStats}
                      className="button button-small"
                    >
                      Refresh Stats
                    </button>
                    <a
                      href={emptyCacheUrl}
                      onClick={function(e) {
                        if (
                          !window.confirm(
                            'Are you sure you want to empty the cache directory?'
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
          )}
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default ProxyView;
