import { ArrowButton, SectionLabel, StatBlock } from "@/components/ui";

interface Stat {
  value: string;
  symbol?: string;
  caption: string;
}

const STATS: Stat[] = [
  { value: "110", symbol: "+", caption: "Projects Delivered" },
  { value: "4", symbol: "+", caption: "Countries Served" },
  { value: "46", symbol: "", caption: "Web Platforms & E-commerce Shipped" },
  { value: "99", symbol: "%", caption: "Uptime across deployed Laravel apps" },
];

/**
 * Editorial "About Me" section on a soft background. Two columns: left holds
 * the bio + contact CTA, right holds a 2x2 grid of large stat blocks.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-20 bg-[var(--color-bg-soft)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-24 lg:px-12">
        <div className="mb-12 md:mb-16">
          <SectionLabel className="mb-4">Introduction</SectionLabel>
          <h2 className="text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
            About <span className="tracking-[-0.08em]">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: micro-label, bio, CTA */}
          <div>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg">      
              As an full stack engineer I lead teams and shipping Laravel and React/Vue applications for startups, SMBs,
              and established brands. I own architecture decisions, mentor developers, and stay hands-on across the full stack. 
              I've delivered products for clients across Australia, Europe, and Asia — from SaaS platforms to eCommerce, Education and healthcare systems.
            </p>
            <div className="mt-8">
              <ArrowButton href="/contact" variant="inline">
                Portfolio
              </ArrowButton>
            </div>
          </div>

          {/* Right column: 2x2 stats grid */}
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {STATS.map((s) => (
              <StatBlock
                key={s.caption}
                value={s.value}
                symbol={s.symbol}
                caption={s.caption}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
