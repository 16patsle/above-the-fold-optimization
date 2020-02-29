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