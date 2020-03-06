<?php

/**
 * Settings admin controller
 *
 * @since      2.5.4
 * @package    abtfr
 * @subpackage abtfr/admin
 * @author     Optimization.Team <info@optimization.team>
 * @author     Patrick Sletvold
 */

class ABTFR_Admin_Settings
{

    /**
     * Above the fold controller
     */
    public $CTRL;

    /**
     * Options
     */
    public $options;

    /**
     * Initialize the class and set its properties
     */
    public function __construct(&$CTRL)
    {
        $this->CTRL = & $CTRL;
        $this->options = & $CTRL->options;

        /**
         * Admin panel specific
         */
        if (is_admin()) {

            /**
             * Handle form submissions
             */
            $this->CTRL->loader->add_action('admin_post_abtfr_settings_update', $this, 'update_settings');
        }
    }

    /**
     * Update settings
     */
    public function update_settings()
    {
        check_admin_referer('abtfr');

        /**
         * Clear page cache
         */
        if (isset($_POST['clear_pagecache'])) {
            check_admin_referer('abtfr');

            $this->CTRL->admin->clear_pagecache();

            wp_redirect(add_query_arg(array( 'page' => 'abtfr' ), admin_url('admin.php')) . '#/settings');
            exit;
        }

        // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
        $_POST = array_map('stripslashes_deep', $_POST);

        $options = get_option('abtfr');
        if (!is_array($options)) {
            $options = array();
        }

        // input
        $input = (isset($_POST['abtfr']) && is_array($_POST['abtfr'])) ? $_POST['abtfr'] : array();

        /**
         * Debug / admin options
         */
        $options['debug'] = (isset($input['debug']) && intval($input['debug']) === 1) ? true : false;
        $options['clear_pagecache'] = (isset($input['clear_pagecache']) && intval($input['clear_pagecache']) === 1) ? true : false;
        $options['adminbar'] = (isset($input['adminbar']) && intval($input['adminbar']) === 1) ? true : false;
    
        // update settings
        $this->CTRL->admin->save_settings($options, 'Settings saved.');

        wp_redirect(add_query_arg(array( 'page' => 'abtfr' ), admin_url('admin.php')) . '#/settings');
        exit;
    }
}
