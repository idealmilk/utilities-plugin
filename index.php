<?php

/*
  Plugin Name: Utilities Plugin Frontend
  Version: 1.0
  Author: Matthew Gilligan
  Author URI: https://github.com/idealmilk
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

function utilitiespluginregister() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'utilitiespluginregister' );

function ntherm_utilities_shortcode() {
  return '<div id="ntherm-react-root">React Root Placeholder</div>';
}
add_shortcode('ntherm_utilities', 'ntherm_utilities_shortcode');

function ntherm_enqueue_frontend_assets() {
  if (is_admin()) return;

  wp_enqueue_script(
      'ntherm-frontend',
      plugins_url('build/frontend.js', __FILE__),
      [ 'wp-element' ], // Important to have wp-element for React
      filemtime(plugin_dir_path(__FILE__) . 'build/frontend.js'),
      true // Load in footer
  );

  wp_enqueue_style(
      'ntherm-style',
      plugins_url('build/style-index.css', __FILE__),
      [],
      filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
  );
}
add_action('wp_enqueue_scripts', 'ntherm_enqueue_frontend_assets');

require_once plugin_dir_path(__FILE__) . 'api.php';