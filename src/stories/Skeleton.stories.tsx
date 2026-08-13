import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonBlock, SkeletonCard } from '../components/Skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: SkeletonCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '`SkeletonCard`는 상품 카드 모양(이미지 + 3줄)의 완성된 조합이고, `SkeletonBlock`은 임의 로딩 레이아웃을 직접 조립할 때 쓰는 낱개 블록이다. 둘 다 펄스 애니메이션이 붙어 있다.',
      },
    },
  },
} satisfies Meta<typeof SkeletonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  decorators: [(Story) => <div style={{ width: 220 }}>{Story()}</div>],
};

/** 실제 목록 로딩 중 화면 — `.product-grid` 위에 카드 스켈레톤을 채운 형태. */
export const ProductGridLoading: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="container" style={{ paddingBlock: 24 }}>
      <div className="product-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  ),
};

/** 낱개 블록을 조합해 만든 커스텀 로딩(예: 상품 상세 헤더). */
export const CustomComposition: Story = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <SkeletonBlock style={{ height: 180 }} />
      <SkeletonBlock style={{ height: 12, width: '40%' }} />
      <SkeletonBlock style={{ height: 20, width: '80%' }} />
      <SkeletonBlock style={{ height: 20, width: '30%' }} />
    </div>
  ),
};
