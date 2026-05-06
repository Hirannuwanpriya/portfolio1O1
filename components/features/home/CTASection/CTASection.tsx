import Link from "next/link";
import ArrowButton from "@/components/ui/ArrowButton";

/**
 * End-of-page CTA per design skill §6.11.
 * Soft background, top + bottom borders, primary CTA + secondary link.
 */
export default function CTASection() {
  return (
    <section className="border-t border-b border-[var(--color-border)] bg-[var(--color-bg-soft)]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:px-8 md:py-28 lg:px-12">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight tracking-[-0.02em] text-[var(--color-text-primary)] md:text-5xl">
          I have got just what you need.
          <em className="inline-block font-[var(--font-serif)]  whitespace-nowrap">
            <u className="decoration-[var(--color-accent-yellow)] decoration-4 underline-offset-4">Lets talk</u>
          </em>
          .
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ArrowButton href="/contact" variant="pill">
            Contact Me
          </ArrowButton>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors duration-200 hover:border-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-blue)] focus-visible:ring-offset-2"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
