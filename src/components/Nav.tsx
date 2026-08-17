import { ReactNode } from 'react';

export interface NavProps {
  /** 좌측 브랜드 로고 영역 */
  brand: ReactNode;
  /** 우측 네비게이션 링크 등 아이템 영역 */
  children: ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

/**
 * 상단 네비게이션 바 레이아웃을 제공하는 컴포넌트입니다.
 */
export function Nav({ brand, children, className = '' }: NavProps) {
  return (
    <nav className={`nav ${className}`}>
      <div className="nav-brand">{brand}</div>
      {children}
    </nav>
  );
}
