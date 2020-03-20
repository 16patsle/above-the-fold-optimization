<?php

/**
 * HTML admin controller
 *
 * @since      2.8
 * @package    abtfr
 * @subpackage abtfr/admin
 * @author     Optimization.Team <info@optimization.team>
 * @author     Patrick Sletvold
 */

class ABTFR_Admin_HTML {
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
    public function __construct(&$CTRL) {
        $this->CTRL = &$CTRL;
        $this->options = &$CTRL->options;

        /**
         * Admin panel specific
         */
        if (is_admin()) {
            /**
             * Handle form submissions
             */
            $this->CTRL->loader->add_action(
                'admin_post_abtfr_html_update',
                $this,
                'update_settings'
            );
        }
    }

    /**
     * Update settings
     */
    public function update_settings() {
        check_admin_referer('abtfr');

        // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
        $_POST = array_map('stripslashes_deep', $_POST);

        $options = get_option('abtfr');
        if (!is_array($options)) {
            $options = array();
        }

        // input
        $input =
            isset($_POST['abtfr']) && is_array($_POST['abtfr'])
                ? $_POST['abtfr']
                : array();

        /**
         * Optimize CSS delivery
         */
        $options['html_minify'] =
            isset($input['html_minify']) && intval($input['html_minify']) === 1
                ? true
                : false;
        $options['html_comments'] =
            isset($input['html_comments']) &&
            intval($input['html_comments']) === 1
                ? true
                : false;
        $options['html_comments_preserve'] = $this->CTRL->admin->newline_array(
            $input['html_comments_preserve']
        );
        $options['html_search_replace'] = isset($input['html_search_replace'])
            ? @json_decode($input['html_search_replace'], true)
            : array();
        if (!is_array($options['html_search_replace'])) {
            $options['html_search_replace'] = array();
        }
        if (!empty($options['html_search_replace'])) {
            $searchreplace = array();
            $position = 0;
            foreach ($options['html_search_replace'] as $cnf) {
                if (
                    !is_array($cnf) ||
                    !isset($cnf['search']) ||
                    !isset($cnf['replace'])
                ) {
                    continue;
                }
                $position++;
                if (isset($cnf['regex'])) {
                    // exec preg_match on null
                    $valid = @preg_match($cnf['search'], null);
                    $error = $this->is_preg_error();
                    if ($valid === false || $error) {
                        $this->CTRL->admin->set_notice(
                            'The HTML Search & Replace configuration <code>' .
                                esc_html($cnf['search']) .
                                '</code> is an invalid regular expression and has been removed.' .
                                ($error
                                    ? '<br /><p>Error: ' . $error . '</p>'
                                    : ''),
                            'ERROR'
                        );
                        continue;
                    }
                }
                $searchreplace[] = $cnf;
            }
            $options['html_search_replace'] = $searchreplace;
        }

        // update settings
        $this->CTRL->admin->save_settings(
            $options,
            'HTML optimization settings saved.'
        );

        wp_redirect(
            add_query_arg(array('page' => 'abtfr'), admin_url('admin.php')) .
                '#/html'
        );
        exit();
    }

    /**
     * Preg error
     */
    public function is_preg_error() {
        if (!function_exists('preg_last_error')) {
            return false;
        }
        $error = preg_last_error();

        // no error
        if ($error === PREG_NO_ERROR) {
            return false;
        }

        $errors = array(
            PREG_INTERNAL_ERROR => 'Code 1 : There was an internal PCRE error',
            PREG_BACKTRACK_LIMIT_ERROR => 'Code 2 : Backtrack limit was exhausted',
            PREG_RECURSION_LIMIT_ERROR => 'Code 3 : Recursion limit was exhausted',
            PREG_BAD_UTF8_ERROR => 'Code 4 : The offset didn\'t correspond to the begin of a valid UTF-8 code point',
            PREG_BAD_UTF8_OFFSET_ERROR => 'Code 5 : Malformed UTF-8 data'
        );

        return $errors[$error];
    }
}
