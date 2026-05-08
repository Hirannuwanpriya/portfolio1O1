import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  styleClass: string;
}

/**
 * Small uppercase section heading used inside the project detail page
 * (TECH STACK, DELIVERY, OUTCOMES, CHALLENGES & LEARNINGS). Muted mono on
 * white, matching the editorial light theme used across the site.
 */
export default function SectionHeading({ children, styleClass = "" }: SectionHeadingProps) {
  return (
    <h2 className={`font-mono text-xs font-semibold uppercase tracking-widest ${
        styleClass || "text-[var(--color-text-primary)]"
      }`}>
      {children}
    </h2>
  );
}
