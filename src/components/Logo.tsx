interface LogoProps {
  /** px, height of the wordmark text */
  size?: number;
  className?: string;
}

/**
 * "PosSelect" brand wordmark — "Pos" in highlight coral, "Select" in accent
 * blue, ® mark. Always render the brand this way (or as the plain text
 * "PosSelect", never "POSSELECT") — this replaces any plain-text brand label.
 */
export function Logo({ size = 22, className = '' }: LogoProps) {
  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.5px',
        display: 'inline-flex',
        alignItems: 'baseline',
        lineHeight: 1,
      }}
    >
      <span style={{ color: 'var(--color-highlight-600)' }}>Pos</span>
      <span style={{ color: 'var(--color-accent)' }}>Select</span>
      <sup style={{ fontSize: '0.4em', fontWeight: 400, marginLeft: 2 }}>&reg;</sup>
    </span>
  );
}
