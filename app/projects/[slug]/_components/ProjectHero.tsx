import type { ProjectHero as ProjectHeroData } from "@/lib/content";

interface ProjectHeroProps {
  hero: ProjectHeroData;
}

/**
 * Full-width gradient hero band at the top of a project case study. Renders
 * the short project name and small uppercase tagline shown in the reference
 * screenshot. The gradient runs from the brand `--color-accent-blue` token to
 * the darker `--color-accent-blue-deep` token defined in `app/globals.css`.
 *
 * This is the one place colour fills the surface — text inside stays white
 * because it sits on the dark gradient. The rest of the project detail page
 * is a light editorial layout (white surface, primary black text).
 */
export default function ProjectHero({ hero }: ProjectHeroProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-6 py-16 md:px-12 md:py-20 lg:py-24"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent-blue) 0%, var(--color-accent-blue-deep) 100%)",
      }}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85">
        {hero.tagline}
      </p>
      <p className="mt-5 font-[family-name:var(--font-serif)] text-5xl font-normal italic leading-[1.05] tracking-[-0.02em] text-white md:text-6xl lg:text-7xl">
        {hero.name}
      </p>
    </div>
  );
}
