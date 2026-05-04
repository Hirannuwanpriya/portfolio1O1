interface StatBlockProps {
  value: string;
  symbol?: string;
  caption: string;
}

/**
 * Big editorial stat: massive number, small superscript symbol, short caption.
 * Used in the About section's 2x2 stats grid.
 */
export default function StatBlock({ value, symbol, caption }: StatBlockProps) {
  return (
    <div className="border-t border-[var(--color-border)] pt-6">
      <div className="flex items-start gap-1 text-[var(--color-text-primary)]">
        <span className="text-5xl font-bold leading-none tracking-[-0.03em] md:text-6xl">
          {value}
        </span>
        {symbol ? (
          <span className="mt-1 text-2xl font-semibold leading-none md:text-3xl">
            {symbol}
          </span>
        ) : null}
      </div>
      <p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {caption}
      </p>
    </div>
  );
}
