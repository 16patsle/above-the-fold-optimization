import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import getSubmitButton from './getSubmitButton';
import schema from './editorSchema';

const homeUrl = window.homeUrl;

class HtmlView extends Component {
	constructor(props) {
		super(props);

		this.lgcode = document.querySelector('#lgcode').value;
		this.google_intlcode = document.querySelector('#google_intlcode').value;
		this.searchReplaceServerSrc = document.querySelector('#html_search_replace_src_server').value;
		this.htmlSettings = JSON.parse(document.querySelector('#html_settings').value);

		this.htmlSearchReplace = React.createRef();
		this.htmlSearchReplaceSrc = React.createRef();
	}

	/**
     * Return string from newline array
     */
	newlineArrayString(array) {
		if (!Array.isArray(array) || array.length === 0) {
			return '';
		}

		return this.htmlEntities(array.join("\n"));
	}

	htmlEntities(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	}

	componentDidMount() {
		/**
     	 * Search & Replace editor
     	 */
		const htmlSearchReplaceSrc = this.htmlSearchReplaceSrc.current
		if (this.htmlSearchReplace.current) {

			this.htmlSearchReplace.current.innerHTML = '';

			let changeTimeout;

			const options = {
				name: "html.replace",
				mode: 'code',
				modes: ['code', 'tree'], // allowed modes
				onError: function (err) {
					// Log the error
					console.error('JSON', err.toString());
					alert('JSON error. Please verify your input.\n\nSee console for details.');
				},
				onChange: function () {
					const t = editor.getText();

					// If the content is empty
					if (t.trim() === '') {
						if (changeTimeout) {
							clearTimeout(changeTimeout);
						}
						// wait for copy paste action
						changeTimeout = setTimeout(function () {
							changeTimeout = false;
							const t = editor.getText();
							// If the editor is still empty
							// set it to empty array
							if (t.trim() === '') {
								editor.set([]);
								htmlSearchReplaceSrc.value = '[]';
							}
						}, 25);

						return;
					}

					let json;

					try {
						json = editor.get();
					} catch (e) {

						return;
					}
					htmlSearchReplaceSrc.value = JSON.stringify(json);
				},
				onModeChange: function (newMode, oldMode) {
					const t = editor.getText();
					if (t.trim() === '') {
						// If the content is empty
						// set it to an empty arrray
						editor.set([]);
					}
					// expand nodes in tree mode
					if (newMode === 'tree') {
						editor.expandAll();
					}
				},
				search: false,
				schema
			};

			let json = [];

			// Set the editor content to the searchReplaceSrc sent from the server
			if (htmlSearchReplaceSrc.value !== '') {
				json = htmlSearchReplaceSrc.value;
				if (typeof json !== 'object') {
					try {
						json = JSON.parse(json);
					} catch (e) {
						json = [];
					}
				}
				if (!json || typeof json !== 'object') {
					json = [];
				}
			}
			const editor = new window.JSONEditor(this.htmlSearchReplace.current, options, json);

			editor.compact(); // collapseAll();

			// set editor reference
			//this.htmlSearchReplaceSrc.dataset.jsonEditor = editor
			window.jQuery('#html_search_replace_src').data('json-editor', editor);
		}
	}

	render() {
		return (
			<form method="post" action={document.querySelector('#admin_url_html_update').value} className="clearfix" encType="multipart/form-data">
				<div dangerouslySetInnerHTML={{ __html: document.querySelector('#admin_nonce_html').innerHTML }}></div>
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
												<tr valign="top">
													<th scope="row">Minify HTML</th>
													<td>
														<label>
															<input type="checkbox" name="abovethefold[html_minify]" value="1" defaultChecked={this.htmlSettings.minify} />
															Enabled
														</label>
														<p className="description">
															Compress HTML using an enhanced version of <a href="https://github.com/mrclay/minify/blob/master/lib/Minify/HTML.php" target="_blank">HTML.php</a>. This option will reduce the size of HTML but may require a full page cache to maintain an optimal server speed.
														</p>
													</td>
												</tr>
												<tr valign="top">
													<th scope="row">Strip HTML comments</th>
													<td>
														<label>
															<input type="checkbox" name="abovethefold[html_comments]" value="1" defaultChecked={this.htmlSettings.comments} />
															Enabled
														</label>
														<p className="description">
															Remove HTML comments from HTML, e.g. <code>&lt;!-- comment --&gt;</code>.
														</p>
													</td>
												</tr>
												<tr valign="top">
													<th scope="row">&nbsp;</th>
													<td style={{ paddingTop: "0px" }}>
														<h5 className="h">&nbsp;Preserve List</h5>
														<textarea className="json-array-lines" name="abovethefold[html_comments_preserve]" defaultValue={this.newlineArrayString(this.htmlSettings.comments_preserve)}></textarea>
														<p className="description">
															Enter (parts of) HTML comments to exclude from removal. One string per line.
														</p>
													</td>
												</tr>
												<tr valign="top">
													<td colSpan="2" style={{ padding: "0px" }} dangerouslySetInnerHTML={{ __html: getSubmitButton(__('Save'), 'primary large', 'is_submit', false) }}></td>
												</tr>
											</tbody>
										</table>

										<h3 style={{ marginBottom: "0px", paddingLeft: "0px", paddingBottom: "0px" }}>Search & Replace<a name="searchreplace">&nbsp;</a></h3>
										<p className="description">
											This option enables to replace strings in the HTML. Enter an array of JSON objects.
										</p>
										<div id="html_search_replace" ref={this.htmlSearchReplace}>
											<div className="loading-json-editor">
												{__('Loading JSON editor...')}
											</div>
										</div>
										<input type="hidden" name="abovethefold[html_search_replace]" id="html_search_replace_src" ref={this.htmlSearchReplaceSrc} value={this.searchReplaceServerSrc} />

										<div className="info_yellow">
											<strong>Example:</strong> <code id="html_search_replace_example" className="clickselect" data-example-text="show string" title="<?php print esc_attr('Click to select', 'pagespeed'); ?>" style={{ cursor: "copy" }}>{'"search":"string to match","replace":"newstring"'}</code> (<a href="javascript:void(0);" data-example="html_search_replace_example" data-example-html={'coming soon'/*<?php print esc_attr(__('{\"search\":"|string to (match)|i","replace":"newstring $1","regex":true}', 'pagespeed')); ?>*/}>show regular expression</a>)
										</div>
										<p>You can also add a search and replace configuration using the WordPress filter hook <code>abtf_html_replace</code>.</p>
										<div id="wp_html_search_replace_example">
											<pre style={{ padding: "10px", border: "solid 1px #efefef" }}>{`function your_html_search_and_replace( &$search, &$replace, &$search_regex, &$replace_regex ) {

	# regular string replace
	$search[] = 'string';
	$replace[] = '';

	# regex replace
	$search_regex[] = '|regex (string)|i';
	$replace_regex[] = '$1';

	return $search; // required
}

add_filter( 'abtf_html_replace', 'your_html_search_and_replace', 10, 4 );`}</pre>
										</div>
										<hr />
										<span dangerouslySetInnerHTML={{ __html: getSubmitButton(__('Save'), 'primary large', 'is_submit', false) }}></span>
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
