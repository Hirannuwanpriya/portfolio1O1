"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
}

const MENU_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

/**
 * Full-screen black slide-in mobile menu per design skill §6.1.
 *
 * - Hamburger trigger renders inline (only visible below `lg`).
 * - Opening locks body scroll, traps `Esc`, closes on backdrop click.
 * - Large white serif/sans link list, "Let's Talk" CTA at the bottom.
 */
export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock + Esc + focus management.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    // Move focus to close button after the panel mounts.
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  // Restore focus to the trigger when the menu closes.
  useEffect(() => {
    if (!open) {
      openBtnRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  return (
    <>
      <button
        ref={openBtnRef}
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--color-border)] text-[var(--color-text-primary)] transition-colors duration-150 hover:border-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)] lg:hidden"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M3 6h14" />
          <path d="M3 10h14" />
          <path d="M3 14h14" />
        </svg>
      </button>

      {open ? (
        <div
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-text-primary)] text-white lg:hidden"
        >
          {/* Close bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 md:px-8">
            <span className="inline-flex items-center gap-2.5">
              <Image
                src="/logo-reversed.png"
                alt=""
                width={240}
                height={240}
                className="h-9 w-9 rounded-sm"
              />
              <span className="text-sm uppercase tracking-wide">
                Hiran{" "}
                <span className="font-[var(--font-serif)] text-base font-normal italic normal-case">
                  Nuwanpriya
                </span>
              </span>
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white transition-colors duration-150 hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M5 5l10 10" />
                <path d="M15 5L5 15" />
              </svg>
            </button>
          </div>

          {/* Backdrop click closes — covers the area between the close bar and the link list. */}
          <nav
            aria-label="Mobile primary"
            className="flex flex-1 flex-col justify-between px-6 pt-6 pb-10 md:px-8"
          >
            <ul className="flex flex-col gap-5">
              {MENU_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block text-4xl font-semibold tracking-[-0.02em] text-white transition-colors duration-150 hover:text-[var(--color-accent-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)] md:text-5xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/contact"
                onClick={close}
                className="group inline-flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
              >
                <span>Let&apos;s Talk</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-white motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M4 12 12 4" />
                    <path d="M5.5 4H12v6.5" />
                  </svg>
                </span>
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
