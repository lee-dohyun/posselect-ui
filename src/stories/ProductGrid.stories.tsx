import type { Meta, StoryObj } from '@storybook/react-vite';
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
  args: {} as any,
  render: () => (
    <ProductGrid>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item} title={`Product ${item}`}>
          A great product description here.
        </Card>
      ))}
    </ProductGrid>
  )
};

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: { defaultViewport: 'phone' },
  },
};

export const MultiLanguage: Story = {
  args: {} as any,
  render: () => (
    <ProductGrid>
      <Card title="非常に長い日本語の商品名テスト・レイアウトが崩れないか確認します">
        A great product description here that is very long to test text wrapping and layout stability. It spans multiple lines.
      </Card>
      <Card title="English long product name without spaces SuperLongProductNameTestToBreakLayout">
        This is another test.
      </Card>
    </ProductGrid>
  )
};
