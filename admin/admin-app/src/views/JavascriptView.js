import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { __ } from '@wordpress/i18n';
import { getOption } from '../utils/optionUtils';
import { linkOptionState } from '../utils/linkState';
import newlineArrayString from '../utils/newLineArrayString';
import Info from '../components/Info';
import PageContent from '../components/PageContent';
import SettingCheckbox from '../components/SettingCheckbox';
import SettingSelect from '../components/SettingSelect';
import SettingTextarea from '../components/SettingTextarea';
import SettingRadio from '../components/SettingRadio';
import SubmitButton from '../components/SubmitButton';

class JavascriptView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            options: JSON.parse(document.querySelector('#javascript_settings').value),
        }

        this.state.options.ignore = newlineArrayString(this.state.options.ignore);
        this.state.options.remove = newlineArrayString(this.state.options.remove);
        this.state.options.async = newlineArrayString(this.state.options.async);
        this.state.options.asyncDisabled = newlineArrayString(this.state.options.asyncDisabled);
        this.state.options.idleDelivery = newlineArrayString(this.state.options.idleDelivery)
        
        this.utmstring = document.querySelector('#utmstring').value
        
        this.getOption = getOption.bind(this);
        this.linkOptionState = linkOptionState.bind(this);
    }
    
    render() {
        const proxyUrl = new URL(window.adminUrl)
		proxyUrl.searchParams.append('page', 'pagespeed-proxy')

        return (
<form method="post" action={document.querySelector('#admin_url_javascript_update').value} className="clearfix">
    <div dangerouslySetInnerHTML={{ __html: window.abtfAdminNonce }}></div>
    <PageContent header={__('Javascript Optimization')}>
                    <Helmet>
                        <title>Javascript Optimization {window.siteTitle}</title>
                    </Helmet>
        <Info color="seagreen" style={{ "marginBottom": "0px", "fontSize": "14px" }}><strong>Tip:</strong> More information about javascript optimization can be found in <a href={'https://www.igvita.com/?' + this.utmstring} target="_blank" rel="noopener noreferrer">this blog</a> by Ilya Grigorik, web performance engineer at Google and author of the O'Reilly book <a href={'https://www.amazon.com/High-Performance-Browser-Networking-performance/dp/1449344763/?' + this.utmstring} target="_blank" rel="noopener noreferrer">High Performance Browser Networking</a> (<a href={'https://hpbn.co/?' + this.utmstring} target="_blank" rel="noopener noreferrer">free online</a>).</Info>
        <table className="form-table">
            <tbody>
                <SettingCheckbox header="Optimize Javascript Loading" name="abovethefold[jsdelivery]" label="Enabled" link={this.linkOptionState('delivery')} description={<span>When enabled, Javascript files are loaded asynchronously using an enhanced version of <a href="https://github.com/walmartlabs/little-loader" target="_blank" rel="noopener noreferrer">little-loader</a> from Walmart Labs (<a href={'https://formidable.com/blog/2016/01/07/the-only-correct-script-loader-ever-made/#' + this.utmstring} target="_blank" rel="noopener noreferrer">reference</a>).</span>}></SettingCheckbox>
                <tr valign="top" className="jsdeliveryoptions" style={!this.getOption('delivery') ? { display: 'none' } : {}}>
                    <td colSpan="2" style={{ "paddingTop": "0px" }}>
                        <div className="abtf-inner-table">
                            <h3 className="h"><span>Javascript Load Optimization</span></h3>
                            <div className="inside">
                                <p style={{ "padding": "5px", "borderBottom": "solid #efefef", "margin": "0px" }}><span style={{ "color": "red", "fontWeight": "bold" }}>Warning:</span> It may require some tweaking of the settings to prevent javascript problems.</p>
                                <table className="form-table">
                                    <tbody>
                                        <SettingRadio header="Script Loader" name="abovethefold[jsdelivery_scriptloader]" link={this.linkOptionState('scriptLoader')} radios={
                                            [{
                                                value: 'little-loader',
                                                label: <span><a href="https://github.com/walmartlabs/little-loader" target="_blank" rel="noopener noreferrer">little-loader</a> from Walmart Labs (<a href={'https://formidable.com/blog/2016/01/07/the-only-correct-script-loader-ever-made/#' + this.utmstring} target="_blank" rel="noopener noreferrer">reference</a>)</span>,
                                                description: <span style={{ "marginBottom": "5px" }}>A stable async script loader that works in old browsers.</span>
                                            },
                                            {
                                                value: 'html5',
                                                label: ' little-loader + HTML5 Web Worker and Fetch API based script loader with localStorage cache',
                                                description: <span>
                                                    {!this.getOption('proxy') ? <span className="description" style={{ color: "red" }}>This script loader requires the <a href={proxyUrl}>Javascript proxy</a> to be enabled to bypass <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS" target="_blank" rel="noopener noreferrer">CORS</a>.</span> : null}
                                                    <span className="description">A state of the art script loader for optimal mobile speed, inspired by <a href={'https://addyosmani.com/basket.js/#' + this.utmstring} target="_blank" rel="noopener noreferrer">basket.js</a> (by a Google engineer), a script loading concept in use by Google. With fallback to little-loader for old browsers.</span>
                                                </span>
                                            }]
                                        }>
                                            <div className="info_yellow">
                                                <p className="description" style={{ "marginTop": "0px" }}>
                                                    <strong>Advantages of the HTML5 script loader</strong>
                                                </p>
                                                <span className="description" style={{ "marginBottom": "0px" }}>
                                                    <ul style={{ "margin": "0px", "padding": "0px" }}>
                                                        <li style={{ "margin": "0px", "padding": "0px" }}>&nbsp;<span style={{ color: "#666" }}>➤</span> 0 javascript file download during navigation</li>
                                                        <li style={{ "margin": "0px", "padding": "0px" }}>&nbsp;<span style={{ color: "#666" }}>➤</span> 0 javascript file download for returning visitors</li>
                                                        <li style={{ "margin": "0px", "padding": "0px" }}>&nbsp;<span style={{ color: "#666" }}>➤</span> abide WordPress dependencies</li>
                                                        <li style={{ "margin": "0px", "padding": "0px" }}>&nbsp;<span style={{ color: "#666" }}>➤</span> faster script loading than browser cache, especially on mobile</li>
                                                    </ul>
                                                </span>
                                            </div>
                                        </SettingRadio>
                                        <SettingSelect header="Position" name="abovethefold[jsdelivery_position]" link={this.linkOptionState('position')} options={
                                            [{
                                                value: 'header',
                                                name: 'Header'
                                            },
                                            {
                                                value: 'footer',
                                                name: 'Footer'
                                            }]
                                        } description="Select the position where the async loading of Javascript will start."></SettingSelect>
                                        <SettingTextarea header="Ignore List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[jsdelivery_ignore]" link={this.linkOptionState('ignore')} description="Scripts to ignore in Javascript delivery optimization. One script per line. The files will be left untouched in the HTML."></SettingTextarea>
                                        <SettingTextarea header="Remove List" style={{ width: "100%", height: "50px", fontSize: "11px" }} name="abovethefold[jsdelivery_remove]" link={this.linkOptionState('remove')} description="Scripts to remove from HTML. One script per line. This feature enables to include small plugin related scripts inline."></SettingTextarea>
                                        <SettingCheckbox header="Force Async" name="abovethefold[jsdelivery_async_all]" label="Enabled" link={this.linkOptionState('forceAsync')} description="When enabled, all scripts are loaded asynchronously."></SettingCheckbox>
                                        {!this.getOption('forceAsync') ?
                                            <SettingTextarea header="Async Force List" style={{ "width": "100%", "height": "50px", "fontSize": "11px" }} name="abovethefold[jsdelivery_async]" link={this.linkOptionState('async')} description="Enter (parts of) scripts to force to load async. All other scripts are loaded in sequential blocking order if not specifically configured as async in HTML.">
                                                <span className="description">Example:
										                    	<ol style={{ "margin": "0px", "padding": "0px", "paddingLeft": "2em", "marginTop": "10px" }}>
                                                        <li>Script1: non-async [wait...]</li>
                                                        <li>Script 2,3,4: async, Script 5: non-async [wait...]</li>
                                                        <li>Script 6</li>
                                                    </ol>
                                                </span>
                                            </SettingTextarea> : null}
                                        <SettingTextarea header="Async Disabled List" style={{ "width": "100%", "height": "50px", "fontSize": "11px" }} name="abovethefold[jsdelivery_async_disabled]" link={this.linkOptionState('asyncDisabled')} description="Enter (parts of) scripts to force to load blocking (non-async)."></SettingTextarea>
                                        <SettingTextarea header="requestIdleCallback" style={{ "width": "100%", "height": "50px", "fontSize": "11px" }} name="abovethefold[jsdelivery_idle]" disabled={!this.getOption('proxy') && this.getOption('scriptloader') !== 'html5'} link={this.linkOptionState('idleDelivery')} description={<span>Enter a list with <code>script_string[:timeout_ms]</code> entries (one per line) to execute scripts in CPU idle time within an optional timeout in milliseconds. This feature enables to prioritize script execution. (<a href="https://developers.google.com/web/updates/2015/08/using-requestidlecallback" target="_blank" rel="noopener noreferrer">more information</a>)</span>}>
                                            {!this.getOption('proxy') && this.getOption('scriptloader') !== 'html5' ?
                                                <p style={{ "paddingBottom": "5px", "color": "maroon" }}>This feature requires the HTML5 script loader.</p>
                                                :
                                                <p style={{ "paddingBottom": "5px" }}>This feature only applies to localStorage cached scripts.{/* Our new plugin will enable this option for all scripts.*/}</p>
                                            }
                                            <Info color="yellow" style={{ "marginTop": "7px" }}>Example: <code>script.js:2000</code> (script.js should execute when CPU is available or within 2 seconds). Timeout is optional.</Info>
                                        </SettingTextarea>
                                        <SettingCheckbox header="Abide Dependencies" name="abovethefold[jsdelivery_deps]" label="Enabled" link={this.linkOptionState('abideDeps')} description={<span>When enabled, scripts will be loaded in sequential order abiding the WordPress dependency configuration from <a href="https://developer.wordpress.org/reference/functions/wp_enqueue_script/" target="_blank" rel="noopener noreferrer">wp_enqueue_script()</a>.</span>}></SettingCheckbox>
                                        <SettingCheckbox header="jQuery Stub" name="abovethefold[jsdelivery_jquery]" label="Enabled" link={this.linkOptionState('jqueryStub')} description={<span>When enabled, a queue captures basic jQuery functionality such as <code>jQuery(function($){' ... '});</code> and <code>$(document).bind('ready')</code> in inline scripts. This feature enables to load jQuery async.</span>}></SettingCheckbox>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                </tr>
                <SettingCheckbox header="Lazy Load Scripts" name="abovethefold[lazyscripts_enabled]" label="Enabled" link={this.linkOptionState('lazyScripts')} description={<span>When enabled, the widget module from <a href="https://github.com/ressio/lazy-load-xt#widgets" target="_blank" rel="noopener noreferrer">jQuery Lazy Load XT</a> is loaded to enable lazy loading of inline scripts such as Facebook like and Twitter follow buttons.</span>}>
                    {this.getOption('lazyScripts') ?
                        <span>
                            <p className="description lazyscriptsoptions">This option is compatible with <a href={document.querySelector('#lazyload_plugins_url').value}>WordPress lazy load plugins</a> that use Lazy Load XT. Those plugins are <u>not required</u> for this feature.</p>
                            <pre style={{ "float": "left", "width": "100%", "overflow": "auto" }} className="lazyscriptsoptions">
                                {`
<div data-lazy-widget><!--
    <div id="fblikebutton_1" className="fb-like" data-href="https://github.com/16patsle/" 
    data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
    <script>
    FB.XFBML.parse(document.getElementById('fblikebutton_1').parentNode||null);
    </script>
--></div>
                            `.trim()}
                            </pre>
                        </span> : null}
                </SettingCheckbox>
            </tbody>
        </table>
        <hr />
        <SubmitButton type={['primary', 'large']} name="is_submit">{__('Save')}</SubmitButton>
    </PageContent>
</form>
        )
    }
}

export default JavascriptView;