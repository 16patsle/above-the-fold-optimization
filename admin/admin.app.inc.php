<span>
    <?php
		// Admin values
		$admin_values = array(
			'homeUrl' => get_home_url(),
			'adminUrl' => admin_url(),
			'adminTabs' => $this->tabs,
			'abtfrAdminNonce' => wp_nonce_field('abtfr'),
			'abtfrRestNonce' => wp_create_nonce('wp_rest'),
			'lgCode' => $lgcode,
			'utmString' => $utmstring,
			'googleIntlCode' => $this->google_intlcode,
			'wpAbtfrUri' => WPABTFR_URI
		);
	?>
	<input id="admin_values" type="hidden" value="<?php echo htmlspecialchars(json_encode($admin_values), ENT_COMPAT, 'UTF-8', false) ?>"/>
	<script>console.log(<?php echo json_encode($options) ?>, <?php echo json_encode($admin_values) ?>)</script>
</span>
<div id="root">
</div>