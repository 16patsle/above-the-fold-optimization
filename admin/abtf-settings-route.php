<?php
 
class ABTF_Settings_Route extends WP_REST_Controller {

  public function __construct (&$admin) {
    $this->admin = & $admin;
    $this->options = & $admin->CTRL->options;
  }
 
  /**
   * Register the routes for the objects of the controller.
   */
  public function register_routes() {
    $version = '1';
    $namespace = 'abtf/v' . $version;
    $base = 'settings';
    register_rest_route( $namespace, '/' . $base, array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_settings' ),
      'permission_callback' => array( $this, 'get_settings_permissions_check' ),
      'args'                => array(),
    ) );
    register_rest_route( $namespace, '/' . $base . '/(?P<setting>[\w]+)', array(
      'methods'             => WP_REST_Server::READABLE,
      'callback'            => array( $this, 'get_setting' ),
      'permission_callback' => array( $this, 'get_settings_permissions_check' ),
    ) );
    register_rest_route( $namespace, '/' . $base . '/schema', array(
      'methods'  => WP_REST_Server::READABLE,
      'callback' => array( $this, 'get_public_item_schema' ),
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
   * Check if a given request has access to get settings
   *
   * @param WP_REST_Request $request Full data about the request.
   * @return WP_Error|bool
   */
  public function get_settings_permissions_check( $request ) {
    return current_user_can( 'manage_options' );
  }

  /**
   * Prepare settings for the REST response
   *
   * @param array $options The settings.
   * @return array
   */
  public function prepare_settings_for_response( $options ) {
    // PWA
    $sw = $this->admin->CTRL->pwa->get_sw();

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
      	$json = file_get_contents(trailingslashit(ABSPATH) . 'manifest.json');
      	$pwa_manifest_json = @json_decode(trim($json), true);
      	/*if (!is_array($pwa_manifest_json)) {
      	    $pwa_manifest_json = array();
		}*/
    }
    $options['pwa_manifest_status'] = $pwa_manifest_status;
    $options['pwa_manifest_json'] = $pwa_manifest_json;
    $options['pwa_scope_current'] = $this->admin->CTRL->pwa->get_sw_scope();
    $options['push_notification_plugins_url'] = admin_url('plugin-install.php?s=push+notifications&tab=search&type=term');
    $options['pwa_sw_filename'] = $sw['filename'];

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