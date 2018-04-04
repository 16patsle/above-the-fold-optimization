<?php

    // Google uses a different host for the US
    $thinkhost = 'https://testmysite.' . (($this->google_intlcode === 'en-us') ? 'think' : '') . 'withgoogle.com/';
    $thinkurl = $thinkhost . 'intl/'.$this->google_intlcode.'?url=' . urlencode(home_url());

?>
<div class="wrap abovethefold-wrapper">

    <div class="ok_green" style="padding:8px;padding-left:8px;border-width:1px;font-size:16px;line-height:20px;margin:0px;">
    <h3 style="margin-top:5px;">News</h3>

    <img src="<?php print WPABTF_URI; ?>admin/images/lighthouse.png" alt="Google Bot" style="width:128px;float:left;margin-right:1em;" title="Google Lighthouse PWA Validation" style="float:right;">
    <p style="font-size:16px;line-height:20px;"><strong>March, 28th 2018:</strong> A beta version of the new <a href="https://wordpress.org/plugins/html-optimization/" target="_blank">HTML Optimization</a> plugin is available. You can now achieve the full functionality of this plugin with the new plugins.</p>
<p><a href="<?php print esc_url(add_query_arg(array('s' => 'o10n', 'tab' => 'search', 'type' => 'author'), admin_url('plugin-install.php'))); ?>" class="button button-large" style="font-size: 18px;line-height: 35px;height: 35px;">View New Optimization Plugins</a></p>

    <p style="font-size:16px;line-height:20px;">We advise to use the new plugins for access to the latest optimization technologies and long term support. While the plugins are in beta, they are already stable for most websites and with your help (reporting issues, requesting features) the plugins will become a stable tool that can provide the best website performance result, even better than custom CMS based websites dedicated to performance!</p>

    <p style="font-size:16px;line-height:20px;"><strong>Advanced website optimization reduced to simple JSON</strong></p>
    <p style="font-size:16px;line-height:20px;">While our new plugins are even more difficult to use than this plugin, the JSON schema based configuration concept enables full control of the optimization using a simple JSON document. You can now quickly copy and paste your JSON optimization configuration on a forum and ask for expert advise that will eventually benefit a lot of users and that will also improve public knowledge about website performance optimization. </p>

    <p style="font-size:16px;line-height:20px;"><strong>March, 27th 2018:</strong> A beta version of the new <a href="https://wordpress.org/plugins/pwa-optimization/" target="_blank">PWA Optimization</a> plugin is available.</p>
 <p style="font-size:16px;line-height:20px;">The new PWA optimization plugin is installed on <a href="https://www.e-scooter.co/gogoro-1-series-plus/" target="_blank">www.e-scooter.co</a>. The new plugin uses a background Web Worker innovation which proves to provide exceptional results by being able to instantly abort tasks (e.g. fetching resources, cache management etc.) when a user wants to navigate, enabling the service worker to be ready to perform at all times. There is still room for improvement, in a next update the background worker will provide streaming functionality to enable aborting navigation related fetch requests, making the Service Worker's capacity instantly 100% available for new navigation requests.</p>

	<p class="info_yellow" style="font-size:16px;line-height:20px;"><strong>Note:</strong> We noticed that since the past updates of our new plugins many users of the Security Header Optimization plugin uninstalled the plugin. Regrettably they did not inform us about an issue and we couldn't find a possible cause.<br /><br />
	If you find an issue with our new beta plugins, please be so kind to inform us so that other users can benefit. We prefer a <a href="https://github.com/o10n-x" target="_blank">Github issue</a> but you may also contact us by email at <a href="mailto:info@optimization.team">info@optimization.team</a>.</p>


	<h3>Websocket based Instant Navigation Speed plugin (formerly Websockify / <a href="https://www.ŵš.com/" target="_blank">ŵš.com</a>)</h3>

    <p style="font-size:16px;line-height:20px;">
    Our plugin technology for instant navigation speed has a new concept to enable efficient browsing of the existing internet on VR and AR devices: <a href="https://telekinetic.ai/" target="_blank" rel="noopener">Telekinetic Navigation</a>. The technology makes it possible to browse 1000s of pages in a few seconds using gesture control. The technology will enable VR and AR to become a better option for internet browsing.</p>
    <p style="font-size:16px;line-height:20px;">A demo of instant navigation (as a WordPress plugin) can be viewed on <a href="https://www.e-scooter.co/" target="_blank">www.e-scooter.co</a> (bottom right link in the footer)<br /><br />
    If you are interested to learn more, please send an email to <a href="mailto:info@optimization.team">info@optimization.team</a>.
    </p>
    </div>
	<div id="poststuff">
		<div id="post-body" class="metabox-holder">
			<div id="post-body-content">
				<div class="postbox">
					
					<h3 class="hndle">
						<span><?php _e('Introduction', 'abovethefold'); ?></span>
					</h3>
					<div class="inside testcontent">

						<p>Take a moment to explore the abilities of this plugin. This plugin is not a simple <code>on/off</code> plugin so do not expect a result by simply activating the plugin.</p>

						<p>This plugin is intended as a toolkit to achieve <u>the best</u> website performance and it is focussed on Google, including the ability to achieve a Google PageSpeed <span class="g100">100</span> score.</p>

						<p>Every website is different and has different requirements to achieve the best performance. This plugin offers many configuration options<!-- and goes a step further than many premium optimization plugins-->.</p>

						<p><strong>This plugin is not intended for easy usage.</strong> Please seek expert help if you do not understand how to use this plugin. <a href="https://encrypted.google.com/search?hl=<?php print $lgcode;?>&amp;q=<?php print urlencode('wordpress pagespeed optimization service'); ?>" target="_blank">Search Google</a> for optimization experts or contact the author of this plugin: <a href="#" target="_blank">info@optimization.team</a>.</p>

						<p>This plugin is offered for free. Do not expect support. If you experience a problem or have an idea for better performance, we are thankful if you <a href="https://wordpress.org/support/plugin/above-the-fold-optimization" target="_blank">report it</a> on the WordPress forums. Please do not expect free help to achieve a Google PageSpeed 100 score.</p>

						<h1 style="margin-bottom:10px;padding-bottom:0px;">Roadmap to achieve a Google PageSpeed <span class="g100">100</span> score</h1>
						
						<h3 style="margin-top:0px;padding-bottom:5px;margin-bottom:0px;border-bottom:solid 1px #efefef;">Step 1 - check the state of your website</h3>
						<p>Before you start using this plugin: test your website for problems and create a priority list with the issues that need to be resolved. This plugin offers access to several tests from the PageSpeed menu in the top admin bar.</p>

						<p>
							<a class="button button-small" href="https://developers.google.com/speed/pagespeed/insights/?url=<?php print urlencode(home_url()); ?>&amp;hl=<?php print $lgcode;?>" target="_blank">Google Full Spectrum Test</a>
							<a class="button button-small" href="https://developers.google.com/speed/pagespeed/insights/?url=<?php print urlencode(home_url()); ?>&amp;hl=<?php print $lgcode;?>" target="_blank">Google PageSpeed Test</a>
							<a class="button button-small" href="https://search.google.com/search-console/mobile-friendly?url=<?php print urlencode(home_url()); ?>&amp;hl=<?php print $lgcode;?>" target="_blank">Google Mobile Test</a>
							<a class="button button-small" href="https://performance.sucuri.net/domain/<?php print urlencode(str_replace('www.', '', parse_url(home_url(), PHP_URL_HOST))); ?>" target="_blank">Securi Server Response Time</a>
							<a href="http://www.webpagetest.org/?url=<?php print urlencode(home_url()); ?>" class="button button-small" target="_blank">WebPageTest.org</a>
							<a href="https://gtmetrix.com/?url=<?php print urlencode(home_url()); ?>" class="button button-small" target="_blank">GTmetrix</a>
							<a href="https://securityheaders.io/?q=<?php print urlencode(home_url()); ?>&amp;hide=on&amp;followRedirects=on" class="button button-small" target="_blank">SecurityHeaders.io</a>
							<a href="https://www.ssllabs.com/ssltest/analyze.html?d=<?php print urlencode(home_url()); ?>" class="button button-small" target="_blank">SSL test</a>
							<a href="http://www.intodns.com/<?php print urlencode(str_replace('www.', '', parse_url(home_url(), PHP_URL_HOST))); ?>" class="button button-small" target="_blank">DNS test</a>
						</p>

						<div class="info_yellow" style="margin-bottom:10px;"><p style="margin:0px;"><strong>Tip:</strong> If you can resolve small issues fast, start with the smaller issues, it may help to resolve the larger issues.</p></div>

						<h3 style="margin-top:0px;padding-bottom:5px;margin-bottom:0px;border-bottom:solid 1px #efefef;">Step 2 - server optimization</h3>
						<p>Start with the fundament of your website: the server. Make sure that the best <a href="https://encrypted.google.com/search?hl=<?php print $lgcode;?>&amp;q=<?php print urlencode('gzip configuration'); ?>" target="_blank">gzip settings</a> and <a href="https://encrypted.google.com/search?hl=<?php print $lgcode;?>&amp;q=<?php print urlencode('http cache headers configuration'); ?>" target="_blank">HTTP cache headers</a> are installed and if the server is slow, find ways to improve the speed of the server by optimizing WordPress plugins or by using a <a href="https://encrypted.google.com/search?hl=<?php print $lgcode;?>&amp;q=<?php print urlencode('best wordpress full page cache ' . date('Y')); ?>" target="_blank">full page cache</a> solution. It may be required to choose a better hosting plan or to move to a different hosting provider. Hosting reliability and performance is a major aspect for achieving a good performance and stability reputation in Google. Once you lose a stable hosting reputation, it may cause a hidden penalty and you may not get your reputation back for years.</p>
						<p>Choose professional server configuration over WordPress plugins to achieve the best performance.</p>
						<p>Google <a href="https://developers.google.com/speed/docs/insights/Server?hl=<?php print $lgcode;?>" target="_blank">officially advises</a> a maximum server response time of 0,2 seconds (200ms). Test your global server response times <a href="https://performance.sucuri.net/domain/<?php print urlencode(str_replace('www.', '', parse_url(home_url(), PHP_URL_HOST))); ?>" target="_blank">here</a>.</p>
						<div class="info_yellow" style="margin-bottom:10px;"><p style="margin:0px;"><strong>Tip:</strong> Find out what exactly you need and write a single detailed request to your hosting provider for professional installation. If the server has a speed issue, simply ask your host to achieve a maximum server speed of 0,2 seconds (200ms) as advised by Google.</p></div>

						<h3 style="margin-top:0px;padding-bottom:5px;margin-bottom:0px;border-bottom:solid 1px #efefef;">Step 3 - Google PageSpeed optimization</h3>
						<p>Test your website at <a href="https://developers.google.com/speed/pagespeed/insights/?url=<?php print urlencode(home_url()); ?>&amp;hl=<?php print $lgcode;?>" target="_blank">Google PageSpeed Insights</a> and start resolving the issues. Google offers detailed documentation for each issue and this plugin offers the tools to resolve most issues.</p>


						<h3 style="margin-top:0px;padding-bottom:5px;margin-bottom:0px;border-bottom:solid 1px #efefef;">Step 4 - setup a website monitor</h3>
						<p>Once the performance and quality of your website has achieved a perfect state, it is required to maintain it to achieve an optimal reliability, quality and performance reputation in Google. Go to the 	<a href="<?php echo add_query_arg(array( 'page' => 'pagespeed-monitor' ), admin_url('admin.php')); ?>">Monitor tab</a> for information about website monitoring tools.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>