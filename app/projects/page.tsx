import type { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard, {
  type ProjectCardData,
} from "@/components/features/projects/ProjectCard";
import CTASection from "@/components/features/home/CTASection";
import { getAllProjects, type ProjectEntry } from "@/lib/content";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";
import {
  collectionPageSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

const PAGE_PATH = "/projects";
const PAGE_TITLE =
  "Projects | Laravel, React, Next.js and SaaS Development Portfolio";
const PAGE_DESCRIPTION =
  "View software engineering projects by Hiran Nuwanpriya, including SaaS applications, CRM systems, e-commerce platforms, ERP/POS solutions and full stack web applications.";

const FALLBACK_COVER =
  "https://placehold.co/1280x720/FAFAFA/111418?text=Project";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

function toCardData(entry: ProjectEntry): ProjectCardData {
  const { frontmatter, slug } = entry;
  return {
    title: frontmatter.title,
    category: frontmatter.category ?? "Case Study",
    description: frontmatter.summary,
    techStack: frontmatter.techStack,
    imageUrl: frontmatter.coverImage ?? FALLBACK_COVER,
    imageAlt: frontmatter.coverAlt ?? `${frontmatter.title} cover image`,
    href: `/projects/${slug}`,
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  const jsonLd = serializeJsonLd(
    collectionPageSchema({
      name: "Projects",
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
      items: projects.map((p) => ({
        name: p.frontmatter.title,
        url: `${SITE_URL}/projects/${p.slug}`,
        description: p.frontmatter.summary,
      })),
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28 lg:px-12">
          <div className="mb-12 max-w-3xl md:mb-16">
            <SectionLabel className="mb-4">Projects</SectionLabel>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
              Digital solutions{" "}
              <em className="inline-block font-[var(--font-serif)] font-normal italic">
                 I have worked on
              </em>
              .
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              Demonstrate my experience in backend engineering, frontend development,
              deployment, optimisation, and scalable web application delivery.
            </p>
          </div>

          {projects.length === 0 ? (
            <p className="text-base text-[var(--color-text-secondary)]">
              New case studies are being written up — check back soon.
            </p>
          ) : (
            <ul
              role="list"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((entry) => (
                <li key={entry.slug} className="contents">
                  <ProjectCard project={toCardData(entry)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
