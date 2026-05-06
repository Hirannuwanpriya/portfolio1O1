/**
 * Single source of truth for Hiran's public contact details.
 *
 * Consumed by the contact page, footer social links, and JSON-LD generators
 * (Person, ContactPage). Update values here and they propagate everywhere.
 */
export const SITE_CONTACT = {
  phone: "+61 478 001 862",
  phoneHref: "tel:+61478001862",
  email: "hirannuwanpriya@gmail.com",
  emailHref: "mailto:hirannuwanpriya@gmail.com",
  location: "Hobart, TAS",
  locationSubtitle:
    "Open to remote · Available for periodic on-site travel",
  github: "https://github.com/Hirannuwanpriya",
  linkedin: "https://www.linkedin.com/in/hirannuwanpriya/",
} as const;

export type SiteContact = typeof SITE_CONTACT;
