import { ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

export interface CategoryTileItem {
  id: string | number;
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface CategoryTilesProps {
  items: CategoryTileItem[];
  columns?: 3 | 4 | 5;
  className?: string;
}

export function CategoryTiles({ items, columns = 4, className = '' }: CategoryTilesProps) {
  if (items.length === 0) return null;

  return (
    <div 
      className={`category-tiles-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
        width: '100%'
      }}
    >
      {items.map((item) => {
        const content = (
          <div
            className="category-tile blueprint"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              cursor: item.onClick || item.href ? 'pointer' : 'default',
              transition: 'background-color 0.2s',
              position: 'relative'
            }}
          >
            <BlueprintCorners />
            <div style={{ marginBottom: '8px', color: 'var(--color-primary, #333)' }}>
              {item.icon}
            </div>
            <span style={{ fontSize: '14px', textAlign: 'center', fontWeight: '500' }}>
              {item.label}
            </span>
          </div>
        );

        if (item.href) {
          return (
            <a 
              key={item.id} 
              href={item.href} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {content}
            </a>
          );
        }

        return (
          <div key={item.id} onClick={item.onClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
