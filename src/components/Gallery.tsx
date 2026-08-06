import { useState } from 'react';
import { BlueprintCorners } from './Blueprint';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
}

/** Product image gallery — main photo + 5-up thumbnail strip, each `.duotone` + blueprint framed. */
export function Gallery({ images, className = '' }: GalleryProps) {
  const [selected, setSelected] = useState(0);
  const main = images[selected];

  return (
    <div className={className}>
      <div className="gallery-main blueprint duotone">
        <BlueprintCorners />
        {main && <img src={main.src} alt={main.alt} />}
      </div>
      <div className="gallery-thumbs">
        {images.map((img, i) => (
          <button
            type="button"
            key={img.src}
            className={`gallery-thumb blueprint duotone ${i === selected ? 'gallery-thumb-selected' : ''}`}
            aria-current={i === selected ? 'true' : undefined}
            aria-label={`${img.alt} 썸네일`}
            onClick={() => setSelected(i)}
          >
            <BlueprintCorners />
            <img src={img.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
