interface SkillChipProps {
  label: string;
  tone?: "light" | "dark";
}

const TONE_CLASSES: Record<NonNullable<SkillChipProps["tone"]>, string> = {
  dark:
    "inline-flex rounded-md border border-[var(--color-border)] bg-[var(--color-acc-soft)] hover:text-[var(--color-accent-yellow)] hover:border-[var(--color-accent-yellow)] px-3 py-1.5 font-mono text-xs text-text-primary",
  light:
    "inline-flex rounded-md border border-[var(--color-border)] bg-[var(--color-bg-soft)] hover:text-[var(--color-accent-yellow)] hover:border-[var(--color-accent-yellow)] px-3 py-1.5 font-mono text-xs text-[var(--color-text-primary)]",
};

/**
 * Monospace pill used for skill / technology labels. Dark tone is the default
 * (used in the Core Skills feature section, design skill §6.12). Light tone is
 * available for reuse on white surfaces.
 */
export default function SkillChip({ label, tone = "dark" }: SkillChipProps) {
  return <span className={TONE_CLASSES[tone]}>{label}</span>;
}
