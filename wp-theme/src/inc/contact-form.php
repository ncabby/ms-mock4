<?php
/**
 * Contact form handler for the hardcoded /contact page.
 *
 * The form POSTs to itself (Post/Redirect/Get). Delivery is via wp_mail(), which the WP Mail SMTP
 * plugin routes through the Microsoft 365 mailbox (SMTP AUTH). A mailto: link remains in the
 * template as a backstop. Destination: msail@mainsailgroup.com.
 *
 * @package MainSail
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const MAINSAIL_CONTACT_TO = 'msail@mainsailgroup.com';

/**
 * Allowed subject values => human labels.
 *
 * @return array<string,string>
 */
function mainsail_contact_subjects() {
	return array(
		'general'     => 'General Inquiry',
		'contracts'   => 'Contract Vehicle Question',
		'partnership' => 'Partnership Opportunity',
		'careers'     => 'Career Inquiry',
		'support'     => 'Technical Support',
	);
}

/**
 * Process a contact-form submission, then redirect (PRG) with a status flag.
 */
function mainsail_handle_contact() {
	if ( 'contact' !== mainsail_current_slug() ) {
		return;
	}
	$method = isset( $_SERVER['REQUEST_METHOD'] ) ? strtoupper( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_METHOD'] ) ) ) : 'GET';
	if ( 'POST' !== $method ) {
		return;
	}

	$redirect = home_url( '/contact' );

	// Honeypot: pretend success to the bot, drop the message.
	if ( ! empty( $_POST['ms_hp'] ) ) {
		wp_safe_redirect( add_query_arg( 'sent', '1', $redirect ) );
		exit;
	}

	// Nonce.
	if ( ! isset( $_POST['mainsail_contact_nonce'] )
		|| ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['mainsail_contact_nonce'] ) ), 'mainsail_contact' ) ) {
		wp_safe_redirect( add_query_arg( 'err', 'security', $redirect ) );
		exit;
	}

	$first = sanitize_text_field( wp_unslash( $_POST['first_name'] ?? '' ) );
	$last  = sanitize_text_field( wp_unslash( $_POST['last_name'] ?? '' ) );
	$email = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
	$phone = sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) );
	$org   = sanitize_text_field( wp_unslash( $_POST['organization'] ?? '' ) );
	$subj  = sanitize_text_field( wp_unslash( $_POST['subject'] ?? '' ) );
	$msg   = sanitize_textarea_field( wp_unslash( $_POST['message'] ?? '' ) );

	$subjects = mainsail_contact_subjects();

	if ( '' === $first || '' === $last || ! is_email( $email ) || '' === $org || ! isset( $subjects[ $subj ] ) || '' === $msg ) {
		wp_safe_redirect( add_query_arg( 'err', 'fields', $redirect ) );
		exit;
	}

	$subj_label = $subjects[ $subj ];
	$site       = wp_specialchars_decode( get_bloginfo( 'name' ), ENT_QUOTES );
	$subject    = sprintf( '[%s] %s — %s %s', '' !== $site ? $site : 'Main Sail', $subj_label, $first, $last );
	$body       = "New message from the Main Sail website contact form.\n\n"
		. "Name: {$first} {$last}\n"
		. "Email: {$email}\n"
		. 'Phone: ' . ( '' !== $phone ? $phone : '—' ) . "\n"
		. "Organization: {$org}\n"
		. "Subject: {$subj_label}\n\n"
		. "Message:\n{$msg}\n";
	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		sprintf( 'Reply-To: %s %s <%s>', $first, $last, $email ),
	);

	$ok = wp_mail( MAINSAIL_CONTACT_TO, $subject, $body, $headers );

	wp_safe_redirect( add_query_arg( $ok ? array( 'sent' => '1' ) : array( 'err' => 'send' ), $redirect ) );
	exit;
}
add_action( 'template_redirect', 'mainsail_handle_contact', 5 );

/**
 * Success/error banner shown above the form, driven by the PRG query flag.
 *
 * Returns fully-formed, pre-escaped HTML (echo directly in the template).
 *
 * @return string
 */
function mainsail_contact_banner() {
	// Display-only read of a PRG flag; no state change, so no nonce is required.
	if ( isset( $_GET['sent'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		return '<div class="form-banner form-banner-success" role="status">Thank you — your message has been sent. We respond within one business day.</div>';
	}

	if ( isset( $_GET['err'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$err      = sanitize_key( wp_unslash( $_GET['err'] ) ); // phpcs:ignore WordPress.Security.NonceVerification.Recommended
		$messages = array(
			'fields'   => 'Please complete all required fields with a valid email address.',
			'security' => 'Your session expired. Please resubmit the form.',
			'send'     => 'We could not send your message right now. Please email msail@mainsailgroup.com directly.',
		);
		$text = $messages[ $err ] ?? $messages['send'];
		return '<div class="form-banner form-banner-error" role="alert">' . esc_html( $text ) . '</div>';
	}

	return '';
}
