'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Tag } from './Tag';

export interface HeaderCategory {
  id: number | string;
  name: string;
  href: string;
  highlight?: boolean;
}

interface HeaderProps {
  /** Full category list, e.g. from GET /api/categories. Fetched server-side by the
   * consuming app (cacheable, revalidate on an interval) and passed down as a prop —
   * Header itself never fetches this so it stays cacheable/SSR-friendly. */
  categories: HeaderCategory[];
  /** Currently active category href, for the underline state. */
  activeHref?: string;
  /** Where the brand logo links to. */
  homeHref?: string;
  /** Base path the search box submits a GET `q` param to. */
  searchHref?: string;
  /** Base origin `/api/cart` is fetched from. The CART_ID cookie is only ever issued on
   * product.posselect.com, so customer.front/home.front must call it there cross-domain
   * (product-api allows this via CORS — see WebConfig). product.front itself overrides
   * this to `''` for a same-origin relative call. */
  cartApiBase?: string;
  className?: string;
}

interface AuthMe {
  name?: string | null;
  email?: string | null;
}

interface Cart {
  items: { quantity: number }[];
}

/**
 * Shared commerce header (customer.front / home.front / product.front).
 * Categories are injected by the host app (server-fetched, cached); login/cart
 * state is fetched here client-side after mount so the SSR shell around it stays
 * cacheable and doesn't fork per-user.
 */
export function Header({
  categories,
  activeHref,
  homeHref = 'https://home.posselect.com',
  searchHref = 'https://product.posselect.com',
  cartApiBase = 'https://product.posselect.com',
  className = '',
}: HeaderProps) {
  const [user, setUser] = useState<AuthMe | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setChecked(true));

    fetch(`${cartApiBase}/api/cart`, { credentials: 'include' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Cart | null) => {
        const count = data?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
        setCartCount(count);
      })
      .catch(() => setCartCount(0));
  }, [cartApiBase]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement)?.value ?? '';
    window.location.href = `${searchHref}?q=${encodeURIComponent(q)}`;
  };

  return (
    <header className={`site-header ${className}`}>
      <div className="site-header-utility">
        {checked && user?.name ? (
          <>
            <span>{user.name}님</span>
            <a href="https://customer.posselect.com/mypage">마이페이지</a>
            <button
              type="button"
              className="link"
              onClick={async () => {
                await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                window.location.reload();
              }}
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <a href="https://customer.posselect.com/login">로그인</a>
            <a href="https://customer.posselect.com/signup">회원가입</a>
          </>
        )}
        <a href="https://customer.posselect.com/mypage">주문조회</a>
        <a href="https://customer.posselect.com/mypage">고객센터</a>
      </div>

      <div className="site-header-main">
        <button
          type="button"
          className="site-header-menu-toggle"
          aria-label="카테고리 메뉴"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <a href={homeHref} aria-label="PosSelect 홈">
          <Logo size={26} />
        </a>

        <div className="site-header-search">
          <form className="site-header-search-box" onSubmit={handleSearch}>
            <input name="q" placeholder="상품, 브랜드 검색" />
            <button type="submit" aria-label="검색">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>

        <div className="site-header-actions">
          <a className="site-header-action" href="https://customer.posselect.com/mypage" aria-label="찜">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>
            </svg>
            <span className="label">찜</span>
          </a>
          <a className="site-header-action" href="https://customer.posselect.com/mypage" aria-label="마이페이지">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"></circle>
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"></path>
            </svg>
            <span className="label">마이페이지</span>
          </a>
          <a className="site-header-action" href="https://product.posselect.com/cart" aria-label="장바구니">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path>
            </svg>
            <span className="label">장바구니</span>
            {cartCount > 0 && (
              <Tag variant="accent" className="site-header-action-badge">
                {cartCount}
              </Tag>
            )}
          </a>
        </div>
      </div>

      <nav className={`site-header-categories ${menuOpen ? 'open' : ''}`} aria-label="카테고리">
        <a href={searchHref} aria-current={!activeHref ? 'page' : undefined}>
          전체카테고리
        </a>
        {categories.map((c) => (
          <a key={c.id} href={c.href} aria-current={activeHref === c.href ? 'page' : undefined} className={c.highlight ? 'highlight' : ''}>
            {c.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
