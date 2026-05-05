import Image from "next/image";
import Link from "next/link";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/hirannuwanpriya", label: "GitHub" },
  { href: "https://linkedin.com/in/hirannuwanpriya", label: "LinkedIn" },
  { href: "mailto:hi@hirannuwanpriya.com", label: "Email" },
];

/**
 * Footer per design skill §6.10: charcoal background, blue 1px top accent,
 * two-column on desktop / stacked on mobile.
 */
export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-accent-blue)] bg-[var(--color-text-primary)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              href="/"
              aria-label="Hiran Nuwanpriya — home"
              className="inline-flex items-center gap-3 text-base font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]"
            >
              <Image
                src="/logo-reversed.png"
                alt=""
                width={240}
                height={240}
                className="h-12 w-12 rounded-sm"
              />
              {/* <span className="text-sm uppercase tracking-wide">
                Hiran{" "}
                <span className="font-[var(--font-serif)] text-base font-normal italic normal-case">
                  Nuwanpriya
                </span>
              </span> */}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Full Stack Engineer building scalable Laravel, React, and
              Next.js applications from Hobart, Tasmania.
            </p>
          </div>

          <nav
            aria-label="Social"
            className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          >
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white underline-offset-4 transition-colors duration-150 hover:text-[var(--color-accent-blue)] hover:underline"
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[var(--color-text-secondary)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Hiran Nuwanpriya. Built with
            Next.js & Tailwind.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-150 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
