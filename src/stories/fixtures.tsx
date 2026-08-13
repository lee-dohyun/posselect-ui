/**
 * 스토리 전용 픽스처. `src/index.ts`가 재수출하지 않으므로 소비 앱의 공개 API에는 포함되지 않는다.
 *
 * 이미지는 CDN(`image.posselect.com`)을 참조하지 않고 인라인 SVG 데이터 URI로 만든다 —
 * `docs/image-cdn-policy.md`의 CDN 원칙은 "실제 화면에 노출되는 브랜드 이미지"에 대한 것이고,
 * 여기 쓰이는 건 상품 사진 자리를 채우는 회색 플레이스홀더라 브랜드 자산이 아니다. 스토리북이
 * CDN 가용성에 의존하지 않는 편이 로컬 개발에도 낫다.
 */

/** 회색 바탕에 라벨만 찍힌 정사각/직사각 플레이스홀더 이미지. */
export function placeholder(label: string, w = 640, h = 640): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="#d4d4d7"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) / 12)}"
          fill="#5d5d60">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/* Lucide 아이콘(lucide.dev)을 stroke-width 1.5 인라인 SVG로 직접 사용하는 방식 —
   README "아이콘" 규칙 그대로. 래퍼 컴포넌트를 만들지 않는다. */

interface IconProps {
  size?: number;
}

export function CartIcon({ size = 21 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
    </svg>
  );
}

export function HistoryIcon({ size = 21 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

export function HeadsetIcon({ size = 21 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14v-3a9 9 0 0 1 18 0v3" />
      <path d="M21 16a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2z" />
      <path d="M3 16a2 2 0 0 0 2 2h1v-5H5a2 2 0 0 0-2 2z" />
    </svg>
  );
}

export function PlusIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
