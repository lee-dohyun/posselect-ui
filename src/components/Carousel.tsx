import { useState, useEffect, useRef } from 'react';
import { BlueprintCorners } from './Blueprint';

export interface CarouselItem {
  id: string | number;
  imageUrl?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  bgColor?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlayInterval?: number;
  className?: string;
}

export function Carousel({ items, autoPlayInterval = 3000, className = '' }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<number | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (items.length > 1) {
      startTimer();
    }
    return stopTimer;
  }, [items.length, autoPlayInterval]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    startTimer(); // Reset timer
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    startTimer(); // Reset timer
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    startTimer();
  };

  if (items.length === 0) return null;

  return (
    <div 
      className={`carousel-container blueprint ${className}`}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', height: '100%' }}
      onMouseEnter={() => {
        setIsHovered(true);
        stopTimer();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        startTimer();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label="배너 캐러셀"
      tabIndex={0}
    >
      <BlueprintCorners />
      <div 
        className="carousel-track"
        aria-live={isHovered ? 'polite' : 'off'}
        style={{ 
          display: 'flex', 
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
          height: '100%'
        }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="carousel-slide"
            style={{ 
              minWidth: '100%', 
              flexShrink: 0, 
              backgroundColor: item.bgColor || '#f5f5f5',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'inherit',
              height: '100%'
            }}
          >
            {item.link ? (
              <a href={item.link} style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}>
                <SlideContent item={item} />
              </a>
            ) : (
              <SlideContent item={item} />
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <>
          <button 
            type="button"
            className="carousel-arrow carousel-prev"
            onClick={goToPrev}
            style={{
              position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}
            aria-label="이전 슬라이드"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <button 
            type="button"
            className="carousel-arrow carousel-next"
            onClick={goToNext}
            style={{
              position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)',
              background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none',
              borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
            }}
            aria-label="다음 슬라이드"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div 
            className="carousel-indicators"
            style={{
              position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', gap: '8px', zIndex: 10
            }}
          >
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goToIndex(index)}
                style={{
                  width: '8px', height: '8px', borderRadius: '50%', border: 'none', padding: 0,
                  background: index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', transition: 'background 0.2s'
                }}
                aria-label={`${index + 1}번 슬라이드`}
                aria-current={index === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SlideContent({ item }: { item: CarouselItem }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={item.title || "배너 이미지"} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      )}
      <div 
        style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px',
          background: item.imageUrl ? 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)' : 'none',
          color: item.imageUrl || item.bgColor !== '#f5f5f5' ? 'white' : 'inherit'
        }}
      >
        {item.title && <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 'bold' }}>{item.title}</h2>}
        {item.subtitle && <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>{item.subtitle}</p>}
      </div>
    </div>
  );
}
