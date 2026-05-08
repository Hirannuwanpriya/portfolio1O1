import type { ProjectStat } from "@/lib/content";

/**
 * Three-column stat row. Each card sits on a soft tinted background with a
 * subtle border. The big numeric value uses `--color-accent-blue` to draw the
 * eye on an otherwise white editorial page.
 */
interface ProjectStatsProps {
  stats: ProjectStat[];
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  if (stats.length === 0) return null;
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
    >
      {stats.map((stat) => (
        <li
          key={stat.label}
          className="rounded-xl border border-[var(--color-border)] bg-[#F8F8F6] p-6 md:p-8"
        >
          <p className="text-4xl font-bold leading-none tracking-[-0.02em] text-[var(--color-text-primary)] md:text-5xl">
            {stat.value}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
