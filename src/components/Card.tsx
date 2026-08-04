import { ReactNode } from 'react';

interface CardProps {
  kicker?: string;
  title: string;
  children?: ReactNode;
  meta?: ReactNode;
  elevation?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Blueprint-style card — hairline border + corner registration marks,
 * matching the "Industry" design system's wireframe aesthetic.
 */
export function Card({ kicker, title, children, meta, elevation = 'sm', className = '' }: CardProps) {
  return (
    <div className={`card blueprint elev-${elevation} ${className}`}>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
      {kicker && <div className="card-kicker">{kicker}</div>}
      <div className="card-title">{title}</div>
      {children && <p className="card-body">{children}</p>}
      {meta && <div className="card-meta">{meta}</div>}
    </div>
  );
}
