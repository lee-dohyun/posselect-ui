import { BlueprintCorners } from './Blueprint';

export interface FigureProps {
  /** 이미지 URL 주소 */
  src: string;
  /** 이미지 대체 텍스트 */
  alt: string;
  /** 이미지 하단 캡션 */
  caption?: string;
}

/**
 * Every content photograph goes through `.duotone` (washed in the accent) +
 * the blueprint frame — never a raw, untreated image. Industry foundations/image.html.
 */
export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure>
      <div className="duotone blueprint">
        <BlueprintCorners />
        <img src={src} alt={alt} />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
