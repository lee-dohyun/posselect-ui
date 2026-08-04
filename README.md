# @posselect/ui

posselect 쇼핑몰 공통 디자인 시스템. `customer.front` / `product.front` / `admin.front` / `home.front`가
이 패키지 하나를 참조해 토큰과 UI 컴포넌트를 공유한다.

**소스 오브 트루스는 claude.ai/design "Industry" 프로젝트**(id `3d225a40-09b0-485d-8bb0-0848ca93cd21`)다.
색상/타이포/spacing 등 토큰을 바꿀 때는 거기서 먼저 확정한 뒤 `src/styles/tokens.css`와
`tailwind.config.js`에 동일하게 반영한다 — 두 소스가 어긋나지 않도록 유지할 것.

## 디자인 방향

- **단일 accent 기반 모노톤 팔레트** — neutral/accent 각 9단계 ramp. 원래 Industry의 steel blue(`#5980a6`)에서
  2026-08-04 기준 **더 채도 높은 블루 `#234e95`로 액션 컬러가 확정 변경**됨(버튼/링크/active 상태),
  램프도 그에 맞춰 재생성됨 — mockup 프로젝트의 `github.md` 동기화 메모 기준
- **시맨틱 컬러**(success/warning/danger)는 이커머스 상태 표시 전용(배송완료, 재고부족, 품절 등)
- **Highlight 컬러**(코랄/버밀리언 `#d1553c`, 100~900 램프)는 **할인가·쿠폰 등 실제 혜택 신호 전용**.
  로고 파비콘의 코랄 "P"에도 같은 색을 쓴다. **버튼이나 상시 내비게이션/UI 크롬에는 절대 쓰지 않는다** —
  steel accent(주요 액션)와 역할이 섞이면 안 됨. success/warning/danger와 마찬가지로 Industry 원본에는
  없는 posselect 자체 확장 토큰
- **타이포**: 헤딩 Barlow Condensed 600 / 본문 Barlow 400. Barlow 계열은 한글 글리프가 없어
  `tokens.css`/`tailwind.config.js` 모두 Pretendard → Malgun Gothic → system-ui 순으로 fallback을
  추가해뒀다 — 한글은 자동으로 Pretendard로 렌더링되고 영문/숫자만 Barlow로 보인다
- **블루프린트 스타일**: 라운드 0(각짐), 카드/버튼(primary·secondary)/다이얼로그/이미지에 헤어라인
  테두리 + 투명 배경. ghost 버튼만 예외로 프레임 없음. **모서리 등록마크("+" 크로스헤어)는 posselect에서
  껐음(2026-08-04)** — Industry 원본 규칙이지만 실제 화면(상품 그리드 등 밀집 레이아웃)에서 시각적
  노이즈로 확인되어 제거. `BlueprintCorners`/`<i class="corner ...">` 마크업은 컴포넌트에 여전히
  남아있지만 `tokens.css`의 `.blueprint > .corner { display: none; }`로 렌더링만 억제됨 — 새 컴포넌트를
  만들 때 마크업은 넣어도 되고 안 넣어도 무방(어차피 안 보임)
- spacing은 촘촘한 스케일(`--space-1` 3.4px ~ `--space-8` 27.2px)
- **아이콘**: Lucide(lucide.dev), stroke-width 1.5, inline SVG + `currentColor` — 굵은 스트로크 아이콘 세트는 쓰지 않는다
- **이미지**: 콘텐츠 사진은 항상 `.duotone` 래퍼(accent 색으로 washed) + blueprint 프레임을 거친다. 가공 없는 원본 이미지를 그대로 배치하지 않는다
- **접근성**: accent 자체는 본문 크기 텍스트에 쓰기엔 대비가 낮음(3:1 수준) — 문단 텍스트에 accent 컬러를 쓸 땐 `--color-accent-700`처럼 진한 ramp 단계를 사용. 키보드 포커스는 항상 `:focus-visible`에 2px accent 링(브라우저 기본 파란 링 금지)
- **하지 말 것** (Industry readme.md "Don't"): 카드/이미지/버튼을 둥글리지 않기, 카드/이미지에 채움 배경 넣지 않기(줄만 그은 와이어프레임), steel accent 외의 장식용 컬러 추가하지 않기

## 사용법

### 1) 순수 CSS 클래스로 (Tailwind 없이도 동작)

```ts
import '@posselect/ui/src/styles/tokens.css';
```

```html
<button class="btn btn-primary">구매하기</button>
<div class="card blueprint elev-sm">
  <i class="corner tl"></i><i class="corner tr"></i><i class="corner bl"></i><i class="corner br"></i>
  <div class="card-title">무선 이어폰 Pro</div>
</div>
```

### 2) React 컴포넌트로

```tsx
import { Button, Card, Tag, Field, Input, Table, Dialog, Figure } from '@posselect/ui';

<Button variant="primary">구매하기</Button>
<Card kicker="신상품" title="무선 이어폰 Pro" meta="₩189,000">
  노이즈 캔슬링 · 30시간 재생
</Card>
<Tag variant="success">배송완료</Tag>
<Field label="이메일"><Input placeholder="you@example.com" /></Field>

<Table>
  <thead><tr><th>주문번호</th><th>상태</th></tr></thead>
  <tbody><tr><td>#A-10231</td><td><Tag variant="success">배송완료</Tag></td></tr></tbody>
</Table>

<Dialog title="주문을 취소할까요?" actions={<><Button variant="secondary">닫기</Button><Button variant="primary">취소하기</Button></>}>
  취소 후에는 복구할 수 없습니다.
</Dialog>

<Figure src="/products/earphone.jpg" alt="무선 이어폰 Pro" caption="정품 인증 상품컷" />
```

Button의 `icon` prop은 아이콘 전용 정사각 버튼(`.btn-icon`) 모디파이어다. 아이콘 자체(SVG)는 children으로
직접 넣는다 — Lucide 아이콘을 `stroke-width={1.5}`로 인라인 사용:

```tsx
<Button variant="primary" icon aria-label="추가">
  <PlusIcon width={16} height={16} strokeWidth={1.5} />
</Button>
```

### 3) Tailwind 유틸리티로

```js
// tailwind.config.js
module.exports = {
  presets: [require('@posselect/ui/tailwind.config.js')],
  content: ['./src/**/*.{ts,tsx}'],
};
```

```html
<div class="bg-surface text-ink rounded-blueprint border border-divider p-3">...</div>
```

## 컴포넌트 현황

| 컴포넌트 | 상태 |
|---|---|
| Button | 완료 (primary/secondary/ghost + icon/block 모디파이어, primary·secondary는 자동으로 blueprint 프레임) |
| Field / Input / Textarea | 완료 |
| Card (blueprint) | 완료 |
| Tag | 완료 — `accent`/`accent-2`/`neutral`/`outline`은 Industry 기본, `success`/`warning`/`danger`/`highlight`는 **posselect 자체 추가**(주문/재고 상태 + 혜택 신호용, Industry 원본엔 없음) |
| Nav | 완료 (`brand`는 ReactNode — 보통 `<Logo />`를 넣음, children으로 링크 구성). 서브 서비스/관리자용 기본형 — customer.front/home.front/product.front는 아래 Header/Footer를 대신 쓴다 |
| Header | 완료 — customer.front/home.front/product.front 공통 상단 헤더(유틸리티 바 + 검색/아이콘 메인 바 + 카테고리 바, 반응형). `categories`는 호스트 앱이 서버에서 캐시 fetch해 props로 주입, 로그인/장바구니 상태는 컴포넌트가 마운트 후 `/api/auth/me`·`/api/cart`를 직접 호출해 채운다 — 아래 "Header/Footer 적용" 참고 |
| Footer | 완료 — customer.front/home.front/product.front 공통 하단 푸터(사업자 정보/고객센터/링크/결제수단/저작권). 완전 정적이라 props 없음 |
| Logo | 완료 — "PosSelect" 워드마크(코랄 Pos + 블루 Select + ®). **브랜드명을 화면에 노출할 땐 항상 이 컴포넌트를 쓰거나, 텍스트라면 반드시 "PosSelect"로 표기 — "POSSELECT"(전체 대문자) 금지** |
| Table | 완료 — 얇은 wrapper (`<table class="table">`), thead/tbody/tr/td는 네이티브 그대로 사용 |
| Dialog | 완료 — backdrop + blueprint 프레임 + 모서리 마크, `actions`로 버튼 슬롯 |
| Figure | 완료 — `.duotone` + blueprint 프레임을 씌운 이미지 래퍼, `caption` prop |
| Toast | 미구현 — Industry에 별도 컴포넌트 페이지 없음(장바구니 mockup에서만 인라인으로 등장), 필요해지면 Dialog와 같은 패턴으로 추가 |
| Icon | 컴포넌트 없음 — Lucide SVG를 그대로 children으로 사용하는 방식 권장(위 사용 예시 참고), 래퍼가 필요할 정도로 반복이 늘면 추가 고려 |

## 브랜드 에셋 (로고)

로고 원본(모노/다크배경용/스택형/태그라인 포함/정방형/파비콘 등)은 코드로 재생성하지 않고
claude.ai/design "Posselect design system mockups" 프로젝트(`assets/posselect-logo-*.png`)를
그대로 소스로 참조한다 — 이 저장소에는 바이너리를 중복 보관하지 않음. 실제 프론트에 적용할 때
해당 프로젝트에서 필요한 변형을 받아 각 앱의 `public/`에 넣을 것.

태그라인: "Positively Selected for You" / 한글판 "당신을 위한 좋은 선택".

## 각 프론트엔드 적용 방법 (Next.js 15 + Tailwind v4 기준, 2026-08-04 확정)

npm 레지스트리에 올리지 않고 **git 의존성**으로 바로 설치한다:

```bash
npm install github:lee-dohyun/posselect-ui
```

`package.json`에 `"@posselect/ui": "github:lee-dohyun/posselect-ui"`로 들어간다. 소스가 `.ts`/`.tsx`
그대로라 Next.js가 기본적으로는 `node_modules`를 트랜스파일하지 않으므로 `next.config.ts`에 반드시 추가:

```ts
const nextConfig = {
  transpilePackages: ['@posselect/ui'],
};
```

그 다음:
1. 루트 레이아웃(`app/layout.tsx` 또는 `app/globals.css`)에서 `import '@posselect/ui/tokens.css'` 한 번
   — Barlow/Barlow Condensed 폰트도 이 CSS의 `@import`로 자동 로드되므로 `next/font`로 별도 로드할
   필요 없음 (기존 Geist 폰트 로딩 코드는 제거)
2. Next.js 기본 스캐폴드의 다크모드 블록(`prefers-color-scheme: dark`)과 `--background`/`--foreground`
   변수는 제거 — Industry 디자인 시스템은 라이트 전용
3. 기존 자체 구현 버튼/카드/태그/입력을 이 패키지의 컴포넌트 또는 CSS 클래스(`.btn`, `.card`, `.tag`, `.input`)로 교체
4. Tailwind v4는 CSS `@theme`로 토큰을 선언하는 방식이라 `tailwind.config.js`(v3 스타일)는 **참고용일
   뿐 이 앱들에는 직접 적용되지 않음** — 실제로는 `tokens.css`의 CSS 변수 + 컴포넌트 클래스만으로 충분하며
   Tailwind 유틸리티 매핑이 꼭 필요해지면 그때 `@theme` 블록으로 별도 변환할 것

## Header/Footer 적용 (2026-08-04)

customer.front / home.front / product.front 3개는 각자 `app/layout.tsx`(Server Component)에서
`<Header categories={categories} />{children}<Footer />`로 감싼다.

- **카테고리 데이터**: 각 앱의 `layout.tsx`가 서버에서 직접 fetch한다 — Header 자신은 fetch하지 않는다.
  ```tsx
  async function getCategories(): Promise<HeaderCategory[]> {
    const res = await fetch('https://product.posselect.com/api/categories', {
      next: { revalidate: 300 }, // 5분 캐시 — 카테고리는 자주 안 바뀌므로 매 요청 DB 조회를 피함
    });
    if (!res.ok) return [];
    const data: { id: number; name: string }[] = await res.json();
    return data.map((c) => ({ id: c.id, name: c.name, href: `https://product.posselect.com/?category=${c.id}` }));
  }
  ```
  `next.revalidate`로 캐시하기 때문에 카테고리가 바뀌어도 앱을 재배포할 필요 없이 최대 5분 안에
  전체 프론트에 전파된다. 실패 시 빈 배열로 폴백해 헤더 자체는 항상 렌더링되게 한다(카테고리 API
  장애가 전체 페이지 장애로 번지지 않도록).
- **로그인/장바구니 상태(개인화)**: Header 컴포넌트가 마운트 후 자체적으로 `/api/auth/me`,
  `/api/cart`를 호출해서 채운다 — 앱마다 이 로직을 중복 구현하지 않는다. 이 두 호출은 SSR 셸과
  분리되어 있어 캐시된 헤더/카테고리 렌더링을 사용자별로 쪼개지 않는다(CDN/Next fetch 캐시 히트율 유지).
- **admin.front는 대상 아님** — 기존 단순 `Nav`(관리자 전용, 로그인 강제) 그대로 유지.
