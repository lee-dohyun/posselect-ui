import type { StorybookConfig } from '@storybook/react-vite';

/**
 * storybook.posselect.com(메인 주소, ui.posselect.com은 별칭으로 유지)이 서빙하는 것 =
 * 이 Storybook의 정적 빌드 결과물.
 *
 * 예전엔 claude.ai 디자인 툴의 standalone export(`site/index.html`, 약 1MB짜리 페이지 1장)를
 * 그대로 nginx에 얹어서 서빙했는데, 목차/앵커/라이브 프리뷰/props 컨트롤이 전부 없어서 실제
 * 개발 중에 참조할 수 있는 문서 역할을 못 했다(Redmine posselect #127).
 *
 * 디자인 export 자체는 "원본 목업"으로서의 가치가 있으므로 버리지 않고 `/mockup/` 경로에
 * 그대로 남긴다 — staticDirs가 빌드 산출물에 복사해준다.
 */
const config: StorybookConfig = {
  stories: ['../src/stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: [{ from: '../site', to: '/mockup' }],
  /**
   * posselect-shell(런타임 마이크로프론트엔드 Header/Footer)의 Storybook을 Composition으로
   * 끌어와 이 사이트 하나에서 다 보이게 한다 — 저장소 경계를 유지하면서 문서는 합치는 방식
   * (posselect-shell#13에서 채택한 옵션 A).
   *
   * url이 `https://shell.posselect.com/storybook` 이었을 때는 **동작하지 않았다.** Composition은
   * 매니저가 브라우저에서 ref의 index.json을 fetch하는데, 다른 호스트라 크로스 오리진이고
   * shell 쪽 nginx가 Access-Control-Allow-Origin을 안 보내서 차단됐다(2026-08-23 실측:
   * `TypeError: Failed to fetch`). 사이드바에 노드는 뜨는데 "No stories found"만 나왔다.
   *
   * 그래서 게이트웨이가 `storybook.posselect.com/shell/**` 를 shell 서비스의 `/storybook/**` 로
   * 라우팅하도록 하고(gateway#240), 여기서는 **같은 오리진 경로**를 가리킨다. CORS가 관여하지
   * 않으므로 헤더 관리 지점이 늘지 않는다.
   *
   * ⚠️ 이 URL은 게이트웨이 라우트와 한 쌍이다. 한쪽만 바꾸면 조용히 "No stories found"로 되돌아간다.
   */
  refs: {
    'posselect-shell': {
      title: 'Shell (Header/Footer)',
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:6007'
          : 'https://storybook.posselect.com/shell',
    },
  },
};

export default config;
