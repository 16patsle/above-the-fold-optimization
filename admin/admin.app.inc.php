<span>
    <?php
		// Admin values
		$admin_values = array(
			'homeUrl' => get_home_url(),
			'adminUrl' => admin_url(),
			'adminTabs' => $this->tabs,
			'abtfAdminNonce' => wp_nonce_field('abovethefold'),
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

		// PWA
		$sw = $this->CTRL->pwa->get_sw();

    	// verify service worker
    	if (isset($options['pwa']) && intval($options['pwa']) === 1) {
    	    $this->pwa->install_serviceworker();
		}

		$pwa_service_worker = isset($options['pwa']) && intval($options['pwa']) === 1;
		$pwa_sw_register = !isset($options['pwa_register']) || intval($options['pwa_register']) === 1;
		$pwa_sw_unregister = isset($options['pwa_unregister']) && intval($options['pwa_unregister']) === 1;
		$pwa_sw_scope = '';
		if (isset($options['pwa_scope'])) {
    		$pwa_sw_scope = $options['pwa_scope'];
		}
		$pwa_cache_pages = isset($options['pwa_cache_pages']) && intval($options['pwa_cache_pages']) === 1;
		$pwa_cache_strategy = 'network';
		if (isset($options['pwa_cache_pages_strategy'])) {
			$pwa_cache_strategy = $options['pwa_cache_pages_strategy'];
		}
		$pwa_cache_update_interval = '';
		if (isset($options['pwa_cache_pages_update_interval'])) {
			$pwa_cache_update_interval = $options['pwa_cache_pages_update_interval'];
		}
		$pwa_cache_max_age = '';
		if (isset($options['pwa_cache_pages_max_age'])) {
			$pwa_cache_max_age = $options['pwa_cache_pages_max_age'];
		}
		$pwa_cache_head_update = isset($options['pwa_cache_pages_head_update']) && intval($options['pwa_cache_pages_head_update']) === 1;
		$pwa_cache_update_event = isset($options['pwa_cache_pages_update_notify']) && intval($options['pwa_cache_pages_update_notify']) === 1;
		$pwa_cache_include = '';
		if (isset($options['pwa_cache_pages_include'])) {
			$pwa_cache_include = $options['pwa_cache_pages_include'];
		}
		$pwa_preload_mousedown = isset($options['pwa_preload_mousedown']) && intval($options['pwa_preload_mousedown']) === 1;
		// Offline page
		$pwa_offline_page = '';
		$pwa_offline_page_name = '';
		if (isset($options['pwa_cache_pages_offline']) && trim($options['pwa_cache_pages_offline']) !== '') {
			$pwa_offline_page = $options['pwa_cache_pages_offline'];
            // WordPress URL?
    		$postid = url_to_postid($options['pwa_cache_pages_offline']);
    		if ($postid) {
    		    $pwa_offline_page_name = $postid . '. ' . str_replace(home_url(), '', get_permalink($postid)) . ' - ' . get_the_title($postid);
    		} else {
    		    $pwa_offline_page_name = $options['pwa_cache_pages_offline'];
			}
		}
		$pwa_cache_assets = isset($options['pwa_cache_assets']) && intval($options['pwa_cache_assets']) === 1;
		// asset cache policy
   		$pwa_asset_policy = (isset($options['pwa_cache_assets_policy']) && is_array($options['pwa_cache_assets_policy'])) ? $options['pwa_cache_assets_policy'] : $this->CTRL->pwa->get_sw_default_policy();
		$pwa_offline_class = !isset($options['pwa_offline_class']) || intval($options['pwa_offline_class']) === 1;
		$pwa_cache_max_size = '';
		if (isset($options['pwa_cache_max_size']) && trim($options['pwa_cache_max_size']) !== '') {
			$pwa_cache_max_size = $options['pwa_cache_max_size'];
		}
		$pwa_cache_version = '';
		if (isset($options['pwa_cache_version']) && trim($options['pwa_cache_version']) !== '') {
    		$pwa_cache_version = $options['pwa_cache_version'];
		}
		$pwa_cache_preload = '';
		if (isset($options['pwa_cache_preload'])) {
			$pwa_cache_preload = $options['pwa_cache_preload'];
		}
		$pwa_cache_preload_required = isset($options['pwa_cache_preload_require']) && intval($options['pwa_cache_preload_require']) === 1;
		
		$pwa_manifest_status = false;
		$pwa_manifest_json = array();
		$pwa_manifest = trailingslashit(ABSPATH) . 'manifest.json';
		if (!file_exists($pwa_manifest)) {
        	$pwa_manifest_status = 'not existing';
    	} elseif (!is_writeable($pwa_manifest)) {
    	    $pwa_manifest_status = 'not writable';
    	} else {
			$pwa_manifest_status = 'good';
        	$json = file_get_contents(trailingslashit(ABSPATH) . 'manifest.json');
        	$pwa_manifest_json = @json_decode(trim($json), true);
        	/*if (!is_array($pwa_manifest_json)) {
        	    $pwa_manifest_json = array();
			}*/
    	}

		$pwa_manifest_update = !isset($options['manifest_json_update']) || intval($options['manifest_json_update']) === 1;
		$pwa_manifest_link = !isset($options['pwa_manifest_meta']) || intval($options['pwa_manifest_meta']) === 1;
		$pwa_meta_tags = '';
		if (isset($options['pwa_meta'])) {
			$pwa_meta_tags = $options['pwa_meta'];
		};

		$pwa_settings = array(
			'serviceWorker' => $pwa_service_worker,
			'swRegister' => $pwa_sw_register,
			'swUnregister' => $pwa_sw_unregister,
			'swScope' => $pwa_sw_scope,
			'swScopeCurrent' => $this->CTRL->pwa->get_sw_scope(),
			'cachePages' => $pwa_cache_pages,
			'cacheStrategy' => $pwa_cache_strategy,
			'cacheUpdateInterval' => $pwa_cache_update_interval,
			'cacheMaxAge' => $pwa_cache_max_age,
			'cacheHeadUpdate' => $pwa_cache_head_update,
			'cacheUpdateEvent' => $pwa_cache_update_event,
			'cacheInclude' => $pwa_cache_include,
			'offlinePage' => array(
				'label' => $pwa_offline_page_name,
				'value' => $pwa_offline_page
			),
			'pushNotificationPluginsUrl' => admin_url('plugin-install.php?s=push+notifications&tab=search&type=term'),
			'swFilename' => $sw['filename'],
			'cacheAssets' => $pwa_cache_assets,
			'cacheAssetsPolicy' => $pwa_asset_policy,
			'offlineClass' => $pwa_offline_class,
			'cacheMaxSize' => $pwa_cache_max_size,
			'cacheVersion' => $pwa_cache_version,
			'cachePreload' => $pwa_cache_preload,
			'cachePreloadRequired' => $pwa_cache_preload_required,
			'preloadMousedown' => $pwa_preload_mousedown,
			'manifestStatus' => $pwa_manifest_status,
			'manifestJson' => $pwa_manifest_json,
			'manifestUpdate' => $pwa_manifest_update,
			'manifestLink' => $pwa_manifest_link,
			'metaTags' => $pwa_meta_tags
		);
		
		$admin_values['pwaSettings'] = $pwa_settings;

		// HTTP/2
		$http2_push = isset($options['http2_push']) && intval($options['http2_push'])=== 1;

		// asset cache policy
    	$http2_push_config = (isset($options['http2_push_config']) && is_array($options['http2_push_config'])) ? $options['http2_push_config'] : array();
    	if (!is_array($http2_push_config) || empty($http2_push_config)) {
    	    $http2_push_config = json_decode('[]');
    	} else {
    	    $http2_push_config = $http2_push_config;
		}

		$http2_settings = array(
			'push' => $http2_push,
			'pushConfig' => $http2_push_config
		);

		$admin_values['http2Settings'] = $http2_settings;

		// Proxy
		// Javascript Proxy Enabled?
    	$jsProxy = (isset($options['js_proxy']) && intval($options['js_proxy']) === 1);

		$jsProxyInclude = '';
		if (isset($options['js_proxy_include'])) {
			$jsProxyInclude = $options['js_proxy_include'];
		}
		$jsProxyExclude = '';
		if (isset($options['js_proxy_exclude'])) {
			$jsProxyExclude = $options['js_proxy_exclude'];
		}
		// js preload list
		$jsProxyPreload = '';
    	if (isset($options['js_proxy_preload']) && !empty($options['js_proxy_preload'])) {
        	$jsProxyPreload = array();
        	foreach ($options['js_proxy_preload'] as $url) {
        	    $jsProxyPreload[] = (is_string($url)) ? $url : json_encode($url);
        	}
        	$jsProxyPreload = $this->CTRL->admin->newline_array_string($jsProxyPreload);
    	}

		// CSS Proxy Enabled?
    	$cssProxy = (isset($options['css_proxy']) && intval($options['css_proxy']) === 1);

		$cssProxyInclude = '';
			if (isset($options['css_proxy_include'])) {
			$cssProxyInclude = $options['css_proxy_include'];
		}
		$cssProxyExclude = '';
			if (isset($options['css_proxy_exclude'])) {
			$cssProxyExclude = $options['css_proxy_exclude'];
		}
		// css preload list
		$cssProxyPreload = '';
    	if (isset($options['css_proxy_preload']) && !empty($options['css_proxy_preload'])) {
        	$cssProxyPreload = array();
        	foreach ($options['css_proxy_preload'] as $url) {
        	    $cssProxyPreload[] = (is_string($url)) ? $url : json_encode($url);
        	}
        	$cssProxyPreload = $this->CTRL->admin->newline_array_string($cssProxyPreload);
		}
		
		$proxy_cdn = '';
		if (isset($options['proxy_cdn'])) {
			$proxy_cdn =  htmlentities($options['proxy_cdn'], ENT_COMPAT, 'utf-8');
		}
		$proxy_url = '';
		if (isset($options['proxy_url'])) {
			$proxy_url = htmlentities($options['proxy_url'], ENT_COMPAT, 'utf-8');
		}

		$proxy_settings = array(
			'jsProxy' => $jsProxy,
			'jsProxyInclude' => $jsProxyInclude,
			'jsProxyExclude' => $jsProxyExclude,
			'jsProxyPreload' => $jsProxyPreload,
			'cssProxy' => $cssProxy,
			'cssProxyInclude' => $cssProxyInclude,
			'cssProxyExclude' => $cssProxyExclude,
			'cssProxyPreload' => $cssProxyPreload,
			'proxyCDN' => $proxy_cdn,
			'proxyURL' => $proxy_url
		);

		$admin_values['proxySettings'] = $proxy_settings;

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