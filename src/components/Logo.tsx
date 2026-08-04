interface LogoProps {
  /** px, rendered height of the wordmark */
  size?: number;
  className?: string;
}

/**
 * "PosSelect" brand wordmark as a single SVG image (bold italic, "Pos" in
 * highlight coral, "Select" in accent blue, ® mark) — not styled text spans.
 * Always render the brand this way, or as the plain text "PosSelect" (never
 * "POSSELECT") when an image isn't practical.
 */
export function Logo({ size = 22, className = '' }: LogoProps) {
  return (
    <svg
      className={className}
      height={size}
      viewBox="0 0 560 160"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PosSelect"
    >
      <text
        x="4"
        y="118"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={900}
        fontStyle="italic"
        fontSize="120"
        letterSpacing="-3"
      >
        <tspan fill="#d1553c">Pos</tspan>
        <tspan fill="#234e95">Select</tspan>
      </text>
      <text
        x="536"
        y="34"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={400}
        fontSize="26"
        fill="#234e95"
      >
        &#174;
      </text>
    </svg>
  );
}
