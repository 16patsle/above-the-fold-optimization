import React from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import useSWR from 'swr';
import useLinkState from '../utils/useLinkState';
import { adminUrl, siteTitle, abtfAdminNonce } from '../utils/globalVars';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import vs from 'react-syntax-highlighter/dist/esm/styles/hljs/vs';
import JsonEditor from '../components/JsonEditor';
import { htmlSchema } from '../components/editorSchema';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingTextarea from '../components/SettingTextarea';
import SearchReplaceExample from '../components/SearchReplaceExample';
import SubmitButton from '../components/SubmitButton';
import getSettings from '../utils/getSettings';

SyntaxHighlighter.registerLanguage('php', php);

const wpHtmlSearchReplaceExample = `
function your_html_search_and_replace( &$search, &$replace, &$search_regex, &$replace_regex ) {

	# regular string replace
	$search[] = 'string';
	$replace[] = '';

	# regex replace
	$search_regex[] = '|regex (string)|i';
	$replace_regex[] = '$1';

	return $search; // required
}

add_filter( 'abtf_html_replace', 'your_html_search_and_replace', 10, 4 );
		`.trim();

const HtmlView = () => {
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
      action={adminUrl + 'admin-post.php?action=abtf_html_update'}
      className="clearfix"
      encType="multipart/form-data"
    >
      <div dangerouslySetInnerHTML={{ __html: abtfAdminNonce }}></div>
      <PageContent header={__('HTML Optimization')}>
        <Helmet>
          <title>HTML Optimization {siteTitle}</title>
        </Helmet>
        <table className="form-table">
          <tbody>
            <SettingCheckbox
              header="Minify HTML"
              name="abovethefold[html_minify]"
              link={linkOptionState('htmlMinify')}
              label="Enabled"
              description={
                <span>
                  Compress HTML using an enhanced version of{' '}
                  <a
                    href="https://github.com/mrclay/minify/blob/master/lib/Minify/HTML.php"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    HTML.php
                  </a>
                  . This option will reduce the size of HTML but may require a
                  full page cache to maintain an optimal server speed.
                </span>
              }
            ></SettingCheckbox>
            <SettingCheckbox
              header="Strip HTML comments"
              name="abovethefold[html_comments]"
              link={linkOptionState('htmlComments')}
              label="Enabled"
              description={
                <span>
                  Remove HTML comments from HTML, e.g.{' '}
                  <code>&lt;!-- comment --&gt;</code>.
                </span>
              }
            ></SettingCheckbox>
            <SettingTextarea
              title="&nbsp;Preserve List"
              textareaClass="json-array-lines"
              name="abovethefold[html_comments_preserve]"
              link={linkOptionState('htmlCommentsPreserve')}
              description="Enter (parts of) HTML comments to exclude from removal. One string per line."
              disabled={!getOption('htmlComments')}
            ></SettingTextarea>
            <tr valign="top">
              <td colSpan="2" style={{ padding: '0px' }}>
                <SubmitButton type={['primary', 'large']} name="is_submit">
                  {__('Save')}
                </SubmitButton>
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
          Search & Replace
        </h3>
        <p className="description">
          This option enables to replace strings in the HTML. Enter an array of
          JSON objects.
        </p>
        <JsonEditor
          name="html.replace"
          schema={htmlSchema}
          link={linkOptionState('htmlSearchReplace')}
        ></JsonEditor>
        <input
          type="hidden"
          name="abovethefold[html_search_replace]"
          id="html_search_replace_src"
          value={getOption('htmlSearchReplace')}
        />

        <Info color="yellow" style={{ marginTop: '30px' }}>
          <SearchReplaceExample title={__('Click to select')}>
            {{
              string: '"search":"string to match","replace":"newstring"',
              regex: __(
                '{"search":"|string to (match)|i","replace":"newstring $1","regex":true}'
              )
            }}
          </SearchReplaceExample>
        </Info>
        <p>
          You can also add a search and replace configuration using the
          WordPress filter hook <code>abtf_html_replace</code>.
        </p>
        <div id="wp_html_search_replace_example">
          <SyntaxHighlighter className="example-code" language="php" style={vs}>
            {wpHtmlSearchReplaceExample}
          </SyntaxHighlighter>
        </div>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">
          {__('Save')}
        </SubmitButton>
      </PageContent>
    </form>
  );
};

export default HtmlView;
