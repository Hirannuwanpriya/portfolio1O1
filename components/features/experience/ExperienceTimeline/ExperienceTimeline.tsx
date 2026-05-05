import type { ExperienceEntry } from "@/lib/experience";

interface ExperienceTimelineProps {
  entries: readonly ExperienceEntry[];
}

/**
 * Editorial vertical timeline rendering each role as a list item with a
 * left-border accent and a filled / outlined dot for current vs past roles.
 * Mirrors design skill §6.5.
 */
export default function ExperienceTimeline({
  entries,
}: ExperienceTimelineProps) {
  return (
    <ol role="list" className="ml-3 border-l-2 border-[var(--color-border)]">
      {entries.map((entry, index) => {
        const isCurrent = index === 0;
        return (
          <li
            key={entry.id}
            id={entry.id}
            className="relative scroll-mt-24 pl-6 pb-14 last:pb-0 md:pl-8"
          >
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className={`absolute top-1.5 left-0 h-3 w-3 -translate-x-[calc(50%+1px)] rounded-full ${
                isCurrent
                  ? "bg-[var(--color-text-primary)]"
                  : "border-2 border-[var(--color-border)] bg-white"
              }`}
            />

            {/* Period eyebrow */}
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent-blue)]">
              {entry.period}
            </p>

            {/* Role + Company */}
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-2xl">
              {entry.role}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)] md:text-base">
              <span className="font-medium text-[var(--color-text-primary)]">
                {entry.company}
              </span>
              {entry.location ? (
                <>
                  <span aria-hidden="true"> · </span>
                  {entry.location}
                </>
              ) : null}
            </p>

            {/* Summary */}
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--color-text-primary)]">
              {entry.summary}
            </p>

            {/* Achievements */}
            <ul
              role="list"
              className="mt-5 max-w-3xl list-disc space-y-2 pl-5 marker:text-[var(--color-text-secondary)]"
            >
              {entry.achievements.map((achievement) => (
                <li
                  key={achievement}
                  className="text-sm leading-relaxed text-[var(--color-text-secondary)] md:text-base"
                >
                  {achievement}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}
