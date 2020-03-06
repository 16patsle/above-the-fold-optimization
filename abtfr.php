<?php
/**
 * ABTF Reborn
 *
 * WordPress optimization toolkit with a focus on SEO. This plugin enables to achieve a Google PageSpeed 100 Score. Supports most optimization, minification and full page cache plugins.
 *
 * @link              https://github.com/16patsle/
 * @since             1.0
 * @package           abtfr
 *
 * @wordpress-plugin
 * Plugin Name:       ABTF Reborn
 * Description:       WordPress optimization toolkit with a focus on SEO. This plugin enables to achieve a Google PageSpeed 100 Score. Supports most optimization, minification and full page cache plugins.
 * Version:           2.10.0
 * Author:            Optimization.Team, Patrick Sletvold
 * Author URI:        https://github.com/16patsle/
 * GitHub Plugin URI: https://github.com/16patsle/abtf-reborn
 * Text Domain:       abtfr
 * Domain Path:       /languages
 */

define('WPABTFR_VERSION', '2.10.0');
define('WPABTFR_URI', plugin_dir_url(__FILE__));
define('WPABTFR_PATH', plugin_dir_path(__FILE__));
define('WPABTFR_SELF', __FILE__);

# cache directory
define('ABTFR_CACHE_DIR', trailingslashit(WP_CONTENT_DIR) . 'cache/abtfr/');
define('ABTFR_CACHE_URL', trailingslashit(WP_CONTENT_URL) . 'cache/abtfr/');

if (! defined('WPINC')) {
    die; //
}

/**
 * The core plugin class that is used to define internationalization,
 * admin dashboard hooks and optimization hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/abtfr.class.php';

/**
 * Begins execution of optimization.
 *
 * The plugin is based on hooks, starting the plugin from here does not impact load speed.
 *
 * @since    1.0
 */
function run_ABTFR()
{
    $GLOBALS['ABTFR'] = new ABTFR();
    $GLOBALS['ABTFR']->run();
}
run_ABTFR();
