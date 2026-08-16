import { FormEvent, useEffect, useState } from 'react';

interface HeaderCategory {
  id: number;
  name: string;
  href: string;
  highlight?: boolean;
  children: HeaderCategory[];
}

interface HeaderProps {
  searchHref: string;
  categoriesApiBase: string;
  authApiBase: string;
  cartApiBase: string;
}

// 로고는 어느 호스트 앱(customer/product/admin/home.front)에 박혀있든 항상 홈으로 보내야 하므로
// 호스트가 넘기는 속성이 아니라 상수로 고정한다 — 예전엔 product.front/home.front가 각자
// home-href="/"를 넘겨서 로고를 누르면 자기 자신의 루트로만 갔었다(의도와 다른 동작).
const HOME_URL = 'https://home.posselect.com';

// cdn 버킷(프로덕션 브랜드 자산)의 파일을 image.posselect.com/cdn/<key> 짧은 경로로 참조한다 —
// cdn-alias nginx(minio 네임스페이스)가 이 경로를 실제 imgproxy 서명 URL로 302 리다이렉트해준다
// (~/msa/imgproxy/cdn-alias/). 이전엔 shop-images 버킷에 직접 만든 서명 URL을 썼으나, 정식
// cdn 버킷/별칭 체계가 갖춰지면서 이쪽으로 통일함 — 로고 파일을 바꿀 때는 cdn 버킷의
// logos/posselect-logo-hires-no-r.webp를 교체하면 이 URL 그대로 새 이미지를 받아온다.
const LOGO_URL = 'https://image.posselect.com/cdn/logos/posselect-logo-hires-no-r.webp';

interface AuthMe {
  name?: string | null;
  email?: string | null;
}

interface Cart {
  items: { quantity: number }[];
}

/**
 * 독립 배포 런타임 셸의 Header 위젯. 호스트 앱(customer.front/home.front/product.front)의
 * 서버 컴포넌트가 아니라 이 컴포넌트 자신이 카테고리/로그인/장바구니를 전부 절대 URL로 직접
 * fetch한다 — 빌드 타임 결합이 전혀 없어야 스크립트 태그 하나로 완결되는 배포가 된다.
 */
export function ShellHeader({ searchHref, categoriesApiBase, authApiBase, cartApiBase }: HeaderProps) {
  const [categories, setCategories] = useState<HeaderCategory[]>([]);
  const [user, setUser] = useState<AuthMe | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [checked, setChecked] = useState(false);
  // 쿠팡의 "카테고리" 버튼처럼 좌측 플라이아웃 패널을 여닫는 상태. 모바일/데스크톱 동일하게
  // 이 패널 하나로 처리한다 — 하위 카테고리(2뎁스) 데이터가 아직 없어서(product-api의
  // /api/categories가 평면 목록만 반환) 패널 안에서는 1뎁스 목록만 보여준다.
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${categoriesApiBase}/api/categories`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data: { id: number; name: string; parentId: number | null }[]) => {
        const toHref = (id: number) => `${categoriesApiBase}/?category=${id}`;
        const topLevel = data.filter((c) => c.parentId == null);
        setCategories(
          topLevel.map((c) => ({
            id: c.id,
            name: c.name,
            href: toHref(c.id),
            children: data
              .filter((child) => child.parentId === c.id)
              .map((child) => ({ id: child.id, name: child.name, href: toHref(child.id), children: [] })),
          }))
        );
      })
      .catch(() => setCategories([]));

    fetch(`${authApiBase}/api/auth/me`, { credentials: 'include' })
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
  }, [categoriesApiBase, authApiBase, cartApiBase]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem('q') as HTMLInputElement)?.value ?? '';
    window.location.href = `${searchHref}?q=${encodeURIComponent(q)}`;
  };

  return (
    <header className="site-header">
      <div className="site-header-utility">
        {checked && user?.name ? (
          <>
            <span>{user.name}님</span>
            <a href={`${authApiBase}/mypage`}>마이페이지</a>
            <button
              type="button"
              className="link"
              onClick={async () => {
                await fetch(`${authApiBase}/api/auth/logout`, { method: 'POST', credentials: 'include' });
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
        {/* 알림/최근 본 상품: 백엔드가 없어 클릭해도 아무 동작이 없는 비활성 표시만 유지한다
            (진짜 링크로 두면 404로 튕겨나가므로 span + aria-disabled로 "미구현" 상태를 명시). */}
        <span className="disabled" aria-disabled="true" title="준비 중인 기능입니다">
          최근 본 상품
        </span>
      </div>

      <div className="site-header-main">
        <button
          type="button"
          className="site-header-category-toggle"
          aria-label="전체 카테고리"
          aria-expanded={categoryMenuOpen}
          onClick={() => setCategoryMenuOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
          <span className="site-header-category-toggle-label">카테고리</span>
        </button>

        <a href={HOME_URL} className="site-header-logo-link" aria-label="PosSelect 홈">
          <img src={LOGO_URL} alt="PosSelect" className="site-header-logo" />
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
          {/* 알림: 아직 알림 발송/조회 API가 없어 배지 없이 비활성 상태로만 노출 (버튼이지만
              disabled 처리해 클릭해도 아무 반응이 없다). */}
          <button
            type="button"
            className="site-header-action"
            disabled
            aria-label="알림"
            title="준비 중인 기능입니다"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.7 21a2 2 0 0 1-3.4 0"></path>
            </svg>
            <span className="label">알림</span>
          </button>
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
            {cartCount > 0 && <span className="site-header-action-badge">{cartCount}</span>}
          </a>
        </div>
      </div>

      <nav className="site-header-categories" aria-label="카테고리">
        <a href={searchHref} aria-current="page">
          전체카테고리
        </a>
        {categories.map((c) => (
          <a key={c.id} href={c.href} className={c.highlight ? 'highlight' : ''}>
            {c.name}
          </a>
        ))}
      </nav>

      {categoryMenuOpen && (
        <>
          <div className="site-header-category-overlay" onClick={() => setCategoryMenuOpen(false)} />
          <div className="site-header-category-panel" role="dialog" aria-label="전체 카테고리">
            <div className="site-header-category-panel-head">
              <span>전체 카테고리</span>
              <button type="button" aria-label="닫기" onClick={() => setCategoryMenuOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            {/* 2뎁스: 하위 카테고리가 있으면 상위 항목 바로 아래 들여쓴 목록으로 항상 펼쳐서
                보여준다(쿠팡처럼 호버 플라이아웃은 아니지만, 모바일에서도 동일하게 동작하는
                단순한 구조를 우선). */}
            <ul className="site-header-category-panel-list">
              {categories.length === 0 && <li className="empty">카테고리를 불러오는 중입니다</li>}
              {categories.map((c) => (
                <li key={c.id}>
                  <a href={c.href}>
                    <span>{c.name}</span>
                    {c.children.length === 0 && <span aria-hidden="true">›</span>}
                  </a>
                  {c.children.length > 0 && (
                    <ul className="site-header-category-panel-children">
                      {c.children.map((child) => (
                        <li key={child.id}>
                          <a href={child.href}>{child.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
