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
// viewBox sized from a measured getBBox() of the text run (652×167 at this
// font-size/letter-spacing) plus margin — do not shrink this without
// re-measuring, the glyphs clip silently against the SVG viewport otherwise.
export function Logo({ size = 22, className = '' }: LogoProps) {
  const width = Math.round(size * (680 / 180));
  return (
    <svg
      className={className}
      width={width}
      height={size}
      viewBox="0 0 680 180"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="PosSelect"
      style={{ flexShrink: 0, display: 'block' }}
    >
      <text
        x="4"
        y="135"
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
        x="650"
        y="48"
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
