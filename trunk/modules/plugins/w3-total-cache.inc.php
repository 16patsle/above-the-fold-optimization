<?php

/**
 * W3 Total Cache module
 *
 * @link       https://wordpress.org/plugins/w3-total-cache/
 *
 * @since      2.5.0
 * @package    abovethefold
 * @subpackage abovethefold/modules/plugins
 * @author     PageSpeed.pro <info@pagespeed.pro>
 */

class Abovethefold_OPP_W3TotalCache extends Abovethefold_OPP {

	/**
	 * Plugin file reference
	 */
	public $plugin_file = 'w3-total-cache/w3-total-cache.php';

	/**
	 * Config data
	 */
	private $config;

	/**
	 * Page cache callback
	 */
	private $pagecache_callback;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @var      object    $CTRL       The above the fold admin controller..
	 */
	public function __construct( &$CTRL ) {
		parent::__construct( $CTRL );

		// Is the plugin enabled?
		if ( !$this->active() ) {
			return;
		} 

	   /**
		* Skip CSS minification
		*/
		$this->CTRL->loader->add_filter( 'w3tc_minify_css_do_tag_minification', $this, 'skip_css' );

	   /**
		* Skip Javascript minification
		*/
		$this->CTRL->loader->add_filter( 'w3tc_minify_js_do_tag_minification', $this, 'skip_js' );

	}

	/**
	 * Load config
	 */
	public function get_config() {
		if (!$this->config) {
			if (class_exists('\\W3TC\\Dispatcher')) {
				$classname = '\\W3TC\\Dispatcher';
				$this->config = $classname::config();
				return $this->config;
			}
			return false;
		}
		return $this->config;
	}

	/**
	 * Is plugin active?
	 */
	public function active($type = false) {

		if ( $this->CTRL->plugins->active( $this->plugin_file ) ) {

			// plugin is active
			if (!$type) {
				return true;
			}

			// get W3 config
			if (!$this->get_config()) {
				return false;
			}

			// verify if plugin is active for optimization type
			switch($type) {

				case "html_output_buffer": // hook to W3TC Output Buffer
					return true;
				break;

				// Javascript optimization?
				case "js":
					return ($this->config->get_boolean( 'minify.enabled' ) && $this->config->get_boolean( 'minify.js.enable' ));
				break;

				// CSS optimization?
				case "css":
					return ($this->config->get_boolean( 'minify.enabled' ) && $this->config->get_boolean( 'minify.css.enable' ));
				break;

				// HTML optimization?
				case "html":
					return ($this->config->get_boolean( 'minify.enabled' ) && $this->config->get_boolean( 'minify.html.enable' ));
				break;
			}

			return false;
		}

		return false; // not active
	}

	/**
	 * Skip CSS from minificaiton
	 */
	public function skip_css($do_tag_minification, $style_tag, $file) {

		if (!$do_tag_minification) {
			return false;
		}

		if (strpos($style_tag,'rel="abtf"') !== false) {
			return false;
		}

		return true;
	}

	/**
	 * Skip Javascript from Autoptimize minificaiton
	 */
	public function skip_js($do_tag_minification, $style_tag, $file) {
		if (!$do_tag_minification) {
			return false;
		}

		if (strpos($style_tag,'rel="abtf"') !== false) {
			return false;
		}

		return true;
	}

	/**
	* Process minified CSS 
	* /
	public function process_minified_css($css) {
		return apply_filters('abtf_css', $css);
	}

	/**
	 * Process HTML
	 * /
	public function process_minified_html($html) {
		return apply_filters('abtf_html', $html);
	}*/

	/**
	 * Disable CSS minification
	 */
	public function disable_css_minify() {

	   /**
		* Add Autoptimize filter to disable CSS optimization
		*/
		$this->CTRL->loader->add_filter( 'w3tc_minify_css_enable', $this, 'noptimize' );
	}

	/**
	 * Disable HTML minification
	 */
	public function disable_html_minify() {

	   /**
		* Add Autoptimize filter to disable CSS optimization
		*/
		$this->CTRL->loader->add_filter( 'w3tc_minify_html_enable', $this, 'noptimize' );
	}

	/**
	 * Disable Javascript minification
	 */
	public function disable_js_minify() {

	   /**
		* Add Autoptimize filter to disable CSS optimization
		*/
		$this->CTRL->loader->add_filter( 'w3tc_minify_js_enable', $this, 'noptimize' );
	}

	/**
	 * Disable optimization
	 */
	public function noptimize() {
		return false;
	}

	/**
	 * Clear cache
	 */
	public function clear_pagecache() {

		if (function_exists('w3tc_pgcache_flush')) {

			// clean the page cache
			w3tc_pgcache_flush();
		}

		if (function_exists('w3tc_minify_flush')) {
			
			// clean minify cache
			w3tc_minify_flush();
		}
	}

	/**
	 * Handle output buffer
	 */
	public function ob_callback($buffer) {

		// apply Above The Fold Optimization
		$buffer = $this->CTRL->optimization->process_output_buffer($buffer);

		// apply W3 Total Cache pagecache output filter
		if ($this->pagecache_callback) {
			if ( is_callable( $this->pagecache_callback ) ) {
				$buffer = call_user_func( $this->pagecache_callback, $buffer );
			}
		}

		return $buffer;
	}

	/**
	 * HTML output hook
	 *
	 * The goal is to apply above the fold optimization after the output of optimization plugins, but before full page cache.
	 *
	 * @note The availability of this method will override the Above The Fold output buffer! It will require you to make sure the buffer functions well with any (on/off) settings.
	 *
	 * Use the active() -> "html_output_buffer" method above to enable/disable this HTML output buffer hook.
	 */
	public function html_output_hook($optimization) {

		// check if pagecache output buffer is started
		if ( isset( $GLOBALS['_w3tc_ob_callbacks']['pagecache'] ) ) {
			$this->pagecache_callback = $GLOBALS['_w3tc_ob_callbacks']['pagecache'];
		}

		// set / replace pagecache output buffer callback with Above The Fold customized callback
		$GLOBALS['_w3tc_ob_callbacks']['pagecache'] = array($this, 'ob_callback');

		return true;
	}

}