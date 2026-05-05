import type { Metadata } from "next";
import CTASection from "@/components/features/home/CTASection";
import ExperienceTimeline from "@/components/features/experience/ExperienceTimeline";
import SectionLabel from "@/components/ui/SectionLabel";
import { EXPERIENCE } from "@/lib/experience";
import { buildPageMetadata } from "@/lib/seo";
import {
  profilePageSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

const PAGE_PATH = "/experience";
const PAGE_TITLE = "Experience | Hiran Nuwanpriya | Full Stack Engineer";
const PAGE_DESCRIPTION =
  "12+ years of full stack engineering experience across Laravel, React, Next.js and Vue.js — leading teams and shipping SaaS, ERP, healthcare and e-commerce platforms for clients in Australia, Europe and Asia.";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

export default function ExperiencePage() {
  const jsonLd = serializeJsonLd(
    profilePageSchema({
      name: "Hiran Nuwanpriya — Professional Experience",
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
      experience: EXPERIENCE,
    }),
  );

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* Hero / intro */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 md:px-8 md:pt-28 md:pb-16 lg:px-12">
          <div className="max-w-3xl">
            <SectionLabel className="mb-4">WORK HISTORY</SectionLabel>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-primary)] md:text-6xl lg:text-7xl">
              Professional{" "}
              <em className="inline-block font-[var(--font-serif)] font-normal italic">
                experience
              </em>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
              12 years building, scaling and leading teams on production
              web applications — Laravel and PHP at the core, with React,
              Next.js and Vue.js on the front end. From SaaS and ERP to
              healthcare, e-commerce and travel platforms across Australia,
              Europe and Asia.
            </p>
          </div>
        </div>
      </section>

      {/* Main timeline */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-28 lg:px-12">
          <ExperienceTimeline entries={EXPERIENCE} />
        </div>
      </section>
      
      <CTASection />
    </>
  );
}
