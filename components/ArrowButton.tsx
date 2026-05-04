import Link from "next/link";
import type { ReactNode } from "react";

interface ArrowButtonProps {
  href: string;
  children: ReactNode;
  /**
   * Visual variant.
   * - `pill`: text + circular black arrow chip on the right (used for "Let's Talk").
   * - `inline`: inline label + circle arrow, used inside body copy.
   */
  variant?: "pill" | "inline";
  className?: string;
}

/**
 * Reusable circular black arrow CTA used for "Contact Me →" and "Let's Talk →".
 *
 * The arrow itself is an inline SVG (arrow-up-right) rendered inside a
 * filled black circle so the design is consistent across light backgrounds.
 */
export default function ArrowButton({
  href,
  children,
  variant = "pill",
  className = "",
}: ArrowButtonProps) {
  if (variant === "pill") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 rounded-full bg-[var(--color-text-primary)] py-1.5 pr-1.5 pl-5 text-sm font-medium text-white transition-colors duration-200 hover:bg-[#2d2d2d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-blue)] focus-visible:ring-offset-2 ${className}`}
      >
        <span>{children}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[var(--color-text-primary)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-accent-crimson)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-crimson)] focus-visible:ring-offset-2 ${className}`}
    >
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

function ArrowUpRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 12 12 4" />
      <path d="M5.5 4H12v6.5" />
    </svg>
  );
}
