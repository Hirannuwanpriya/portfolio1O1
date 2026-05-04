import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard, {
  type ProjectCardData,
} from "@/components/features/projects/ProjectCard";

const PROJECTS: ProjectCardData[] = [
  {
    title: "Acme CRM",
    category: "SaaS · CRM",
    description:
      "Multi-tenant CRM for SMB sales teams with custom pipelines, role-based access, and deep email integration.",
    techStack: ["Laravel", "React", "Tailwind"],
    imageUrl:
      "https://placehold.co/1280x720/FAFAFA/111418?text=Acme+CRM",
    imageAlt: "Acme CRM dashboard preview",
    href: "/projects/acme-crm",
  },
  {
    title: "Lighthouse Analytics",
    category: "SaaS",
    description:
      "Privacy-first product analytics with self-serve dashboards, funnels, and Postgres-backed event storage.",
    techStack: ["Next.js", "TypeScript", "Postgres"],
    imageUrl:
      "https://placehold.co/1280x720/FAFAFA/111418?text=Lighthouse+Analytics",
    imageAlt: "Lighthouse Analytics dashboard preview",
    href: "/projects/lighthouse-analytics",
  },
  {
    title: "Brushwork ERP",
    category: "ERP · POS",
    description:
      "All-in-one ERP and POS for a regional retail chain — inventory, purchasing, and shopfront in one stack.",
    techStack: ["Laravel", "Vue.js", "MySQL"],
    imageUrl:
      "https://placehold.co/1280x720/FAFAFA/111418?text=Brushwork+ERP",
    imageAlt: "Brushwork ERP storefront preview",
    href: "/projects/brushwork-erp",
  },
];

/**
 * "Latest Works" section: oversized editorial headline followed by a
 * 3-column responsive grid of project cards.
 */
export default function LatestWorksSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mb-12 md:mb-16">
          <SectionLabel className="mb-4">Latest Works</SectionLabel>
          <h2 className="max-w-5xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:max-w-none lg:-mr-12 lg:text-7xl xl:-mr-24">
            Drive your project toward success with{" "}
            <em className="inline-block font-[var(--font-serif)] font-normal whitespace-nowrap italic">
              thoughtful engineering
            </em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
