import OpenForProjectsBadge from "@/components/OpenForProjectsBadge";
import Image from "next/image";

/**
 * Full-viewport hero with:
 *  - top-left rotating "OPEN FOR PROJECTS" badge,
 *  - centred editorial headline mixing Geist bold + Cormorant italic,
 *  - short supporting subhead in secondary text.
 *
 * The headline italics are wrapped in `<em>` and styled with `font-serif`
 * so they pick up Cormorant Garamond italic via the theme token.
 */
export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col px-6 pt-10 pb-20 md:px-8 md:pt-14 md:pb-28 lg:px-12">
        {/* <div className="absolute">
          <OpenForProjectsBadge />
        </div> */}

        <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center text-center">
          <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)]">
            <span className="flex flex-col font-medium">
              <span>
            I&apos;m{" "}        
            <em className="inline-block font-serif font-normal whitespace-nowrap">
              Hiran,
            </em> 
            </span>
            <span className="text-[clamp(2.3rem,5vw,5rem)]">
              a&nbsp;&nbsp;
            <em className="inline-block font-serif font-normal whitespace-nowrap text-[clamp(2.3rem,5vw,5rem)]">
              Full Stack Engineer
            </em>{" "}
            </span>
            <span className="inline-block font-normal whitespace-nowrap text-[clamp(2rem,4vw,4rem)]">
              based in{" "} <em className="font-serif">Hobart</em>,&nbsp;
                <Image
                  src="/au.svg"
                  alt="Australia flag"
                  width={20}
                  height={14}
                  className="w-[1em] h-auto opacity-80 inline"
                />
            </span>
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
            I have 12+ years of experience building useful, performant
            products with Laravel, React and Vue for startups and
            established brands.
          </p>
        </div>

        <div className="mt-auto flex justify-center pt-12">
          <a
            href="#about"
            aria-label="Scroll to About Me section"
            className="group inline-flex flex-col items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]"
          >
            <span>More About Me</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-text-secondary)] text-[var(--color-text-secondary)] motion-safe:animate-bounce-soft"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M8 3v10" />
                <path d="M3.5 8.5 8 13l4.5-4.5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
