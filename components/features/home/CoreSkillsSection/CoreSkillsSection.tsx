import { SkillChip, SectionLabel } from "@/components/ui";

interface SkillGroup {
  label: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "BACKEND",
    skills: [
      "Laravel (all versions)",
      "PHP 8.x",
      "Symfony",
      "Node.js",
      "RESTful APIs",
      "GraphQL",
      "Microservices",
      "Event-Driven Arch",
      "Queue Systems",
    ],
  },
  {
    label: "FRONTEND",
    skills: [
      "React.js",
      "Next.js",
      "Vue.js",
      "Inertia.js",
      "Tailwind CSS",
      "Alpine.js",
      "React Native",
      "Livewire",
      "TypeScript",
    ],
  },
  {
    label: "CLOUD & DEVOPS",
    skills: [
      "AWS (ECS, Lambda, RDS)",
      "Google Cloud Platform",
      "Docker / Kubernetes",
      "Terraform",
      "CI/CD Pipelines",
      "Azure",
      "DigitalOcean",
      "Hetzner",
    ],
  },
  {
    label: "DATABASE",
    skills: [
      "MySQL / PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "OpenSearch",
      "Meilisearch",
      "Query Optimization",
    ],
  },
  {
    label: "SECURITY & PERFORMANCE",
    skills: [
      "Penetration Testing",
      "Cybersecurity",
      "Caching Strategies",
      "Load Balancing",
      "Data Encryption",
      "SSL / TLS",
    ],
  },
  {
    label: "LEADERSHIP & PROCESS",
    skills: [
      "Agile / Scrum",
      "Tech Mentorship",
      "Code Review",
      "Architecture Design",
      "Team Building",
      "Jira / Confluence",
    ],
  },
];

/**
 * Dark "Technical Purview" feature section listing core skill categories.
 * Implements design skill §6.12 (the only dark feature surface besides the
 * Footer). Yellow is the single permitted accent here.
 */
export default function CoreSkillsSection() {
  return (
    <section
          id="skills"
          className="scroll-mt-20 bg-[var(--color-bg)]"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
            <div className="mb-12 md:mb-16">
              <SectionLabel className="mb-4">TECHNICAL PURVIEW</SectionLabel>
              <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
                Core <span className="tracking-[-0.08em]">Skills</span>
              </h2>
            </div>
    
            <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-accent-crimson)]">
                {group.label}
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <SkillChip key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
          </div>
        </section>
  );
}
