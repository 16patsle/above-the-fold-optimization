import React, { Component } from 'react';
import { __ } from '@wordpress/i18n';

const lgcode = document.querySelector('#lgcode').value;
const google_intlcode = document.querySelector('#google_intlcode').value;

const homeUrl = window.homeUrl;

class IntroView extends Component {

    render() {
        // Google uses a different host for the US
        const thinkHost = `https://testmysite.${((google_intlcode === 'en-us') ? 'think' : '')}withgoogle.com/`;
        const thinkUrl = `${thinkHost}intl/${google_intlcode}?url=${encodeURIComponent(homeUrl)}`;

        const monitorUrl = new URL(window.adminUrl)
        monitorUrl.searchParams.append('page', 'pagespeed-monitor')

        return (
            <div className="wrap abovethefold-wrapper">
                <div id="poststuff">
                    <div id="post-body" className="metabox-holder">
                        <div id="post-body-content">
                            <div className="postbox">

                                <h3 className="hndle">
                                    <span>{__('Introduction')}</span>
                                </h3>
                                <div className="inside testcontent">
                                    <p>Take a moment to explore the abilities of this plugin. This plugin is not a simple <code>on/off</code> plugin so do not expect a result by simply activating the plugin.</p>
                                    <p>This plugin is intended as a toolkit to achieve <u>the best</u> website performance and it is focussed on Google, including the ability to achieve a Google PageSpeed 100 score.</p>
                                    <p>Every website is different and has different requirements to achieve the best performance. This plugin offers many configuration options{/* and goes a step further than many premium optimization plugins*/}.</p>
                                    <p><strong>This plugin is not intended for easy usage.</strong> Please seek expert help if you do not understand how to use this plugin. <a href={`https://encrypted.google.com/search?hl=${lgcode}&q=${encodeURIComponent('wordpress pagespeed optimization service')}`} target="_blank">Search Google</a> for optimization experts or contact the author of this plugin: <a href="#" target="_blank">info@optimization.team</a>.</p>
                                    <p>This plugin is offered for free. Do not expect support. If you experience a problem or have an idea for better performance, we are thankful if you <a href="https://wordpress.org/support/plugin/above-the-fold-optimization" target="_blank">report it</a> on the WordPress forums. Please do not expect free help to achieve a Google PageSpeed 100 score.</p>

                                    <h1 style={{ marginBottom: "10px", paddingBottom: "0px" }}>Roadmap to achieve a Google PageSpeed 100 score</h1>
                                    <h3 style={{ marginTop: "0px", paddingBottom: "5px", marginBottom: "0px", borderBottom: "solid 1px #efefef" }}>Step 1 - check the state of your website</h3>
                                    <p>Before you start using this plugin: test your website for problems and create a priority list with the issues that need to be resolved. This plugin offers access to several tests from the PageSpeed menu in the top admin bar.</p>
                                    <p>
                                        <a className="button button-small" href={`${thinkUrl}&hl=${lgcode}`} target="_blank">Google Full Spectrum Test</a>
                                        <a className="button button-small" href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(homeUrl)}&hl=${lgcode}`} target="_blank">Google PageSpeed Test</a>
                                        <a className="button button-small" href={`https://search.google.com/search-console/mobile-friendly?url=${encodeURIComponent(homeUrl)}&hl=${lgcode}`} target="_blank">Google Mobile Test</a>
                                        <a className="button button-small" href={`https://performance.sucuri.net/domain/${encodeURIComponent(new URL(homeUrl).host.replace('www', ''))}`} target="_blank">Securi Server Response Time</a>
                                        <a className="button button-small" href={`http://www.webpagetest.org/?url=${encodeURIComponent(homeUrl)}`} target="_blank">WebPageTest.org</a>
                                        <a className="button button-small" href={`https://gtmetrix.com/?url=${encodeURIComponent(homeUrl)}`} target="_blank">GTmetrix</a>
                                        <a className="button button-small" href={`https://securityheaders.io/?q=${encodeURIComponent(homeUrl)}&hide=on&followRedirects=on`} target="_blank">SecurityHeaders.io</a>
                                        <a className="button button-small" href={`https://www.ssllabs.com/ssltest/analyze.html?d=${encodeURIComponent(homeUrl)}`} target="_blank">SSL test</a>
                                        <a className="button button-small" href={`http://www.intodns.com/${encodeURIComponent(new URL(homeUrl).host.replace('www', ''))}`} target="_blank">DNS test</a>
                                    </p>

                                    <div className="info_yellow" style={{ marginBottom: "10px" }}><p style={{ margin: "0px" }}><strong>Tip:</strong> If you can resolve small issues fast, start with the smaller issues, it may help to resolve the larger issues.</p></div>

                                    <h3 style={{ marginTop: "0px", paddingBottom: "5px", marginBottom: "0px", borderBottom: "solid 1px #efefef" }}>Step 2 - server optimization</h3>
                                    <p>Start with the fundament of your website: the server. Make sure that the best <a href={`https://encrypted.google.com/search?hl=${lgcode}&q=${encodeURIComponent('gzip configuration')}`} target="_blank">gzip settings</a> and <a href={`https://encrypted.google.com/search?hl=${lgcode}&q=${encodeURIComponent('http cache headers configuration')}`} target="_blank">HTTP cache headers</a> are installed and if the server is slow, find ways to improve the speed of the server by optimizing WordPress plugins or by using a <a href={`https://encrypted.google.com/search?hl=${lgcode}&q=${encodeURIComponent('best wordpress full page cache' + new Date().getFullYear())}`} target="_blank">full page cache</a> solution. It may be required to choose a better hosting plan or to move to a different hosting provider. Hosting reliability and performance is a major aspect for achieving a good performance and stability reputation in Google. Once you lose a stable hosting reputation, it may cause a hidden penalty and you may not get your reputation back for years.</p>
                                    <p>Choose professional server configuration over WordPress plugins to achieve the best performance.</p>
                                    <p>Google <a href={`https://developers.google.com/speed/docs/insights/Server?hl=${lgcode}`} target="_blank">officially advises</a> a maximum server response time of 0,2 seconds (200ms). Test your global server response times <a href={`https://performance.sucuri.net/domain/${encodeURIComponent(new URL(homeUrl).host.replace('www', ''))}`} target="_blank">here</a>.</p>
                                    <div className="info_yellow" style={{ marginBottom: "10px" }}><p style={{ margin: "0px" }}><strong>Tip:</strong> Find out what exactly you need and write a single detailed request to your hosting provider for professional installation. If the server has a speed issue, simply ask your host to achieve a maximum server speed of 0,2 seconds (200ms) as advised by Google.</p></div>

                                    <h3 style={{ marginTop: "0px", paddingBottom: "5px", marginBottom: "0px", borderBottom: "solid 1px #efefef" }}>Step 3 - Google PageSpeed optimization</h3>
                                    <p>Test your website at <a href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(homeUrl)}&hl=${lgcode}`} target="_blank">Google PageSpeed Insights</a> and start resolving the issues. Google offers detailed documentation for each issue and this plugin offers the tools to resolve most issues.</p>

                                    <h3 style={{ marginTop: "0px", paddingBottom: "5px", marginBottom: "0px", borderBottom: "solid 1px #efefef" }}>Step 4 - setup a website monitor</h3>
                                    <p>Once the performance and quality of your website has achieved a perfect state, it is required to maintain it to achieve an optimal reliability, quality and performance reputation in Google. Go to the 	<a href={monitorUrl}>Monitor tab</a> for information about website monitoring tools.</p>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >
            </div >
        );
    }
}

export default IntroView;
