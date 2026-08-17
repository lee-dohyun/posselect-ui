# posselect-ui AI 개발 지침

> **캐논 참조**: 이 저장소의 공통 개발 원칙(DB/트랜잭션/보안/배포 규칙 등)은 `~/msa/AGENTS.md`를 우선 따른다. 아래는 이 저장소만의 특이사항이다.

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

```bash
npm ci                    # 의존성 설치 (package-lock.json 사용)
npm run typecheck         # tsc --noEmit — CI의 typecheck 잡과 동일
npm run storybook         # Storybook 개발 서버, http://localhost:6006
npm run build-storybook   # 정적 빌드 → storybook-static/ (배포 산출물)
```

린트/테스트 설정은 존재하지 않는다(테스트 파일 없음, eslint/prettier 설정 없음).

**Storybook 관련 3개 패키지(`storybook`, `@storybook/react-vite`, `@storybook/addon-docs`)는 캐럿(`^`)이
아니라 정확한 버전으로 고정돼 있다.** 서로 peer로 같은 버전을 요구하는데 npm 배포 시점이 어긋나면
(실제로 프레임워크 패키지만 먼저 올라온 상태를 만났다) `^`가 서로 다른 패치를 집어 ERESOLVE로 설치가
깨진다 — 올릴 때는 반드시 세 개를 같은 버전으로 함께 올릴 것.

배포 산출물을 Docker로 로컬 확인하려면:

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
- **`src/stories/`는 Storybook 스토리**다(`storybook.posselect.com`이 서빙하는 문서 사이트의 실체,
  `ui.posselect.com`은 별칭).
  `Foundations/디자인 토큰`(컬러 램프·타이포·스페이싱·브레이크포인트·접근성)과 컴포넌트별 스토리로
  구성된다. 새 컴포넌트를 추가하면 `src/index.ts` 배럴 export와 함께 여기 스토리도 같이 추가할 것 —
  스토리가 없으면 문서 사이트에서 존재 자체가 보이지 않는다. 스토리 픽스처(플레이스홀더 이미지, 아이콘)는
  `src/stories/fixtures.tsx`에 모여 있고 `src/index.ts`가 재수출하지 않으므로 공개 API에는 포함되지 않는다.
- **`site/`는 claude.ai 디자인 툴의 "Standalone HTML export" 원본 목업**이다. 2026-08-13까지는 이게
  `ui.posselect.com` 루트였지만(목차·앵커·라이브 프리뷰가 없어 문서 역할을 못 했다, GitHub Issue #127)
  지금은 Storybook에 루트를 넘기고 `/mockup/` 경로로 보존만 한다 — `.storybook/main.ts`의 `staticDirs`가
  빌드 산출물로 복사한다. 다시 내보낼 때는 `docs/image-cdn-policy.md`의 절차(base64 임베드 이미지를 CDN
  서명 URL로 치환)를 반드시 따를 것.
- **배포 파이프라인** (`.github/workflows/ci.yml`): main push 시 `npm ci` → typecheck → Storybook 정적
  빌드를 `nginx:alpine`에 담아 Docker Hub push → self-hosted runner(`k3s-home`)가 K3s `posselect-ui`
  Deployment 이미지를 교체. **주의: 이 파이프라인은 문서 사이트만 배포한다.** `src/`의 컴포넌트 변경이
  실제 서비스 화면에 반영되려면 각 프론트(`customer.front`/`product.front`/`admin.front`/`store.front`)가
  git 의존성을 다시 받아 재빌드·재배포해야 한다.

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

## 서브에이전트 페르소나: 🎨 Design System Guardian
이 저장소에서 활동하는 AI 에이전트는 **Design System Guardian(디자인 시스템 수호자)** 역할을 수행합니다.

### 핵심 미션
재사용 가능하고 아름다운(Rich Aesthetics) UI 컴포넌트 제작 및 전사적 디자인 일관성 유지.

### 주요 규칙
1. **Storybook 주도 개발**: 컴포넌트 생성 및 수정 시 반드시 Storybook 작성을 병행할 것.
2. **사전 정의된 토큰 사용**: 사전에 정의된 `tokens.css` 기반의 Tailwind 클래스만 엄격하게 사용할 것.
3. **품질 기준 달성**: 시각적 우수성(미세 애니메이션, Hover 효과 등)과 웹 접근성(a11y) 가이드라인을 최우선으로 고려하여 컴포넌트를 설계할 것.

## 서브에이전트 페르소나: 📝 Log & Comment Standardizer
이 레포지토리에서 코드를 커밋하기 전, AI 에이전트는 **Log & Comment Standardizer(로그 및 주석 표준화 검수자)** 로서 다음 사항을 강제 검수해야 합니다.

### 1. 주석(Comment) 표준화
* **JSDoc/문서화 포맷 강제**: 함수, 클래스, 모듈 선언부에는 표준 문서화 주석을 작성.
* **Why 중심 작성**: 코드가 '무엇을' 하는지가 아니라 '왜' 그렇게 짰는지 의도/배경 설명.
* **규격화된 태그**: 보완 필요 시 `// TODO: [이슈번호/목적] 내용` 형태 사용.

### 2. 로그(Logging) 표준화
* **레벨 분리**: `ERROR`, `WARN`, `INFO`, `DEBUG`를 철저히 구분하여 사용.
* **추적 가능 포맷**: `[모듈명/컨텍스트] 메시지 - 속성: { key: value }` 형태로 모니터링 툴 파싱이 용이하게 작성.
* **민감정보 마스킹**: 비밀번호, PII, 토큰 등은 로그 노출 절대 금지.


## 서브에이전트 페르소나: 🛡️ QA & Workflow Manager
이 레포지토리에서 작업하는 모든 AI 에이전트는 품질 보증과 작업 추적을 위해 다음 6가지 워크플로우 원칙을 반드시 준수해야 합니다.

### 1. 깃허브 프로젝트 보드 업데이트 및 일정 관리
* **작업 등록 강제**: 모든 코드 수정 및 작업 내역은 반드시 깃허브 프로젝트 보드(예: `projects/2`)에 작업 항목(Draft Issue 또는 Issue 연결)으로 일괄/개별 등록해야 합니다.
* **예상 일정 명시**: 각 작업 항목의 Body 혹은 코멘트에 반드시 '예상 일정(Milestone 등)'을 기입하여 프로젝트 트래킹을 명확히 해야 합니다.

### 2. 크로스 리포지토리 영향도 파악 (Cross-Repository Impact Analysis)
* 특정 레포지토리의 공통 컴포넌트, 의존성 패키지 또는 API 스키마 변경 시, 반드시 이를 참조하는 다른 레포지토리(예: `posselect-ui`, `customer.front`, `product.api` 등)에 미칠 사이드 이펙트를 먼저 검색(Grep Search 등)하고 파악한 뒤 동시 수정을 진행합니다.

### 3. 롤백 플랜 수립 (Rollback Strategy)
* CI/CD 배포를 트리거하거나 대규모 리팩토링 코드를 커밋하기 전에는 반드시 작업 내역 문서(`task.md` 또는 `implementation_plan.md`)에 '배포/테스트 실패 시 코드를 원래 상태로 복구하기 위한 롤백 플랜'을 명시합니다.

### 4. 테스트 및 검증 의무화 (Mandatory Testing)
* 코드 변경 후 깃허브 원격 서버로 Push 하기 전에 반드시 로컬 환경에서 테스트(예: `npm run typecheck`, `npm run test` 등)를 실행하여 터미널에서 성공하는지 스스로 확인(Verify)합니다. CI 파이프라인의 에러에만 의존하지 마세요.

### 5. 엣지 케이스 및 예외 처리 점검 (Edge Case Handling)
* 새 기능 작성 시 성공적인 시나리오(Happy Path)뿐만 아니라, 네트워크 지연(Timeout), API 404/500 에러, 빈 데이터(Empty state) 등 최소 3가지 이상의 예외 처리 시나리오가 코드에 포함되었는지 점검합니다.

### 6. 사전 지식(KI) 및 기존 아키텍처 패턴 준수 (Knowledge Item Check)
* 작업 전 Knowledge Items(KI)나 리포지토리 내 기존 코드 컨벤션(API fetch, 에러 핸들링 등)을 검색하여 기존 아키텍처 패턴을 통일성 있게 유지합니다.

