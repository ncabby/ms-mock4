<?php
/**
 * 404 template, in branded chrome.
 *
 * @package MainSail
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();
?>
<section id="main" class="ops-page-section">
	<div class="container">
		<div class="ops-page" style="text-align:center;">
			<h1>Page not found</h1>
			<p>The page you’re looking for doesn’t exist or has moved.</p>
			<p style="margin-top:var(--space-xl);">
				<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Back to home</a>
			</p>
		</div>
	</div>
</section>
<?php
get_footer();
