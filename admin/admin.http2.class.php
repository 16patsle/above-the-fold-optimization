<?php

/**
 * HTTP/2 Optimization Controller
 *
 * @since      2.9.0
 * @package    abtfr
 * @subpackage abtfr/admin
 * @author     Optimization.Team <info@optimization.team>
 * @author     Patrick Sletvold
 */

class ABTFR_Admin_HTTP2
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
     * Initialize the class and set its properties.
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
            $this->CTRL->loader->add_action('admin_post_abtfr_http2_update', $this, 'update_settings');
        }
    }

    /**
     * Update settings
     */
    public function update_settings()
    {
        check_admin_referer('abtfr');

        // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
        $_POST = array_map('stripslashes_deep', $_POST);

        $options = get_option('abtfr');
        if (!is_array($options)) {
            $options = array();
        }

        // input
        $input = (isset($_POST['abtfr']) && is_array($_POST['abtfr'])) ? $_POST['abtfr'] : array();

        /**
         * HTTP/2 Server Push optimization
         */
        $options['http2_push'] = (isset($input['http2_push']) && intval($input['http2_push']) === 1) ? true : false;
        $options['http2_push_config'] = (isset($input['http2_push_config']) && trim($input['http2_push_config']) !== '') ? $input['http2_push_config'] : '';
        if ($options['http2_push_config']) {
            try {
                $options['http2_push_config'] = @json_decode($options['http2_push_config'], true);
            } catch (Exception $error) {
                $options['http2_push_config'] = '';
            }

            if (!is_array($options['http2_push_config'])) {
                $options['http2_push_config'] = array();
                $this->CTRL->admin->set_notice('The HTML/2 push config does not contain valid JSON.', 'ERROR');
            }
        }

        // update settings
        $this->CTRL->admin->save_settings($options, 'HTTP/2 Optimization settings saved.');

        wp_redirect(add_query_arg(array( 'page' => 'abtfr' ), admin_url('admin.php')) . '#/http2');
        exit;
    }
}
