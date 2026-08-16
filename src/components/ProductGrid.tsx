import { ReactNode } from 'react';

export interface ProductGridProps {
  children: ReactNode;
  className?: string;
}

export function ProductGrid({ children, className = '' }: ProductGridProps) {
  return (
    <div className={`product-grid ${className}`}>
      {children}
    </div>
  );
}
