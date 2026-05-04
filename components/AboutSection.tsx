import SectionLabel from "@/components/SectionLabel";
import StatBlock from "@/components/StatBlock";
import ArrowButton from "@/components/ArrowButton";

interface Stat {
  value: string;
  symbol?: string;
  caption: string;
}

const STATS: Stat[] = [
  { value: "50", symbol: "+", caption: "Projects shipped for startups and SMBs" },
  { value: "4.9", symbol: "+", caption: "Average client satisfaction rating" },
  { value: "60", symbol: "%", caption: "Faster page loads after performance audits" },
  { value: "99", symbol: "%", caption: "Uptime across deployed Laravel & Next.js apps" },
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
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: micro-label, bio, CTA */}
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
              Meet <span className="mx-1">———</span> Hiran
            </p>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg">
              I&apos;m a full stack engineer based in Hobart, Tasmania,
              shipping Laravel and Next.js applications for startups, SMBs,
              and established brands. My focus is on outcome-driven software:
              measurable performance gains, fewer bugs in production, and
              interfaces that respect the people using them.
            </p>
            <div className="mt-8">
              <ArrowButton href="/contact" variant="inline">
                Contact Me
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
