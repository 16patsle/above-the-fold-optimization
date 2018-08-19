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
			showCssOptionsRenderDelayWarn: !(this.cssSettings.renderDelay === '' || this.cssSettings.renderDelay === 0)
		}

		this.lgcode = document.querySelector('#lgcode').value;
		this.google_intlcode = document.querySelector('#google_intlcode').value;
		this.loadCSSVersion = JSON.parse(document.querySelector('#loadcss_version').value);

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
																			<SettingSelect header="Position" name="abovethefold[cssdelivery_position]" defaultValue={this.cssSettings.position || 'footer'} options={[{ value: 'header', name: 'Header' }, { value: 'footer', name: 'Footer' }]} description="Select the position where the async loading of CSS will start."></SettingSelect>
																			<SettingTextarea header="Ignore List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[cssdelivery_ignore]" defaultValue={newlineArrayString(this.cssSettings.ignore)} description="Stylesheets to ignore in CSS delivery optimization. One stylesheet per line. The files will be left untouched in the HTML."></SettingTextarea>
																			<SettingTextarea header="Remove List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[cssdelivery_remove]" defaultValue={newlineArrayString(this.cssSettings.remove)} description="Stylesheets to remove from HTML. One stylesheet per line. This feature enables to include small plugin related CSS files inline."></SettingTextarea>
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
