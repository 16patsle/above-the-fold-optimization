import React from 'react';
import { Helmet } from 'react-helmet';
import { __, sprintf } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { Button, ExternalLink } from '@wordpress/components';
import useSWR from 'swr';
import useSettings from '../utils/useSettings';
import { getJSON } from '../utils/getSettings';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfrAdminNonce,
  abtfrRestNonce,
  lgCode,
  wpAbtfrUri
} from '../utils/globalVars';
import LoadingWrapper from '../components/LoadingWrapper';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SettingTextInput from '../components/SettingTextInput';
import SubmitButton from '../components/SubmitButton';
import SettingInnerTable from '../components/SettingInnerTable';
import scrollToElement from '../utils/scrollToElement';
import Loading from '../components/Loading';

const ProxyView = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();

  const {
    data: cacheStats,
    error: cacheStatsError,
    revalidate: updateCacheStats
  } = useSWR('proxycache', async query => await getJSON(query));

  const handleEmptyCache = async () => {
    if (
      window.confirm(
        __(
          'Are you sure you want to empty the cache directory?',
          'abtfr'
        )
      )
    ) {
      const result = await fetch(
        `${homeUrl}/wp-json/abtfr/v1/proxycache`,
        {
          method: 'DELETE',
          headers: {
            'X-WP-Nonce': abtfrRestNonce
          }
        }
      );

      if ((await result.json()) === true) {
        updateCacheStats();
        alert(__('The proxy cache directory has been emptied.', 'abtfr'));
        return;
      } else {
        alert(__('Could not empty cache.', 'abtfr'));
      }
    }
  };

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
            {createInterpolateElement(
              __(
                'This feature enables to pass the <a>Leverage browser caching</a> rule from Google PageSpeed Insights.',
                'abtfr'
              ),
              {
                a: (
                  <ExternalLink
                    href={`https://developers.google.com/speed/docs/insights/LeverageBrowserCaching?hl=${lgCode}`}
                  />
                )
              }
            )}
          </p>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('Proxy Scripts', 'abtfr')}
                name="abtfr[js_proxy]"
                link={linkOptionState('jsProxy')}
                description={__(
                  'Capture external scripts and load the scripts through a caching proxy.',
                  'abtfr'
                )}
              />
              {getOption('jsProxy') ? (
                <SettingInnerTable
                  className="proxyjsoptions"
                  header={__('Script Proxy Settings', 'abtfr')}
                >
                  <SettingTextarea
                    header={__('Proxy Include List', 'abtfr')}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: 11
                    }}
                    name="abtfr[js_proxy_include]"
                    link={linkOptionState('jsProxyInclude')}
                    placeholder={__(
                      'Leave blank to proxy all external scripts...',
                      'abtfr'
                    )}
                    description={createInterpolateElement(
                      __(
                        'Enter (parts of) external javascript files to proxy, e.g. <code>google-analytics.com/analytics.js</code> or <code>facebook.net/en_US/sdk.js</code>. One script per line.',
                        'abtfr'
                      ),
                      {
                        code: <code />
                      }
                    )}
                  />
                  <SettingTextarea
                    header={__('Proxy Exclude List', 'abtfr')}
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
                  />
                  <SettingTextarea
                    header={__('Proxy Preload List', 'abtfr')}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: 11
                    }}
                    name="abtfr[js_proxy_preload]"
                    link={linkOptionState('jsProxyPreload')}
                    description={createInterpolateElement(
                      __(
                        'Enter the exact url or JSON config object<help/> of external scripts to preload for "script injected" async script capture, e.g. <code>https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js</code>. This setting will enable the proxy to load the cache url instead of the WordPress PHP proxy url. One url or JSON object per line.',
                        'abtfr'
                      ),
                      {
                        code: <code />,
                        help: (
                          <sup>
                            [
                            <a
                              href="#jsoncnf"
                              onClick={scrollToElement}
                              title={__('More information', 'abtfr')}
                            >
                              ?
                            </a>
                            ]
                          </sup>
                        )
                      }
                    )}
                  />
                </SettingInnerTable>
              ) : null}
              <SettingCheckbox
                header={__('Proxy Stylesheets', 'abtfr')}
                name="abtfr[css_proxy]"
                link={linkOptionState('cssProxy')}
                description={__(
                  'Capture external stylesheets and load the files through a caching proxy.',
                  'abtfr'
                )}
              />
              {getOption('cssProxy') ? (
                <SettingInnerTable
                  className="proxycssoptions"
                  header={__('Stylesheet Proxy Settings', 'abtfr')}
                >
                  <SettingTextarea
                    header={__('Proxy Include List', 'abtfr')}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: 11
                    }}
                    name="abtfr[css_proxy_include]"
                    link={linkOptionState('cssProxyInclude')}
                    placeholder={__(
                      'Leave blank to proxy all external stylesheets...',
                      'abtfr'
                    )}
                    description={createInterpolateElement(
                      __(
                        'Enter (parts of) external stylesheets to proxy, e.g. <code>googleapis.com/jquery-ui.css</code>. One stylesheet per line.',
                        'abtfr'
                      ),
                      {
                        code: <code />
                      }
                    )}
                  />
                  <SettingTextarea
                    header={__('Proxy Exclude List', 'abtfr')}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: 11
                    }}
                    name="abtfr[css_proxy_exclude]"
                    link={linkOptionState('cssProxyExclude')}
                    description={__(
                      'Enter (parts of) external stylesheets to exclude from the proxy. One stylesheet per line.',
                      'abtfr'
                    )}
                  />
                  <SettingTextarea
                    header={__('Proxy Preload List', 'abtfr')}
                    style={{
                      width: '100%',
                      height: 50,
                      fontSize: 11
                    }}
                    name="abtfr[css_proxy_preload]"
                    link={linkOptionState('cssProxyPreload')}
                    description={createInterpolateElement(
                      __(
                        'Enter the exact url or JSON config object<help/> of external stylesheets to preload for "script injected" async stylesheet capture, e.g. <code>http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css</code>. This setting will enable the proxy to load the cache url instead of the WordPress PHP proxy url. One url or JSON object per line.',
                        'abtfr'
                      ),
                      {
                        code: <code />,
                        help: (
                          <sup>
                            [
                            <a
                              href="#jsoncnf"
                              onClick={scrollToElement}
                              title={__('More information', 'abtfr')}
                            >
                              ?
                            </a>
                            ]
                          </sup>
                        )
                      }
                    )}
                  />
                </SettingInnerTable>
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
                      {__('JSON Proxy Config Object', 'abtfr')}
                    </h4>
                    <p className="description" style={{ marginTop: 0 }}>
                      {__(
                        'JSON config objects enable advanced file based proxy configuration. JSON objects can be used together with simple file entry and must be placed on one line (no spaces are allowed).',
                        'abtfr'
                      )}
                    </p>
                    <p className="description">
                      {createInterpolateElement(
                        __(
                          'JSON config objects must contain a target url (the url that will be downloaded by the proxy). Regular expression enables to match a source URL in the HTML, e.g. an URL with a cache busting date string (?time) or an url on a different host. Valid parameters are <code>url</code>, <code>regex</code>, <code>regex-flags</code>, <code>cdn</code> and <code>expire</code> (expire time in seconds).',
                          'abtfr'
                        ),
                        {
                          code: <code />
                        }
                      )}
                    </p>
                    <p
                      className="description"
                      style={{ marginBottom: 0, marginTop: 5 }}
                    >
                      {__('Example:', 'abtfr')}
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
                header={__('Proxy CDN', 'abtfr')}
                type="url"
                style={{ width: '100%' }}
                name="abtfr[proxy_cdn]"
                link={linkOptionState('proxyCdn')}
                placeholder={__(
                  'Leave blank for the default WordPress (plugin modified) upload directory url...',
                  'abtfr'
                )}
                description={createInterpolateElement(
                  __(
                    'Enter the default CDN url for cached resources, e.g. <code><strong>https://cdn.domain.com</strong>/wp-content/uploads/abtfr/proxy/.../resource.js</code>. You can set a custom CDN per individual resource using a JSON config object.',
                    'abtfr'
                  ),
                  {
                    code: <code />,
                    strong: <strong />
                  }
                )}
              />
              <SettingTextInput
                header={__('Proxy URL', 'abtfr')}
                type="url"
                style={{ width: '100%' }}
                name="abtfr[proxy_url]"
                link={linkOptionState('proxyUrl')}
                placeholder={__(
                  'Leave blank for the default WordPress PHP based proxy url...',
                  'abtfr'
                )}
                description={createInterpolateElement(
                  __(
                    'Enter a custom proxy url to serve captured external resources. There are 2 parameters that can be used in the url: <code>{PROXY:URL}</code> and <code>{PROXY:TYPE}</code>.',
                    'abtfr'
                  ),
                  {
                    code: <code />
                  }
                )}
              >
                <p className="description">
                  {createInterpolateElement(
                    __(
                      'E.g.: <code>https://nginx-proxy.mydomain.com/{PROXY:TYPE}/{PROXY:URL}</code>. Type is the string <u>js</u> or <u>css</u>.',
                      'abtfr'
                    ),
                    {
                      code: <code />,
                      u: <u />
                    }
                  )}
                </p>
              </SettingTextInput>
            </tbody>
          </table>
          <hr />
          <SubmitButton />
          <br />
          <br />
          <h3 style={{ margin: 0, padding: 0 }} id="stats">
            {__('Cache Stats', 'abtfr')}
          </h3>
          {cacheStatsError && (
            <div>{sprintf(__('Error: %s', 'abtfr'), cacheStatsError)}</div>
          )}
          {!cacheStats && !cacheStatsError ? (
            <div>
              <Loading />
            </div>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td
                    align="right"
                    width={70}
                    style={{ textAlign: 'right', fontSize: 14 }}
                  >
                    {__('Files:', 'abtfr')}
                  </td>
                  <td style={{ fontSize: 14 }}>{cacheStats.files}</td>
                </tr>
                <tr>
                  <td
                    align="right"
                    width={70}
                    style={{ textAlign: 'right', fontSize: 14 }}
                  >
                    {__('Size:', 'abtfr')}
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
                      {sprintf(
                        __('Stats last updated: %s', 'abtfr'),
                        new Date(cacheStats.date).toLocaleString()
                      )}
                    </p>
                    <hr />
                    <Button isSecondary isSmall onClick={updateCacheStats}>
                      {__('Refresh Stats', 'abtfr')}
                    </Button>
                    <Button
                      isSecondary
                      isSmall
                      onClick={handleEmptyCache}
                    >
                      {__('Empty Cache', 'abtfr')}
                    </Button>
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
