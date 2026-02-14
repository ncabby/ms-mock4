"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

interface NavLinksProps {
  items: NavItem[];
}

export function NavLinks({ items }: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="hidden lg:flex lg:items-center lg:gap-1"
    >
      {items.map((item) => {
        const active = isActive(item.href);
        return (
          <div key={item.label} className="relative group">
            <Link
              href={item.href}
              className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? "text-navy-900 border-b-2 border-accent-500"
                  : "text-navy-700 hover:text-navy-900 hover:bg-navy-50"
              }`}
            >
              {item.label}
              {item.children && (
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </Link>

            {/* Dropdown for items with children */}
            {item.children && (
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-72 rounded-xl bg-white shadow-lg ring-1 ring-navy-100 py-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-navy-700 hover:text-navy-900 hover:bg-navy-50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
