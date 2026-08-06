import { CSSProperties } from 'react';

interface SkeletonBlockProps {
  className?: string;
  style?: CSSProperties;
}

/** One pulsing placeholder block — compose these for custom loading layouts. */
export function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton-block ${className}`} style={style} />;
}

/** Product-card-shaped skeleton — image block + title/price lines, card frame kept (no corner marks). */
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`card skeleton-card elev-sm ${className}`}>
      <SkeletonBlock className="skeleton-image" />
      <div className="skeleton-lines">
        <SkeletonBlock className="skeleton-line-sm" style={{ width: '60%' }} />
        <SkeletonBlock className="skeleton-line" style={{ width: '85%' }} />
        <SkeletonBlock className="skeleton-line" style={{ width: '40%' }} />
      </div>
    </div>
  );
}
