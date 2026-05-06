import type { Metadata } from "next";
import { ContactDetailsList, ContactForm } from "@/components/features/contact";
import { buildPageMetadata } from "@/lib/seo";
import {
  contactPageSchema,
  serializeJsonLd,
} from "@/lib/structured-data";

const PAGE_TITLE = "Contact Hiran Nuwanpriya | Full Stack Engineer";
const PAGE_DESCRIPTION =
  "Contact Hiran Nuwanpriya for software engineering roles, Laravel development, React and Next.js projects, SaaS platforms, CRM systems and web application development.";
const PAGE_PATH = "/contact";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
  });
}

export default function ContactPage() {
  const jsonLd = serializeJsonLd(
    contactPageSchema({
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      path: PAGE_PATH,
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
        <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28 lg:px-12">
          <p className="text-center text-xs font-medium uppercase tracking-[0.4em] text-[var(--color-text-secondary)]">
            Contact
          </p>
          <h1 className="mt-6 text-center text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
            I have got just what you need.{" "}
            <em className="inline-block font-[var(--font-serif)] font-normal italic underline decoration-[var(--color-accent-blue)] underline-offset-4">
              Let&apos;s talk.
            </em>
          </h1>

          <ContactDetailsList className="mx-auto mt-12 max-w-md" />

          <ContactForm className="mt-12" />
        </div>
      </section>
    </>
  );
}
