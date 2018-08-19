<span>
    <input id="homeUrl" type="hidden" value="<?php echo get_home_url(); ?>" />
    <input id="adminUrl" type="hidden" value="<?php echo admin_url('admin.php'); ?>" />
    <input id="adminTabs" type="hidden" value="<?php echo htmlspecialchars(json_encode($this->tabs)); ?>" />
    <input id="lgcode" type="hidden" value="<?php echo $lgcode; ?>" />
	<input id="google_intlcode" type="hidden" value="<?php echo $this->google_intlcode; ?>" />
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

		$css_settings = '{"delivery":' . json_encode($cssdelivery) . ',"loadCSSEnhanced":' . json_encode($loadcss_enhanced) . ',"renderDelay":' . json_encode($cssdelivery_renderdelay) . ',"position":' . json_encode($cssdelivery_position) . '}'
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
</span>
<div id="root">
</div>