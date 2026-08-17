export interface LogoProps {
  /** 렌더링될 워드마크의 높이 (px) */
  size?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

/** 워드마크 원본. 가로:세로 = 1410:300. */
const LOGO_URL = 'https://image.posselect.com/cdn/logos/posselect-logo-hires-no-r.webp';
const LOGO_RATIO = 1410 / 300;

/**
 * "PosSelect" 브랜드 워드마크.
 *
 * 2026-08-14까지는 이 컴포넌트가 `<text font-family="Arial, Helvetica, sans-serif">`로 워드마크를
 * 직접 그렸는데, 그건 실제 브랜드 자산이 아니라 근사치였다. 문제가 두 가지 있었다:
 * (1) Arial이 없는 환경(리눅스 컨테이너 등)에서는 Liberation Sans 등으로 대체돼 **보는 기기마다
 * 글자 모양이 달라졌고**, (2) 정식 자산에는 없는 ® 마크가 붙어 있어서 같은 화면 안에서도
 * posselect-shell 공통 헤더(정식 자산 사용)와 서로 다른 로고가 보였다.
 *
 * 이제 posselect-shell 헤더와 **같은 CDN 자산**을 참조한다 — 브랜드 이미지는 저장소에 중복
 * 보관하지 않고 MinIO CDN에서만 서빙한다는 `docs/image-cdn-policy.md` 원칙과도 일치하고,
 * 로고를 바꿀 때 cdn 버킷의 파일 하나만 교체하면 모든 화면에 함께 반영된다.
 *
 * 브랜드명을 화면에 노출할 땐 항상 이 컴포넌트를 쓰거나, 이미지가 곤란하면 텍스트 "PosSelect"로
 * 적는다 — "POSSELECT"(전체 대문자)는 금지.
 */
export function Logo({ size = 22, className = '' }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={LOGO_URL}
      alt="PosSelect"
      // width를 함께 지정해 이미지 로드 전에도 자리를 차지하게 한다(레이아웃 시프트 방지).
      width={Math.round(size * LOGO_RATIO)}
      height={size}
      style={{ height: size, width: 'auto', flexShrink: 0, display: 'block' }}
    />
  );
}
