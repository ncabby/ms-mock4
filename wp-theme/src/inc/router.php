<?php
/**
 * Marketing-page router.
 *
 * Maps the 11 hardcoded marketing slugs to their templates and force-owns those slugs:
 * the hand-coded design renders even if a legacy WP Page occupies the same slug, and a
 * clean HTTP 200 is served when no Page exists. Home ('') is handled by front-page.php.
 *
 * @package MainSail
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Marketing slug => template file (relative to the theme root).
 *
 * @return array<string,string>
 */
function mainsail_marketing_map() {
	return array(
		'careers'                             => 'router-pages/careers.php',
		'contact'                             => 'router-pages/contact.php',
		'contract-vehicles'                   => 'router-pages/contract-vehicles.php',
		'data-analytics'                      => 'router-pages/data-analytics.php',
		'digital-engineering-manufacturing'   => 'router-pages/digital-engineering-manufacturing.php',
		'enterprise-it'                       => 'router-pages/enterprise-it.php',
		'intelligent-automation'              => 'router-pages/intelligent-automation.php',
		'maintenance-logistics-optimization'  => 'router-pages/maintenance-logistics-optimization.php',
		'program-support'                     => 'router-pages/program-support.php',
		'privacy-policy'                      => 'router-pages/privacy-policy.php',
	);
}

/**
 * Current request path relative to the WordPress home.
 *
 * Uses $wp->request (already stripped of any subdirectory such as /staging) when available,
 * falling back to REQUEST_URI with the home path removed.
 *
 * @return string Slug without leading/trailing slashes ('' for home).
 */
function mainsail_current_slug() {
	global $wp;
	if ( isset( $wp ) && isset( $wp->request ) ) {
		return trim( (string) $wp->request, '/' );
	}

	$req = isset( $_SERVER['REQUEST_URI'] )
		? (string) wp_parse_url( esc_url_raw( wp_unslash( $_SERVER['REQUEST_URI'] ) ), PHP_URL_PATH )
		: '';
	$req  = trim( $req, '/' );
	$home = trim( (string) wp_parse_url( home_url(), PHP_URL_PATH ), '/' );
	if ( '' !== $home && 0 === strpos( $req, $home ) ) {
		$req = trim( substr( $req, strlen( $home ) ), '/' );
	}
	return $req;
}

/**
 * Is the current request a hardcoded marketing page (incl. home)?
 *
 * @return bool
 */
function mainsail_is_router_page() {
	$slug = mainsail_current_slug();
	if ( '' === $slug ) {
		return true; // Home -> front-page.php.
	}
	return array_key_exists( $slug, mainsail_marketing_map() );
}

/**
 * Render the hardcoded template for a matched marketing slug.
 *
 * @param string $template Template path WordPress resolved.
 * @return string
 */
function mainsail_router( $template ) {
	if ( is_admin() ) {
		return $template;
	}

	$slug = mainsail_current_slug();
	if ( '' === $slug ) {
		return $template; // front-page.php owns the home page.
	}

	$map = mainsail_marketing_map();
	if ( isset( $map[ $slug ] ) ) {
		$file = MAINSAIL_DIR . '/' . $map[ $slug ];
		if ( file_exists( $file ) ) {
			global $wp_query;
			if ( $wp_query instanceof WP_Query ) {
				$wp_query->is_404 = false;
			}
			status_header( 200 );
			return $file;
		}
	}

	return $template;
}
add_filter( 'template_include', 'mainsail_router', 99 );
