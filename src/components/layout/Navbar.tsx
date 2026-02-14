import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";

import navigation from "../../../content/navigation.json";
import global from "../../../content/global.json";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navItems: NavItem[] = navigation.main;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label={`${global.companyName} home`}>
            <Image
              src={global.logo}
              alt={`${global.companyName} logo`}
              width={160}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation (client component for active state) */}
          <NavLinks items={navItems} />

          {/* Mobile Menu */}
          <MobileMenu items={navItems} />
        </div>
      </div>
    </header>
  );
}
