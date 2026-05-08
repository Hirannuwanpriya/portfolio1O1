import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  type ProjectEntry,
} from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { projectSchema, serializeJsonLd } from "@/lib/structured-data";
import ProjectHero from "./_components/ProjectHero";
import ProjectMeta from "./_components/ProjectMeta";
import ProjectStats from "./_components/ProjectStats";
import SectionHeading from "./_components/SectionHeading";
import TechStackList from "./_components/TechStackList";
import DeliveryTimeline from "./_components/DeliveryTimeline";
import OutcomesList from "./_components/OutcomesList";
import ChallengesList from "./_components/ChallengesList";

interface ProjectPageParams {
  slug: string;
}

interface ProjectPageProps {
  params: Promise<ProjectPageParams>;
}

export async function generateStaticParams(): Promise<ProjectPageParams[]> {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

async function loadProject(slug: string): Promise<ProjectEntry | null> {
  const project = await getProjectBySlug(slug);
  if (!project) return null;
  if (project.frontmatter.published === false) return null;
  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) {
    return {
      title: "Project not found",
      description: "The project case study you’re looking for could not be found.",
    };
  }
  const fm = project.frontmatter;
  const title = fm.seo?.title ?? `${fm.title} | Hiran Nuwanpriya`;
  const description = fm.seo?.description ?? fm.summary;
  const ogImage = fm.seo?.ogImage ?? fm.coverImage;

  return buildPageMetadata({
    title,
    description,
    path: `/projects/${project.slug}`,
    ogImage,
    ogTitle: fm.title,
    ogDescription: fm.summary,
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = await loadProject(slug);
  if (!project) notFound();

  const fm = project.frontmatter;

  const jsonLd = serializeJsonLd(
    projectSchema({
      title: fm.title,
      description: fm.summary,
      slug: project.slug,
      type: fm.structuredData?.type,
      applicationCategory: fm.structuredData?.applicationCategory,
      techStack: fm.techStack,
      liveUrl: fm.liveUrl,
      image: fm.seo?.ogImage ?? fm.coverImage,
      datePublished: fm.date,
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <article className="bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <div className="mx-auto max-w-5xl px-6 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 lg:px-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-text-secondary)] transition-colors duration-150 hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]"
          >
            <span aria-hidden="true">&larr;</span> Projects
          </Link>
{/* 
          {fm.hero ? (
            <div className="mt-8 md:mt-10">
              <ProjectHero hero={fm.hero} />
            </div>
          ) : null} */}

          <div className="mt-12 md:mt-16">
            {fm.category ? (
              <span className="inline-flex rounded-full border border-[var(--color-accent-blue)]/30 bg-[var(--color-accent-blue)]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-blue-deep)]">
                {fm.category}
              </span>
            ) : null}
            <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-[var(--color-text-primary)] md:text-5xl">
              {fm.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              {fm.summary}
            </p>
            {fm.liveUrl ? (
              <a
                href={fm.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-accent-blue-deep)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
              >
                Visit site
                <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>

          <div className="mt-12 md:mt-16">
            <ProjectMeta
              clientName={fm.clientName}
              clientLocation={fm.clientLocation}
              role={fm.role}
              duration={fm.duration}
              teamSize={fm.teamSize}
            />
          </div>

          {fm.stats && fm.stats.length > 0 ? (
            <div className="mt-12 md:mt-16">
              <ProjectStats stats={fm.stats} />
            </div>
          ) : null}

          {fm.techStack.length > 0 ? (
            <section className="mt-16 md:mt-24">
              <SectionHeading styleClass="bolder text-[var(--color-accent-crimson)]">Tech Stack</SectionHeading>
              <div className="mt-6">
                <TechStackList techStack={fm.techStack} />
              </div>
            </section>
          ) : null}

          {fm.phases && fm.phases.length > 0 ? (
            <section className="mt-16 md:mt-24">
              <SectionHeading styleClass="text-[var(--color-text-primary)]">Delivery</SectionHeading>
              <div className="mt-6">
                <DeliveryTimeline phases={fm.phases} />
              </div>
            </section>
          ) : null}

          {fm.outcomes && fm.outcomes.length > 0 ? (
            <section className="mt-16 md:mt-24">
              <SectionHeading styleClass="text-[var(--color-text-primary)]">Outcomes</SectionHeading>
              <div className="mt-6">
                <OutcomesList outcomes={fm.outcomes} />
              </div>
            </section>
          ) : null}

          {fm.challenges && fm.challenges.length > 0 ? (
            <section className="mt-16 md:mt-24">
              <SectionHeading styleClass="text-[var(--color-text-primary)]">Challenges &amp; Learnings</SectionHeading>
              <div className="mt-6">
                <ChallengesList challenges={fm.challenges} />
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </>
  );
}
