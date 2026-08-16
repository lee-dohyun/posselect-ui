import type { Meta, StoryObj } from '@storybook/react';
import { ProductGrid } from '../components/ProductGrid';
import { Card } from '../components/Card';

const meta = {
  title: 'Layout/ProductGrid',
  component: ProductGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ProductGrid>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <div className="card-title">Product {item}</div>
          <div className="card-body">A great product description here.</div>
        </Card>
      ))}
    </ProductGrid>
  )
};
