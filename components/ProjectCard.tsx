import Image from "next/image";
import Link from "next/link";

export interface ProjectCardData {
  title: string;
  /** Display chip text — e.g. "SaaS · CRM" */
  category: string;
  description: string;
  techStack: string[];
  /** Absolute or remote URL for the cover image. */
  imageUrl: string;
  imageAlt: string;
  href: string;
}

interface ProjectCardProps {
  project: ProjectCardData;
}

/**
 * Project card matching design skill §6.4: cover image, category chip, title,
 * description, monospace tech tags, and a "View Case Study" link.
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-bg-soft)]">
        <Image
          src={project.imageUrl}
          alt={project.imageAlt}
          width={1280}
          height={720}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="inline-flex w-fit rounded-full bg-[var(--color-accent-sand)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-text-primary)]">
          {project.category}
        </span>

        <h3 className="text-xl font-semibold leading-tight tracking-tight text-[var(--color-text-primary)]">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {project.description}
        </p>

        <ul className="mt-1 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-2 py-0.5 font-mono text-xs text-[var(--color-text-primary)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-4">
          <Link
            href={project.href}
            className="inline-flex items-center gap-1 rounded-sm text-sm text-[var(--color-text-primary)] underline-offset-4 transition-colors duration-150 hover:text-[var(--color-accent-blue)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
          >
            View Case Study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
