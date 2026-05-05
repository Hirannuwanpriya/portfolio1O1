import Link from "next/link";
import HeaderClock from "@/components/layout/HeaderClock";
import MobileMenu from "@/components/layout/MobileMenu";
import ArrowButton from "@/components/ui/ArrowButton";

interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/M_T_Hiran_Nuwanpriya.pdf", label: "Resume", external: true },
];

/**
 * Sticky header: wordmark on the left, centred nav (hidden below `lg`),
 * live UTC clock + Let's Talk CTA pill on the right. Mobile uses
 * `<MobileMenu />` for the full-screen slide-in panel.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur-sm">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8 lg:px-12">
        {/* Wordmark — primary logo + name */}
        <Link
          href="/"
          aria-label="Hiran Nuwanpriya — home"
          className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-blue)]"
        >
          {/* <Image
            src="/logo-primary.png"
            alt=""
            width={200}
            height={180}
            priority
            className="h-7 w-auto md:h-8"
          /> */}
          <span className="hidden tracking-wide sm:inline">
            <span className="text-4xl font-serif">Hiran{" "}</span>
            {/* <span className="font-[var(--font-serif)] text-base font-normal italic normal-case -ml-2 text-3xl">
              Nuwanpriya
            </span> */}
          </span>
        </Link>

        {/* Nav — absolutely centred to the viewport, independent of side widths */}
        <nav
          aria-label="Primary"
          className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const className =
              "pointer-events-auto text-sm text-[var(--color-text-primary)] transition-colors duration-150 hover:text-[var(--color-accent-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-blue)] focus-visible:ring-offset-2";

            if (item.external) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: clock + CTA */}
        <div className="flex items-center gap-3 md:gap-5">
          <HeaderClock />
          <ArrowButton href="/contact" variant="pill">
            Let&apos;s Talk
          </ArrowButton>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
