import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '../components/ProductCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    name: '테스트 상품',
    price: 39000,
    thumbnailUrl: 'https://placehold.co/400x400/e9e9ea/1d1f20?text=Product',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '240px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};

export const WithDiscount: Story = {
  args: {
    originalPrice: 50000,
    discountRate: 22,
  },
};

export const WithBadgesAndRating: Story = {
  args: {
    shippingBadge: '특급배송',
    isFreeShipping: true,
    rating: 4.8,
    reviewCount: 1250,
  },
};

export const Wishlisted: Story = {
  args: {
    isWishlisted: true,
    onWishlistClick: () => alert('찜 버튼 클릭'),
  },
};

export const SoldOut: Story = {
  args: {
    isSoldOut: true,
  },
};

export const WithoutImage: Story = {
  args: {
    thumbnailUrl: undefined,
  },
};
