// 헤더/푸터 전용 CSS. Shadow DOM 안에 <style>로 직접 주입되므로 외부 CSS 파일이 아니라
// JS 문자열로 갖고 다닌다 — 번들 하나(header.js/footer.js)만 로드하면 완결되도록.
//
// var(--color-*)/var(--space-*) 등은 @posselect/ui의 tokens.css가 정의하는 CSS 커스텀
// 프로퍼티다. 커스텀 프로퍼티는 Shadow DOM 경계를 통과해 상속되므로, 호스트 페이지가 이미
// import하고 있는 tokens.css를 그대로 테마 소스로 재사용한다(이 번들이 직접 값을 정의하지 않음).
//
// 소스: claude.ai/design mockups 프로젝트(id 2e00953e-5a16-41a1-be83-8a5cb3910c01)의
// "내비게이션"/"푸터" 컴포넌트 페이지, 2026-08-04 동기화.
export const SHELL_CSS = `
:host { all: initial; display: block; font-family: var(--font-body); color: var(--color-text); }
*, *::before, *::after { box-sizing: border-box; }
a { text-decoration: none; }

.site-header { border-bottom: 1px solid var(--color-divider); background: var(--color-bg); }

.site-header-utility {
  display: flex; justify-content: flex-end; align-items: center; gap: var(--space-6);
  padding: var(--space-2) var(--space-6);
  font-size: 12px; color: var(--color-neutral-700);
  border-bottom: 1px solid var(--color-divider);
}
.site-header-utility a { color: inherit; text-decoration: none; }
.site-header-utility a:hover { color: var(--color-accent); }
.site-header-utility button.link {
  background: none; border: none; padding: 0; font: inherit; color: inherit; cursor: pointer;
}
.site-header-utility button.link:hover { color: var(--color-accent); }
.site-header-utility span.disabled { color: var(--color-neutral-400); cursor: default; }

.site-header-main {
  display: flex; align-items: center; gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
}
.site-header-category-toggle {
  display: flex; flex-shrink: 0; align-items: center; gap: 6px;
  height: 40px; padding: 0 var(--space-3); border: 1px solid var(--color-divider); border-radius: var(--radius-sm);
  background: none; cursor: pointer; font: inherit; font-size: 13.5px; color: var(--color-text);
}
.site-header-category-toggle:hover, .site-header-category-toggle[aria-expanded='true'] {
  border-color: var(--color-accent); color: var(--color-accent);
}
.site-header-logo-link { display: flex; flex-shrink: 0; align-items: center; }
.site-header-logo { height: 26px; width: auto; display: block; }
/* min-width: 0 overrides the flex item default (min-width: auto), which would
   otherwise size this to its content's min-content width and force the row to
   overflow instead of shrinking — that overflow was pushing .site-header-actions
   off-screen on narrow viewports. */
.site-header-search { flex: 1; min-width: 0; max-width: 520px; }
.site-header-search-box {
  display: flex; align-items: center; height: 44px; min-width: 0;
  border: 1.5px solid var(--color-accent); border-radius: var(--radius-sm);
}
.site-header-search-box input {
  border: none; height: 100%; flex: 1; min-width: 0; font-size: 14px; padding: 0 var(--space-4);
  background: transparent; color: var(--color-text); font-family: inherit;
}
.site-header-search-box input:focus-visible { outline: none; }
.site-header-search-box button {
  border: none; height: 100%; width: 48px; flex-shrink: 0; cursor: pointer;
  background: var(--color-accent); color: var(--color-bg);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  display: flex; align-items: center; justify-content: center;
}
.site-header-search-box button:hover { background: var(--color-accent-600); }

.site-header-actions { display: flex; flex-shrink: 0; gap: 4px; margin-left: auto; }
.site-header-action {
  position: relative; display: flex; flex-direction: column; align-items: center; gap: 2px;
  width: 56px; height: 52px; border: none; background: none; cursor: pointer;
  font-size: 10px; color: var(--color-neutral-700); text-decoration: none; font-family: inherit;
}
.site-header-action:hover, .site-header-action:focus-visible { color: var(--color-accent); }
.site-header-action svg { display: block; }
.site-header-action:disabled { cursor: default; opacity: 0.45; }
.site-header-action:disabled:hover { color: var(--color-neutral-700); }
.site-header-action-badge {
  display: inline-flex; align-items: center; font-size: 10px; letter-spacing: 0.02em;
  background: var(--color-accent-100); color: var(--color-accent-800);
  position: absolute; top: 0; right: 8px; padding: 0 4px;
  min-width: 16px; height: 16px; line-height: 16px; text-align: center; border-radius: 8px;
}

.site-header-categories {
  display: flex; align-items: center; gap: var(--space-6);
  padding: 0 var(--space-6); font-size: 13.5px;
  border-top: 1px solid var(--color-divider); overflow-x: auto;
}
.site-header-categories a {
  white-space: nowrap; color: var(--color-neutral-700); text-decoration: none;
  padding: var(--space-3) 0; border-bottom: 2px solid transparent; margin-bottom: -1px;
}
.site-header-categories a:hover { color: var(--color-accent-900); }
.site-header-categories a[aria-current='page'] {
  font-weight: 600; color: var(--color-accent-900); border-bottom-color: var(--color-accent);
}
.site-header-categories a.highlight { color: var(--color-highlight-700); font-weight: 600; }

/* 쿠팡의 좌측 "카테고리" 플라이아웃과 동일한 패턴: 오버레이로 배경을 덮고, 고정폭 패널을
   헤더 아래쪽에서 화면 하단까지 채운다. 모바일/데스크톱 공통 마크업이라 미디어쿼리 없이도
   그대로 동작한다. */
.site-header-category-overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); z-index: 1000;
}
.site-header-category-panel {
  position: fixed; top: 0; left: 0; bottom: 0; width: min(320px, 84vw);
  background: var(--color-bg); z-index: 1001; overflow-y: auto;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.15);
  display: flex; flex-direction: column;
}
.site-header-category-panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4) var(--space-5); border-bottom: 1px solid var(--color-divider);
  font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 15px;
}
.site-header-category-panel-head button {
  border: none; background: none; cursor: pointer; color: var(--color-neutral-700); display: flex;
}
.site-header-category-panel-list { list-style: none; margin: 0; padding: var(--space-2) 0; }
.site-header-category-panel-list li.empty {
  padding: var(--space-4) var(--space-5); color: var(--color-neutral-400); font-size: 13px;
}
.site-header-category-panel-list a {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-3) var(--space-5); color: var(--color-text); font-size: 14px;
}
.site-header-category-panel-list a:hover { background: var(--color-neutral-100); color: var(--color-accent); }
.site-header-category-panel-children { list-style: none; margin: 0; padding: 0 0 var(--space-2); }
.site-header-category-panel-children a {
  padding: var(--space-2) var(--space-5) var(--space-2) calc(var(--space-5) + var(--space-4));
  color: var(--color-neutral-600); font-size: 13px;
}
.site-header-category-panel-children a:hover { background: var(--color-neutral-100); color: var(--color-accent); }

@media (max-width: 768px) {
  .site-header-utility { gap: var(--space-4); padding: var(--space-2) var(--space-4); font-size: 11px; }
  .site-header-main { padding: var(--space-3) var(--space-4); gap: var(--space-3); }
  .site-header-action span.label { display: none; }
  .site-header-action { width: 40px; }
  .site-header-category-toggle-label { display: none; }
  .site-header-category-toggle { width: 40px; padding: 0; justify-content: center; }
}

/* 480px은 @posselect/ui tokens.css의 "Responsive layer"와 공유하는 두 번째 브레이크포인트다
   (768px과 마찬가지로 두 저장소가 같이 움직여야 함).

   이 아래에서 .site-header-main은 한 줄에 들어갈 수가 없다: 좌우 패딩(27.2) + 카테고리
   토글(40) + 로고(~95) + 액션 4개(4×40 + gap 3×4 = 172) + gap 3개(30.6) = 364.8px이라,
   검색창이 자기 최소폭(검색 버튼 48px는 flex-shrink:0라 더 못 줄어듦)을 확보하려면
   뷰포트가 약 416px은 돼야 한다. 그 아래에서는 검색창이 버튼만 남게 찌그러지면서 액션
   아이콘을 밀어내 페이지 전체가 가로 스크롤됐다(375px에서 3px 초과 확인, 2026-08-13).

   해결: 이 구간에서만 검색창을 둘째 줄 전체 폭으로 내린다(국내 커머스 모바일 헤더 관례).
   order:3으로 마지막에 배치 + flex-basis:100%로 강제 줄바꿈. 첫 줄은 토글+로고+액션만
   남아 375px 기준 354.6px으로 들어간다. 320px처럼 그보다도 좁으면 flex-wrap 덕분에
   액션이 한 줄 더 내려갈 뿐 가로 스크롤은 생기지 않는다. */
@media (max-width: 480px) {
  .site-header-main { flex-wrap: wrap; row-gap: var(--space-3); }
  .site-header-search { order: 3; flex-basis: 100%; max-width: none; }
  /* 로고를 조금 줄여 첫 줄에 여유를 준다(액션 아이콘은 이미 40px이라 터치 타깃상 더 줄이지 않음). */
  .site-header-logo { height: 22px; }
}

.site-footer { border-top: 1px solid var(--color-divider); background: var(--color-bg); font-size: 13px; }
.site-footer-top {
  display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-8);
  padding: var(--space-8) var(--space-6); border-bottom: 1px solid var(--color-divider);
  flex-wrap: wrap;
}
.site-footer-biz { max-width: 320px; }
.site-footer-biz-info { font-size: 13px; line-height: 1.7; color: var(--color-neutral-700); }
.site-footer-links { display: flex; gap: var(--space-8); flex-wrap: wrap; }
.site-footer-links-group-title {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 14px; margin-bottom: var(--space-3);
}
.site-footer-cs-phone {
  font-family: var(--font-heading); font-weight: var(--font-heading-weight);
  font-size: 20px; color: var(--color-accent-900);
}
.site-footer-cs-hours { font-size: 12px; color: var(--color-neutral-700); margin-top: 4px; }
.site-footer-links-group { display: flex; flex-direction: column; gap: 6px; font-size: 13px; }
.site-footer-links-group a { color: var(--color-neutral-700); text-decoration: none; }
.site-footer-links-group a:hover { color: var(--color-accent); }
.site-footer-links-group a.strong { color: var(--color-text); font-weight: 600; }
.site-footer-bottom {
  display: flex; justify-content: space-between; align-items: center; gap: var(--space-4);
  padding: var(--space-4) var(--space-6); flex-wrap: wrap;
}
.site-footer-copyright { font-size: 11px; color: var(--color-neutral-700); }
.site-footer-social { display: flex; gap: var(--space-2); }
.site-footer-social .icon-btn {
  display: flex; align-items: center; justify-content: center; width: 26px; height: 26px;
  border-radius: 50%; border: 1px solid var(--color-divider); color: var(--color-neutral-400); cursor: default;
}
.site-footer-payments { display: flex; gap: var(--space-2); flex-wrap: wrap; }
.site-footer .tag {
  display: inline-flex; align-items: center; font-size: 11px; letter-spacing: 0.02em;
  padding: 3px 10px; border-radius: calc(var(--radius-md) * 0.75);
  border: 1px solid var(--color-accent); color: var(--color-accent);
}
.site-footer-app {
  display: flex; gap: var(--space-2); padding: 0 var(--space-6) var(--space-6);
}
.site-footer-app .badge {
  display: inline-flex; align-items: center; gap: 6px; font-size: 11px; cursor: default;
  padding: 6px 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-divider);
  color: var(--color-neutral-400);
}

@media (max-width: 768px) {
  .site-footer-top { padding: var(--space-6) var(--space-4); gap: var(--space-6); }
  .site-footer-links { gap: var(--space-6); width: 100%; }
  .site-footer-bottom { padding: var(--space-4); justify-content: flex-start; }
  .site-footer-app { padding: 0 var(--space-4) var(--space-4); }
}
`;
