import { ReactNode } from 'react';
import { BlueprintCorners } from './Blueprint';

interface CardProps {
  kicker?: string;
  title: string;
  children?: ReactNode;
  meta?: ReactNode;
  /** Box-shadow z-depth magnitude */
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Blueprint-style card — hairline border + corner registration marks,
 * matching Industry's components/cards.html.
 */
export function Card({ kicker, title, children, meta, elevation = 'sm', className = '' }: CardProps) {
  return (
    <div className={`card blueprint elev-${elevation} ${className}`}>
      <BlueprintCorners />
      {kicker && <div className="card-kicker">{kicker}</div>}
      <div className="card-title">{title}</div>
      {children && <p className="card-body">{children}</p>}
      {meta && <div className="card-meta">{meta}</div>}
    </div>
  );
}
