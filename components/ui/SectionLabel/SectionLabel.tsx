import type { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small uppercase eyebrow label used above section headings.
 */
export default function SectionLabel({
  children,
  className = "",
}: SectionLabelProps) {
  return (
    <p
      className={`text-xs uppercase tracking-widest text-[var(--color-text-secondary)] ${className}`}
    >
      {children}
    </p>
  );
}
