"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date): string {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const ss = String(d.getUTCSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function formatUtcOffset(d: Date): string {
  // Local UTC offset in minutes; negative means ahead of UTC.
  const offsetMin = -d.getTimezoneOffset();
  const sign = offsetMin >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMin);
  const hours = Math.floor(abs / 60);
  const mins = abs % 60;
  return mins === 0
    ? `UTC ${sign}${hours}`
    : `UTC ${sign}${hours}:${String(mins).padStart(2, "0")}`;
}

/**
 * Live ticking UTC clock chip rendered in the header, e.g.
 *   `12:34:56 | UTC +11`
 *
 * The displayed time is in UTC; the offset reflects the viewer's locale.
 * Renders a non-breaking placeholder before mount to avoid a hydration
 * mismatch between SSR and the client.
 */
export default function HeaderClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    // Defer the initial set to a microtask so it doesn't run synchronously
    // inside the effect body (react-hooks/set-state-in-effect).
    queueMicrotask(tick);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="hidden items-center gap-2 font-mono text-xs text-[var(--color-text-secondary)] tabular-nums md:inline-flex"
      aria-label="Current time"
    >
      {now ? (
        <>
          <span className="text-[var(--color-text-primary)]">
            {formatTime(now)}
          </span>
          <span aria-hidden="true">|</span>
          <span>{formatUtcOffset(now)}</span>
        </>
      ) : (
        <span className="opacity-0">00:00:00 | UTC +0</span>
      )}
    </span>
  );
}
