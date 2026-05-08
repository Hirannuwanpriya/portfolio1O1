interface TechStackListProps {
  techStack: string[];
}

/**
 * Horizontal wrap of small outlined pills, one per stack item. Sits under a
 * "TECH STACK" heading. Light editorial pills on white.
 */
export default function TechStackList({ techStack }: TechStackListProps) {
  if (techStack.length === 0) return null;
  return (
    <ul role="list" className="flex flex-wrap gap-2">
      {techStack.map((item) => (
        <li
          key={item}
          className="inline-flex rounded-md border border-[var(--color-border)] bg-white px-3 py-1.5 font-mono text-xs text-[var(--color-text-primary)] transition-colors duration-150 hover:border-[var(--color-accent-crimson)] hover:text-[var(--color-accent-crimson)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
