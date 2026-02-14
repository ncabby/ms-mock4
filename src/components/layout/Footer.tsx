import Link from "next/link";
import global from "../../../content/global.json";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Main footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-sm">
          {/* Social Links */}
          <div className="flex items-center gap-2">
            <a
              href={global.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-2 text-navy-200 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href={global.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-2 text-navy-200 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href={global.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-2 text-navy-200 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </div>

          {/* Contact Us Link */}
          <Link
            href="/contact-us"
            className="inline-flex items-center px-2 py-2 text-navy-200 hover:text-white transition-colors"
          >
            Contact Us
          </Link>

          {/* Phone */}
          <a
            href={global.phoneTel}
            className="inline-flex items-center px-2 py-2 text-navy-200 hover:text-white transition-colors"
          >
            {global.phone}
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-navy-700 pt-6 text-center text-xs text-navy-400">
          &copy; {global.copyright}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
