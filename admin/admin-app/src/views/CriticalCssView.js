import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { Button, ExternalLink, Notice } from '@wordpress/components';
import {
  adminUrl,
  homeUrl,
  siteTitle,
  abtfrAdminNonce,
  lgCode,
  extractCssKey,
  utmString
} from '../utils/globalVars';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import PageContent from '../components/PageContent';
import SubmitButton from '../components/SubmitButton';
import Info from '../components/Info';
import PageSelect from '../components/PageSelect';
import CriticalCssSettings from '../components/CriticalCss/CriticalCssSettings';
import ConditionalCssSettings from '../components/CriticalCss/ConditionalCssSettings';
import './CriticalCssView.css';
import SubNav from '../components/SubNav';

SyntaxHighlighter.registerLanguage('php', php);

const CriticalCssView = () => {
  const [extractCss, setExtractCss] = useState({});
  const [noticeText, setNoticeText] = useState(false);

  const extractCssButtonClicked = (href = '', output = 'download') => {
    href = href.trim();
    
    if (href === '') {
      setNoticeText(__('Select a page...', 'abtfr'));
      return;
    }
  
    if (/\?/.test(href)) {
      href += '&';
    } else {
      href += '?';
    }
  
    document.location.href = `${href}extract-css=${extractCssKey}&output=${output}`;
  };

  return (
    <>
      <SubNav />
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_criticalcss_update'}
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
            <ExternalLink
              href={`https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent?hl=${lgCode}`}
            >
              documentation by Google
            </ExternalLink>{' '}
            before you continue.
          </p>
          <p>
            <ExternalLink href="https://github.com/addyosmani/critical-path-css-tools">
              This article
            </ExternalLink>{' '}
            by a Google engineer provides information about the available
            methods for creating critical path CSS.{' '}
            <ExternalLink
              href={`https://addyosmani.com/blog/detecting-critical-above-the-fold-css-with-paul-kinlan-video/?${utmString}`}
            >
              This blog
            </ExternalLink>{' '}
            (with video) by two Google engineers provides information about the
            essence of Critical Path CSS creation.
          </p>
          <Info color="yellow">
            <p style={{ margin: '0px' }}>
              <strong>Tip:</strong> If you notice a{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Flash_of_unstyled_content">
                Flash of Unstyled Content
              </ExternalLink>{' '}
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
                <td className="criticalcsstable">
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
                    <CriticalCssSettings />
                    <ConditionalCssSettings />
                  </ul>
                </td>
              </tr>
              <tr valign="top">
                <td
                  className="criticalcsstable"
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
                  {noticeText && (
                    <Notice
                      status="error"
                      onRemove={() => setNoticeText(false)}
                    >
                      {noticeText}
                    </Notice>
                  )}
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
                        {extractCssKey}
                        &amp;output=print
                      </strong>
                    </code>
                    .
                  </p>
                  <PageSelect
                    wrapper={false}
                    size={80}
                    placeholder={__(
                      'Search a post/page/category ID or name...',
                      'abtfr'
                    )}
                    defaultOptions={[
                      {
                        label: __('Home Page (index)', 'abtfr'),
                        value: homeUrl
                      }
                    ]}
                    link={{ value: extractCss, set: setExtractCss }}
                  />
                  <div style={{ marginTop: '10px' }}>
                    <Button
                      isSecondary
                      onClick={e => {
                        extractCssButtonClicked(extractCss.value);
                      }}
                    >
                      {__('Download', 'abtfr')}
                    </Button>
                    <Button
                      isSecondary
                      onClick={e => {
                        extractCssButtonClicked(extractCss.value, 'print');
                      }}
                    >
                      {__('Print', 'abtfr')}
                    </Button>
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
          <hr />
          <SubmitButton />
        </PageContent>
      </form>
    </>
  );
};

export default CriticalCssView;
