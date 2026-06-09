<?php
/**
 * Main Sail theme bootstrap.
 *
 * Hybrid theme:
 *  - 11 marketing pages (incl. home): hardcoded, pixel-exact templates owned by a router
 *    (see inc/router.php). The router force-owns these slugs so the hand-coded design always
 *    renders, even if a legacy WP Page sits at the same slug.
 *  - Operations pages (cmmc-2-0, corporate-compliance, main-sail-bwxt, + future): native WP
 *    Pages edited in Gutenberg, auto-branded via theme.json + css/ops-pages.css, rendered by page.php.
 *
 * @package MainSail
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MAINSAIL_VERSION', '1.0.0' );
define( 'MAINSAIL_DIR', get_template_directory() );
define( 'MAINSAIL_URI', get_template_directory_uri() );
// Path portion of the site home (e.g. '' on root, '/staging' in a WP Staging clone). Internal
// links in the hardcoded templates are prefixed with this so navigation works in either location.
define( 'MAINSAIL_HOME', untrailingslashit( (string) wp_parse_url( home_url(), PHP_URL_PATH ) ) );

require_once MAINSAIL_DIR . '/inc/router.php';
require_once MAINSAIL_DIR . '/inc/redirects.php';
require_once MAINSAIL_DIR . '/inc/contact-form.php';

/**
 * Theme setup.
 */
function mainsail_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'editor-styles' );
	add_editor_style( array( 'editor-style.css', 'css/ops-pages.css' ) );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'automatic-feed-links' );
}
add_action( 'after_setup_theme', 'mainsail_setup' );

/**
 * Title-tag strategy.
 *
 * title-tag support is always on so Operations Pages get a proper WP/Yoast document title.
 * Router-owned marketing pages (incl. home) ship their own curated <title> + meta description in
 * the hardcoded template, so on those we remove core's title renderer and silence Yoast — leaving
 * only the hardcoded tag (no duplicate, no garbage title on the object-less router request).
 */
function mainsail_title_strategy() {
	if ( mainsail_is_router_page() ) {
		remove_action( 'wp_head', '_wp_render_title_tag', 1 );
		add_filter( 'wpseo_frontend_presenter_classes', '__return_empty_array' );
	}
}
add_action( 'template_redirect', 'mainsail_title_strategy', 1 );

/**
 * Asset cache-buster: filemtime when present, theme version otherwise.
 *
 * @param string $rel Path relative to the theme root.
 * @return string
 */
function mainsail_asset_ver( $rel ) {
	$path = MAINSAIL_DIR . '/' . ltrim( $rel, '/' );
	return file_exists( $path ) ? (string) filemtime( $path ) : MAINSAIL_VERSION;
}

/**
 * Front-end assets.
 */
function mainsail_enqueue() {
	// Google Fonts — matches the hardcoded design (Outfit display + Source Sans 3 body).
	wp_enqueue_style(
		'mainsail-fonts',
		'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	wp_enqueue_style(
		'mainsail-styles',
		MAINSAIL_URI . '/css/styles.css',
		array( 'mainsail-fonts' ),
		mainsail_asset_ver( 'css/styles.css' )
	);

	// Operations (Gutenberg) page branding — load only where it is used. Also the branded
	// 404 (404.php), which reuses the .ops-page-section chrome (its top padding clears the
	// fixed header; without this CSS the heading renders under the header).
	if ( ( is_page() && ! mainsail_is_router_page() ) || is_404() ) {
		wp_enqueue_style(
			'mainsail-ops',
			MAINSAIL_URI . '/css/ops-pages.css',
			array( 'mainsail-styles' ),
			mainsail_asset_ver( 'css/ops-pages.css' )
		);
	}

	wp_enqueue_script(
		'mainsail-main',
		MAINSAIL_URI . '/js/main.js',
		array(),
		mainsail_asset_ver( 'js/main.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'mainsail_enqueue' );

/**
 * Font preconnect hints, mirroring the original hardcoded markup.
 *
 * @param array  $hints    URLs to print.
 * @param string $relation Relation type.
 * @return array
 */
function mainsail_resource_hints( $hints, $relation ) {
	if ( 'preconnect' === $relation ) {
		$hints[] = 'https://fonts.googleapis.com';
		$hints[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => 'anonymous',
		);
	}
	return $hints;
}
add_filter( 'wp_resource_hints', 'mainsail_resource_hints', 10, 2 );

/**
 * Keep <head> calm: drop emoji, generator and feed-discovery clutter the design never used.
 */
function mainsail_head_cleanup() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
}
add_action( 'init', 'mainsail_head_cleanup' );
