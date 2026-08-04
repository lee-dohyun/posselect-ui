import { ReactNode } from 'react';

interface NavProps {
  brand: string;
  children: ReactNode;
  className?: string;
}

export function Nav({ brand, children, className = '' }: NavProps) {
  return (
    <nav className={`nav ${className}`}>
      <div className="nav-brand">{brand}</div>
      {children}
    </nav>
  );
}
