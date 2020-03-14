import React from 'react';
import { Helmet } from 'react-helmet';
import { __, sprintf } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  criticalCssEditorUrl
} from '../utils/globalVars';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SubmitButton from '../components/SubmitButton';
import getSettings from '../utils/getSettings';
import Info from '../components/Info';

SyntaxHighlighter.registerLanguage('php', php);

const SettingsView = () => {
  const [options, setOption, setOptions, linkOptionState] = useLinkState();

  const getOption = option => options[option];

  const { data, error } = useSWR('settings', getSettings);

  if (error) {
    return <div>{sprintf(__('Error: $s', 'abtfr'), error)}</div>;
  }

  const loading = <div>{__('Loading...', 'abtfr')}</div>;

  if (!data) {
    return loading;
  }

  if (!options) {
    setOptions(data);
    return loading;
  }

  return (
    <>
      <nav className="subnav">
        <span className="t">{__('Submenu:', 'abtfr')}</span>
        <a
          href={adminUrl + 'admin.php?page=abtfr-criticalcss-test'}
          className="f"
        >
          Quality Test (Split View)
        </a>
        <a
          href={criticalCssEditorUrl + '#editor'}
          target="_blank"
          rel="noopener"
        >
          Live Editor
        </a>
        <a href={adminUrl + 'admin.php?page=abtfr-build-tool'}>
          Gulp.js Critical CSS Generator
        </a>
      </nav>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_criticalcss_update'}
        data-addccss={adminUrl + 'admin-post.php?action=abtfr_add_ccss'}
        data-delccss={adminUrl + 'admin-post.php?action=abtfr_delete_ccss'}
        className="clearfix"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('Critical Path CSS', 'abtfr')}>
          <Helmet>
            <title>
              {__('Critical Path CSS', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <p>
            Critical Path CSS is the minimum CSS required to render above the
            fold content. Please read the{' '}
            <a
              href={`https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent?hl=${lgCode}`}
              target="_blank"
            >
              documentation by Google
            </a>{' '}
            before you continue.
          </p>
          <p>
            <a
              href="https://github.com/addyosmani/critical-path-css-tools"
              target="_blank"
            >
              This article
            </a>{' '}
            by a Google engineer provides information about the available
            methods for creating critical path CSS.{' '}
            <a
              href="https://addyosmani.com/blog/detecting-critical-above-the-fold-css-with-paul-kinlan-video/?<?php print $utmstring; ?>"
              target="_blank"
            >
              This blog
            </a>{' '}
            (with video) by two Google engineers provides information about the
            essence of Critical Path CSS creation.
          </p>
          <Info color="yellow">
            <p style={{ margin: '0px' }}>
              <strong>Tip:</strong> If you notice a{' '}
              <a
                href="https://en.wikipedia.org/wiki/Flash_of_unstyled_content"
                target="_blank"
              >
                Flash of Unstyled Content
              </a>{' '}
              (FOUC), use the{' '}
              <a href={adminUrl + 'admin.php?page=abtfr-criticalcss-test'}>
                Quality Test-tab
              </a>{' '}
              to fine tune the critical path CSS for a perfect above the fold
              display.
            </p>
          </Info>
          <table className="form-table">
            <tbody>
              <tr valign="top">
                <td class="criticalcsstable">
                  <h3
                    style={{
                      padding: '0px',
                      margin: '0px',
                      marginBottom: '10px'
                    }}
                  >
                    {__('Critical Path CSS', 'abtfr')}
                  </h3>
                  <p className="description" style={{ marginBottom: '1em' }}>
                    Configure the Critical Path CSS to be inserted inline into
                    the <code>&lt;head&gt;</code> of the page.
                  </p>
                  <ul
                    className="menu ui-sortable"
                    style={{
                      width: 'auto!important',
                      marginTop: '0px',
                      paddingTop: '0px'
                    }}
                  >
                    {/*?php require_once('admin.settings.criticalcss.inc.php'); ?*/}
                    {/*?php require_once('admin.settings.conditionalcss.inc.php'); ?*/}
                  </ul>
                </td>
              </tr>
              <tr valign="top">
                <td
                  class="criticalcsstable"
                  style={{ paddingTop: '17px', paddingBottom: '34px' }}
                >
                  <h3
                    style={{
                      padding: '0px',
                      margin: '0px',
                      marginBottom: '10px'
                    }}
                  >
                    {__('Extract Full CSS', 'abtfr')}
                  </h3>
                  <p className="description">
                    {__(
                      'For the creation of Critical Path CSS you need the full CSS of a page. This tool allows you to extract the full CSS from any url and optionally to select the specific CSS files you want to extract.',
                      'abtfr'
                    )}
                  </p>
                  <p className="description" style={{ marginBottom: '1em' }}>
                    You can quickly output the full CSS of any url by adding the
                    query string{' '}
                    <code>
                      <strong>
                        ?extract-css=
                        {/*?php print md5(SECURE_AUTH_KEY . AUTH_KEY); ?*/}
                        &amp;output=print
                      </strong>
                    </code>
                    .
                  </p>
                  <select id="fullcsspages" className="wp-pageselect">
                    <option value />
                    <option value={homeUrl}>
                      {__('Home Page (index)', 'abtfr')}
                    </option>
                  </select>
                  <div style={{ marginTop: '10px' }}>
                    <button
                      type="button"
                      id="fullcsspages_dl"
                      rel="<?php print md5(SECURE_AUTH_KEY . AUTH_KEY); ?>"
                      className="button button-large"
                    >
                      {__('Download', 'abtfr')}
                    </button>
                    <button
                      type="button"
                      id="fullcsspages_print"
                      rel="<?php print md5(SECURE_AUTH_KEY . AUTH_KEY); ?>"
                      className="button button-large"
                    >
                      {__('Print', 'abtfr')}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h1 id="filter">{__('Custom Critical CSS Condition', 'abtfr')}</h1>
          <p>
            {__(
              'You can add a custom critical CSS condition using a filter function. For example, if you want to add critical CSS for blog category X, you can use the following filter function.',
              'abtfr'
            )}
          </p>
          <SyntaxHighlighter className="example-code" language="php" style={vs}>
            {`
/**
 * ${__('Custom Critical Path CSS Condition', 'abtfr')}
 *
 * @plugin ABTF Reborn
 * @link https://wordpress.org/plugins/abtfr/
 */
function my_critical_css_condition( $params = array() ) {

	// ${__('Category X?', 'abtfr')}
	if (is_category('x')) {
		return true; // ${__('match', 'abtfr')}
	}

	return false; // ${__('no match', 'abtfr')}
}
                `.trim()}
          </SyntaxHighlighter>
          <p>
            To add the condtion to a critical CSS file, type{' '}
            <code>filter:my_critical_css_condition</code> in the condition
            search field. You can add a comma separated list with JSON encoded
            values to be passed to the filter <code>$params</code> by appending{' '}
            <code>:1,2,3,"variable","var"</code>. The filter function should
            return true or false.
          </p>
          <br />
          <hr />
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save', 'abtfr')}
          </SubmitButton>
        </PageContent>
      </form>
    </>
  );
};

export default SettingsView;
