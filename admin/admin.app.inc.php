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
    'wpAbtfrUri' => WPABTFR_URI,
    'criticalCssEditorUrl' => $this->CTRL->view_url('critical-css-editor'),
    'extractCssKey' => md5(SECURE_AUTH_KEY . AUTH_KEY),
    'buildToolPrefillValues' => array()
);

$default = get_option('abtfr-build-tool-default');
if (!is_array($default)) {
    $default = array();
}

$admin_values['buildToolPrefillValues']['taskname'] = isset($_REQUEST['taskname'])
    ? trim($_REQUEST['taskname'])
    : (isset($default['taskname'])
        ? trim($default['taskname'])
        : '');
$admin_values['buildToolPrefillValues']['dimensions'] = isset($_REQUEST['dimensions'])
    ? $_REQUEST['dimensions']
    : (isset($default['dimensions'])
        ? $default['dimensions']
        : '');
$admin_values['buildToolPrefillValues']['extra'] =
    isset($_REQUEST['extra']) && $_REQUEST['extra']
        ? true
        : (isset($default['extra']) && $default['extra']
            ? true
            : false);
$admin_values['buildToolPrefillValues']['update'] = isset($_REQUEST['update'])
    ? trim($_REQUEST['update'])
    : (isset($default['update'])
        ? $default['update']
        : '');
?>
<span>
	<input id="admin_values" type="hidden" value="<?php echo htmlspecialchars(
     json_encode($admin_values),
     ENT_COMPAT,
     'UTF-8',
     false
 ); ?>"/>
	<script>console.log(<?php echo json_encode(
     $options
 ); ?>, <?php echo json_encode($admin_values); ?>)</script>
</span>
<div id="root">
</div>