<?php

/**
 * The dashboard-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the dashboard-specific stylesheet and JavaScript.
 *
 * @since      2.0
 * @package    abtfr
 * @subpackage abtfr/admin
 * @author     Optimization.Team <info@optimization.team>
 * @author     Patrick Sletvold
 */

class ABTFR_Admin {
    /**
     * Above the fold controller
     */
    public $CTRL;

    /**
     * Options
     */
    public $options;

    /**
     * Controllers
     */
    public $criticalcss;
    public $css;
    public $javascript;
    public $proxy;
    public $settings;

    /**
     * Google language code
     */
    public $google_lgcode;
    public $google_intlcode;

    /**
     * Tabs
     */
    public $tabs = array(
        'intro' => 'Intro',
        'html' => 'HTML',
        'css' => 'CSS',
        'javascript' => 'Javascript',
        'criticalcss' => 'Critical CSS',
        'pwa' => 'PWA', // PWA Validation
        'http2' => 'HTTP/2',
        'proxy' => 'Proxy',
        'settings' => 'Settings',
        'build-tool' => 'Critical CSS Creator',
        'criticalcss-test' => 'Quality Test',
        'monitor' => 'Monitor'
    );

    /**
     * Google Analytics UTM string for external links
     */
    public $utm_string = 'utm_source=wordpress&amp;utm_medium=plugin&amp;utm_term=optimization&amp;utm_campaign=Above%20The%20Fold%20Optimization';

    /**
     * Initialize the class and set its properties
     */
    public function __construct(&$CTRL) {
        $this->CTRL = &$CTRL;
        $this->options = &$CTRL->options;

        // Upgrade plugin
        $this->CTRL->loader->add_action('plugins_loaded', $this, 'upgrade', 10);

        // Configure admin bar menu
        if (
            !isset($this->CTRL->options['adminbar']) ||
            intval($this->CTRL->options['adminbar']) === 1
        ) {
            $this->CTRL->loader->add_action(
                'admin_bar_menu',
                $this,
                'admin_bar',
                100
            );

            // Hook in the frontend admin related styles and scripts
            $this->CTRL->loader->add_action(
                'wp_enqueue_scripts',
                $this,
                'enqueue_frontend_scripts',
                30
            );
        }

        // Register REST API routes from the controller.
        $this->CTRL->loader->add_action(
            'rest_api_init',
            $this,
            'register_rest_routes'
        );

        /**
         * Admin panel specific
         */
        if (is_admin()) {
            /**
             * lgcode for Google Documentation links
             */
            $lgcode = strtolower(get_locale());
            if (strpos($lgcode, '_') !== false) {
                $lgparts = explode('_', $lgcode);
                $lgcode = $lgparts[0];
                $this->google_intlcode = $lgparts[0] . '-' . $lgparts[1];
            }
            if ($lgcode === 'en') {
                $lgcode = '';
            }

            $this->google_lgcode = $lgcode;
            if (!$this->google_intlcode) {
                $this->google_intlcode = 'en-us';
            }

            // Redirect to correct admin page
            $this->CTRL->loader->add_action(
                'admin_init',
                $this,
                'admin_redirects',
                30
            );

            // Hook in the admin options page
            $this->CTRL->loader->add_action(
                'admin_menu',
                $this,
                'admin_menu',
                30
            );

            // Add link preload in head
            $this->CTRL->loader->add_action(
                'admin_head',
                $this,
                'add_link_preload',
                30
            );

            // Hook in the admin styles and scripts
            $this->CTRL->loader->add_action(
                'admin_enqueue_scripts',
                $this,
                'enqueue_scripts',
                30
            );

            // add settings link to plugin overview
            $this->CTRL->loader->add_filter(
                'plugin_action_links_abtfr/abtfr.php',
                $this,
                'settings_link'
            );

            // Handle admin notices
            $this->CTRL->loader->add_action(
                'admin_notices',
                $this,
                'show_notices'
            );

            // Update body class
            $this->CTRL->loader->add_filter(
                'admin_body_class',
                $this,
                'admin_body_class'
            );

            // AJAX page search
            $this->CTRL->loader->add_action(
                'wp_ajax_abtfr_page_search',
                $this,
                'ajax_page_search'
            );

            /**
             * Load dependencies
             */
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.criticalcss.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.html.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.css.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.javascript.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.pwa.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.http2.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.proxy.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.settings.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.build-tool.class.php';
            require_once plugin_dir_path(dirname(__FILE__)) .
                'admin/admin.monitor.class.php';

            /**
             * Load critical CSS management
             */
            $this->criticalcss = new ABTFR_Admin_CriticalCSS($CTRL);

            /**
             * Load CSS management
             */
            $this->css = new ABTFR_Admin_CSS($CTRL);

            /**
             * Load HTML management
             */
            $this->html = new ABTFR_Admin_HTML($CTRL);

            /**
             * Load Javascript management
             */
            $this->javascript = new ABTFR_Admin_Javascript($CTRL);

            /**
             * Load PWA management
             */
            $this->pwa = new ABTFR_Admin_PWA($CTRL);

            /**
             * Load HTTP/2 management
             */
            $this->http2 = new ABTFR_Admin_HTTP2($CTRL);

            /**
             * Load proxy management
             */
            $this->proxy = new ABTFR_Admin_Proxy($CTRL);

            /**
             * Load settings management
             */
            $this->settings = new ABTFR_Admin_Settings($CTRL);

            /**
             * Load settings management
             */
            $this->buildtool = new ABTFR_Admin_BuildTool($CTRL);

            /**
             * Load monitor management
             */
            $this->monitor = new ABTFR_Admin_Monitor($CTRL);
        }
    }

    /**
     * Redirect admin pages.
     *
     * Redirect specific admin page to another specific admin page.
     *
     * @author Michael Ecklund
     * @see https://wordpress.stackexchange.com/questions/52114/admin-page-redirect
     *
     * @return void
     */
    function admin_redirects() {
        global $pagenow;

        # Check current admin page.
        if ($pagenow == 'admin.php' && isset($_GET['page'])) {
            switch ($_GET['page']) {
                case 'abtfr-html':
                case 'abtfr-css':
                case 'abtfr-javascript':
                case 'abtfr-criticalcss':
                case 'abtfr-pwa':
                case 'abtfr-http2':
                case 'abtfr-proxy':
                case 'abtfr-settings':
                case 'abtfr-monitor':
                    wp_redirect(
                        add_query_arg(
                            array('page' => 'abtfr'),
                            admin_url('admin.php')
                        ) .
                            '#/' .
                            str_replace('abtfr-', '', $_GET['page']),
                        301
                    );
                    exit();
                    break;
            }
        }
    }

    /**
     * Set body class
     */
    public function admin_body_class($classes) {
        return "$classes abtfr-criticalcss";
    }

    /**
     * Settings link on plugin overview
     */
    public function settings_link($links) {
        $settings_link =
            '<a href="' .
            add_query_arg(array('page' => 'abtfr'), admin_url('admin.php')) .
            '">' .
            __('Settings', 'abtfr') .
            '</a>';
        array_unshift($links, $settings_link);

        return $links;
    }

    /**
     * Get active tab
     */
    public function active_tab($default = 'criticalcss') {
        // get tab from query string
        $tab = $default;

        // page based tab
        if (isset($_GET['page']) && strpos($_GET['page'], 'abtfr-') === 0) {
            $tab = substr($_GET['page'], 10);
            if ($tab === 'above-the-fold') {
                $tab = 'criticalcss';
            }
            if (isset($this->tabs[$tab])) {
                $this->active_tab = $tab;
            }
        }

        // invalid tab
        if (!isset($this->tabs[$tab])) {
            $tab = $default;
        }

        return $tab;
    }

    /**
     * Add link preload for API
     */
    public function add_link_preload($hook) {
        echo '<link rel="preload" href="' . get_home_url() . '/wp-json/abtfr/v1/settings" as="fetch" crossorigin="anonymous">';
    }

    /**
     * Enqueue scripts and styles
     */
    public function enqueue_scripts($hook) {
        if (!isset($_REQUEST['page']) || strpos($_GET['page'], 'abtfr') !== 0) {
            return;
        }

        /**
         * Clear page cache
         */
        if (
            (isset($_REQUEST['clear']) && $_REQUEST['clear'] === 'pagecache') ||
            isset($_POST['clear_pagecache'])
        ) {
            check_admin_referer('abtfr');

            $this->clear_pagecache();

            wp_redirect(
                add_query_arg(
                    array('page' => 'abtfr'),
                    admin_url('admin.php')
                ) . '#/settings'
            );
            exit();
        }

        // add general admin javascript
        //wp_enqueue_script('abtfr_admincp', plugin_dir_url(__FILE__) . 'js/admincp.min.js', array( 'jquery' ), WPABTFR_VERSION);

        // add general admin CSS
        //wp_enqueue_style('abtfr_admincp', plugin_dir_url(__FILE__) . 'css/admincp.min.css', false, WPABTFR_VERSION);

        // add admin-app JS
        $react_dir = plugin_dir_url(__FILE__) . 'admin-app/build/';
        $react_script_path = '/admin-app/build/index.js';
        $react_script_asset_path = '/admin-app/build/index.asset.php';
        $react_script_asset = file_exists(__DIR__ . $react_script_asset_path)
            ? require __DIR__ . $react_script_asset_path
            : array(
                'dependencies' => array(),
                'version' => filemtime(__DIR__ . $react_script_path)
            );

        //React dynamic loading
        wp_enqueue_script(
            'abtfr_react_main',
            plugins_url($react_script_path, __FILE__),
            $react_script_asset['dependencies'],
            $react_script_asset['version'],
            true
        );

        // Load JS and CSS chunks from asset manifest
        $asset_manifest_json = array();
        $asset_manifest = __DIR__ . '/admin-app/build/asset-manifest.json';
        if (file_exists($asset_manifest)) {
            $json = file_get_contents($asset_manifest);
            $asset_manifest_json = @json_decode(trim($json), true);
            // Loop through and load entrypoints
            foreach (
                $asset_manifest_json['entrypoints']
                as $key => $entrypoint
            ) {
                // Don't load index.js and index.asset.php
                if ($key > 1) {
                    // Is it a css file?
                    if (preg_match('/\.css$/', $entrypoint)) {
                        wp_enqueue_style(
                            'abtfr_react_chunk_' . $key,
                            plugins_url(
                                '/admin-app/build/' . $entrypoint,
                                __FILE__
                            ),
                            array(),
                            $react_script_asset['version']
                        );
                    } else {
                        wp_enqueue_script(
                            'abtfr_react_chunk_' . $key,
                            plugins_url(
                                '/admin-app/build/' . $entrypoint,
                                __FILE__
                            ),
                            array('abtfr_react_main'),
                            $react_script_asset['version'],
                            true
                        );
                    }
                }
            }
        }

        echo '<input id="reactDir" type="hidden" value="' . $react_dir . '" />';
    }

    /**
     * Enqueue admin bar widget scripts
     */
    public function enqueue_frontend_scripts($hook) {
        if (!is_admin_bar_showing()) {
            return;
        }

        // add global admin CSS
        wp_enqueue_style(
            'abtfr_admincp_global',
            plugin_dir_url(__FILE__) . 'css/admincp-global.min.css',
            false,
            WPABTFR_VERSION
        );

        // add general admin javascript
        wp_enqueue_script(
            'abtfr_css_extract_widget',
            plugin_dir_url(__FILE__) . 'js/css-extract-widget.min.js',
            array('jquery'),
            WPABTFR_VERSION
        );
    }

    /**
     * Admin menu option
     */
    public function admin_menu() {
        global $submenu;

        add_menu_page(
            __('Above the Fold Reborn', 'abtfr'),
            __('ABTF Reborn', 'abtfr'),
            'manage_options',
            'abtfr',
            array(&$this, 'settings_page'),
            $this->admin_icon(),
            100
        );

        add_submenu_page(
            'abtfr',
            __('Critical CSS (Above The Fold) Optimization', 'abtfr'),
            __('Critical CSS', 'abtfr'),
            'manage_options',
            'abtfr-criticalcss',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('HTML Optimization', 'abtfr'),
            __('HTML', 'abtfr'),
            'manage_options',
            'abtfr-html',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('CSS Optimization', 'abtfr'),
            __('CSS', 'abtfr'),
            'manage_options',
            'abtfr-css',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('Javascript Optimization', 'abtfr'),
            __('Javascript', 'abtfr'),
            'manage_options',
            'abtfr-javascript',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('Progressive Web App Optimization', 'abtfr'),
            __('PWA', 'abtfr'),
            'manage_options',
            'abtfr-pwa',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('HTTP/2 Optimization', 'abtfr'),
            __('HTTP/2', 'abtfr'),
            'manage_options',
            'abtfr-http2',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('External Resource Proxy', 'abtfr'),
            __('Proxy', 'abtfr'),
            'manage_options',
            'abtfr-proxy',
            array(&$this, 'settings_page')
        );

        add_submenu_page(
            'abtfr',
            __('Settings', 'abtfr'),
            __('Settings', 'abtfr'),
            'manage_options',
            'abtfr-settings',
            array(&$this, 'settings_page')
        );

        /**
         * Add theme settings link to Appearance tab
         */
        add_submenu_page(
            'themes.php',
            __('ABTF Reborn', 'abtfr'),
            __('Above The Fold', 'abtfr'),
            'manage_options',
            'abtfr-above-the-fold',
            array(&$this, 'settings_page')
        );

        /**
         * Hidden pages
         */
        add_submenu_page(
            null,
            __('Critical CSS Quality Test', 'abtfr'),
            __('Critical CSS Quality Test', 'abtfr'),
            'manage_options',
            'abtfr-criticalcss-test',
            array(&$this, 'settings_page')
        );
        add_submenu_page(
            null,
            __('Critical CSS Gulp.js Build Tool', 'abtfr'),
            __('Gulp.js Build Tool', 'abtfr'),
            'manage_options',
            'abtfr-build-tool',
            array(&$this, 'settings_page')
        );
        add_submenu_page(
            null,
            __('Website Monitor', 'abtfr'),
            __('Website Monitor', 'abtfr'),
            'manage_options',
            'abtfr-monitor',
            array(&$this, 'settings_page')
        );
    }

    /**
     * Admin bar option
     */
    public function admin_bar($admin_bar) {
        $options = get_option('abtfr');
        if (
            !empty($options['adminbar']) &&
            intval($options['adminbar']) !== 1
        ) {
            return;
        }

        $settings_url = add_query_arg(
            array('page' => 'abtfr'),
            admin_url('admin.php')
        );
        $nonced_url = wp_nonce_url($settings_url, 'abtfr');

        if (
            is_admin() ||
            (defined('DOING_AJAX') && DOING_AJAX) ||
            in_array($GLOBALS['pagenow'], array(
                'wp-login.php',
                'wp-register.php'
            ))
        ) {
            $currenturl = home_url();
        } else {
            $currenturl =
                (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']
                    ? 'https'
                    : 'http') .
                '://' .
                $_SERVER['HTTP_HOST'] .
                $_SERVER['REQUEST_URI'];
        }

        $admin_bar->add_menu(array(
            'id' => 'abtfr',
            'title' =>
                '<div class="ab-icon wp-menu-image svg" style="background-image: url(\'' .
                $this->admin_icon() .
                '\') !important;"></div><span class="ab-label">' .
                __('ABTF Reborn', 'abtfr') .
                '</span>',
            'href' => $settings_url,
            'meta' => array(
                'title' => __('ABTFR Optimization', 'abtfr'),
                'class' => 'ab-sub-secondary'
            )
        ));

        $admin_bar->add_group(array(
            'parent' => 'abtfr',
            'id' => 'abtfr-top',
            'meta' => array(
                'class' => 'ab-sub-secondary' //
            )
        ));

        /**
         * Optimization menu
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-top',
            'id' => 'abtfr-optimization',
            'title' => __('Optimization', 'abtfr')
        ));

        /**
         * Critical CSS menu
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-top',
            'id' => 'abtfr-critical-css',
            'title' => __('Critical CSS', 'abtfr'),
            'href' => $this->CTRL->view_url('critical-css-test'),
            'meta' => array(
                'title' => __('Critical CSS', 'abtfr'),
                'target' => '_blank'
            )
        ));

        /**
         * Other tools menu
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-top',
            'id' => 'abtfr-tools',
            'title' => __('Other Tools', 'abtfr')
        ));

        // critical CSS quality test
        $admin_bar->add_node(array(
            'parent' => 'abtfr-critical-css',
            'id' => 'abtfr-critical-css-quality',
            'title' => __('Quality Test (split view)', 'abtfr'),
            'href' => $this->CTRL->view_url('critical-css-editor'),
            'meta' => array(
                'title' => __(
                    'Critical CSS Quality Test (split view)',
                    'abtfr'
                ),
                'target' => '_blank'
            )
        ));

        // critical CSS quality test
        $admin_bar->add_node(array(
            'parent' => 'abtfr-critical-css',
            'id' => 'abtfr-critical-css-editor',
            'title' => __('Critical CSS Editor', 'abtfr'),
            'href' => $this->CTRL->view_url('critical-css-editor') . '#editor',
            'meta' => array(
                'title' => __('Critical CSS Editor', 'abtfr'),
                'target' => '_blank'
            )
        ));

        if (!is_admin()) {
            // extract Critical CSS
            $admin_bar->add_node(array(
                'parent' => 'abtfr-critical-css',
                'id' => 'abtfr-extract-critical-css-widget',
                'title' => __('Extract Critical CSS (JS widget)', 'abtfr'),
                'href' => '#',
                'meta' => array(
                    'title' => __(
                        'Extract Critical CSS (javascript widget)',
                        'abtfr'
                    ),
                    'onclick' => 'window.extractCriticalCSS();return false;'
                )
            ));
        }

        // extract full CSS
        $admin_bar->add_node(array(
            'parent' => 'abtfr-critical-css',
            'id' => 'abtfr-extract-full-css',
            'title' => __('Extract Full CSS (plugin)', 'abtfr'),
            'href' => $this->CTRL->view_url('extract-css', array(
                'output' => 'print'
            )),
            'meta' => array(
                'title' => __('Extract Full CSS (plugin)', 'abtfr'),
                'target' => '_blank'
            )
        ));

        if (!is_admin()) {
            $admin_bar->add_node(array(
                'parent' => 'abtfr-critical-css',
                'id' => 'abtfr-extract-full-css-widget',
                'title' => __('Extract Full CSS (JS widget)', 'abtfr'),
                'href' => '#',
                'meta' => array(
                    'title' => __(
                        'Extract Full CSS (javascript widget)',
                        'abtfr'
                    ),
                    'onclick' => 'window.extractFullCSS();return false;'
                )
            ));
        } else {
            $admin_bar->add_node(array(
                'parent' => 'abtfr-critical-css',
                'id' => 'abtfr-extract-critical-css-widget-link',
                'title' => __('See frontend for more options...', 'abtfr'),
                'href' => home_url(),
                'meta' => array(
                    'title' => __(
                        'Extract Full CSS (javascript widget)',
                        'abtfr'
                    )
                )
            ));
        }

        /**
         * Optimize HTML
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-html',
            'title' => __('HTML', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-html'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('HTML', 'abtfr'))
        ));

        /**
         * Optimize CSS
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-css',
            'title' => __('CSS', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-css'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('CSS', 'abtfr'))
        ));

        /**
         * Optimize Javascript
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-javascript',
            'title' => __('Javascript', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-javascript'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('Javascript', 'abtfr'))
        ));

        /**
         * Optimize Critical CSS
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-criticalcss',
            'title' => __('Critical CSS', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-criticalcss'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('Critical CSS', 'abtfr'))
        ));

        /**
         * Optimize PWA
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-pwa',
            'title' => __('Progressive Web App (PWA)', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-pwa'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('PWA', 'abtfr'))
        ));

        /**
         * Optimize HTTP2
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-http2',
            'title' => __('HTTP/2', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-http2'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('HTTP/2', 'abtfr'))
        ));

        /**
         * Optimize Proxy
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-optimization',
            'id' => 'abtfr-optimization-proxy',
            'title' => __('Proxy', 'abtfr'),
            'href' => add_query_arg(
                array('page' => 'abtfr-proxy'),
                admin_url('admin.php')
            ),
            'meta' => array('title' => __('Proxy', 'abtfr'))
        ));

        /**
         * Page cache clear
         */
        $clear_url = add_query_arg(
            array('page' => 'abtfr', 'clear' => 'pagecache'),
            admin_url('admin.php')
        );
        $nonced_url = wp_nonce_url($clear_url, 'abtfr');
        $admin_bar->add_node(array(
            'parent' => 'abtfr-tools',
            'id' => 'abtfr-tools-clear-pagecache',
            'title' => __('Clear Page Caches', 'abtfr'),
            'href' => $nonced_url,
            'meta' => array('title' => __('Clear Page Caches', 'abtfr'))
        ));

        /**
         * Google PageSpeed Score Test
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr',
            'id' => 'abtfr-check-pagespeed-scores',
            'title' => __('Google PageSpeed Scores', 'abtfr'),
            'href' =>
                'https://testmysite.' .
                ($this->google_intlcode === 'en-us' ? 'think' : '') .
                'withgoogle.com/intl/' .
                $this->google_intlcode .
                '?url=' .
                urlencode($currenturl),
            'meta' => array(
                'title' => __('Google PageSpeed Scores', 'abtfr'),
                'target' => '_blank'
            )
        ));

        /**
         * Test Groups
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr',
            'id' => 'abtfr-check-google',
            'title' => __('Google tests', 'abtfr')
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr',
            'id' => 'abtfr-check-speed',
            'title' => __('Speed tests', 'abtfr')
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr',
            'id' => 'abtfr-check-technical',
            'title' => __('Technical & security tests', 'abtfr')
        ));

        /**
         * Google Tests
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-google',
            'id' => 'abtfr-check-pagespeed',
            'title' => __('Google PageSpeed Insights', 'abtfr'),
            'href' =>
                'https://developers.google.com/speed/pagespeed/insights/?url=' .
                urlencode($currenturl) .
                '&hl=' .
                $this->google_lgcode,
            'meta' => array(
                'title' => __('Google PageSpeed Insights', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-google',
            'id' => 'abtfr-check-google-mobile',
            'title' => __('Google Mobile Test', 'abtfr'),
            'href' =>
                'https://search.google.com/search-console/mobile-friendly?url=' .
                urlencode($currenturl) .
                '&hl=' .
                $this->google_lgcode,
            'meta' => array(
                'title' => __('Google Mobile Test', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-google',
            'id' => 'abtfr-check-google-malware',
            'title' => __('Google Malware & Security', 'abtfr'),
            'href' =>
                'https://www.google.com/transparencyreport/safebrowsing/diagnostic/index.html?hl=' .
                $this->google_lgcode .
                '#url=' .
                urlencode(
                    str_replace(
                        'www.',
                        '',
                        parse_url($currenturl, PHP_URL_HOST)
                    )
                ),
            'meta' => array(
                'title' => __('Google Malware & Security', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-google',
            'id' => 'abtfr-check-google-more',
            'title' => __('More tests', 'abtfr'),
            'href' =>
                'https://github.com/16patsle/tests#url=' .
                urlencode($currenturl),
            'meta' => array(
                'title' => __('More tests', 'abtfr'),
                'target' => '_blank'
            )
        ));

        /**
         * Speed Tests
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-speed',
            'id' => 'abtfr-check-webpagetest',
            'title' => __('WebPageTest.org', 'abtfr'),
            'href' =>
                'http://www.webpagetest.org/?url=' .
                urlencode($currenturl) .
                '',
            'meta' => array(
                'title' => __('WebPageTest.org', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-speed',
            'id' => 'abtfr-check-pingdom',
            'title' => __('Pingdom Tools', 'abtfr'),
            'href' =>
                'http://tools.pingdom.com/fpt/?url=' .
                urlencode($currenturl) .
                '',
            'meta' => array(
                'title' => __('Pingdom Tools', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-speed',
            'id' => 'abtfr-check-gtmetrix',
            'title' => __('GTmetrix', 'abtfr'),
            'href' => 'http://gtmetrix.com/?url=' . urlencode($currenturl) . '',
            'meta' => array(
                'title' => __('GTmetrix', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-speed',
            'id' => 'abtfr-check-speed-more',
            'title' => __('More tests', 'abtfr'),
            'href' =>
                'https://github.com/16patsle/tests#url=' .
                urlencode($currenturl),
            'meta' => array(
                'title' => __('More tests', 'abtfr'),
                'target' => '_blank'
            )
        ));

        /**
         * Technical & Security Tests
         */
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-securityheaders',
            'title' => __('SecurityHeaders.io', 'abtfr'),
            'href' =>
                'https://securityheaders.io/?q=' .
                urlencode($currenturl) .
                '&hide=on&followRedirects=on',
            'meta' => array(
                'title' => __('SecurityHeaders.io', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-w3c',
            'title' => __('W3C HTML Validator', 'abtfr'),
            'href' =>
                'https://validator.w3.org/nu/?doc=' .
                urlencode($currenturl) .
                '',
            'meta' => array(
                'title' => __('W3C HTML Validator', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-ssllabs',
            'title' => __('SSL Labs', 'abtfr'),
            'href' =>
                'https://www.ssllabs.com/ssltest/analyze.html?d=' .
                urlencode($currenturl) .
                '',
            'meta' => array(
                'title' => __('SSL Labs', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-intodns',
            'title' => __('Into DNS', 'abtfr'),
            'href' =>
                'http://www.intodns.com/' .
                urlencode(
                    str_replace(
                        'www.',
                        '',
                        parse_url($currenturl, PHP_URL_HOST)
                    )
                ) .
                '',
            'meta' => array(
                'title' => __('Into DNS', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-http2',
            'title' => __('HTTP/2', 'abtfr'),
            'href' =>
                'https://tools.keycdn.com/http2-test?url=' .
                urlencode($currenturl) .
                '',
            'meta' => array(
                'title' => __('HTTP/2', 'abtfr'),
                'target' => '_blank'
            )
        ));
        $admin_bar->add_node(array(
            'parent' => 'abtfr-check-technical',
            'id' => 'abtfr-check-technical-more',
            'title' => __('More tests', 'abtfr'),
            'href' =>
                'https://github.com/16patsle/tests#url=' .
                urlencode($currenturl),
            'meta' => array(
                'title' => __('More tests', 'abtfr'),
                'target' => '_blank'
            )
        ));
    }

    /**
     * Return optgroup json for page search
     */
    public function page_search_optgroups() {
        $optgroups = array();

        $optgroups[] = array(
            'value' => 'posts',
            'label' => __('Posts', 'abtfr')
        );
        $optgroups[] = array(
            'value' => 'pages',
            'label' => __('Pages', 'abtfr')
        );
        $optgroups[] = array(
            'value' => 'categories',
            'label' => __('Categories', 'abtfr')
        );
        if (class_exists('WooCommerce')) {
            $optgroups[] = array(
                'value' => 'woocommerce',
                'label' => __('WooCommerce', 'abtfr')
            );
        }

        return $optgroups;
    }

    /**
     * Return options for page selection menu
     */
    public function ajax_page_search() {
        global $wpdb; // this is how you get access to the database

        $query = isset($_POST['query']) ? trim($_POST['query']) : '';
        $limit =
            isset($_POST['maxresults']) &&
            intval($_POST['maxresults']) > 10 &&
            intval($_POST['maxresults']) < 30
                ? intval($_POST['maxresults'])
                : 10;

        // enable URL (slug) search
        // @Emilybkk
        if (
            preg_match('|^http(s)?://|Ui', $query) ||
            substr($query, 0, 1) === '/'
        ) {
            $slugquery = array_pop(
                explode(
                    '/',
                    trim(preg_replace('|^http(s)://[^/]+/|Ui', '', $query), '/')
                )
            );
        } else {
            $slugquery = false;
        }

        /**
         * Results
         */
        $results = array();

        $post_types = get_post_types();
        foreach ($post_types as $pt) {
            if (in_array($pt, array('revision', 'nav_menu_item'))) {
                continue;
            }

            if (count($results) >= $limit) {
                break;
            }

            // Get random post
            if ($slugquery) {
                $args = array(
                    'post_type' => $pt,
                    'posts_per_page' => $limit,
                    'name' => $slugquery
                );
            } else {
                $args = array(
                    'post_type' => $pt,
                    'posts_per_page' => $limit,
                    's' => $query
                );
            }

            query_posts($args);
            if (have_posts()) {
                while (have_posts()) {
                    the_post();
                    switch ($pt) {
                        case 'post':
                            $results[] = array(
                                'class' => 'posts',
                                'value' => get_permalink($wp_query->post->ID),
                                'name' =>
                                    get_the_ID() .
                                    '. ' .
                                    str_replace(
                                        home_url(),
                                        '',
                                        get_permalink(get_the_ID())
                                    ) .
                                    ' - ' .
                                    get_the_title()
                            );
                            break;
                        case 'product':
                            $results[] = array(
                                'class' => 'woocommerce',
                                'value' => get_permalink(get_the_ID()),
                                'name' =>
                                    get_the_ID() .
                                    '. ' .
                                    str_replace(
                                        home_url(),
                                        '',
                                        get_permalink(get_the_ID())
                                    ) .
                                    ' - ' .
                                    get_the_title()
                            );
                            break;
                        default:
                            $results[] = array(
                                'class' => 'pages',
                                'value' => get_permalink(get_the_ID()),
                                'name' =>
                                    get_the_ID() .
                                    '. ' .
                                    str_replace(
                                        home_url(),
                                        '',
                                        get_permalink(get_the_ID())
                                    ) .
                                    ' - ' .
                                    get_the_title()
                            );
                            break;
                    }
                    if (count($results) >= $limit) {
                        break;
                    }
                }
            }
        }

        if (count($results) < $limit) {
            $taxonomies = get_taxonomies();
            if (!empty($taxonomies)) {
                foreach ($taxonomies as $taxonomy) {
                    if (count($results) >= $limit) {
                        break;
                    }
                    switch ($taxonomy) {
                        case 'category':
                        case 'post_tag':
                        case 'product_cat':
                        case 'product_brand':
                            if ($slugquery) {
                                $term_query = array(
                                    'orderby' => 'title',
                                    'order' => 'ASC',
                                    'hide_empty' => false,
                                    'number' => $limit,
                                    'name' => $slugquery
                                );
                            } else {
                                $term_query = array(
                                    'orderby' => 'title',
                                    'order' => 'ASC',
                                    'hide_empty' => false,
                                    'number' => $limit,
                                    'name__like' => $query
                                );
                            }

                            $terms = get_terms($taxonomy, $term_query);
                            if ($terms) {
                                foreach ($terms as $term) {
                                    switch ($taxonomy) {
                                        case 'product_cat':
                                        case 'product_brand':
                                            $results[] = array(
                                                'class' => 'woocommerce',
                                                'value' => get_term_link(
                                                    $term->slug,
                                                    $taxonomy
                                                ),
                                                'name' =>
                                                    $term->term_id .
                                                    '. ' .
                                                    str_replace(
                                                        home_url(),
                                                        '',
                                                        get_category_link(
                                                            $term->term_id
                                                        )
                                                    ) .
                                                    ' - ' .
                                                    $term->name
                                            );
                                            break;
                                        default:
                                            $results[] = array(
                                                'class' => 'categories',
                                                'value' => get_category_link(
                                                    $term->term_id
                                                ),
                                                'name' =>
                                                    $term->term_id .
                                                    '. ' .
                                                    str_replace(
                                                        home_url(),
                                                        '',
                                                        get_category_link(
                                                            $term->term_id
                                                        )
                                                    ) .
                                                    ' - ' .
                                                    $term->name
                                            );
                                            break;
                                    }

                                    if (count($results) >= $limit) {
                                        break;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        $json = json_encode($results);

        header('Content-Type: application/json');
        header('Content-Length: ' . strlen($json));
        print $json;

        wp_die(); // this is required to terminate immediately and return a proper response
    }

    /**
     * Clear page cache with notice
     */
    public function clear_pagecache($notice = true) {
        $this->CTRL->plugins->clear_pagecache();

        if ($notice) {
            $this->set_notice(
                'Page related caches from <a href="https://github.com/16patsle/abtf-reborn/tree/master/modules/plugins/" target="_blank">supported plugins</a> cleared.<p><strong>Note:</strong> This plugin does not contain a page cache. The page cache clear function for other plugins is a tool.',
                'NOTICE'
            );
        }
    }

    /**
     * Save settings
     */
    public function save_settings($options, $notice = false) {
        if (!is_array($options) || empty($options)) {
            wp_die('No settings to save');
        }

        // store update count
        if (!isset($options['update_count'])) {
            $options['update_count'] = 0;
        }
        $options['update_count']++;

        // update settings
        $settings_changed = update_option('abtfr', $options, true);

        if (!$notice) {
            return $settings_changed;
        }

        // add notice
        $saved_notice =
            '<div style="font-size:18px;line-height:20px;margin:0px;">' .
            $notice .
            '</div>';

        /**
         * Clear full page cache
         */
        if ($options['clear_pagecache']) {
            $this->CTRL->admin->clear_pagecache(false);

            $saved_notice .=
                '<p style="font-style:italic;font-size:14px;line-height:16px;">Page related caches from <a href="https://github.com/16patsle/abtf-reborn/tree/master/modules/plugins/" target="_blank">supported plugins</a> cleared.</p>';
        }

        $this->set_notice($saved_notice, 'NOTICE');

        return $settings_changed;
    }

    /**
     * Display settings page
     */
    public function settings_page() {
        global $pagenow, $wp_query;

        // load options
        $options = get_option('abtfr');
        if (!is_array($options)) {
            $options = array();
        }
        ?>
<script>
// pagesearch optgroups
window.abtfr_pagesearch_optgroups = <?php print json_encode(
    $this->page_search_optgroups()
); ?>;
</script>

<?php
// active tab
$tab = $this->active_tab('intro');

// invalid tab
if (!isset($this->tabs[$tab])) {
    $tab = 'intro';
}

$lgcode = $this->google_lgcode;

// Google Analytics tracking code
$utmstring = $this->utm_string;

// print the HTML required by the React app
require_once 'admin.app.inc.php';

// print tab content
switch ($tab) {
    case 'extract':
    case 'criticalcss-test':
    case 'build-tool':
        require_once 'admin.' . $tab . '.inc.php';
        break;
}
    }

    /**
     * Show admin notices
     */
    public function show_notices() {
        settings_errors('abtfr');

        $notices = get_option('abtfr_notices', '');
        $persisted_notices = array();
        if (!empty($notices)) {

            $noticerows = array();
            foreach ($notices as $notice) {
                switch (strtoupper($notice['type'])) {
                    case 'ERROR':
                        $noticerows[] =
                            '<div class="error">
							<p>
								' .
                            __($notice['text'], 'abtfr') .
                            '
							</p>
						</div>';

                        /**
                         * Error notices remain visible for 1 minute
                         */
                        $expire =
                            isset($notice['expire']) &&
                            is_numeric($notice['expire'])
                                ? $notice['expire']
                                : 60;
                        if (
                            isset($notice['date']) &&
                            $notice['date'] > time() - $expire
                        ) {
                            $persisted_notices[] = $notice;
                        }

                        break;
                    default:
                        $noticerows[] =
                            '<div class="updated"><p>
							' .
                            __($notice['text'], 'abtfr') .
                            '
						</p></div>';
                        break;
                }
            }
            ?>
			<div>
				<?php print implode('', $noticerows); ?>
			</div>
			<?php update_option('abtfr_notices', $persisted_notices, false);
        }
    }

    /**
     * Set admin notice
     */
    public function set_notice(
        $notice,
        $type = 'NOTICE',
        $notice_config = array()
    ) {
        $type = strtoupper($type);

        $notices = get_option('abtfr_notices', '');
        if (!is_array($notices)) {
            $notices = array();
        }
        if (empty($notice)) {
            delete_option('abtfr_notices');
        } else {
            $notice_config = is_array($notice_config)
                ? $notice_config
                : array();
            $notice_config['text'] = $notice;
            $notice_config['type'] = $type;

            array_unshift($notices, $notice_config);
            update_option('abtfr_notices', $notices, false);
        }
    }

    /**
     * Return newline array from string
     */
    public function newline_array($string, $data = array()) {
        if (!is_array($data)) {
            $data = array();
        }

        $lines = array_filter(array_map('trim', explode("\n", trim($string))));
        if (!empty($lines)) {
            foreach ($lines as $line) {
                if ($line === '') {
                    continue;
                }
                $data[] = $line;
            }
            $data = array_unique($data);
        }

        return $data;
    }

    /**
     * Return string from newline array
     */
    public function newline_array_string($array) {
        if (!is_array($array) || empty($array)) {
            return '';
        }

        return htmlentities(implode("\n", $array), ENT_COMPAT, 'utf-8');
    }

    /**
     * Upgrade plugin
     */
    public function upgrade() {
        require_once WPABTFR_PATH . 'admin/upgrade.class.php';
        $upgrade = new ABTFR_Upgrade($this->CTRL);
        $upgrade->upgrade();
    }

    /**
     * File size
     */
    public function human_filesize($bytes, $decimals = 2) {
        $size = array('B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
        $factor = floor((strlen($bytes) - 1) / 3);

        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) .
            @$size[$factor];
    }

    /**
     * Return admin panel SVG icon
     */
    final public function admin_icon($color = false) {
        $icon = file_get_contents(WPABTFR_PATH . 'public/100.svg');
        $icon =
            'data:image/svg+xml;base64,' .
            base64_encode($this->menu_svg_color($icon, $color));

        return $icon;
    }

    /**
     * Fills menu page inline SVG icon color.
     */
    final private function menu_svg_color($svg, $color = false) {
        if ($color) {
            $use_icon_fill_color = $color;
        } else {
            if (!($color = get_user_option('admin_color'))) {
                $color = 'fresh';
            }

            /**
             * WordPress admin icon color schemes.
             */
            $wp_admin_icon_colors = array(
                'fresh' => array(
                    'base' => '#999999',
                    'focus' => '#2EA2CC',
                    'current' => '#FFFFFF'
                ),
                'light' => array(
                    'base' => '#999999',
                    'focus' => '#CCCCCC',
                    'current' => '#CCCCCC'
                ),
                'blue' => array(
                    'base' => '#E5F8FF',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                ),
                'midnight' => array(
                    'base' => '#F1F2F3',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                ),
                'sunrise' => array(
                    'base' => '#F3F1F1',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                ),
                'ectoplasm' => array(
                    'base' => '#ECE6F6',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                ),
                'ocean' => array(
                    'base' => '#F2FCFF',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                ),
                'coffee' => array(
                    'base' => '#F3F2F1',
                    'focus' => '#FFFFFF',
                    'current' => '#FFFFFF'
                )
            );

            if (empty($wp_admin_icon_colors[$color])) {
                return $svg;
            }
            $icon_colors = $wp_admin_icon_colors[$color];
            $use_icon_fill_color = $icon_colors['base']; // Default base.

            $current_pagenow = !empty($GLOBALS['pagenow'])
                ? $GLOBALS['pagenow']
                : '';
            $current_page = !empty($_REQUEST['page']) ? $_REQUEST['page'] : '';

            if ($current_page && strpos($_GET['page'], 'abtfr') === 0) {
                $use_icon_fill_color = $icon_colors['current'];
            }
        }

        return preg_replace(
            '|(\s)fill="#000000"|Ui',
            '$1fill="' . esc_attr($use_icon_fill_color) . '"',
            $svg
        );
    }

    /**
     * Function to register our REST routes from the controller.
     */
    function register_rest_routes() {
        require_once plugin_dir_path(dirname(__FILE__)) .
            'admin/abtfr-settings-route.php';
        $controller = new ABTFR_Settings_Route($this);
        $controller->register_routes();
    }
}
