import type { ProjectPhase } from "@/lib/content";

interface DeliveryTimelineProps {
  phases: ProjectPhase[];
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/**
 * DELIVERY timeline. Each phase is a row: small uppercase phase index on the
 * left, phase title + description on the right. Thin dividers between phases.
 */
export default function DeliveryTimeline({ phases }: DeliveryTimelineProps) {
  if (phases.length === 0) return null;
  return (
    <ol role="list" className="divide-y divide-[var(--color-border)]">
      {phases.map((phase, index) => (
        <li
          key={`${index}-${phase.title}`}
          className="grid grid-cols-1 gap-3 py-6 md:grid-cols-[160px_1fr] md:gap-12 md:py-8"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-secondary)]">
            PHASE {pad2(index + 1)}
          </p>
          <div>
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] md:text-lg">
              {phase.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {phase.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
