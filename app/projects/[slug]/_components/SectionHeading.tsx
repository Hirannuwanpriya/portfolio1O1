import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
}

/**
 * Small uppercase section heading used inside the dark project detail page
 * (TECH STACK, DELIVERY, OUTCOMES, CHALLENGES & LEARNINGS).
 */
export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
      {children}
    </h2>
  );
}
