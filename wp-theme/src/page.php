<?php
/**
 * Operations zone "Content Page" template.
 *
 * Renders native WordPress Pages (cmmc-2-0, corporate-compliance, main-sail-bwxt and any future
 * page added by staff) inside the branded site chrome. theme.json + css/ops-pages.css auto-brand
 * the Gutenberg blocks. These pages are unlisted by default; the mega-nav stays hardcoded.
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
	</div>
</section>
<?php
get_footer();
