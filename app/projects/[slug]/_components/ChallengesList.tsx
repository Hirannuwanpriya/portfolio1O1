import type { ProjectChallenge } from "@/lib/content";

interface ChallengesListProps {
  challenges: ProjectChallenge[];
}

/**
 * CHALLENGES & LEARNINGS section. Each entry is a bordered card containing a
 * short bold heading line plus a paragraph of supporting copy.
 */
export default function ChallengesList({ challenges }: ChallengesListProps) {
  if (challenges.length === 0) return null;
  return (
    <ul role="list" className="grid grid-cols-1 gap-4 md:gap-6">
      {challenges.map((item, index) => (
        <li
          key={`${index}-${item.title}`}
          className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        >
          <h3 className="text-base font-semibold text-white md:text-lg">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
