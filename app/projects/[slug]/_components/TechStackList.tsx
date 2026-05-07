interface TechStackListProps {
  techStack: string[];
}

/**
 * Horizontal wrap of small outlined pills, one per stack item. Sits under a
 * "TECH STACK" heading on the dark project detail page.
 */
export default function TechStackList({ techStack }: TechStackListProps) {
  if (techStack.length === 0) return null;
  return (
    <ul role="list" className="flex flex-wrap gap-2">
      {techStack.map((item) => (
        <li
          key={item}
          className="inline-flex rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-white"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
