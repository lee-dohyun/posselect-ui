import { CSSProperties } from 'react';

interface WingBannerProps {
  title: string;
  discount: string;
  deadline?: string;
  image: { src: string; alt: string };
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Closable promo card fixed to the viewport edge — pairs with QuickMenu on
 * the opposite side. No Industry base page (posselect mockup only).
 */
export function WingBanner({ title, discount, deadline, image, onClose, className = '', style }: WingBannerProps) {
  return (
    <div className={`wing-banner blueprint ${className}`} style={style}>
      <div className="wing-banner-head">
        <div className="wing-banner-title">{title}</div>
        {onClose && (
          <button type="button" className="wing-banner-close" aria-label="닫기" onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      <div className="wing-banner-image duotone">
        <img src={image.src} alt={image.alt} />
      </div>
      <div className="wing-banner-body">
        <div className="wing-banner-discount">{discount}</div>
        {deadline && <div className="wing-banner-deadline">{deadline}</div>}
      </div>
    </div>
  );
}
