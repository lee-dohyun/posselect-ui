import { CSSProperties, ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

export interface QuickMenuItem {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  /** Cart-count style badge, e.g. items in cart. */
  badge?: number;
}

interface QuickMenuProps {
  items: QuickMenuItem[];
  /** Omit to hide the separate "scroll to top" button. */
  onScrollTop?: () => void;
  className?: string;
  style?: CSSProperties;
}

/**
 * Floating rail fixed to the viewport edge — 최근 본 상품/장바구니/고객센터 style shortcuts,
 * plus a separate accent-filled scroll-to-top button. No Industry base page (posselect mockup only).
 */
export function QuickMenu({ items, onScrollTop, className = '', style }: QuickMenuProps) {
  return (
    <>
      <div className={`quick-menu blueprint ${className}`} style={style}>
        <BlueprintCorners />
        {items.map((item) => (
          <button key={item.label} type="button" className="quick-menu-item" aria-label={item.label} onClick={item.onClick}>
            {item.icon}
            {item.label}
            {!!item.badge && (
              <span
                className="tag tag-accent"
                style={{ position: 'absolute', top: 6, right: 12, padding: '0 4px', fontSize: 9, minWidth: 15, height: 15, lineHeight: '15px', textAlign: 'center' }}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>
      {onScrollTop && (
        <button type="button" className="quick-menu-top" aria-label="맨 위로" onClick={onScrollTop}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      )}
    </>
  );
}
