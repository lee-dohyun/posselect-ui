import { ReactNode } from 'react';

type TagVariant = 'accent' | 'accent-2' | 'neutral' | 'outline' | 'success' | 'warning' | 'danger' | 'highlight';

interface TagProps {
  variant?: TagVariant;
  children: ReactNode;
  className?: string;
}

/**
 * Status/label badges — success/warning/danger map to order & stock states
 * (배송완료/재고부족/품절 등). highlight is for real benefit signals only
 * (할인가, 쿠폰) — never use it for buttons or persistent nav/chrome.
 */
export function Tag({ variant = 'neutral', children, className = '' }: TagProps) {
  return <span className={`tag tag-${variant} ${className}`}>{children}</span>;
}
