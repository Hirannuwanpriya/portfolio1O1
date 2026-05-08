interface ProjectMetaProps {
  clientName?: string;
  clientLocation?: string;
  role?: string;
  duration?: string;
  teamSize?: string;
}

interface MetaItem {
  label: string;
  primary: string;
  secondary?: string;
}

/**
 * Four-column meta row: CLIENT, ROLE, DURATION, TEAM. Columns are separated
 * by thin dividers per the reference screenshot. Renders nothing if every
 * field is missing.
 */
export default function ProjectMeta({
  clientName,
  clientLocation,
  role,
  duration,
  teamSize,
}: ProjectMetaProps) {
  const items: MetaItem[] = [];
  if (clientName) {
    items.push({
      label: "CLIENT",
      primary: clientName,
      secondary: clientLocation,
    });
  }
  if (role) items.push({ label: "ROLE", primary: role });
  if (duration) items.push({ label: "DURATION", primary: duration });
  if (teamSize) items.push({ label: "TEAM", primary: teamSize });

  if (items.length === 0) return null;

  return (
    <dl className="grid grid-cols-1 gap-y-8 border-y border-[var(--color-border)] py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-y-0">
      {items.map((item, index) => (
        <div
          key={item.label}
          className={
            index > 0
              ? "md:border-l md:border-[var(--color-border)] md:pl-6"
              : "md:pr-6"
          }
        >
          <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            {item.label}
          </dt>
          <dd className="mt-3 text-sm font-medium leading-relaxed text-[var(--color-text-primary)]">
            {item.primary}
            {item.secondary ? (
              <>
                <br />
                <span className="text-[var(--color-text-secondary)]">
                  {item.secondary}
                </span>
              </>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
