<span>
    <input id="homeUrl" type="hidden" value="<?php echo get_home_url(); ?>" />
    <input id="adminUrl" type="hidden" value="<?php echo admin_url('admin.php'); ?>" />
    <input id="adminTabs" type="hidden" value="<?php echo htmlspecialchars(json_encode($this->tabs)); ?>" />
    <input id="lgcode" type="hidden" value="<?php echo $lgcode; ?>" />
	<input id="google_intlcode" type="hidden" value="<?php echo $this->google_intlcode; ?>" />
	<input id="utmstring" type="hidden" value="<?php echo $utmstring; ?>" />
	<!-- HTML -->
	<input id="admin_url_html_update" type="hidden" value="<?php echo admin_url('admin-post.php?action=abtf_html_update'); ?>" />
	<div id="admin_nonce_html" type="hidden"><?php echo wp_nonce_field('abovethefold'); ?></div>
	<?php
		$html_minify = isset($options['html_minify']) && intval($options['html_minify']) === 1;
		$html_comments = isset($options['html_comments']) && intval($options['html_comments']) === 1;
		$html_comments_preserve = '';
		if(isset($options['html_comments_preserve'])) {
			$html_comments_preserve = $options['html_comments_preserve'];
		}
		$html_settings = '{"minify":' . json_encode($html_minify) . ',"comments":' . json_encode($html_comments) . ',"comments_preserve":' . json_encode($html_comments_preserve) . '}'
	?>
	<input id="html_settings" type="hidden" value='<?php echo $html_settings ?>'/>
	<input type="hidden" name="abovethefold[html_search_replace]" id="html_search_replace_src_server" value="<?php if (isset($options['html_search_replace']) && is_array($options['html_search_replace'])) {
		echo esc_attr(json_encode($options['html_search_replace']));
	} ?>"  />
	<!-- CSS -->
	<input id="admin_url_css_update" type="hidden" value="<?php echo admin_url('admin-post.php?action=abtf_css_update'); ?>" />
	<div id="admin_nonce_css" type="hidden"><?php echo wp_nonce_field('abovethefold'); ?></div>
	<?php
		$cssdelivery = isset($options['cssdelivery']) && intval($options['cssdelivery']) === 1;
		$loadcss_enhanced = isset($options['loadcss_enhanced']) && intval($options['loadcss_enhanced']) === 1;
		$cssdelivery_renderdelay = (empty($options['cssdelivery_renderdelay']) || $options['cssdelivery_renderdelay'] === 0) ? '' : htmlentities($options['cssdelivery_renderdelay'], ENT_COMPAT, 'utf-8');
		$cssdelivery_position = '';
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
		$gwfo_loadmethod = '';
		if(isset($options['gwfo_loadmethod'])) {
			$gwfo_loadmethod = $options['gwfo_loadmethod'];
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
		$gwfo_googlefonts_ignore = '';
		if (isset($options['gwfo_googlefonts_ignore'])) {
			$gwfo_googlefonts_ignore = $options['gwfo_googlefonts_ignore'];
		}
		$gwfo_googlefonts_remove = '';
		if (isset($options['gwfo_googlefonts_remove'])) {
			$gwfo_googlefonts_remove = $options['gwfo_googlefonts_remove'];
		}

		$css_settings = 
		'{"delivery":' . json_encode($cssdelivery) . 
		',"loadCSSEnhanced":' . json_encode($loadcss_enhanced) . 
		',"renderDelay":' . json_encode($cssdelivery_renderdelay) . 
		',"position":' . json_encode($cssdelivery_position) . 
		',"ignore":' . json_encode($cssdelivery_ignore) . 
		',"remove":' . json_encode($cssdelivery_remove) . 
		',"gwfo":' . json_encode($gwfo) . 
		',"gwfoLoadMethod":' . json_encode($gwfo_loadmethod) . 
		',"gwfoConfigValid":' . json_encode($gwfo_config_valid) . 
		',"gwfoConfig":' . json_encode($gwfo_config) . 
		',"googleFonts":' . json_encode($gwfo_googlefonts) . 
		',"googleFontsIgnore":' . json_encode($gwfo_googlefonts_ignore) . 
		',"googleFontsRemove":' . json_encode($gwfo_googlefonts_remove) . 
		'}'
	?>
	<input id="css_settings"  type="hidden" value='<?php echo $css_settings ?>'/>
	<?php
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
	?>
	<input id="loadcss_version"  type="hidden" value='<?php echo '{ "version": ' . json_encode($loadcss_version) . ', "error": ' . json_encode($loadcss_version_error) . ' }' ?>'/>
	<?php
		/**
         * Get version of local webfont.js
         */
        $webfont_version = $this->CTRL->gwfo->package_version(true);
        if (empty($webfont_version)) {
            $webfont_version = '(unknown)';
        }
	?>
	<input id="webfont_version"  type="hidden" value='<?php echo $webfont_version ?>'/>
	<input id="cdn_version"  type="hidden" value='<?php echo $this->CTRL->gwfo->cdn_version ?>'/>
	<input id="font_theme_path"  type="hidden" value='<?php print htmlentities(str_replace(ABSPATH, '/', trailingslashit(get_stylesheet_directory()) . 'fonts/'), ENT_COMPAT, 'utf-8'); ?>'/>
	<!-- Javascript -->
	<input id="admin_url_javascript_update" type="hidden" value="<?php echo admin_url('admin-post.php?action=abtf_javascript_update'); ?>" />
	<div id="admin_nonce_javascript" type="hidden"><?php echo wp_nonce_field('abovethefold'); ?></div>
	<?php
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

	$javascript_settings = 
		'{"proxy":' . json_encode($jsProxy) . 
		',"delivery":' . json_encode($jsdelivery) .  
		',"scriptLoader":' . json_encode($jsdelivery_scriptloader) .
		',"position":' . json_encode($jsdelivery_position) . 
		',"ignore":' . json_encode($jsdelivery_ignore) . 
		',"remove":' . json_encode($jsdelivery_remove) . 
		',"forceAsync":' . json_encode($jsdelivery_async_all) . 
		',"async":' . json_encode($jsdelivery_async) . 
		',"asyncDisabled":' . json_encode($jsdelivery_async_disabled) . 
		',"idleDelivery":' . json_encode($jsdelivery_idle) . 
		',"abideDeps":' . json_encode($jsdelivery_deps) . 
		',"jqueryStub":' . json_encode($jsdelivery_jquery) . 
		',"lazyScripts":' . json_encode($js_lazyscripts_enabled) . 
		'}'

	?>
	<input id="javascript_settings" type="hidden" value='<?php echo $javascript_settings ?>'/>
	<input id="lazyload_plugins_url" type="hidden" value="<?php print admin_url('plugin-install.php?s=Lazy+Load+XT&tab=search&type=term'); ?>">
	<!-- Settings -->
	<input id="admin_url_settings_update" type="hidden" value="<?php echo admin_url('admin-post.php?action=abtf_settings_update'); ?>" />
	<div id="admin_nonce_settings" type="hidden"><?php echo wp_nonce_field('abovethefold'); ?></div>
	<?php
		$settings_adminbar = !isset($options['adminbar']) || intval($options['adminbar']) === 1;
		$settings_clear_pagecache = !isset($options['clear_pagecache']) || intval($options['clear_pagecache']) === 1;
		$settings_debug = isset($options['debug']) && intval($options['debug']) === 1;

		$settings_settings = 
		'{"adminbar":' . json_encode($settings_adminbar) . 
		',"clearPagecache":' . json_encode($settings_clear_pagecache) .  
		',"debug":' . json_encode($settings_debug) .
		'}'
	?>
	<input id="settings_settings"  type="hidden" value='<?php echo $settings_settings ?>'/>
	<?php
		$client_hashes = false;

		$site_url = wp_nonce_url(trailingslashit(site_url()), 'csp_hash_json', 'abtf-csp-hash');
	
		try {
			$json = file_get_contents($site_url);
		} catch (Exception $err) {
			$json = false;
		}
		if ($json) {
			$client_hashes = $json;
		}
	?>
	<input id="client_hashes"  type="hidden" value='<?php echo $client_hashes ?>'/>
</span>
<div id="root">
</div>