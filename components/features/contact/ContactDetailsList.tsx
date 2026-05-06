import type { ReactNode } from "react";
import { SITE_CONTACT } from "@/lib/site-contact";

interface ContactDetailsListProps {
  className?: string;
}

interface DetailRow {
  key: "phone" | "email" | "location";
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  subtitle?: string;
}

const ICON_PHONE = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const ICON_EMAIL = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const ICON_LOCATION = (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/**
 * Three-row contact info block (phone / email / location) shown above the
 * contact form. Server component — pure data + inline SVG, no JS shipped.
 */
export default function ContactDetailsList({
  className,
}: ContactDetailsListProps) {
  const rows: DetailRow[] = [
    {
      key: "phone",
      icon: ICON_PHONE,
      label: "Phone",
      value: SITE_CONTACT.phone,
      href: SITE_CONTACT.phoneHref,
    },
    {
      key: "email",
      icon: ICON_EMAIL,
      label: "Email",
      value: SITE_CONTACT.email,
      href: SITE_CONTACT.emailHref,
    },
    {
      key: "location",
      icon: ICON_LOCATION,
      label: "Location",
      value: SITE_CONTACT.location,
      subtitle: SITE_CONTACT.locationSubtitle,
    },
  ];

  return (
    <ul
      className={`flex flex-col gap-5 ${className ?? ""}`}
      aria-label="Contact details"
    >
      {rows.map((row) => (
        <li key={row.key} className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-0.5 inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-primary)]"
          >
            {row.icon}
          </span>
          <span className="flex flex-col">
            <span className="sr-only">{row.label}: </span>
            {row.href ? (
              <a
                href={row.href}
                className="text-base font-medium text-[var(--color-text-primary)] underline-offset-4 transition-colors duration-150 hover:text-[var(--color-accent-blue)] hover:underline"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-base font-medium text-[var(--color-text-primary)]">
                {row.value}
              </span>
            )}
            {row.subtitle ? (
              <span className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {row.subtitle}
              </span>
            ) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}
