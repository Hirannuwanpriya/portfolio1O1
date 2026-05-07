import type { ProjectStat } from "@/lib/content";

interface ProjectStatsProps {
  stats: ProjectStat[];
}

/**
 * Three-column stat row. Each card shows a large numeric value with a small
 * descriptive label below.
 */
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
          className="rounded-xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        >
          <p className="text-4xl font-bold leading-none tracking-[-0.02em] text-white md:text-5xl">
            {stat.value}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {stat.label}
          </p>
        </li>
      ))}
    </ul>
  );
}
