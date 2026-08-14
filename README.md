# @posselect/ui

posselect 쇼핑몰 공통 디자인 시스템. `customer.front` / `product.front` / `admin.front` / `store.front`가
이 패키지 하나를 참조해 토큰과 UI 컴포넌트를 공유한다.

**문서 사이트: [storybook.posselect.com](https://storybook.posselect.com)** — 이 저장소의 Storybook 정적
빌드다(`ui.posselect.com`은 기존 링크 호환을 위한 별칭으로 계속 열려 있다). 컴포넌트별 라이브 프리뷰 +
props 컨트롤 + 자동 추출된 설명, `Foundations/디자인 토큰`에 컬러 램프·타이포·스페이싱·브레이크포인트·
접근성 규칙이 있다. 뷰포트 프리셋(Phone 375 / Tablet 768 / Desktop 1280)이 `tokens.css`의 브레이크포인트와
같은 값이라 반응형 확인도 여기서 한다.
원본 디자인 목업(claude.ai export)은 [`/mockup/`](https://storybook.posselect.com/mockup/)에 그대로 남아 있다.

```bash
npm ci && npm run storybook   # 로컬 개발 서버 http://localhost:6006
```

**소스 오브 트루스는 claude.ai/design "Industry" 프로젝트**(id `3d225a40-09b0-485d-8bb0-0848ca93cd21`)다.
색상/타이포/spacing 등 토큰을 바꿀 때는 거기서 먼저 확정한 뒤 `src/styles/tokens.css`와
`tailwind.config.js`에 동일하게 반영한다 — 두 소스가 어긋나지 않도록 유지할 것.

Toast/Pagination/Timeline/Gallery/EmptyState/Skeleton/QuickMenu/WingBanner는 Industry 원본에는
없는 posselect 전용 확장이라, 소스는 Industry가 아니라 **claude.ai/design "Posselect design system
mockups" 프로젝트**(id `2e00953e-5a16-41a1-be83-8a5cb3910c01`, 파일 `Posselect Design System.dc.html`)다
(2026-08-06 해당 문서 기준 구현). 이 8개를 다시 손볼 땐 Industry가 아니라 이 mockup 문서를 먼저 확인할 것.

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
- **반응형**: 브레이크포인트는 **768px**(태블릿/모바일) + **480px**(폰 전용 보정) 2단계. 768px은 `posselect-shell`(공통 헤더/푸터)이 이미 쓰던 값에 맞춘 것 — 같은 페이지를 위아래로 감싸는 두 저장소가 서로 다른 폭에서 꺾이면 안 되므로 **한쪽을 바꾸면 반드시 다른 쪽도 같이 바꿀 것**. 미디어쿼리는 `var()`를 읽지 못해 CSS 변수로 뺄 수 없고, 두 파일에 리터럴로 중복돼 있다. 상세는 `tokens.css` 맨 아래 "Responsive layer" 섹션
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

### 레이아웃 프리미티브 (2026-08-13 추가)

각 프론트가 `maxWidth: 1200 / padding: 0 24px`를 인라인 스타일로 각자 재구현하고 있었는데,
인라인 스타일에는 미디어쿼리를 붙일 수 없어서 반응형이 원천적으로 불가능했다. 공용 클래스로 사용할 것:

```html
<!-- 최대 1200px 중앙 정렬 + 브레이크포인트별 좌우 패딩(데스크톱 20.4px / 모바일 13.6px) -->
<main class="container">
  <!-- 데스크톱 auto-fill(최소 200px) → 768px 이하 최소 150px → 480px 이하 2열 고정 -->
  <div class="product-grid">
    <div class="card blueprint elev-sm">...</div>
  </div>
</main>
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

<Pagination page={page} totalPages={12} onPageChange={setPage} />

<Timeline steps={[
  { label: '주문 완료', time: '8/5 14:20', status: 'done' },
  { label: '배송 준비중', time: '8/5 16:40', status: 'active' },
  { label: '배송중', status: 'pending' },
  { label: '배송 완료', status: 'pending' },
]} />

<Gallery images={[
  { src: '/products/earphone-1.jpg', alt: '무선 이어폰 Pro 정면' },
  { src: '/products/earphone-2.jpg', alt: '무선 이어폰 Pro 측면' },
]} />

<EmptyState
  icon={<CartIcon width={40} height={40} strokeWidth={1.5} />}
  title="장바구니가 비어 있습니다"
  description="마음에 드는 상품을 담아보세요."
  action={<Button variant="primary">쇼핑 계속하기</Button>}
/>

{loading ? <SkeletonCard /> : <Card kicker="신상품" title="무선 이어폰 Pro" meta="₩189,000">노이즈 캔슬링 · 30시간 재생</Card>}

{toastVisible && <Toast>주문이 완료되었습니다</Toast>}

<QuickMenu
  items={[
    { icon: <HistoryIcon width={21} height={21} strokeWidth={1.5} />, label: '최근 본', onClick: goToHistory },
    { icon: <CartIcon width={21} height={21} strokeWidth={1.5} />, label: '장바구니', onClick: goToCart, badge: cartCount },
    { icon: <HeadsetIcon width={21} height={21} strokeWidth={1.5} />, label: '고객센터', onClick: goToSupport },
  ]}
  onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
/>

{bannerOpen && (
  <WingBanner
    title="이번주 특가"
    discount="최대 50% 할인"
    deadline="8/10까지"
    image={{ src: '/promo/weekly.jpg', alt: '이번주 특가' }}
    onClose={() => setBannerOpen(false)}
  />
)}
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
| Nav | 완료 (`brand`는 ReactNode — 보통 `<Logo />`를 넣음, children으로 링크 구성) |
| Logo | 완료 — "PosSelect" 워드마크(코랄 Pos + 블루 Select). 2026-08-14부터 Arial 기반 SVG 텍스트를 직접 그리지 않고 **posselect-shell 헤더와 같은 CDN 자산**을 참조한다(폰트 유무에 따라 기기마다 모양이 달라지던 문제 + 정식 자산엔 없는 ® 마크가 붙던 문제 해결). **브랜드명을 화면에 노출할 땐 항상 이 컴포넌트를 쓰거나, 텍스트라면 반드시 "PosSelect"로 표기 — "POSSELECT"(전체 대문자) 금지** |
| Table | 완료 — 얇은 wrapper (`<table class="table">`), thead/tbody/tr/td는 네이티브 그대로 사용. 2026-08-13부터 `.table-wrap` 스크롤 컨테이너로 감싸서 넓은 표가 페이지 전체를 가로 스크롤시키지 않게 함 |
| Dialog | 완료 — backdrop + blueprint 프레임 + 모서리 마크, `actions`로 버튼 슬롯 |
| Figure | 완료 — `.duotone` + blueprint 프레임을 씌운 이미지 래퍼, `caption` prop |
| Toast | 완료 (2026-08-06) — 고정 위치 알림, `variant`(success/warning/danger), 표시 타이밍은 소비 측 상태로 직접 제어 |
| Pagination | 완료 (2026-08-06) — `page`/`totalPages`/`onPageChange`, 페이지 목록은 첫/끝/현재±1만 보여주고 나머지는 `…`로 축약 |
| Timeline | 완료 (2026-08-06) — 배송 타임라인, `steps: {label, time?, status: 'done'\|'active'\|'pending'}[]` |
| Gallery | 완료 (2026-08-06) — 메인 이미지 + 5단 썸네일, 각각 `.duotone` + blueprint 프레임, 내부 상태로 선택 썸네일 관리 |
| EmptyState | 완료 (2026-08-06) — blueprint 프레임 안에 아이콘 + 제목 + 설명 + 액션 버튼 1개 |
| SkeletonBlock / SkeletonCard | 완료 (2026-08-06) — `SkeletonBlock`은 펄스 애니메이션 있는 낱개 블록, `SkeletonCard`는 상품카드 모양(이미지+3줄) 조합 |
| QuickMenu / WingBanner | 완료 (2026-08-06) — 스크롤을 따라다니는 플로팅 퀵메뉴(우측 고정, 아이콘은 Lucide를 `icon` prop으로 전달 + "맨 위로" 버튼 별도)와 닫기 가능한 프로모션 날개 배너(좌측 고정) |
| Icon | 컴포넌트 없음 — Lucide SVG를 그대로 children으로 사용하는 방식 권장(위 사용 예시 참고), 래퍼가 필요할 정도로 반복이 늘면 추가 고려 |

## 브랜드 에셋 (로고)

로고 원본(모노/다크배경용/스택형/태그라인 포함/정방형/파비콘 등)은 claude.ai/design "Posselect design
system mockups" 프로젝트가 소스 오브 트루스이지만, **이 저장소가 만들어내는 화면(`ui.posselect.com`
등)에서 실제로 노출할 때는 디자인 프로젝트를 직접 참조하지 않고 MinIO CDN(`image.posselect.com`)을
통해 서빙**한다 — 자세한 버킷 구조·재수출 절차는 [`docs/image-cdn-policy.md`](docs/image-cdn-policy.md)
참고. 이 저장소에는 바이너리를 중복 보관하지 않음. 다른 프론트(customer.front 등)에서 로고가 필요하면
디자인 프로젝트가 아니라 MinIO `cdn` 버킷을 참조할 것.

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
