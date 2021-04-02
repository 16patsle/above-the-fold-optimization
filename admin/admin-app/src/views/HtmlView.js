import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';
import useSettings from '../utils/useSettings';
import { adminUrl, siteTitle, abtfrAdminNonce } from '../utils/globalVars';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import LoadingWrapper from '../components/LoadingWrapper';
import LazyJsonEditor from '../components/LazyJsonEditor';
import { htmlSchema } from '../components/editorSchema';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SearchReplaceExample from '../components/SearchReplaceExample';
import SubmitButton from '../components/SubmitButton';

SyntaxHighlighter.registerLanguage('php', php);

const wpHtmlSearchReplaceExample = `
function your_html_search_and_replace( &$search, &$replace, &$search_regex, &$replace_regex ) {

	# ${
    /* translators: comment in example code */
    __('regular string replace', 'abtfr')
  }
	$search[] = 'string';
	$replace[] = '';

	# ${
    /* translators: comment in example code */
    __('regex replace', 'abtfr')
  }
	$search_regex[] = '|regex (string)|i';
	$replace_regex[] = '$1';

	return $search; // ${
    /* translators: comment in example code */
    __('required', 'abtfr')
  }
}

add_filter( 'abtfr_html_replace', 'your_html_search_and_replace', 10, 4 );
		`.trim();

const HtmlView = () => {
  const { linkOptionState, getOption, shouldRender, error } = useSettings();

  return (
    <LoadingWrapper shouldRender={shouldRender} error={error}>
      <form
        method="post"
        action={adminUrl + 'admin-post.php?action=abtfr_html_update'}
        className="clearfix"
        encType="multipart/form-data"
      >
        <div dangerouslySetInnerHTML={{ __html: abtfrAdminNonce }}></div>
        <PageContent header={__('HTML Optimization', 'abtfr')}>
          <Helmet>
            <title>
              {__('HTML Optimization', 'abtfr')} {siteTitle}
            </title>
          </Helmet>
          <table className="form-table">
            <tbody>
              <SettingCheckbox
                header={__('Minify HTML', 'abtfr')}
                name="abtfr[html_minify]"
                link={linkOptionState('htmlMinify')}
                description={createInterpolateElement(
                  __(
                    'Compress HTML using an enhanced version of <a>HTML.php</a>. This option will reduce the size of HTML but may require a full page cache to maintain an optimal server speed.',
                    'abtfr'
                  ),
                  {
                    a: (
                      <ExternalLink href="https://github.com/mrclay/minify/blob/master/lib/Minify/HTML.php" />
                    )
                  }
                )}
              />
              <SettingCheckbox
                header={__('Strip HTML comments', 'abtfr')}
                name="abtfr[html_comments]"
                link={linkOptionState('htmlComments')}
                description={createInterpolateElement(
                  __(
                    'Remove HTML comments from HTML, e.g. <code><!-- comment --></code>',
                    'abtfr'
                  ),
                  {
                    code: <code />
                  }
                )}
              />
              <SettingTextarea
                title="&nbsp;Preserve List"
                textareaClass="json-array-lines"
                name="abtfr[html_comments_preserve]"
                link={linkOptionState('htmlCommentsPreserve')}
                description={__(
                  'Enter (parts of) HTML comments to exclude from removal. One string per line.',
                  'abtfr'
                )}
                disabled={!getOption('htmlComments')}
              />
              <tr valign="top">
                <td colSpan="2" style={{ padding: '0px' }}>
                  <SubmitButton />
                </td>
              </tr>
            </tbody>
          </table>

          <h3
            style={{
              marginBottom: '0px',
              paddingLeft: '0px',
              paddingBottom: '0px'
            }}
            id="searchreplace"
          >
            {__('Search & Replace', 'abtfr')}
          </h3>
          <p className="description">
            {__(
              'This option enables to replace strings in the HTML. Enter an array of JSON objects.',
              'abtfr'
            )}
          </p>
          <LazyJsonEditor
            name="html.replace"
            schema={htmlSchema}
            link={linkOptionState('htmlSearchReplace')}
          />
          <input
            type="hidden"
            name="abtfr[html_search_replace]"
            id="html_search_replace_src"
            value={getOption('htmlSearchReplace')}
          />

          <Info color="yellow" style={{ marginTop: '30px' }}>
            <SearchReplaceExample title={__('Click to select', 'abtfr')}>
              {{
                string: `{"search":"${__(
                  'string to match',
                  'abtfr'
                )}","replace":"${__('newstring', 'abtfr')}"}`,
                regex: `{"search":"|${__(
                  'string to (match)',
                  'abtfr'
                )}|i","replace":"${__('newstring', 'abtfr')} $1","regex":true}`
              }}
            </SearchReplaceExample>
          </Info>
          <p>
            {createInterpolateElement(
              __(
                'You can also add a search and replace configuration using the WordPress filter hook <code>abtfr_html_replace</code>.',
                'abtfr'
              ),
              {
                code: <code />
              }
            )}
          </p>
          <div id="wp_html_search_replace_example">
            <SyntaxHighlighter
              className="example-code"
              language="php"
              style={vs}
            >
              {wpHtmlSearchReplaceExample}
            </SyntaxHighlighter>
          </div>
          <hr />
          <SubmitButton />
        </PageContent>
      </form>
    </LoadingWrapper>
  );
};

export default HtmlView;
