import { BlueprintCorners } from './Blueprint';

interface FigureProps {
  src: string;
  alt: string;
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
