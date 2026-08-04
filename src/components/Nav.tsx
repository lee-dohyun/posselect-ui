import { ReactNode } from 'react';

interface NavProps {
  brand: ReactNode;
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
