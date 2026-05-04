import type { Metadata } from "next";

export const SITE_URL = "https://hirannuwanpriya.com";
export const SITE_NAME = "Hiran Nuwanpriya";
export const SITE_LOCALE = "en_AU";
export const DEFAULT_OG_IMAGE = "/og-default.png";

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Path beginning with `/` — e.g. `/about`. */
  path: string;
  /** Optional override for the OG image (relative or absolute). */
  ogImage?: string;
  /** Optional explicit OG title (defaults to `title`). */
  ogTitle?: string;
  /** Optional explicit OG description (defaults to `description`). */
  ogDescription?: string;
}

/**
 * Build a fully populated `Metadata` object for a page.
 *
 * Pages should call this helper rather than hand-rolling Metadata literals so
 * that title, description, canonical URL, OpenGraph, and Twitter blocks stay
 * consistent across the site.
 */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    ogImage = DEFAULT_OG_IMAGE,
    ogTitle,
    ogDescription,
  } = input;

  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: canonical,
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: resolvedOgTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      images: [ogImage],
    },
  };
}
