import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import {
  adminUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode
} from '../utils/globalVars';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SubmitButton from '../components/SubmitButton';
import SettingSelect from '../components/SettingSelect';
import SettingNumberInput from '../components/SettingNumberInput';
import './CssView.css';
import getSettings from '../utils/getSettings';

const proxyUrl = new URL(adminUrl + 'admin.php');
proxyUrl.searchParams.append('page', 'abtfr-proxy');

const CssView = () => {
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
      action={adminUrl + 'admin-post.php?action=abtfr_css_update'}
      className="clearfix"
      encType="multipart/form-data"
    >
      <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
      <PageContent header={__('CSS Optimization', 'abtfr')}>
        <Helmet>
          <title>CSS Optimization {siteTitle}</title>
        </Helmet>
        {getOption('cssLoadcssVersionError') === 'not_found' ? (
          <h1 style={{ color: 'red' }}>
            WARNING: PLUGIN INSTALLATION NOT COMPLETE, MISSING
            public/js/src/loadcss_package.json
          </h1>
        ) : null}
        {getOption('cssLoadcssVersionError') === 'failed_parse' ? (
          <h1 style={{ color: 'red' }}>
            failed to parse public/js/src/loadcss_package.json
          </h1>
        ) : null}
        <table className="form-table">
          <tbody>
            <SettingCheckbox
              header="Optimize CSS Delivery"
              name="abtfr[cssdelivery]"
              link={linkOptionState('cssdelivery')}
              label="Enabled"
              description={
                <span>
                  When enabled, CSS files are loaded asynchronously via{' '}
                  <a
                    href="https://github.com/filamentgroup/loadCSS"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    loadCSS
                  </a>{' '}
                  (
                  {getOption('cssLoadcssVersion')
                    ? 'v' + getOption('cssLoadcssVersion')
                    : 'unknown version'}
                  ).{' '}
                  <a
                    href={`https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery?hl=${lgCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>{' '}
                  for the recommendations by Google.
                </span>
              }
            ></SettingCheckbox>
            {getOption('cssdelivery') ? (
              <tr valign="top" className="cssdeliveryoptions">
                <td colSpan="2" style={{ paddingTop: '0px' }}>
                  <div className="abtfr-inner-table">
                    <h3 className="h">
                      <span>CSS Delivery Optimization</span>
                    </h3>
                    <div className="inside">
                      <table className="form-table">
                        <tbody>
                          <SettingCheckbox
                            header="Enhanced loadCSS"
                            name="abtfr[loadcss_enhanced]"
                            link={linkOptionState('loadcssEnhanced')}
                            label="Enabled"
                            description={
                              <span>
                                When enabled, a customized version of loadCSS is
                                used to make use of the{' '}
                                <code>requestAnimationFrame</code> API following
                                the{' '}
                                <a
                                  href={`https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery?hl=${lgCode}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  recommendations by Google
                                </a>
                                .
                              </span>
                            }
                          ></SettingCheckbox>
                          {getOption('loadcssEnhanced') ? (
                            <SettingNumberInput
                              header="CSS render delay"
                              min="0"
                              max="3000"
                              step="1"
                              name="abtfr[cssdelivery_renderdelay]"
                              className="enchanceloadcssoptions"
                              link={linkOptionState('cssdeliveryRenderdelay')}
                              placeholder="0 ms"
                            >
                              <p>
                                <span
                                  style={
                                    getOption('cssdeliveryRenderdelay') ===
                                      '' ||
                                    getOption('cssdeliveryRenderdelay') === 0
                                      ? { display: 'none' }
                                      : null
                                  }
                                >
                                  <span
                                    style={{
                                      color: 'red',
                                      fontWeight: 'bold'
                                    }}
                                  >
                                    Warning:{' '}
                                  </span>
                                  A higher Google PageSpeed score may sometimes
                                  be achieved using this option but it may not
                                  be beneficial to the page rendering experience
                                  of your users. Often it is best to seek an
                                  alternative solution.
                                </span>
                              </p>
                              <p className="description">
                                Optionally, enter a time in milliseconds to
                                delay the rendering of CSS files.
                              </p>
                            </SettingNumberInput>
                          ) : null}
                          <SettingSelect
                            header="Position"
                            name="abtfr[cssdelivery_position]"
                            link={linkOptionState('cssdeliveryPosition')}
                            options={[
                              {
                                value: 'header',
                                name: 'Header'
                              },
                              {
                                value: 'footer',
                                name: 'Footer'
                              }
                            ]}
                            description="Select the position where the async loading of CSS will start."
                          ></SettingSelect>
                          <SettingTextarea
                            header="Ignore List"
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abtfr[cssdelivery_ignore]"
                            link={linkOptionState('cssdeliveryIgnore')}
                            description="Stylesheets to ignore in CSS delivery optimization. One stylesheet per line. The files will be left untouched in the HTML."
                          ></SettingTextarea>
                          <SettingTextarea
                            header="Remove List"
                            style={{
                              width: '100%',
                              height: '50px',
                              fontSize: '11px'
                            }}
                            name="abtfr[cssdelivery_remove]"
                            link={linkOptionState('cssdeliveryRemove')}
                            description="Stylesheets to remove from HTML. One stylesheet per line. This feature enables to include small plugin related CSS files inline."
                          ></SettingTextarea>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
            <SettingCheckbox
              header="Optimize Web Fonts"
              name="abtfr[gwfo]"
              link={linkOptionState('gwfo')}
              label="Enabled"
              description={
                <span>
                  When enabled, web fonts are optimized using{' '}
                  <a
                    href="https://github.com/typekit/webfontloader"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Web Font Loader
                  </a>
                  .
                </span>
              }
            ></SettingCheckbox>
            {getOption('gwfo') ? (
              <tr valign="top" className="gwfooptions">
                <td colSpan="2" style={{ paddingTop: '0px' }}>
                  <div className="abtfr-inner-table">
                    <h3 className="h">
                      <span>Web Font Optimization</span>
                    </h3>
                    <div className="inside">
                      <table className="form-table">
                        <tbody>
                          <SettingSelect
                            header="webfont.js Load Method"
                            name="abtfr[gwfo_loadmethod]"
                            link={linkOptionState('gwfoLoadmethod')}
                            options={[
                              {
                                value: 'inline',
                                name: 'Inline'
                              },
                              {
                                value: 'async',
                                name: 'Async'
                              },
                              {
                                value: 'async_cdn',
                                name: `Async from Google CDN (v${getOption(
                                  'gwfoCdnVersion'
                                )})`
                              },
                              {
                                value: 'wordpress',
                                name: 'WordPress include'
                              },
                              {
                                value: 'disabled',
                                name: 'Disabled (remove all fonts)'
                              }
                            ]}
                            description={
                              <span>
                                Select the method to load{' '}
                                <a
                                  href={`https://developers.google.com/speed/libraries/?hl=${lgCode}#web-font-loader`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  webfont.js
                                </a>{' '}
                                (
                                {getOption('cssWebfontVersion')
                                  ? 'v' + getOption('cssWebfontVersion')
                                  : 'unknown version'}
                                ).
                              </span>
                            }
                          ></SettingSelect>
                          {getOption('gwfoLoadmethod') !== 'disabled' ? (
                            <SettingSelect
                              header="Load Position"
                              name="abtfr[gwfo_loadposition]"
                              link={linkOptionState('gwfoLoadposition')}
                              options={[
                                {
                                  value: 'header',
                                  name: 'Header'
                                },
                                {
                                  value: 'footer',
                                  name: 'Footer'
                                }
                              ]}
                              description="Select the position where the loading of web fonts will start."
                            ></SettingSelect>
                          ) : null}
                          {!getOption('gwfoConfigValid') ? (
                            <tr>
                              <th></th>
                              <td>
                                <p
                                  style={{
                                    color: 'red',
                                    marginBottom: '2px'
                                  }}
                                >
                                  WebFontConfig variable not recognized.
                                </p>
                              </td>
                            </tr>
                          ) : null}
                          {getOption('gwfoLoadmethod') !== 'disabled' ? (
                            <React.Fragment>
                              <SettingTextarea
                                header="WebFontConfig"
                                style={{
                                  width: '100%',
                                  height: '100px',
                                  fontSize: '11px',
                                  borderColor: !getOption('gwfoConfigValid')
                                    ? 'red'
                                    : 'notacolor'
                                }}
                                name="abtfr[gwfo_config]"
                                placeholder="WebFontConfig = { classes: false, typekit: { id: 'xxxxxx' }, loading: function() {}, google: { families: ['Droid Sans', 'Droid Serif'] } };"
                                link={linkOptionState('gwfoConfig')}
                                description={
                                  <span>
                                    Enter the <code>WebFontConfig</code>{' '}
                                    variable for Google Web Font Loader. Leave
                                    blank for the default configuration. (
                                    <a
                                      href="https://github.com/typekit/webfontloader#configuration"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      more information
                                    </a>
                                    )
                                  </span>
                                }
                                onChange={
                                  () => {
                                    return false;
                                  } /*onchange="if (jQuery(this).val() ==='') { jQuery('#sha256_warning').hide(); } else {jQuery('#sha256_warning').show();} "*/
                                }
                              ></SettingTextarea>
                              <SettingTextarea
                                header="Google Web Fonts"
                                style={{
                                  width: '100%',
                                  height:
                                    getOption('gwfoGooglefonts') > 3
                                      ? '100px'
                                      : '50px',
                                  fontSize: '11px'
                                }}
                                name="abtfr[gwfo_googlefonts]"
                                placeholder="Droid Sans"
                                link={linkOptionState('gwfoGooglefonts')}
                                description={
                                  <span>
                                    Enter the{' '}
                                    <a
                                      href={`https://developers.google.com/fonts/docs/getting_started?hl=${lgCode}&csw=1`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Google Font API
                                    </a>{' '}
                                    definitions of{' '}
                                    <a
                                      href={`https://fonts.google.com/?hl=${lgCode}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Google Web Fonts
                                    </a>{' '}
                                    to load. One font per line. (
                                    <a
                                      href="https://github.com/typekit/webfontloader#google"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      documentation
                                    </a>
                                    )
                                  </span>
                                }
                              ></SettingTextarea>
                              <SettingCheckbox
                                name="abtfr[gwfo_googlefonts_auto]"
                                label="Auto-detect enabled"
                                link={linkOptionState('gwfoGooglefontsAuto')}
                                description="When enabled, fonts are automatically extracted from the HTML, CSS and existing WebFontConfig."
                              ></SettingCheckbox>
                              <SettingTextarea
                                title="&nbsp;Ignore List"
                                style={{
                                  width: '100%',
                                  height:
                                    getOption('gwfoGooglefonts') > 3
                                      ? '100px'
                                      : '50px',
                                  fontSize: '11px'
                                }}
                                name="abtfr[gwfo_googlefonts_ignore]"
                                link={linkOptionState('gwfoGooglefontsIgnore')}
                                description={
                                  <span>
                                    Enter (parts of) Google Web Font definitions
                                    to ignore, e.g. <code>Open Sans</code>. The
                                    fonts in this list will not be optimized or
                                    auto-detected.
                                  </span>
                                }
                              ></SettingTextarea>
                              <SettingTextarea
                                title="&nbsp;Remove List"
                                style={{
                                  width: '100%',
                                  height:
                                    getOption('gwfoGooglefonts') > 3
                                      ? '100px'
                                      : '50px',
                                  fontSize: '11px'
                                }}
                                name="abtfr[gwfo_googlefonts_remove]"
                                link={linkOptionState('gwfoGooglefontsRemove')}
                                description={
                                  <span>
                                    Enter (parts of) Google Web Font definitions
                                    to remove, e.g. <code>Open Sans</code>. This
                                    feature is useful when loading fonts
                                    locally. One font per line.
                                  </span>
                                }
                              ></SettingTextarea>
                            </React.Fragment>
                          ) : null}
                          <tr valign="top" className="local-font-loading">
                            <th scope="row">Local Font Loading</th>
                            <td>
                              <p>
                                Google Fonts are served from{' '}
                                <code>fonts.googleapis.com</code> that is
                                causing a render-blocking warning in the Google
                                PageSpeed test. The Google fonts stylesheet
                                cannot be cached by the{' '}
                                <a href={proxyUrl}>external resource proxy</a>{' '}
                                because it serves different content based on the
                                client.
                              </p>
                              <p>
                                To solve the PageSpeed Score issue while also
                                achieving the best font render performance, it
                                is possible to download the Google fonts and
                                load them locally (from the critical CSS).
                                Loading Google fonts locally enables to achieve
                                a Google PageSpeed 100 Score while also
                                preventing a font flicker effect during
                                navigation.
                              </p>

                              <br />
                              <h3>How to place Google Fonts locally</h3>

                              <p>
                                Select the option "
                                <em>Disabled (remove all fonts)</em>" from the
                                webfont.js Load Method menu (above) to remove
                                dynamic and static Google fonts from the HTML
                                and CSS.
                              </p>

                              <h4 className="h">
                                Step 1: download the font files and CSS
                              </h4>

                              <p>
                                Visit{' '}
                                <a
                                  href="https://google-webfonts-helper.herokuapp.com/fonts?utm_source=wordpress&amp;utm_medium=plugin&amp;utm_term=optimization&amp;utm_campaign=o10n-x%3A%20Above%20The%20Fold%20Optimization"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  Google Webfonts Helper
                                </a>{' '}
                                and search for the fonts that you want to
                                download. Select the font configuration (weight,
                                charset and style) and download the zip-file.
                              </p>

                              <h4 className="h">
                                Step 2: upload the fonts to your theme directory
                              </h4>
                              <p>
                                Extract the zip-file and upload the font files
                                to <code>/fonts/</code> in your theme directory.
                                Optionally, use the file upload to extract the
                                zip-file in your theme directory automatically
                                (requires PHP5).
                              </p>
                              <p>
                                <input type="file" name="googlefontzip" />
                              </p>
                              <p>
                                <button
                                  type="submit"
                                  name="uploadgooglefontzip"
                                  className="button button-primary button-green"
                                >
                                  Upload &amp; Extract
                                </button>
                              </p>

                              <h4 className="h">
                                Step 3: create a Conditional Critical Path CSS
                                entry for Google Fonts
                              </h4>
                              <p>
                                Create a Conditional Critical Path CSS entry
                                without conditions and select the{' '}
                                <code>@appendToAny</code> option.
                              </p>
                              <p>
                                Enter the Google Font CSS into the CSS input
                                field.
                              </p>
                              <p>
                                Change the paths of the fonts to the location of
                                the fonts in your theme directory, e.g.{' '}
                                <code>{getOption('fontThemePath')}</code> and{' '}
                                <a
                                  href={`https://www.google.com/search?q=minify+css+online&amp;hl=${lgCode}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="button button-secondary button-small"
                                >
                                  minify
                                </a>{' '}
                                the CSS.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save', 'abtfr')}
        </SubmitButton>
      </PageContent>
    </form>
  );
};

export default CssView;
