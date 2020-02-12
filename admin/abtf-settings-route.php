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
    $data = $this->convert_to_camel_case_array($this->options);

    $data = array_filter($data, function($val){
      return !in_array($val, ['updateCount']);
    }, ARRAY_FILTER_USE_KEY);

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
    $data['pwaManifestStatus'] = $pwa_manifest_status;
    $data['pwaManifestJson'] = $pwa_manifest_json;
  
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
   * Prepare the setting for the REST response
   *
   * @param mixed $item WordPress representation of the setting.
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