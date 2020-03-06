<?php

/**
 * Fired when the plugin is uninstalled.
 *
 * @link       https://github.com/16patsle/
 * @since      2.5.0
 *
 * @package    abtfr
 */

if (! defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

// remove settings
$options_to_remove = array(
    'abtfr',
    'abtfr-proxy-stats',
    'abtfr-criticalcss',
    'abtfr-build-tool-default',
    'abtfr_notices',
    'abtfr_version',
    'abtfr_lazyxt_version',
    'abtfr_webfontjs_version'
);
foreach ($options_to_remove as $option) {
    delete_option($option);
}

// remove cron
wp_clear_scheduled_hook('abtfr_cron');

// remove above the fold cache directory
if (defined('ABTFR_CACHE_DIR') && strpos(ABTFR_CACHE_DIR, '/abtfr/') !== false) {
    $path = trailingslashit(ABTFR_CACHE_DIR);
    if (is_dir($path)) {

    // Recursive delete
        function abtfr_rmdir_recursive($dir)
        {
            $files = array_diff(scandir($dir), array('.','..'));
            foreach ($files as $file) {
                (is_dir("$dir/$file")) ? abtfr_rmdir_recursive("$dir/$file") : @unlink("$dir/$file");
            }

            return @rmdir($dir);
        }
        abtfr_rmdir_recursive($path);
    }
}

// remove service worker
$path = trailingslashit(ABSPATH);
$sw_files = array(
    'abtfr-pwa.js',
    'abtfr-pwa.debug.js',
    'abtfr-pwa-config.json'
);
foreach ($sw_files as $file) {
    if (file_exists($path . $file)) {
        @unlink($path . $file);
    }
}
