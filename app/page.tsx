import type { Metadata } from "next";
import {
  AboutSection,
  CoreSkillsSection,
  CTASection,
  Hero,
  // LatestWorksSection,
} from "@/components/features/home";
import { buildPageMetadata } from "@/lib/seo";
import {
  personSchema,
  serializeJsonLd,
  webSiteSchema,
} from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title:
      "Hiran Nuwanpriya | Full Stack Engineer | Laravel, React & Next.js Developer",
    description:
      "Portfolio of Hiran Nuwanpriya, a full stack engineer specialising in Laravel, React, Next.js, Vue.js, SaaS platforms, CRM systems and scalable web applications.",
    path: "/",
  });
}

export default function Home() {
  const jsonLd = serializeJsonLd([personSchema(), webSiteSchema()]);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is safe for inline JSON-LD here.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Hero />
      <AboutSection />
      <CoreSkillsSection />
      {/* <LatestWorksSection /> */}
      <CTASection />
    </>
  );
}
