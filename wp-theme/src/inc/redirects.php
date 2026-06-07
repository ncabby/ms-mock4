<?php
/**
 * Three theme-baked legacy 301s.
 *
 * The broader legacy->new URL map is handled by the Redirection plugin; these three are baked in
 * because they map old top-level paths onto current capability slugs and must always be present.
 *
 * @package MainSail
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Issue permanent redirects for retired URLs.
 */
function mainsail_legacy_redirects() {
	if ( is_admin() ) {
		return;
	}

	$map = array(
		'what-we-do'                    => '/digital-engineering-manufacturing',
		'enterprise-technology'         => '/enterprise-it',
		'digital-maintenance-logistics' => '/maintenance-logistics-optimization',
	);

	$slug = mainsail_current_slug();
	if ( isset( $map[ $slug ] ) ) {
		wp_safe_redirect( home_url( $map[ $slug ] ), 301 );
		exit;
	}
}
add_action( 'template_redirect', 'mainsail_legacy_redirects', 0 );
