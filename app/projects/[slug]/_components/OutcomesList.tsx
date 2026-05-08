import type { ReactNode } from "react";

interface OutcomesListProps {
  outcomes: string[];
}

/**
 * Render a markdown-light string supporting only `**bold**` segments. Anything
 * else is treated as plain text. Returning a `ReactNode` (not raw HTML) keeps
 * us safe from injection — no `dangerouslySetInnerHTML` required.
 *
 * Bold spans pop in primary black against the surrounding secondary grey body
 * so metric highlights ("**40% faster**") read as the focal point.
 */
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className="font-semibold text-[var(--color-text-primary)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * OUTCOMES bulleted list. Each line gets a small check icon prefix and may
 * contain `**bold**` highlights. The check uses `--color-accent-blue` as the
 * accent that draws the eye on the white editorial page.
 */
export default function OutcomesList({ outcomes }: OutcomesListProps) {
  if (outcomes.length === 0) return null;
  return (
    <ul role="list" className="space-y-3">
      {outcomes.map((line, index) => (
        <li
          key={index}
          className="flex gap-3 text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="mt-[3px] h-4 w-4 shrink-0 text-[var(--color-accent-blue)]"
          >
            <path
              d="M4.5 10.5l3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{renderInline(line)}</span>
        </li>
      ))}
    </ul>
  );
}
