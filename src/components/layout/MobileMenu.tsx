"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

interface MobileMenuProps {
  items: NavItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedSection(null);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleSection = (label: string) => {
    setExpandedSection((prev) => (prev === label ? null : label));
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer"
      >
        <span className="block w-6 h-0.5 bg-navy-800 rounded-full" />
        <span className="block w-6 h-0.5 bg-navy-800 rounded-full" />
        <span className="block w-6 h-0.5 bg-navy-800 rounded-full" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Slide-out Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-10 h-10 cursor-pointer"
          >
            <span className="relative block w-6 h-6">
              <span className="absolute top-1/2 left-0 block w-6 h-0.5 bg-navy-800 rounded-full rotate-45 -translate-y-1/2" />
              <span className="absolute top-1/2 left-0 block w-6 h-0.5 bg-navy-800 rounded-full -rotate-45 -translate-y-1/2" />
            </span>
          </button>
        </div>

        {/* Nav Links */}
        <nav aria-label="Mobile navigation" className="px-6 pb-8 overflow-y-auto h-[calc(100%-72px)]">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    {/* Accordion header */}
                    <button
                      onClick={() => toggleSection(item.label)}
                      aria-expanded={expandedSection === item.label}
                      className="flex items-center justify-between w-full py-3 px-2 text-left text-navy-800 font-medium hover:bg-navy-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          expandedSection === item.label ? "rotate-180" : ""
                        }`}
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
                    </button>

                    {/* Accordion children */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedSection === item.label
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-4 pb-2 space-y-1">
                        <li>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="block py-2 px-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
                          >
                            All {item.label}
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              className="block py-2 px-2 text-sm text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-3 px-2 text-navy-800 font-medium hover:bg-navy-50 rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
