<?php
 
class ABTFR_Settings_Route extends WP_REST_Controller {

  public function __construct (&$admin) {
    $this->admin = & $admin;
    $this->options = & $admin->CTRL->options;
  }
 
  /**
   * Register the routes for the objects of the controller.
   */
  public function register_routes() {
    $version = '1';
    $namespace = 'abtfr/v' . $version;
    $base = 'settings';
    register_rest_route( $namespace, '/' . $base, array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_settings' ),
      'permission_callback' => '__return_true',
      'args'                => array(),
    ) );
    register_rest_route( $namespace, '/' . $base . '/(?P<setting>[\w]+)', array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_setting' ),
      'permission_callback' => '__return_true',
    ) );
    register_rest_route( $namespace, '/criticalcss', array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_criticalcss' ),
      'permission_callback' => array( $this, 'permissions_check' ),
      'args'                => array(),
    ) );
    register_rest_route( $namespace, '/conditionalcss', array(
      array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => array( $this, 'get_conditionalcss' ),
        'permission_callback' => array( $this, 'permissions_check' ),
        'args'                => array(),
      ),
      array(
        'methods'             => WP_REST_Server::CREATABLE,
        'callback'            => array( $this, 'create_conditionalcss_item' ),
        'permission_callback' => array( $this, 'permissions_check' ),
        'args'                => $this->get_endpoint_args_for_item_schema( true ),
      ),
    ) );
    register_rest_route( $namespace, '/conditionalcss/(?P<file>[^.\/]+\.css)', array(
      array(
        'methods'             => WP_REST_Server::READABLE,
        'callback'            => array( $this, 'get_conditionalcss_item' ),
        'permission_callback' => array( $this, 'permissions_check' ),
        'args'                => array(),
      ),
      array(
        'methods'             => WP_REST_Server::EDITABLE,
        'callback'            => array( $this, 'update_conditionalcss_item' ),
        'permission_callback' => array( $this, 'permissions_check' ),
        'args'                => $this->get_endpoint_args_for_item_schema( false ),
      ),
      array(
        'methods'             => WP_REST_Server::DELETABLE,
        'callback'            => array( $this, 'delete_conditionalcss_item' ),
        'permission_callback' => array( $this, 'permissions_check' ),
        'args'                => array(),
      ),
    ) );
    register_rest_route( $namespace, '/cachestats', array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_proxy_cache_stats' ),
      'permission_callback' => array( $this, 'permissions_check' ),
      'args'                => array(),
    ) );
    register_rest_route( $namespace, '/terms', array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_terms' ),
      'permission_callback' => '__return_true',//array( $this, 'permissions_check' ),
      'args'                => array(),
    ) );
  }
 
  /**
   * Get a the settings
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_settings( $request ) {
    $data = array_filter(
      $this->prepare_settings_for_response($this->options),
      function($val){
        return !in_array($val, ['update_count']);
      }, ARRAY_FILTER_USE_KEY
    );
  
    return new WP_REST_Response( $data, 200 );
  }

  /**
   * Get a specific setting. Supports both camelCase and snake_case.
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_setting( $request ) {
    $settingParam = $request->get_params()['setting'];

    if(empty($settingParam)){
      return new WP_Error( 400, 'Invalid setting specified' );
    }

    $settingKey = $this->convert_to_snake_case($settingParam);
    $data = $this->options[$settingKey];
    if(!isset($data)){
      $data = $this->options[$settingParam];
    }
    
    if(!isset($data) || in_array($settingKey, ['updateCount'])) {
      return new WP_Error( 404, 'Setting not found' );
    } else {
      return new WP_REST_Response( $data, 200 );
    }
  }

  /**
   * Get the critical CSS
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_criticalcss( $request ) {
    $data = array();

    // get critical css files
    $criticalcss_files = $this->admin->CTRL->criticalcss->get_theme_criticalcss();
    
    //global critical CSS
    $data['inlinecss'] = (isset($criticalcss_files['global.css'])) ? $this->admin->CTRL->criticalcss->get_file_contents($criticalcss_files['global.css']['file']) : '';
  
    return new WP_REST_Response( $this->convert_to_camel_case_array($data), 200 );
  }

  /**
   * Get the conditional CSS
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_conditionalcss( $request ) {
    $data = array();

    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/admin.criticalcss.class.php';

    /**
     * Load critical css management
     */
    $this->criticalcss = new ABTFR_Admin_CriticalCSS($this->admin->CTRL);

    /**
     * Conditional Options
     */
    $data['conditional_options'] = $this->criticalcss->get_default_conditional_options();

    // get critical css files
    $criticalcss_files = $this->admin->CTRL->criticalcss->get_theme_criticalcss();

    $data['conditional_values'] = array();

    foreach ($criticalcss_files as $file => $config) {
      if ($file === 'global.css') {
          continue 1;
      }

      // critical CSS
      $inlinecss = $this->admin->CTRL->criticalcss->get_file_contents($config['file']);

      // conditions
      $conditions = (isset($config['conditions'])) ? $this->criticalcss->get_condition_values($config['conditions']) : array();

      $condition_values = array();
      foreach ($conditions as $condition) {
        $condition_values[] = $condition['value'];
      }

      $condition_values = implode('|==abtfr==|', $condition_values);

      $data['conditional_values'][$file] = array(
        'css' => $inlinecss,
        'conditions' => $conditions,
        'config' => $config
      );
    }

    $data['conditional_path'] = $this->admin->CTRL->theme_dir('', 'critical-css');
  
    return new WP_REST_Response( $this->convert_to_camel_case_array($data), 200 );
  }

  /**
   * Get a specific conditional CSS item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_conditionalcss_item( $request ) {
    $params = $request->get_params();
    $data = array();

    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/admin.criticalcss.class.php';

    /**
     * Load critical css management
     */
    $this->criticalcss = new ABTFR_Admin_CriticalCSS($this->admin->CTRL);

    // get critical css files
    $criticalcss_files = $this->admin->CTRL->criticalcss->get_theme_criticalcss();

    foreach ($criticalcss_files as $file => $config) {
      if ($file === $params['file']) {
        // critical CSS
        $inlinecss = $this->admin->CTRL->criticalcss->get_file_contents($config['file']);

        // conditions
        $conditions = (isset($config['conditions'])) ? $this->criticalcss->get_condition_values($config['conditions']) : array();

        $condition_values = array();
        foreach ($conditions as $condition) {
          $condition_values[] = $condition['value'];
        }

        $condition_values = implode('|==abtfr==|', $condition_values);

        $data = array(
          'css' => $inlinecss,
          'conditions' => $conditions,
          'config' => $config
        );

        break;
      }
    }

    if(isset($data['css'])) {
      return new WP_REST_Response( $this->convert_to_camel_case_array($data), 200 );
    } else {
      return new WP_Error( 'not-found',  __( 'Not found.', 'abtfr' ), array( 'status' => 404 ) );
    }  
  }

  /**
   * Create a conditional CSS item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function create_conditionalcss_item( $request ) {
    // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
    $params = array_map('stripslashes_deep', $request->get_params());

    $criticalcss_dir = $this->admin->CTRL->theme_path('critical-css');

    // get current critical css config
    $criticalcss_files = $this->admin->CTRL->criticalcss->get_theme_criticalcss();

    // name (reference)
    $name = isset($params['name']) ? trim($params['name']) : '';
    if ($name === '') {
      return new WP_Error( 'no-name', __( 'You did not enter a name.', 'abtfr' ), array( 'status' => 400 ) );
    }

    $cssfile =
      trim(
      preg_replace(
        array('|\s+|is', '|[^a-z0-9\-]+|is'),
        array('-', ''),
        strtolower($name)
      )
    ) . '.css';

    if (isset($criticalcss_files[$cssfile])) {
      return new WP_Error( 'file-exists', sprintf( __( 'A conditional critical CSS configuration with the filename %s already exists.', 'abtfr' ), $cssfile ), array( 'status' => 400 ) );
    }

    $config = array(
      'name' => $name,
      'weight' => 1
    );

    $config['conditions'] = explode('|==abtfr==|', $params['conditions']);

    if (
      file_exists($criticalcss_dir . $cssfile) &&
      !is_writable($criticalcss_dir . $cssfile)
    ) {
      return new WP_Error( 'write-failed', sprintf( __( 'Failed to write to Conditional Critical CSS storage file. Please check the write permissions for the following file: %s', 'abtfr' ), str_replace(
        trailingslashit(ABSPATH),
        '/',
        $criticalcss_dir . $cssfile
    ) ), array( 'status' => 500 ) );
    } else {
      // save file with config header
      $this->admin->CTRL->criticalcss->save_file_contents(
        $cssfile,
        $config,
        ' '
      );

      // failed to store Critical CSS
      if (
        !file_exists($criticalcss_dir . $cssfile) ||
        !is_writable($criticalcss_dir . $cssfile)
      ) {
        return new WP_Error( 'write-failed', sprintf( __( 'Failed to write to Conditional Critical CSS storage file. Please check the write permissions for the following file: %s', 'abtfr' ), str_replace(
          trailingslashit(ABSPATH),
          '/',
          $criticalcss_dir . $cssfile
      ) ), array( 'status' => 500 ) );
      }
    }
 
    return new WP_REST_Response( true, 201 );
  }
 
  /**
   * Update a specific conditional CSS item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function update_conditionalcss_item( $request ) {
    // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
    $params = array_map('stripslashes_deep', $request->get_params());

    $criticalcss_dir = $this->admin->CTRL->theme_path('critical-css');

    // get current critical css config
    $criticalcss_files = $this->admin->CTRL->criticalcss->get_theme_criticalcss();

    // conditional css id
    $file = isset($params['file']) ? trim($params['file']) : '';

    if (!isset($criticalcss_files[$file])) {
      return new WP_Error( 'not-found', sprintf( __( 'A conditional critical CSS configuration with the filename %s doesn\'t exist.', 'abtfr' ), $cssfile ), array( 'status' => 404 ) );
    }

    $criticalcss_files[$file]['conditions'] = explode('|==abtfr==|', $params['conditions']);

    $criticalcss_files[$file]['weight'] =
      isset($params['weight']) &&
      intval($params['weight']) > 0
          ? intval($params['weight'])
          : 1;

    if (
      isset($params['appendToAny']) &&
      intval($params['appendToAny']) === 1
    ) {
      $criticalcss_files[$file]['appendToAny'] = true;
    } else {
      unset($criticalcss_files[$file]['appendToAny']);
    }
    if (
      isset($params['prependToAny']) &&
      intval($params['prependToAny']) === 1
    ) {
      $criticalcss_files[$file]['prependToAny'] = true;
    } else {
      unset($criticalcss_files[$file]['prependToAny']);
    }

    if (
      file_exists($criticalcss_dir . $file) &&
      !is_writable($criticalcss_dir . $file)
    ) {
      return new WP_Error( 'write-failed', sprintf( __( 'Failed to write to Conditional Critical CSS storage file. Please check the write permissions for the following file: %s', 'abtfr' ), str_replace(
        trailingslashit(ABSPATH),
        '/',
        $criticalcss_dir . $file
    ) ), array( 'status' => 500 ) );
    } else {
      // save file with config header
      $error = $this->admin->CTRL->criticalcss->save_file_contents(
        $file,
        $criticalcss_files[$file],
        trim($params['css'])
      );

      if ($error && is_array($error)) {
        $error_msg = '';
        foreach ($error as $err) {
          $error_msg .= '\n' . $err['message'];
        }
        return new WP_Error( 'error', sprintf( __( 'Error(s) occured: %s', 'abtfr' ), $error_msg ), array( 'status' => 500 ) );
      }

      // failed to store Critical CSS
      if (
        !file_exists($criticalcss_dir . $file) ||
        !is_writable($criticalcss_dir . $file)
      ) {
        return new WP_Error( 'write-failed', sprintf( __( 'Failed to write to Conditional Critical CSS storage file. Please check the write permissions for the following file: %s', 'abtfr' ), str_replace(
          trailingslashit(ABSPATH),
          '/',
          $criticalcss_dir . $file
      ) ), array( 'status' => 500 ) );
      }
    }
 
    return new WP_REST_Response( true, 200 );
  }
 
  /**
   * Delete a specific conditional CSS item
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function delete_conditionalcss_item( $request ) {
    // @link https://codex.wordpress.org/Function_Reference/stripslashes_deep
    $params = array_map('stripslashes_deep', $request->get_params());

    // conditional css id
    $file = isset($params['file']) ? trim($params['file']) : '';

    $this->admin->CTRL->criticalcss->delete_file($file);

    return new WP_REST_Response( true, 200 );
  }

  /**
   * Get proxy cache stats
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_proxy_cache_stats( $request ) {
    // update cache stats
    $this->admin->CTRL->proxy->prune(true);

    $cache_stats = $this->admin->CTRL->proxy->cache_stats();
    $cache_stats['files'] = number_format_i18n($cache_stats['files'], 0);
    $cache_stats['size'] = $this->admin->CTRL->admin->human_filesize(
      $cache_stats['size']
    );
    $cache_stats['date'] = date('r', $cache_stats['date']);

    return new WP_REST_Response( $this->convert_to_camel_case_array($cache_stats), 200 );
  }

  /**
   * Return terms
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|WP_REST_Response
   */
  public function get_terms( $request ) {
    $params = $request->get_params();
    $query = isset($params['query']) ? trim($params['query']) : '';
    $limit =
      isset($params['limit']) && intval($params['limit']) > 10 && intval($params['limit']) < 30 ?
      intval($params['limit']) : 10;

    if(!isset($params['taxonomy'])) {
      return new WP_Error( 'bad-request',  __( 'Bad request.', 'abtfr' ), array( 'status' => 400 ) );
    }

    $terms = get_terms(array(
      'taxonomy' => $params['taxonomy'],
      'orderby' => 'title',
      'number' => $limit,
      'hide_empty' => false,
      'name__like' => $query
    ));

    $result = [];

    foreach ($terms as $term) {
      $result[] = [
          'id' => $term->term_id,
          'link' => get_term_link($term->term_id),
          'name' => $term->name,
          'slug' => $term->slug,
      ];
    }

    return new WP_REST_Response($result);
  }

  /**
   * Check if a given request has access to the resource
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function permissions_check( $request ) {
    return current_user_can( 'manage_options' );
  }

  /**
   * Prepare settings for the REST response
   *
   * @param array $options The settings.
   * @return array
   */
  public function prepare_settings_for_response( $options ) {
    // CSS
    if(empty($options['cssdelivery_renderdelay'])) {
      $options['cssdelivery_renderdelay'] = '';
    }
    if(empty($options['gwfo_loadmethod'])) {
			$options['gwfo_loadmethod'] = 'inline';
    }

    /**
     * Get version of local loadCSS
     */
		$options['css_loadcss_version'] = '';
		$options['css_loadcss_version_error'] = '';
    $loadcss_package = WPABTFR_PATH . 'public/js/src/loadcss_package.json';
    if (!file_exists($loadcss_package)) {
		  $options['css_loadcss_version_error'] = 'not_found';
    } else {
     	$package = @json_decode(file_get_contents($loadcss_package), true);
    	if (!is_array($package)) {
			  $options['css_loadcss_version_error'] = 'failed_parse';
      } else {
        // set version
        $options['css_loadcss_version'] = $package['version'];
      }
    }

		/**
     * Get version of local webfont.js
     */
    $options['css_webfont_version'] = $this->admin->CTRL->gwfo->package_version(true);
    
    $options['gwfo_cdn_version'] = $this->admin->CTRL->gwfo->cdn_version;
    $options['font_theme_path'] = str_replace(ABSPATH, '/', trailingslashit(get_stylesheet_directory()) . 'fonts/');

    // Javascript
    if (isset($options['jsdelivery_idle']) && !empty($options['jsdelivery_idle'])) {
    	    foreach ($options['jsdelivery_idle'] as $n => $cnf) {
    	        $options['jsdelivery_idle'][$n] = $cnf[0];
    	        if (isset($cnf[1])) {
    	            $options['jsdelivery_idle'][$n] .= ':' . $cnf[1];
    	        }
    	    }
    }

    // PWA
    $sw = $this->admin->CTRL->pwa->get_sw();

    require_once plugin_dir_path(dirname(__FILE__)) . 'admin/admin.pwa.class.php';

    /**
     * Load PWA management
     */
    $this->pwa = new ABTFR_Admin_PWA($this->admin->CTRL);

    // verify service worker
    if (isset($options['pwa']) && intval($options['pwa']) === 1) {
    	$this->pwa->install_serviceworker();
    }
    if (isset($options['pwa_cache_pages_offline']) && trim($options['pwa_cache_pages_offline']) !== '') {
      // WordPress URL?
    	$postid = url_to_postid($options['pwa_cache_pages_offline']);
    	if ($postid) {
    	  $options['pwa_cache_pages_offline_name'] = $postid . '. ' . str_replace(home_url(), '', get_permalink($postid)) . ' - ' . get_the_title($postid);
    	} else {
    	  $options['pwa_cache_pages_offline_name'] = $options['pwa_cache_pages_offline'];
			}
    }
    // asset cache policy
    if(!is_array($options['pwa_cache_assets_policy'])){
      $options['pwa_cache_assets_policy'] = $this->admin->CTRL->pwa->get_sw_default_policy();
    }
    $pwa_manifest_status = false;
		$pwa_manifest_json = array();
		$pwa_manifest = trailingslashit(ABSPATH) . 'manifest.json';
		if (!file_exists($pwa_manifest)) {
      $pwa_manifest_status = 'not existing';
    } elseif (!is_writeable($pwa_manifest)) {
      $pwa_manifest_status = 'not writable';
    } else {
		  $pwa_manifest_status = 'good';
      $json = file_get_contents($pwa_manifest);
      $pwa_manifest_json = @json_decode(trim($json), true);
    }
    $options['pwa_manifest_status'] = $pwa_manifest_status;
    $options['pwa_manifest_json'] = $pwa_manifest_json;
    $options['pwa_scope_current'] = $this->admin->CTRL->pwa->get_sw_scope();
    $options['push_notification_plugins_url'] = admin_url('plugin-install.php?s=push+notifications&tab=search&type=term');
    $options['pwa_sw_filename'] = $sw['filename'];

    // HTTP/2
	// asset cache policy
    if (empty($options['http2_push_config']) || !is_array($options['http2_push_config'])) {
      $options['http2_push_config'] = json_decode('[]');
    }

    // Settings
    // Used for settings import
    $options['abtf_options_exists'] = false;
    if(get_option('abovethefold')) {
      $options['abtf_options_exists'] = true;
    }

    $options['client_hashes'] = false;

    $hashes_url = wp_nonce_url(trailingslashit(site_url()), 'csp_hash_json', 'abtfr-csp-hash');
	
    try {
      $json = file_get_contents($hashes_url);
    } catch (Exception $err) {
      $json = false;
    }
    if ($json) {
      $options['client_hashes'] = json_decode($json);
    }

    // Monitor
		$options['uptimerobot_install_link'] = false;
    $options['uptimerobot_overview'] = false;
    
    // Makes sure the plugin is defined before trying to use it
    // Needed to check active plugins
    if ( ! function_exists( 'is_plugin_inactive' ) ) {
      require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
    }
		
		if (is_plugin_inactive('uptime-robot-monitor/uptime-robot-nh.php')) {
			$options['uptimerobot_status'] = 'not installed';

			$uptimerobot_action = 'install-plugin';
      $uptimerobot_slug = 'uptime-robot-monitor';
      $options['uptimerobot_install_link'] = wp_nonce_url(
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
        $options['uptimerobot_status'] = 'not configured';
      } else {
				$options['uptimerobot_status'] = 'active';
        $options['uptimerobot_overview'] = do_shortcode('[uptime-robot days="1-7-14-180"]') .
        do_shortcode('[uptime-robot-response]');
      }
    }

    return $this->convert_to_camel_case_array($options);
  }
  
  /**
   * Prepare the setting for the REST response
   *
   * @param mixed $setting WordPress representation of the setting.
   * @param WP_REST_Request $request Request object.
   * @return mixed
   */
  public function prepare_setting_for_response( $setting, $request ) {
    return array();
  }

  private function convert_to_camel_case_array( $data ) {
    $newData = array();
    foreach ($data as $key => $value) {
      $newKey = $this->convert_to_camel_case($key);

      $newData[$newKey] = $value;
    }
    return $newData;
  }

  private function convert_to_camel_case( $string ) {
    // Convert to camelCase, https://www.php.net/manual/en/function.ucwords.php#92092
    return preg_replace_callback(
      "/_(.?)/",
      function($matches){
        return strtoupper($matches[1]);
      }, 
      $string
    );
  }

  private function convert_to_snake_case( $string ) {
    // Convert to snake_case, https://www.php.net/manual/en/function.ucwords.php#92092
    return strtolower(preg_replace_callback(
      '/([^A-Z])([A-Z])/',
      function($matches){
        return $matches[1] . "_" . $matches[2];
      },
      $string
    ));
  }
 
  /**
   * Get the query params for collections
   *
   * @return array
   */
  public function get_collection_params() {
    return array(
      'page'     => array(
        'description'       => 'Current page of the collection.',
        'type'              => 'integer',
        'default'           => 1,
        'sanitize_callback' => 'absint',
      ),
      'per_page' => array(
        'description'       => 'Maximum number of items to be returned in result set.',
        'type'              => 'integer',
        'default'           => 10,
        'sanitize_callback' => 'absint',
      ),
      'search'   => array(
        'description'       => 'Limit results to those matching a string.',
        'type'              => 'string',
        'sanitize_callback' => 'sanitize_text_field',
      ),
    );
  }
}