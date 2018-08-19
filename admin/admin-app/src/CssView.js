import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';
import SettingCheckbox from './SettingCheckbox';
import SettingTextarea from './SettingTextarea';
import Info from './Info';
import SubmitButton from './SubmitButton';
import newlineArrayString from './utils/newLineArrayString';
import SettingSelect from './SettingSelect';

const homeUrl = window.homeUrl;

class CssView extends Component {
	constructor(props) {
		super(props);

		this.cssSettings = JSON.parse(document.querySelector('#css_settings').value);

		this.state = {
			showCssOptionsDelivery: this.cssSettings.delivery,
			showCssOptionsLoadCSSEnhanced: this.cssSettings.loadCSSEnhanced,
			showCssOptionsRenderDelayWarn: !(this.cssSettings.renderDelay === '' || this.cssSettings.renderDelay === 0),
			showCssOptionsGwfo: this.cssSettings.gwfo,
			showCssOptionsGwfoLoadMethod: this.cssSettings.gwfoLoadMethod !== 'disabled',
		}

		this.lgcode = document.querySelector('#lgcode').value;
		this.google_intlcode = document.querySelector('#google_intlcode').value;
		this.loadCSSVersion = JSON.parse(document.querySelector('#loadcss_version').value);
		this.webfontVersion = document.querySelector('#webfont_version').value;

		this.handleOptionToggle = this.handleOptionToggle.bind(this);
		this.handleRenderDelayChange = this.handleRenderDelayChange.bind(this);
	}

	handleOptionToggle(option) {
		const optionName = 'showCssOptions' + option[0].toUpperCase() + option.slice(1)
		this.setState({ [optionName]: !this.state[optionName] })
	}

	setOption(option, value) {
		const optionName = 'showCssOptions' + option[0].toUpperCase() + option.slice(1)
		this.setState({ [optionName]: value })
	}

	getOption(option) {
		const optionName = 'showCssOptions' + option[0].toUpperCase() + option.slice(1)
		return this.state[optionName];
	}

	handleRenderDelayChange(e) {
		if (e.target.value === '0') {
			e.target.value = '';
		}
		if (e.target.value !== '' && e.target.value !== '0') {
			this.setOption('renderDelayWarn', true);
		} else {
			this.setOption('renderDelayWarn', false);
		}
	}

	render() {
		return (
			<form method="post" action={document.querySelector('#admin_url_css_update').value} className="clearfix" encType="multipart/form-data">
				<div dangerouslySetInnerHTML={{ __html: document.querySelector('#admin_nonce_css').innerHTML }}></div>
				<div className="wrap abovethefold-wrapper">
					<div id="poststuff">
						<div id="post-body" className="metabox-holder">
							<div id="post-body-content">
								<div className="postbox">
									<h3 className="hndle">
										<span>{__('CSS Optimization')}</span>
									</h3>
									<div className="inside testcontent">
										{this.loadCSSVersion.error === 'not_found' ? <h1 style={{ color: "red" }}>WARNING: PLUGIN INSTALLATION NOT COMPLETE, MISSING public/js/src/loadcss_package.json</h1> : null}
										{this.loadCSSVersion.error === 'failed_parse' ? <h1 style={{ color: "red" }}>failed to parse public/js/src/loadcss_package.json</h1> : null}
										<table className="form-table">
											<tbody>
												<SettingCheckbox header="Optimize CSS Delivery" name="abovethefold[cssdelivery]" defaultChecked={this.cssSettings.delivery} onChange={this.handleOptionToggle.bind(this, 'delivery')} label="Enabled" description={<span>When enabled, CSS files are loaded asynchronously via <a href="https://github.com/filamentgroup/loadCSS" target="_blank">loadCSS</a> (v{this.loadCSSVersion.version}).  <a href={`https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery?hl=${this.lgcode}`} target="_blank">Click here</a> for the recommendations by Google.</span>}></SettingCheckbox>
												{this.getOption('delivery') ?
													<tr valign="top" className="cssdeliveryoptions">
														<td colSpan="2" style={{ paddingTop: "0px" }}>
															<div className="abtf-inner-table">
																<h3 className="h"><span>CSS Delivery Optimization</span></h3>
																<div className="inside">
																	<table className="form-table">
																		<tbody>
																			<SettingCheckbox header="Enhanced loadCSS" name="abovethefold[loadcss_enhanced]" defaultChecked={this.cssSettings.loadCSSEnhanced} onChange={this.handleOptionToggle.bind(this, 'loadCSSEnhanced')} label="Enabled" description={<span>When enabled, a customized version of loadCSS is used to make use of the <code>requestAnimationFrame</code> API following the <a href={`https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery?hl=${this.lgcode}`} target="_blank">recommendations by Google</a>.</span>}></SettingCheckbox>
																			{this.getOption('loadCSSEnhanced') ?
																				<tr valign="top" className="enhancedloadcssoptions">
																					<th scope="row">CSS render delay</th>
																					<td>
																						<table cellPadding="0" cellSpacing="0" border="0">
																							<tbody>
																								<tr>
																									<td valign="top" style={{ padding: "0px", verticalAlign: "top" }}>
																										<input type="number" min="0" max="3000" step="1" name="abovethefold[cssdelivery_renderdelay]" size="10" defaultValue={this.cssSettings.renderDelay} onKeyUp={this.handleRenderDelayChange} onChange={this.handleRenderDelayChange} placeholder="0 ms" />
																									</td>
																									<td valign="top" style={{ padding: "0px", verticalAlign: "top", paddingLeft: "10px", fontSize: "11px" }}>
																										{this.getOption('renderDelayWarn') ?
																											<div id="warnrenderdelay" style={{ padding: "0px", margin: "0px" }}>
																												<span style={{ color: "red", fontWeight: "bold" }}>Warning:</span>
																												A higher Google PageSpeed score may sometimes be achieved using this option but it may not be beneficial to the page rendering experience of your users. Often it is best to seek an alternative solution.
																										</div> : null}
																									</td>
																								</tr>
																							</tbody>
																						</table>
																						<p className="description" style={{ clear: "both" }}>Optionally, enter a time in milliseconds to delay the rendering of CSS files.</p>
																					</td>
																				</tr> : null}
																			<SettingSelect header="Position" name="abovethefold[cssdelivery_position]" defaultValue={this.cssSettings.position || 'footer'} options={
																				[{
																					value: 'header',
																					name: 'Header'
																				},
																				{
																					value: 'footer',
																					name: 'Footer'
																				}]
																			} description="Select the position where the async loading of CSS will start."></SettingSelect>
																			<SettingTextarea header="Ignore List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[cssdelivery_ignore]" defaultValue={newlineArrayString(this.cssSettings.ignore)} description="Stylesheets to ignore in CSS delivery optimization. One stylesheet per line. The files will be left untouched in the HTML."></SettingTextarea>
																			<SettingTextarea header="Remove List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[cssdelivery_remove]" defaultValue={newlineArrayString(this.cssSettings.remove)} description="Stylesheets to remove from HTML. One stylesheet per line. This feature enables to include small plugin related CSS files inline."></SettingTextarea>
																		</tbody>
																	</table>
																</div>
															</div>
														</td>
													</tr> : null}
												<SettingCheckbox header="Optimize Web Fonts" name="abovethefold[gwfo]" defaultChecked={this.cssSettings.gwfo} onChange={this.handleOptionToggle.bind(this, 'gwfo')} label="Enabled" description={<span>When enabled, web fonts are optimized using <a href="https://github.com/typekit/webfontloader" target="_blank">Google Web Font Loader</a>.</span>}></SettingCheckbox>
												{/*Coming soon*/}
												{this.getOption('gwfo') ?
													<tr valign="top" className="gwfooptions">
														<td colSpan="2" style={{ paddingTop: "0px" }}>
															<div className="abtf-inner-table">
																<h3 className="h"><span>Web Font Optimization</span></h3>
																<div className="inside">
																	<table className="form-table">
																		<tbody>
																			<SettingSelect header="webfont.js Load Method" name="abovethefold[gwfo_loadmethod]" defaultValue={this.cssSettings.gwfoLoadMethod} onChange={e => {
																				if (e.target.value !== 'disabled') {
																					this.setOption('gwfoLoadMethod', true)
																				} else {
																					this.setOption('gwfoLoadMethod', false)
																				}
																			}} options={
																				[{
																					value: 'inline',
																					name: 'Inline'
																				}, {
																					value: 'async',
																					name: 'Async'
																				}, {
																					value: 'async_cdn',
																					name: 'Async from Google CDN (v{/*<?php print $this->CTRL->gwfo->cdn_version; ?>*/})'
																				}, {
																					value: 'wordpress',
																					name: 'WordPress include'
																				}, {
																					value: 'disabled',
																					name: 'Disabled (remove all fonts)'
																				}]
																			} description={<span>Select the method to load <a href="https://developers.google.com/speed/libraries/?hl=<?php print $lgcode;?>#web-font-loader" target="_blank">webfont.js</a> (v{this.webfontVersion})).</span>}></SettingSelect>
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingSelect header="Load Position" name="abovethefold[gwfo_loadposition]" options={
																					[{
																						value: 'header',
																						name: 'Header'
																					},
																					{
																						value: 'footer',
																						name: 'Footer'
																					}]
																				} description="Select the position where the loading of web fonts will start."></SettingSelect>
																				: null}
																			{!this.cssSettings.gwfoConfigValid ?
																				<tr>
																					<th></th>
																					<td>
																						<p style={{ color: "red", marginBottom: "2px" }}>WebFontConfig variable not recognized.</p>
																					</td>
																				</tr>
																				: null}
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingTextarea header="WebFontConfig" style={{ width: "100%", height: "100px", fontSize: "11px", borderColor: !this.cssSettings.gwfoConfigValid ? "red" : "notacolor" }} name="abovethefold[gwfo_config]" placeholder="WebFontConfig = { classes: false, typekit: { id: 'xxxxxx' }, loading: function() {}, google: { families: ['Droid Sans', 'Droid Serif'] } };" defaultValue={this.cssSettings.gwfoConfig} description={<span>Enter the <code>WebFontConfig</code> variable for Google Web Font Loader. Leave blank for the default configuration. (<a href="https://github.com/typekit/webfontloader#configuration" target="_blank">more information</a>)</span>} onChange={() => { return false }/*onchange="if (jQuery(this).val() ==='') { jQuery('#sha256_warning').hide(); } else {jQuery('#sha256_warning').show();} "*/}></SettingTextarea>
																				: null}
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingTextarea header="Google Web Fonts" style={{ width: "100%", height: "50px"/*<?php if (count($options['gwfo_googlefonts']) > 3) {print '100px';} else {print '50px';} ?>;*/, fontSize: "11px" }} name="abovethefold[gwfo_googlefonts]" placeholder="Droid Sans" defaultValue={1/*<?php if (isset($options['gwfo_googlefonts'])) {echo $this->CTRL->admin->newline_array_string($options['gwfo_googlefonts']);} ?>*/} description={<span>Enter the <a href="https://developers.google.com/fonts/docs/getting_started?hl=<?php print $lgcode;?>&csw=1" target="_blank">Google Font API</a> definitions of <a href="https://fonts.google.com/?hl=<?php print $lgcode;?>" target="_blank">Google Web Fonts</a> to load. One font per line. (<a href="https://github.com/typekit/webfontloader#google" target="_blank">documentation</a>)</span>}></SettingTextarea>
																				: null}
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingCheckbox name="abovethefold[gwfo_googlefonts_auto]" label="Auto-detect enabled" description="When enabled, fonts are automatically extracted from the HTML, CSS and existing WebFontConfig."></SettingCheckbox>
																				: null}
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingTextarea title="&nbsp;Ignore List" style={{ width: "100%", height: "50px"/*<?php if (count($options['gwfo_googlefonts']) > 3) {print '100px';} else {print '50px';} ?>;*/, fontSize: "11px" }} name="abovethefold[gwfo_googlefonts_ignore]" defaultValue={1/*<?php if (isset($options['gwfo_googlefonts_ignore'])) {
                                                                echo $this->CTRL->admin->newline_array_string($options['gwfo_googlefonts_ignore']);
                                                            } ?>*/} description={<span>Enter (parts of) Google Web Font definitions to ignore, e.g. <code>Open Sans</code>. The fonts in this list will not be optimized or auto-detected.</span>}></SettingTextarea>
																				: null}
																			{this.getOption('gwfoLoadMethod') ?
																				<SettingTextarea title="&nbsp;Remove List" style={{ width: "100%", height: "50px"/*<?php if (count($options['gwfo_googlefonts']) > 3) {print '100px';} else {print '50px';} ?>;*/, fontSize: "11px" }} name="abovethefold[gwfo_googlefonts_remove]" defaultValue={1/*<?php if (isset($options['gwfo_googlefonts_remove'])) {
                                                                echo $this->CTRL->admin->newline_array_string($options['gwfo_googlefonts_remove']);
                                                            } ?>*/} description={<span>Enter (parts of) Google Web Font definitions to remove, e.g. <code>Open Sans</code>. This feature is useful when loading fonts locally. One font per line.</span>}></SettingTextarea>
																				: null}
																			<tr valign="top">
																				<th scope="row">Local Font Loading</th>
																				<td>
																					<p>Google Fonts are served from <code>fonts.googleapis.com</code> that is causing a render-blocking warning in the Google PageSpeed test. The Google fonts stylesheet cannot be cached by the <a href="<?php echo add_query_arg(array( 'page' => 'pagespeed-proxy' ), admin_url('admin.php')); ?>">external resource proxy</a> because it serves different content based on the client.</p>
																					<p style={{ marginTop: "7px" }}>To solve the PageSpeed Score issue while also achieving the best font render performance, it is possible to download the Google fonts and load them locally (from the critical CSS). Loading Google fonts locally enables to achieve a Google PageSpeed 100 Score while also preventing a font flicker effect during navigation.</p>

																					<br />
																					<h3>How to place Google Fonts locally</h3>

																					<p>Select the option "<em>Disabled (remove all fonts)</em>" from the webfont.js Load Method menu (above) to remove dynamic and static Google fonts from the HTML and CSS.</p>

																					<h4 className="h" style={{ marginBottom: "10px", marginTop: "15px" }}>Step 1: download the font files and CSS</h4>

																					<p style={{ marginTop: "7px" }}>Visit <a href="https://google-webfonts-helper.herokuapp.com/fonts?utm_source=wordpress&amp;utm_medium=plugin&amp;utm_term=optimization&amp;utm_campaign=o10n-x%3A%20Above%20The%20Fold%20Optimization" target="_blank">Google Webfonts Helper</a> and search for the fonts that you want to download. Select the font configuration (weight, charset and style) and download the zip-file.</p>

																					<h4 className="h" style={{ marginBottom: "10px", marginTop: "10px" }}>Step 2: upload the fonts to your theme directory</h4>
																					<p style={{ marginTop: "7px" }}>Extract the zip-file and upload the font files to <code>/fonts/</code> in your theme directory. Optionally, use the file upload to extract the zip-file in your theme directory automatically (requires PHP5).</p>
																					<p style={{ marginTop: "7px" }}><input type="file" name="googlefontzip" /></p>
																					<p><button type="submit" name="uploadgooglefontzip" className="button button-primary button-green">Upload &amp; Extract</button></p>

																					<h4 className="h" style={{ marginBottom: "10px", marginTop: "10px" }}>Step 3: create a Conditional Critical Path CSS entry for Google Fonts</h4>
																					<p style={{ marginTop: "7px" }}>Create a Conditional Critical Path CSS entry without conditions and select the <code>@appendToAny</code> option.</p>
																					<p>Enter the Google Font CSS into the CSS input field.</p>
																					<p>Change the paths of the fonts to the location of the fonts in your theme directory, e.g. <code>{/*<?php print htmlentities(str_replace(ABSPATH, '/', trailingslashit(get_stylesheet_directory()) . 'fonts/'), ENT_COMPAT, 'utf-8'); ?>*/}</code> and <a href="https://www.google.com/search?q=minify+css+online&amp;hl=<?php print $lgcode;?>" target="_blank" className="button button-secondary button-small">minify</a> the CSS.</p>
																				</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>

														</td>
													</tr> : null}
											</tbody>
										</table>
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

export default CssView;
