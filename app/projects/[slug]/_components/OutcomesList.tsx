import type { ReactNode } from "react";

interface OutcomesListProps {
  outcomes: string[];
}

/**
 * Render a markdown-light string supporting only `**bold**` segments. Anything
 * else is treated as plain text. Returning a `ReactNode` (not raw HTML) keeps
 * us safe from injection — no `dangerouslySetInnerHTML` required.
 */
function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

/**
 * OUTCOMES bulleted list. Each line gets a small check icon prefix and may
 * contain `**bold**` highlights.
 */
export default function OutcomesList({ outcomes }: OutcomesListProps) {
  if (outcomes.length === 0) return null;
  return (
    <ul role="list" className="space-y-3">
      {outcomes.map((line, index) => (
        <li
          key={index}
          className="flex gap-3 text-sm leading-relaxed text-white/75"
        >
          <span
            aria-hidden="true"
            className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]"
          />
          <span>{renderInline(line)}</span>
        </li>
      ))}
    </ul>
  );
}
