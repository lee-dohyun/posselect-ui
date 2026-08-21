import React, { useState, useEffect, useCallback } from 'react';

export interface CarouselProps {
  /** 캐러셀 아이템들 */
  items: React.ReactNode[];
  /** 자동 롤링 간격 (ms). 0이면 비활성화 */
  autoPlayInterval?: number;
  /** 화살표 표시 여부 */
  showArrows?: boolean;
  /** 인디케이터 표시 여부 */
  showIndicators?: boolean;
}

export function Carousel({ 
  items, 
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators = true 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (autoPlayInterval <= 0 || items.length <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, items.length, next]);

  if (!items || items.length === 0) return null;

  return (
    <div className="relative overflow-hidden w-full h-full group">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full">
            {item}
          </div>
        ))}
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            aria-label="이전 배너"
          >
            &#10094;
          </button>
          <button 
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
            aria-label="다음 배너"
          >
            &#10095;
          </button>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`${index + 1}번째 배너`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
