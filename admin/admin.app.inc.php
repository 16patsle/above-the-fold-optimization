<span>
    <?php
		// Admin values
		$admin_values = array(
			'homeUrl' => get_home_url(),
			'adminUrl' => admin_url(),
			'adminTabs' => $this->tabs,
			'abtfAdminNonce' => wp_nonce_field('abovethefold'),
			'abtfRestNonce' => wp_create_nonce('wp_rest'),
			'lgCode' => $lgcode,
			'utmString' => $utmstring,
			'googleIntlCode' => $this->google_intlcode,
			'wpAbtfUri' => WPABTF_URI
		);

		// HTML
		$html_minify = isset($options['html_minify']) && intval($options['html_minify']) === 1;
		$html_comments = isset($options['html_comments']) && intval($options['html_comments']) === 1;
		$html_comments_preserve = '';
		if(isset($options['html_comments_preserve'])) {
			$html_comments_preserve = $options['html_comments_preserve'];
		}
		$html_search_replace = null;
		if (isset($options['html_search_replace']) && is_array($options['html_search_replace'])) {
    		$html_search_replace = $options['html_search_replace'];
		}
		$html_settings = array(
			'minify' => $html_minify,
			'comments' => $html_comments,
			'commentsPreserve' => $html_comments_preserve,
			'searchReplace' => $html_search_replace
		);

		$admin_values['htmlSettings'] = $html_settings;

		// CSS
		$cssdelivery = isset($options['cssdelivery']) && intval($options['cssdelivery']) === 1;
		$loadcss_enhanced = isset($options['loadcss_enhanced']) && intval($options['loadcss_enhanced']) === 1;
		$cssdelivery_renderdelay = (empty($options['cssdelivery_renderdelay']) || $options['cssdelivery_renderdelay'] === 0) ? '' : htmlentities($options['cssdelivery_renderdelay'], ENT_COMPAT, 'utf-8');
		$cssdelivery_position = 'footer';
		if(isset($options['cssdelivery_position'])){
			$cssdelivery_position = $options['cssdelivery_position'];
		}
		$cssdelivery_ignore = '';
		if (isset($options['cssdelivery_ignore'])) {
			$cssdelivery_ignore = $options['cssdelivery_ignore'];
		}
		$cssdelivery_remove = '';
		if (isset($options['cssdelivery_remove'])) {
			$cssdelivery_remove = $options['cssdelivery_remove'];
		}
		$gwfo = isset($options['gwfo']) && intval($options['gwfo']) === 1;
		$gwfo_loadmethod = 'inline';
		if(isset($options['gwfo_loadmethod']) && $options['gwfo_loadmethod'] !== '') {
			$gwfo_loadmethod = $options['gwfo_loadmethod'];
		}
		$gwfo_loadposition = 'header';
		if(isset($options['gwfo_loadposition']) && $options['gwfo_loadposition'] !== '') {
			$gwfo_loadposition = $options['gwfo_loadposition'];
		}
		$gwfo_config_valid = $options['gwfo_config_valid'];
		$gwfo_config = '';
		if (isset($options['gwfo_config'])) {
			$gwfo_config = htmlentities($options['gwfo_config']);
		}
		$gwfo_googlefonts = '';
		if (isset($options['gwfo_googlefonts'])) {
			$gwfo_googlefonts = $options['gwfo_googlefonts'];
		}
		$gwfo_googlefonts_auto = isset($options['gwfo_googlefonts_auto']) && intval($options['gwfo_googlefonts_auto']) === 1;
		$gwfo_googlefonts_ignore = '';
		if (isset($options['gwfo_googlefonts_ignore'])) {
			$gwfo_googlefonts_ignore = $options['gwfo_googlefonts_ignore'];
		}
		$gwfo_googlefonts_remove = '';
		if (isset($options['gwfo_googlefonts_remove'])) {
			$gwfo_googlefonts_remove = $options['gwfo_googlefonts_remove'];
		}

		/**
    	 * Get version of local loadCSS
    	 */
		$loadcss_version = '';
		$loadcss_version_error = '';
    	$loadcss_package = WPABTF_PATH . 'public/js/src/loadcss_package.json';
    	if (!file_exists($loadcss_package)) {
			$loadcss_version_error = 'not_found';
    	} else {
        	$package = @json_decode(file_get_contents($loadcss_package), true);
        	if (!is_array($package)) {
				$loadcss_version_error = 'failed_parse';
        	} else {
            	// set version
            	$loadcss_version = $package['version'];
        	}
    	}

    	if (empty($loadcss_version)) {
    	    $loadcss_version = '(unknown)';
		}

		/**
         * Get version of local webfont.js
         */
        $webfont_version = $this->CTRL->gwfo->package_version(true);
        if (empty($webfont_version)) {
            $webfont_version = '(unknown)';
		}

		$css_settings = array(
			'delivery' => $cssdelivery,
			'loadCSSEnhanced' => $loadcss_enhanced,
			'renderDelay' => $cssdelivery_renderdelay,
			'position' => $cssdelivery_position,
			'ignore' => $cssdelivery_ignore,
			'remove' => $cssdelivery_remove,
			'gwfo' => $gwfo,
			'gwfoLoadMethod' => $gwfo_loadmethod,
			'gwfoLoadPosition' => $gwfo_loadposition,
			'gwfoConfigValid' => $gwfo_config_valid,
			'gwfoConfig' => $gwfo_config,
			'googleFonts' => $gwfo_googlefonts,
			'googleFontsAuto' => $gwfo_googlefonts_auto,
			'googleFontsIgnore' => $gwfo_googlefonts_ignore,
			'googleFontsRemove' => $gwfo_googlefonts_remove,
			'loadCSSVersion' => array(
				'version' => $loadcss_version,
				'error' => $loadcss_version_error
			),
			'webfontVersion' => $webfont_version,
			'cndVersion' => $this->CTRL->gwfo->cdn_version,
			'fontThemePath' => htmlentities(str_replace(ABSPATH, '/', trailingslashit(get_stylesheet_directory()) . 'fonts/'), ENT_COMPAT, 'utf-8')
		);
		
		$admin_values['cssSettings'] = $css_settings;

		// Javascript
		$jsProxy = (isset($options['js_proxy']) && intval($options['js_proxy']) === 1);

    	if (isset($options['jsdelivery_idle']) && !empty($options['jsdelivery_idle'])) {
    	    foreach ($options['jsdelivery_idle'] as $n => $cnf) {
    	        $options['jsdelivery_idle'][$n] = $cnf[0];
    	        if (isset($cnf[1])) {
    	            $options['jsdelivery_idle'][$n] .= ':' . $cnf[1];
    	        }
    	    }
		}

		$jsdelivery = isset($options['jsdelivery']) && intval($options['jsdelivery']) === 1;

		$jsdelivery_scriptloader = '';
		if(isset($options['jsdelivery_scriptloader'])) {
			$jsdelivery_scriptloader = $options['jsdelivery_scriptloader'];
		}
		$jsdelivery_position = '';
		if(isset($options['jsdelivery_position'])){
			$jsdelivery_position = $options['jsdelivery_position'];
		}
		$jsdelivery_ignore = '';
		if (isset($options['jsdelivery_ignore'])) {
			$jsdelivery_ignore = $options['jsdelivery_ignore'];
		}
		$jsdelivery_remove = '';
		if (isset($options['jsdelivery_remove'])) {
			$jsdelivery_remove = $options['jsdelivery_remove'];
		}
		$jsdelivery_async_all = !isset($options['jsdelivery_async_all']) || intval($options['jsdelivery_async_all']) === 1;
		$jsdelivery_async = '';
		if (isset($options['jsdelivery_async'])){
			$jsdelivery_async = $options['jsdelivery_async'];
		}
		$jsdelivery_async_disabled = '';
		if (isset($options['jsdelivery_async_disabled'])){
			$jsdelivery_async_disabled = $options['jsdelivery_async_disabled'];
		}
		$jsdelivery_idle = '';
		if (isset($options['jsdelivery_idle'])) {
			$jsdelivery_idle = $options['jsdelivery_idle'];
		}
		$jsdelivery_deps = isset($options['jsdelivery_deps']) && intval($options['jsdelivery_deps']) === 1;
		$jsdelivery_jquery = !isset($options['jsdelivery_jquery']) || intval($options['jsdelivery_jquery']) === 1;
		$js_lazyscripts_enabled = isset($options['lazyscripts_enabled']) && intval($options['lazyscripts_enabled']) === 1;

		$javascript_settings = array(
			'proxy' => $jsProxy,
			'delivery' => $jsdelivery,
			'scriptLoader' => $jsdelivery_scriptloader,
			'position' => $jsdelivery_position,
			'ignore' => $jsdelivery_ignore,
			'remove' => $jsdelivery_remove,
			'forceAsync' => $jsdelivery_async_all,
			'async' => $jsdelivery_async,
			'asyncDisabled' => $jsdelivery_async_disabled,
			'idleDelivery' => $jsdelivery_idle,
			'abideDeps' => $jsdelivery_deps,
			'jqueryStub' => $jsdelivery_jquery,
			'lazyScripts' => $js_lazyscripts_enabled,
			'lazyloadPluginsUrl' => admin_url('plugin-install.php?s=Lazy+Load+XT&tab=search&type=term')
		);

		$admin_values['javascriptSettings'] = $javascript_settings;

		// Settings
		$settings_adminbar = !isset($options['adminbar']) || intval($options['adminbar']) === 1;
		$settings_clear_pagecache = !isset($options['clear_pagecache']) || intval($options['clear_pagecache']) === 1;
		$settings_debug = isset($options['debug']) && intval($options['debug']) === 1;

		$client_hashes = false;

		$site_url = wp_nonce_url(trailingslashit(site_url()), 'csp_hash_json', 'abtf-csp-hash');
	
		try {
			$json = file_get_contents($site_url);
		} catch (Exception $err) {
			$json = false;
		}
		if ($json) {
			$client_hashes = json_decode($json);
		}

		$settings_settings = array(
			'adminbar' => $settings_adminbar,
			'clearPageCache' => $settings_clear_pagecache,
			'debug' => $settings_debug,
			'clientHashes' => $client_hashes
		);

		$admin_values['settingsSettings'] = $settings_settings;

		// Monitor
		$uptimerobot_install_link = false;
		$uptimerobot_overview = false;
		
		if (is_plugin_inactive('uptime-robot-monitor/uptime-robot-nh.php')) {
			$uptimerobot_status = 'not installed';

			$uptimerobot_action = 'install-plugin';
        	$uptimerobot_slug = 'uptime-robot-monitor';
        	$uptimerobot_install_link = wp_nonce_url(
        	    add_query_arg(
        	        array(
        	            'action' => $uptimerobot_action,
						'plugin' => $uptimerobot_slug
					),
        	        admin_url('update.php')
        	    ),
            	$uptimerobot_action.'_'.$uptimerobot_slug
        	);
		} elseif (is_plugin_active('uptime-robot-monitor/uptime-robot-nh.php')) {
        	if (!function_exists('urpro_data') || urpro_data("apikey", "no") === "") {
        	    $uptimerobot_status = 'not configured';
        	} else {
				$uptimerobot_status = 'active';
        	    $uptimerobot_overview = do_shortcode('[uptime-robot days="1-7-14-180"]') .
        	    do_shortcode('[uptime-robot-response]');
        	}
		}

		$monitor_settings = array(
			'uptimerobotStatus' => $uptimerobot_status,
			'uptimerobotInstallLink' => $uptimerobot_install_link,
			'uptimerobotOverview' => $uptimerobot_overview
		);
		
		$admin_values['monitorSettings'] = $monitor_settings;
	?>
	<input id="admin_values" type="hidden" value="<?php echo htmlspecialchars(json_encode($admin_values), ENT_COMPAT, 'UTF-8', false) ?>"/>
	<script>console.log(<?php echo json_encode($options) ?>, <?php echo json_encode($admin_values) ?>)</script>
</span>
<div id="root">
</div>