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
- **블루프린트 스타일**: 라운드 0(각짐), 카드/버튼(primary·secondary)/다이얼로그/이미지 모서리에
  등록마크(`.blueprint` + `<i class="corner tl/tr/bl/br">`) 장식, 채움 없는 투명 배경 + 헤어라인 테두리.
  ghost 버튼만 예외로 프레임 없음. **모서리 마크를 빼먹지 말 것** — Industry readme.md의 명시적 규칙
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
| Nav | 완료 (최소 wrapper, children으로 링크 구성) |
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

## 각 프론트엔드 적용 방법

1. `npm install` (또는 pnpm workspace로 편입 — 저장소 분리돼 있으므로 우선 npm registry 배포 또는
   git submodule 방식 중 선택 필요)
2. 루트 레이아웃에서 `import '@posselect/ui/src/styles/tokens.css'` 한 번
3. 기존 자체 구현 버튼/카드/태그를 이 패키지의 컴포넌트로 점진적 교체
