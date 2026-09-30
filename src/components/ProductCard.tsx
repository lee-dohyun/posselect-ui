import React from 'react';

export interface ProductCardProps {
  id?: string | number;
  name: string;
  price: number;
  thumbnailUrl?: string | null;
  
  // Phase 2 추가 요소
  originalPrice?: number;
  discountRate?: number;
  shippingBadge?: string; // 예: "최적 배송" (product.api#92)
  isFreeShipping?: boolean;
  rating?: number;
  reviewCount?: number;
  isSoldOut?: boolean;
  isWishlisted?: boolean;
  
  // 이벤트 및 라우팅
  href?: string;
  onClick?: () => void;
  onWishlistClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function ProductCard({
  name,
  price,
  thumbnailUrl,
  originalPrice,
  discountRate,
  shippingBadge,
  isFreeShipping,
  rating,
  reviewCount,
  isSoldOut,
  isWishlisted,
  href,
  onClick,
  onWishlistClick,
  className = '',
}: ProductCardProps) {
  const CardWrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, onClick } : { onClick };

  return (
    <CardWrapper
      className={`product-card ${className}`}
      {...wrapperProps}
      style={{ cursor: onClick || href ? 'pointer' : 'default' }}
    >
      <div className="product-card-media">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={name} loading="lazy" />
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--color-neutral-400)", fontSize: 12 }}>
            이미지 없음
          </div>
        )}
        {onWishlistClick && (
          <button
            type="button"
            className={`product-card-wishlist ${isWishlisted ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWishlistClick(e);
            }}
            aria-label={isWishlisted ? "찜 해제" : "찜하기"}
          >
            {isWishlisted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div className="product-card-body">
        {/* 상단 배지 영역 */}
        {(shippingBadge || isFreeShipping || isSoldOut) && (
          <div className="product-card-badges">
            {isSoldOut && <span className="tag tag-danger">품절</span>}
            {!isSoldOut && shippingBadge && <span className="tag tag-accent">{shippingBadge}</span>}
            {!isSoldOut && isFreeShipping && <span className="tag tag-neutral">무료배송</span>}
          </div>
        )}

        <h3 className="product-card-title">{name}</h3>

        <div className="product-card-price-row">
          {(originalPrice || discountRate) && (
            <div className="product-card-price-row-top">
              {discountRate && discountRate > 0 && (
                <span className="product-card-discount">{discountRate}%</span>
              )}
              {originalPrice && (
                <span className="product-card-strikethrough">{originalPrice.toLocaleString()}원</span>
              )}
            </div>
          )}
          <div className="product-card-price">
            {price.toLocaleString()}원
          </div>
        </div>

        {(rating !== undefined || reviewCount !== undefined) && (
          <div className="product-card-meta">
            {rating !== undefined && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <svg className="product-card-star" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {rating.toFixed(1)}
              </span>
            )}
            {reviewCount !== undefined && (
              <span>리뷰 {reviewCount.toLocaleString()}</span>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
