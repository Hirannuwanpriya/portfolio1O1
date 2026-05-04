"use client";

/**
 * Rotating circular badge with "* OPEN FOR PROJECTS *" repeated around the
 * perimeter and a centred black dot containing an arrow-up-right icon.
 *
 * The text follows an SVG circular `<path>` via `<textPath>`. The whole SVG
 * spins via the `animate-[spin-slow]` Tailwind v4 utility (see globals.css
 * `@keyframes spin-slow`). Motion is disabled when the user prefers reduced
 * motion.
 */
export default function OpenForProjectsBadge() {
  // Repeat the label so it tiles smoothly around the circle.
  const label = "*  OPEN FOR PROJECTS  ";
  const rim = `${label}${label}`;

  return (
    <div className="relative inline-flex h-32 w-32 items-center justify-center md:h-36 md:w-36">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full motion-safe:animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path
            id="open-for-projects-circle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <text
          fill="currentColor"
          className="fill-[var(--color-text-primary)]"
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "13.5px",
            letterSpacing: "0.18em",
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          <textPath href="#open-for-projects-circle" startOffset="0">
            {rim}
          </textPath>
        </text>
      </svg>

      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-text-primary)] text-white">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4"
        >
          <path d="M4 12 12 4" />
          <path d="M5.5 4H12v6.5" />
        </svg>
      </span>

      <span className="sr-only">Open for projects</span>
    </div>
  );
}
