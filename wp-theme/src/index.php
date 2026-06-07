<?php
/**
 * Generic fallback template (search, archives, single posts and any unmatched request).
 *
 * The site is brochure-style; this exists to satisfy the template hierarchy and to render any
 * stray content inside the branded chrome.
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
		<?php if ( have_posts() ) : ?>
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'ops-page' ); ?>>
					<header class="ops-page-header">
						<h1><?php the_title(); ?></h1>
					</header>
					<div class="ops-page-content">
						<?php the_content(); ?>
					</div>
				</article>
				<?php
			endwhile;
			?>
		<?php else : ?>
			<div class="ops-page">
				<h1>Nothing found</h1>
				<p><a href="<?php echo esc_url( home_url( '/' ) ); ?>">Return to the homepage</a>.</p>
			</div>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
