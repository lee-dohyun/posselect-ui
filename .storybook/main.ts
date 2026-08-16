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
};

export default config;
