# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 이 저장소는

posselect 쇼핑몰의 공통 디자인 시스템 패키지(`@posselect/ui`)다. `customer.front` / `product.front` /
`admin.front` / `home.front` 등 여러 프론트엔드가 npm 레지스트리가 아니라 **git 의존성**
(`github:lee-dohyun/posselect-ui`)으로 이 저장소를 직접 참조한다. 소스가 `.ts`/`.tsx` 그대로 배포되므로
컴파일 결과물(`dist/`)을 커밋할 필요가 없다 — 소비 측(Next.js)이 `transpilePackages`로 직접 트랜스파일한다.

**디자인 토큰/컴포넌트의 소스 오브 트루스는 이 저장소가 아니라 claude.ai/design이다**:
- 기본 토큰(색상/타이포/spacing 등): "Industry" 프로젝트 (id `3d225a40-09b0-485d-8bb0-0848ca93cd21`)
- posselect 전용 확장 컴포넌트(Toast/Pagination/Timeline/Gallery/EmptyState/Skeleton/QuickMenu/WingBanner):
  "Posselect design system mockups" 프로젝트 (id `2e00953e-5a16-41a1-be83-8a5cb3910c01`,
  파일 `Posselect Design System.dc.html`)

디자인을 바꿀 때는 반드시 해당 디자인 프로젝트에서 먼저 확정한 뒤 이 저장소의 `src/styles/tokens.css`와
`tailwind.config.js`에 **동일하게** 반영한다. 두 파일은 서로의 미러이므로 하나만 고치면 안 된다.

## 커맨드

이 저장소에는 `package.json`에 `scripts`가 없다. CI(`​.github/workflows/ci.yml`)가 실제로 돌리는 명령이
곧 개발 중 확인해야 할 명령이다.

```bash
# 타입체크 (CI의 typecheck 잡과 동일)
npx tsc --noEmit
```

린트/테스트 설정과 스크립트는 존재하지 않는다(테스트 파일 없음, eslint/prettier 설정 없음) — 새로 추가하지
않는 한 실행할 것이 없다.

`site/index.html`을 Docker로 로컬 확인하려면:

```bash
docker build -t posselect-ui . && docker run -p 8080:80 posselect-ui
```

## 아키텍처

- **`src/index.ts`**: 모든 공개 컴포넌트/타입의 배럴 export. 새 컴포넌트를 추가하면 반드시 여기에도
  추가해야 소비 앱에서 `import { X } from '@posselect/ui'`가 동작한다. CSS는 이 파일에서 재수출하지
  않음 — 소비 앱이 루트에서 별도로 `import '@posselect/ui/tokens.css'` 한 번 해야 한다.
- **`src/styles/tokens.css`** ↔ **`tailwind.config.js`**: 같은 디자인 토큰(색상 ramp, spacing, radius,
  shadow)을 두 형식으로 중복 정의한 쌍. CSS 변수(`.btn`, `.card`, `.tag` 등 순수 클래스 사용처용)와
  Tailwind preset(유틸리티 클래스 사용처용) 둘 다 지원하기 위함 — 하나를 고치면 반드시 다른 하나도 고칠 것.
- **컴포넌트는 순수 CSS 클래스의 얇은 React 래퍼**다. 로직보다 `className` 조합이 대부분이며(예:
  `Button.tsx`), 실제 스타일은 전부 `tokens.css`에 있다. 새 컴포넌트를 짤 때도 이 패턴(클래스 조합 +
  최소 상태)을 따를 것 — CSS-in-JS나 별도 스타일 파일을 추가하지 않는다.
- **Blueprint 프레임 패턴**: `.blueprint` 클래스 + `<BlueprintCorners />`(`src/components/Blueprint.tsx`)
  조합이 카드/다이얼로그/이미지/primary·secondary 버튼에 반복된다. 모서리 마크는 현재
  `tokens.css`의 `.blueprint > .corner { display: none; }`로 렌더링만 꺼져 있을 뿐 마크업 자체는 유지되는
  중이므로, 새 컴포넌트에 프레임을 줄 때도 이 조합을 그대로 따라 넣는다(꺼져 있어도 무방).
- **`site/`는 별도 정적 사이트**다(`ui.posselect.com`, 컴포넌트 갤러리). `src/`의 React 컴포넌트를
  빌드해서 만든 게 아니라 claude.ai 디자인 툴의 "Standalone HTML export" 결과물을 그대로 배포한 것이라
  `src/`와 직접적인 코드 의존 관계가 없다. `site/index.html`을 다시 내보낼 때는
  `docs/image-cdn-policy.md`의 절차(base64 임베드 이미지를 CDN 서명 URL로 치환)를 반드시 따를 것.
- **배포 파이프라인** (`.github/workflows/ci.yml`): main push 시 typecheck → `site/index.html`을
  `nginx:alpine`에 담아 Docker Hub push → self-hosted runner(`k3s-home`)가 K3s `posselect-ui`
  Deployment 이미지를 교체. `src/`의 변경 자체는 이 파이프라인에서 직접 배포되지 않는다 — 각 프론트가
  git 의존성을 갱신(`npm update @posselect/ui` 또는 재설치)해야 반영된다.

## 디자인 규칙 (요약 — 전체는 README.md 참고)

- **accent(steel blue `#234e95`)**: 버튼/링크/active 등 상시 액션 전용. **highlight(코랄 `#d1553c`)**:
  할인가·쿠폰 등 혜택 신호 전용 — 버튼이나 상시 UI 크롬에 절대 사용 금지, 역할을 섞지 않는다.
  success/warning/danger는 주문·재고 상태 표시 전용. 넷 다 Industry 원본에는 없는 posselect 자체 확장.
- 라운드 0(각짐), primary/secondary 버튼·카드·다이얼로그·이미지는 헤어라인 테두리 + 투명 배경(채움 배경
  금지). ghost 버튼만 프레임 없음.
- 브랜드명 표기는 항상 `Logo` 컴포넌트 사용 또는 텍스트 "PosSelect" — "POSSELECT"(전체 대문자) 금지.
- 콘텐츠 이미지는 항상 `.duotone` 래퍼 + blueprint 프레임을 거친다. 원본 이미지를 가공 없이 그대로 쓰지 않는다.
- 아이콘은 Lucide, `stroke-width={1.5}`, children으로 inline SVG 직접 전달(별도 Icon 컴포넌트 없음).
- 브랜드 이미지(로고/파비콘 등)는 base64 임베드 금지, MinIO CDN(`image.posselect.com`) 서명 URL로만
  참조 — 자세한 버킷 구조·재수출 절차는 `docs/image-cdn-policy.md`.
