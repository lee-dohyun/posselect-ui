import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming/create';

/**
 * 사이드바 상단 브랜딩. 기본값인 Storybook 로고를 그대로 두면 posselect 디자인 시스템
 * 사이트인데 정체성이 전혀 없다.
 *
 * 로고는 저장소에 바이너리를 두지 않고 MinIO CDN(image.posselect.com)을 참조한다 —
 * `docs/image-cdn-policy.md` 원칙 그대로이고, posselect-shell의 공통 헤더도 같은 URL을 쓴다.
 * 로고 파일을 바꿀 땐 cdn 버킷의 logos/posselect-logo-hires-no-r.webp만 교체하면 된다.
 *
 * brandUrl(로고 클릭 시 이동 주소)은 2026-08-14부터 storybook.posselect.com이 메인 주소다.
 * ui.posselect.com은 기존 링크/북마크 호환을 위해 별칭으로 계속 열어둔다(gateway/ingress에서
 * 두 호스트 모두 같은 서비스로 라우팅됨) — 새 링크를 만들 땐 항상 storybook.posselect.com을 쓴다.
 */
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'PosSelect Design System',
    brandUrl: 'https://storybook.posselect.com',
    brandImage: 'https://image.posselect.com/cdn/logos/posselect-logo-hires-no-r.webp',
    brandTarget: '_self',
  }),
});
