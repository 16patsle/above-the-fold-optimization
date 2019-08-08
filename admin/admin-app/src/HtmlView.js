import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import php from 'react-syntax-highlighter/languages/hljs/php';
import vs from 'react-syntax-highlighter/styles/hljs/vs';
import JsonEditor from './JsonEditor';
import SettingCheckbox from './SettingCheckbox';
import SettingTextarea from './SettingTextarea';
import Info from './Info';
import SearchReplaceExample from './SearchReplaceExample';
import SubmitButton from './SubmitButton';
import newlineArrayString from './utils/newLineArrayString';
import { htmlSchema } from './editorSchema';

registerLanguage('php', php);

const homeUrl = window.homeUrl;

class HtmlView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchReplaceValue: document.querySelector('#html_search_replace_src_server').value
		}

		this.lgcode = document.querySelector('#lgcode').value;
		this.google_intlcode = document.querySelector('#google_intlcode').value;
		this.htmlSettings = JSON.parse(document.querySelector('#html_settings').value);

		this.handleSearchReplaceValueChange = this.handleSearchReplaceValueChange.bind(this);

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
		`.trim()
	}

	handleSearchReplaceValueChange(value) {
		this.setState({ searchReplaceValue: value });
	}

	render() {
		return (
			<form method="post" action={document.querySelector('#admin_url_html_update').value} className="clearfix" encType="multipart/form-data">
				<div dangerouslySetInnerHTML={{ __html: window.abtfAdminNonce }}></div>
				<div className="wrap abovethefold-wrapper">
					<div id="poststuff">
						<div id="post-body" className="metabox-holder">
							<div id="post-body-content">
								<div className="postbox">
									<h3 className="hndle">
										<span>{__('HTML Optimization')}</span>
									</h3>
									<div className="inside testcontent">
										<table className="form-table">
											<tbody>
												<SettingCheckbox header="Minify HTML" name="abovethefold[html_minify]" defaultChecked={this.htmlSettings.minify} label="Enabled" description={<span>Compress HTML using an enhanced version of <a href="https://github.com/mrclay/minify/blob/master/lib/Minify/HTML.php" target="_blank">HTML.php</a>. This option will reduce the size of HTML but may require a full page cache to maintain an optimal server speed.</span>}></SettingCheckbox>
												<SettingCheckbox header="Strip HTML comments" name="abovethefold[html_comments]" defaultChecked={this.htmlSettings.comments} label="Enabled" description={<span>Remove HTML comments from HTML, e.g. <code>&lt;!-- comment --&gt;</code>.</span>}></SettingCheckbox>
												<SettingTextarea title="&nbsp;Preserve List" textareaClass="json-array-lines" name="abovethefold[html_comments_preserve]" defaultValue={newlineArrayString(this.htmlSettings.comments_preserve)} description="Enter (parts of) HTML comments to exclude from removal. One string per line."></SettingTextarea>
												<tr valign="top">
													<td colSpan="2" style={{ padding: "0px" }}>
														<SubmitButton type={['primary', 'large']} name="is_submit">
															{__('Save')}
														</SubmitButton>
													</td>
												</tr>
											</tbody>
										</table>

										<h3 style={{ marginBottom: "0px", paddingLeft: "0px", paddingBottom: "0px" }}>Search & Replace<a name="searchreplace">&nbsp;</a></h3>
										<p className="description">
											This option enables to replace strings in the HTML. Enter an array of JSON objects.
										</p>
										<JsonEditor name="html.replace" schema={htmlSchema} value={this.state.searchReplaceValue} onValueChange={this.handleSearchReplaceValueChange}></JsonEditor>
										<input type="hidden" name="abovethefold[html_search_replace]" id="html_search_replace_src" value={this.state.searchReplaceValue} />

										<Info color="yellow">
											<SearchReplaceExample title={__('Click to select')}>
												{{
													string: '"search":"string to match","replace":"newstring"',
													regex: __('{"search":"|string to (match)|i","replace":"newstring $1","regex":true}')
												}}
											</SearchReplaceExample>
										</Info>
										<p>You can also add a search and replace configuration using the WordPress filter hook <code>abtf_html_replace</code>.</p>
										<div id="wp_html_search_replace_example">
											<SyntaxHighlighter className="example-code" language="php" style={vs}>{this.wpHtmlSearchReplaceExample}</SyntaxHighlighter>
										</div>
										<hr />
										<SubmitButton type={['primary', 'large']} name="is_submit">
											{__('Save')}
										</SubmitButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default HtmlView;
