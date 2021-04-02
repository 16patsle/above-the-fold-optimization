import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSettings from '../utils/useSettings';
import {
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  utmString
} from '../utils/globalVars';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import LoadingWrapper from '../components/LoadingWrapper';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingSelect from '../components/SettingSelect';
import SettingTextarea from '../components/SettingTextarea';
import SettingRadio from '../components/SettingRadio';
import SubmitButton from '../components/SubmitButton';

SyntaxHighlighter.registerLanguage('xml', xml);

const proxyUrl = new URL(adminUrl + 'admin.php');
proxyUrl.searchParams.append('page', 'pagespeed-proxy');

const lazyloadExample = `
<div data-lazy-widget>
<!--
    <div id="fblikebutton_1" className="fb-like" data-href="https://github.com/16patsle/" 
    data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
    <script>
    FB.XFBML.parse(document.getElementById('fblikebutton_1').parentNode||null);
    </script>
-->
</div>
    `.trim();

const JavascriptView = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtf_javascript_update'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Javascript Optimization', 'abtfr')}>
          <Helmet>
            <title>
              {__('Javascript Optimization', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <Info
            color="seagreen"
            style={{ marginBottom: '0px', fontSize: '14px' }}
          >
            <strong>Tip:</strong> More information about javascript optimization
            can be found in{' '}
            <a
              href={'https://www.igvita.com/?' + utmString}
              target="_blank"
              rel="noopener noreferrer"
            >
              this blog
            </a>{' '}
            by Ilya Grigorik, web performance engineer at Google and author of
            the O'Reilly book{' '}
            <a
              href={
                'https://www.amazon.com/High-Performance-Browser-Networking-performance/dp/1449344763/?' +
                utmString
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              High Performance Browser Networking
            </a>{' '}
            (
            <a
              href={'https://hpbn.co/?' + utmString}
              target="_blank"
              rel="noopener noreferrer"
            >
              free online
            </a>
            ).
          </Info>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('Optimize Javascript Loading', 'abtfr')}
                name="abovethefold[jsdelivery]"
                link={linkOptionState('jsdelivery')}
                description={
                  <span>
                    When enabled, Javascript files are loaded asynchronously
                    using an enhanced version of{' '}
                    <a
                      href="https://github.com/walmartlabs/little-loader"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      little-loader
                    </a>{' '}
                    from Walmart Labs (
                    <a
                      href={
                        'https://formidable.com/blog/2016/01/07/the-only-correct-script-loader-ever-made/#' +
                        utmString
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      reference
                    </a>
                    ).
                  </span>
                }
              />
              <tr
                valign="top"
                className="jsdeliveryoptions"
                style={!getOption('jsdelivery') ? { display: 'none' } : {}}
              >
                <td colSpan="2" style={{ paddingTop: '0px' }}>
                  <div className="abtf-inner-table">
                    <h3 className="h">
                      <span>{__('Javascript Load Optimization', 'abtfr')}</span>
                    </h3>
                    <div className="inside">
                      <p
                        style={{
                          padding: '5px',
                          borderBottom: 'solid #efefef',
                          margin: '0px'
                        }}
                      >
                        <span style={{ color: 'red', fontWeight: 'bold' }}>
                          {__('Warning:', 'abtfr')}
                        </span>{' '}
                        {__(
                          'It may require some tweaking of the settings to prevent javascript problems.',
                          'abtfr'
                        )}
                      </p>
                      <table className="form-table">
                        <tbody>
                          <SettingRadio
                            header={__('Script Loader', 'abtfr')}
                            name="abovethefold[jsdelivery_scriptloader]"
                            link={linkOptionState('jsdeliveryScriptloader')}
                            radios={[
                              {
                                value: 'little-loader',
                                label: (
                                  <>
                                    <a
                                      href="https://github.com/walmartlabs/little-loader"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      little-loader
                                    </a>{' '}
                                    from Walmart Labs (
                                    <a
                                      href={
                                        'https://formidable.com/blog/2016/01/07/the-only-correct-script-loader-ever-made/#' +
                                        utmString
                                      }
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      reference
                                    </a>
                                    )
                                    <br />
                                    {__(
                                      'A stable async script loader that works in old browsers.',
                                      'abtfr'
                                    )}
                                  </>
                                )
                              },
                              {
                                value: 'html5',
                                label: (
                                  <>
                                    {__(
                                      'little-loader + HTML5 Web Worker and Fetch API based script loader with localStorage cache',
                                      'abtfr'
                                    )}
                                    {!getOption('jsProxy') ? (
                                      <div
                                        className="description"
                                        style={{ color: 'red' }}
                                      >
                                        This script loader requires the{' '}
                                        <a href={proxyUrl}>Javascript proxy</a>{' '}
                                        to be enabled to bypass{' '}
                                        <a
                                          href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          CORS
                                        </a>
                                        .
                                      </div>
                                    ) : null}
                                    <div className="description">
                                      A state of the art script loader for
                                      optimal mobile speed, inspired by{' '}
                                      <a
                                        href={
                                          'https://addyosmani.com/basket.js/#' +
                                          utmString
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        basket.js
                                      </a>{' '}
                                      (by a Google engineer), a script loading
                                      concept in use by Google. With fallback to
                                      little-loader for old browsers.
                                    </div>
                                  </>
                                )
                              }
                            ]}
                          >
                            <Info style={{ marginBottom: 0 }}>
                              <p
                                className="description"
                                style={{ marginTop: '0px' }}
                              >
                                <strong>
                                  {__(
                                    'Advantages of the HTML5 script loader',
                                    'abtfr'
                                  )}
                                </strong>
                              </p>
                              <span
                                className="description"
                                style={{ marginBottom: '0px' }}
                              >
                                <ul style={{ margin: '0px', padding: '0px' }}>
                                  <li style={{ margin: '0px', padding: '0px' }}>
                                    &nbsp;
                                    <span style={{ color: '#666' }}>
                                      ➤
                                    </span>{' '}
                                    {__(
                                      '0 javascript file download during navigation',
                                      'abtfr'
                                    )}
                                  </li>
                                  <li style={{ margin: '0px', padding: '0px' }}>
                                    &nbsp;
                                    <span style={{ color: '#666' }}>
                                      ➤
                                    </span>{' '}
                                    {__(
                                      '0 javascript file download for returning visitors',
                                      'abtfr'
                                    )}
                                  </li>
                                  <li style={{ margin: '0px', padding: '0px' }}>
                                    &nbsp;
                                    <span style={{ color: '#666' }}>
                                      ➤
                                    </span>{' '}
                                    {__(
                                      'abide WordPress dependencies',
                                      'abtfr'
                                    )}
                                  </li>
                                  <li style={{ margin: '0px', padding: '0px' }}>
                                    &nbsp;
                                    <span style={{ color: '#666' }}>
                                      ➤
                                    </span>{' '}
                                    {__(
                                      'faster script loading than browser cache, especially on mobile',
                                      'abtfr'
                                    )}
                                  </li>
                                </ul>
                              </span>
                            </Info>
                          </SettingRadio>
                          <SettingSelect
                            header={__('Position', 'abtfr')}
                            name="abovethefold[jsdelivery_position]"
                            link={linkOptionState('jsdeliveryPosition')}
                            options={[
                              {
                                value: 'header',
                                label: __('Header', 'abtfr')
                              },
                              {
                                value: 'footer',
                                label: __('Footer', 'abtfr')
                              }
                            ]}
                            description={__(
                              'Select the position where the async loading of Javascript will start.',
                              'abtfr'
                            )}
                          />
                          <SettingTextarea
                            header={__('Ignore List', 'abtfr')}
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abovethefold[jsdelivery_ignore]"
                            link={linkOptionState('jsdeliveryIgnore')}
                            description={__(
                              'Scripts to ignore in Javascript delivery optimization. One script per line. The files will be left untouched in the HTML.',
                              'abtfr'
                            )}
                          />
                          <SettingTextarea
                            header={__('Remove List', 'abtfr')}
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abovethefold[jsdelivery_remove]"
                            link={linkOptionState('jsdeliveryRemove')}
                            description={__(
                              'Scripts to remove from HTML. One script per line. This feature enables to include small plugin related scripts inline.',
                              'abtfr'
                            )}
                          />
                          <SettingCheckbox
                            header={__('Force Async', 'abtfr')}
                            name="abovethefold[jsdelivery_async_all]"
                            link={linkOptionState('jsdeliveryAsyncAll')}
                            description={__(
                              'When enabled, all scripts are loaded asynchronously.',
                              'abtfr'
                            )}
                          />
                          {!getOption('jsdeliveryAsyncAll') ? (
                            <SettingTextarea
                              header={__('Async Force List', 'abtfr')}
                              style={{
                                width: '100%',
                                height: '50px',
                                fontSize: '11px'
                              }}
                              name="abovethefold[jsdelivery_async]"
                              link={linkOptionState('jsdeliveryAsync')}
                              description={__(
                                'Enter (parts of) scripts to force to load async. All other scripts are loaded in sequential blocking order if not specifically configured as async in HTML.',
                                'abtfr'
                              )}
                            >
                              <span className="description">
                                Example:
                                <ol
                                  style={{
                                    margin: '0px',
                                    padding: '0px',
                                    paddingLeft: '2em',
                                    marginTop: '10px'
                                  }}
                                >
                                  <li>
                                    {__(
                                      'Script1: non-async [wait...]',
                                      'abtfr'
                                    )}
                                  </li>
                                  <li>
                                    {__(
                                      'Script 2,3,4: async, Script 5: non-async [wait...]',
                                      'abtfr'
                                    )}
                                  </li>
                                  <li>{__('Script 6', 'abtfr')}</li>
                                </ol>
                              </span>
                            </SettingTextarea>
                          ) : null}
                          <SettingTextarea
                            header={__('Async Disabled List', 'abtfr')}
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abovethefold[jsdelivery_async_disabled]"
                            link={linkOptionState('jsdeliveryAsyncDisabled')}
                            description={__(
                              'Enter (parts of) scripts to force to load blocking (non-async).',
                              'abtfr'
                            )}
                          />
                          <SettingTextarea
                            header={__('requestIdleCallback', 'abtfr')}
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abovethefold[jsdelivery_idle]"
                            disabled={
                              !getOption('jsProxy') &&
                              getOption('jsdeliveryScriptloader') !== 'html5'
                            }
                            link={linkOptionState('jsdeliveryIdle')}
                            description={
                              <span>
                                Enter a list with{' '}
                                <code>script_string[:timeout_ms]</code> entries
                                (one per line) to execute scripts in CPU idle
                                time within an optional timeout in milliseconds.
                                This feature enables to prioritize script
                                execution. (
                                <a
                                  href="https://developers.google.com/web/updates/2015/08/using-requestidlecallback"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  more information
                                </a>
                                )
                              </span>
                            }
                          >
                            {!getOption('jsProxy') &&
                            getOption('jsdeliveryScriptloader') !== 'html5' ? (
                              <p
                                style={{
                                  paddingBottom: '5px',
                                  color: 'maroon'
                                }}
                              >
                                {__(
                                  'This feature requires the HTML5 script loader.',
                                  'abtfr'
                                )}
                              </p>
                            ) : (
                              <p style={{ paddingBottom: '5px' }}>
                                {__(
                                  'This feature only applies to localStorage cached scripts.',
                                  'abtfr'
                                )}
                                {/* Our new plugin will enable this option for all scripts.*/}
                              </p>
                            )}
                            <Info color="yellow" style={{ marginTop: '7px' }}>
                              Example: <code>script.js:2000</code> (script.js
                              should execute when CPU is available or within 2
                              seconds). Timeout is optional.
                            </Info>
                          </SettingTextarea>
                          <SettingCheckbox
                            header={__('Abide Dependencies', 'abtfr')}
                            name="abovethefold[jsdelivery_deps]"
                            link={linkOptionState('jsdeliveryDeps')}
                            description={
                              <span>
                                When enabled, scripts will be loaded in
                                sequential order abiding the WordPress
                                dependency configuration from{' '}
                                <a
                                  href="https://developer.wordpress.org/reference/functions/wp_enqueue_script/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  wp_enqueue_script()
                                </a>
                                .
                              </span>
                            }
                          />
                          <SettingCheckbox
                            header={__('jQuery Stub', 'abtfr')}
                            name="abovethefold[jsdelivery_jquery]"
                            link={linkOptionState('jsdeliveryJquery')}
                            description={
                              <span>
                                When enabled, a queue captures basic jQuery
                                functionality such as{' '}
                                <code>jQuery(function($){' ... '});</code> and{' '}
                                <code>$(document).bind('ready')</code> in inline
                                scripts. This feature enables to load jQuery
                                async.
                              </span>
                            }
                          />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
              <SettingCheckbox
                header={__('Lazy Load Scripts', 'abtfr')}
                name="abovethefold[lazyscripts_enabled]"
                link={linkOptionState('lazyscriptsEnabled')}
                description={
                  <span>
                    When enabled, the widget module from{' '}
                    <a
                      href="https://github.com/ressio/lazy-load-xt#widgets"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      jQuery Lazy Load XT
                    </a>{' '}
                    is loaded to enable lazy loading of inline scripts such as
                    Facebook like and Twitter follow buttons.
                  </span>
                }
              >
                {getOption('lazyscriptsEnabled') ? (
                  <span>
                    <p className="description lazyscriptsoptions">
                      This option is compatible with{' '}
                      <a
                        href={
                          adminUrl +
                          'plugin-install.php?s=Lazy+Load+XT&tab=search&type=term'
                        }
                      >
                        WordPress lazy load plugins
                      </a>{' '}
                      that use Lazy Load XT. Those plugins are{' '}
                      <u>not required</u> for this feature.
                    </p>
                    <div
                      style={{ float: 'left', width: '100%', overflow: 'auto' }}
                    >
                      <SyntaxHighlighter
                        className="example-code lazyscriptsoptions"
                        language="xml"
                        style={vs}
                      >
                        {lazyloadExample}
                      </SyntaxHighlighter>
                    </div>
                  </span>
                ) : null}
              </SettingCheckbox>
            </tbody>
          </table>
          <hr />
          <SubmitButton />
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default JavascriptView;
