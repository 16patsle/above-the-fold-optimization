import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { __ } from '@wordpress/i18n';
import { getOption } from '../utils/optionUtils';
import { linkOptionState } from '../utils/linkState';
import {
  adminUrl,
  siteTitle,
  abtfAdminNonce,
  htmlSettings
} from '../utils/globalVars';
import newlineArrayString from '../utils/newLineArrayString';
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

SyntaxHighlighter.registerLanguage('php', php);

class HtmlView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: htmlSettings
    };

    this.state.options.commentsPreserve = newlineArrayString(
      this.state.options.commentsPreserve
    );

    this.getOption = getOption.bind(this);
    this.linkOptionState = linkOptionState.bind(this);

    this.wpHtmlSearchReplaceExample = `
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
  }

  render() {
    return (
      <form
        method="post"
        action={adminUrl + '?action=abtf_html_update'}
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
                link={this.linkOptionState('minify')}
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
                link={this.linkOptionState('comments')}
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
                link={this.linkOptionState('commentsPreserve')}
                description="Enter (parts of) HTML comments to exclude from removal. One string per line."
                disabled={!this.getOption('comments')}
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
            This option enables to replace strings in the HTML. Enter an array
            of JSON objects.
          </p>
          <JsonEditor
            name="html.replace"
            schema={htmlSchema}
            link={this.linkOptionState('searchReplace')}
          ></JsonEditor>
          <input
            type="hidden"
            name="abovethefold[html_search_replace]"
            id="html_search_replace_src"
            value={this.getOption('searchReplace')}
          />

          <Info color="yellow">
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
            <SyntaxHighlighter
              className="example-code"
              language="php"
              style={vs}
            >
              {this.wpHtmlSearchReplaceExample}
            </SyntaxHighlighter>
          </div>
          <hr />
          <SubmitButton type={['primary', 'large']} name="is_submit">
            {__('Save')}
          </SubmitButton>
        </PageContent>
      </form>
    );
  }
}

export default HtmlView;
