import { ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

export interface CategoryTileItem {
  id: string | number;
  label: string;
  /** Inline SVG (Lucide, `strokeWidth={1.5}`) — there is no Icon component. */
  icon: ReactNode;
  href: string;
}

export interface CategoryTilesProps {
  /** Top-level categories, in display order. */
  items: CategoryTileItem[];
  /** Accessible name of the navigation landmark. */
  label?: string;
  className?: string;
}

/**
 * Icon tile grid for top-level categories (메인 페이지 카테고리 바로가기). Each tile is a plain
 * link, so it works without JS. Distinct from `QuickMenu`, which is a floating action rail.
 * No Industry base page (posselect mockup only).
 */
export function CategoryTiles({ items, label = '카테고리', className = '' }: CategoryTilesProps) {
  if (items.length === 0) return null;

  return (
    <nav className={`category-tiles ${className}`.trim()} aria-label={label}>
      {items.map((item) => (
        <a key={item.id} className="category-tile blueprint" href={item.href}>
          <BlueprintCorners />
          {item.icon}
          <span className="category-tile-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
