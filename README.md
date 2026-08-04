# @posselect/ui

posselect 쇼핑몰 공통 디자인 시스템. `customer.front` / `product.front` / `admin.front` / `home.front`가
이 패키지 하나를 참조해 토큰과 UI 컴포넌트를 공유한다.

**소스 오브 트루스는 claude.ai/design "Industry" 프로젝트**(id `3d225a40-09b0-485d-8bb0-0848ca93cd21`)다.
색상/타이포/spacing 등 토큰을 바꿀 때는 거기서 먼저 확정한 뒤 `src/styles/tokens.css`와
`tailwind.config.js`에 동일하게 반영한다 — 두 소스가 어긋나지 않도록 유지할 것.

## 디자인 방향

- **단일 accent (steel blue `#5980a6`) 기반 모노톤 팔레트** — neutral/accent 각 9단계 ramp
- **시맨틱 컬러**(success/warning/danger)는 이커머스 상태 표시 전용(배송완료, 재고부족, 품절 등)
- **타이포**: 헤딩 Barlow Condensed 600 / 본문 Barlow 400. Barlow 계열은 한글 글리프가 없어
  `tokens.css`/`tailwind.config.js` 모두 Pretendard → Malgun Gothic → system-ui 순으로 fallback을
  추가해뒀다 — 한글은 자동으로 Pretendard로 렌더링되고 영문/숫자만 Barlow로 보인다
- **블루프린트 스타일**: 라운드 0(각짐), 카드/다이얼로그 모서리에 등록마크(`.blueprint .corner`) 장식,
  채움 없는 투명 배경 + 헤어라인 테두리
- spacing은 촘촘한 스케일(`--space-1` 3.4px ~ `--space-8` 27.2px)

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
import { Button, Card, Tag, Field, Input } from '@posselect/ui';

<Button variant="primary">구매하기</Button>
<Card kicker="신상품" title="무선 이어폰 Pro" meta="₩189,000">
  노이즈 캔슬링 · 30시간 재생
</Card>
<Tag variant="success">배송완료</Tag>
<Field label="이메일"><Input placeholder="you@example.com" /></Field>
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
| Button | 완료 (primary/secondary/ghost/icon, block) |
| Field / Input / Textarea | 완료 |
| Card (blueprint) | 완료 |
| Tag | 완료 (accent/accent-2/neutral/outline/success/warning/danger) |
| Nav | 완료 (최소 wrapper, children으로 링크 구성) |
| Table / Dialog / Toast | 미구현 — `src/styles/tokens.css`에 `.table`/`.dialog-*` 클래스는 있음, React 래퍼만 아직 없음. claude.ai/design 목업의 `Posselect Design System.dc.html`에 참조 마크업 있음 |

## 각 프론트엔드 적용 방법

1. `npm install` (또는 pnpm workspace로 편입 — 저장소 분리돼 있으므로 우선 npm registry 배포 또는
   git submodule 방식 중 선택 필요)
2. 루트 레이아웃에서 `import '@posselect/ui/src/styles/tokens.css'` 한 번
3. 기존 자체 구현 버튼/카드/태그를 이 패키지의 컴포넌트로 점진적 교체
