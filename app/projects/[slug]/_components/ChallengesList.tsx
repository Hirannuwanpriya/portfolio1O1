import type { ProjectChallenge } from "@/lib/content";

interface ChallengesListProps {
  challenges: ProjectChallenge[];
}

/**
 * CHALLENGES & LEARNINGS section. Each entry is a soft-tinted card containing
 * a short bold heading line plus a paragraph of supporting copy. Sits on the
 * white editorial surface.
 */
export default function ChallengesList({ challenges }: ChallengesListProps) {
  if (challenges.length === 0) return null;
  return (
    <ul role="list" className="grid grid-cols-1 gap-4 md:gap-6">
      {challenges.map((item, index) => (
        <li
          key={`${index}-${item.title}`}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]] p-6 md:p-8"
        >
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] md:text-lg">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
