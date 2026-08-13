import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'accent/accent-2/neutral/outline은 Industry 기본. success/warning/danger(주문·재고 상태)와 highlight(혜택 신호)는 posselect 자체 확장이다. ' +
          'highlight는 실제 할인가·쿠폰에만 쓰고 장식용으로 쓰지 않는다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'accent-2', 'neutral', 'outline', 'success', 'warning', 'danger', 'highlight'],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'neutral', children: '일반' },
};

/** 주문/배송/재고 상태 표시 — 이커머스에서 가장 많이 쓰는 조합. */
export const OrderStates: Story = {
  args: { children: '상태' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag variant="success">배송완료</Tag>
      <Tag variant="warning">재고부족</Tag>
      <Tag variant="danger">품절</Tag>
      <Tag variant="accent">배송중</Tag>
      <Tag variant="neutral">주문접수</Tag>
    </div>
  ),
};

/** 혜택 신호 전용. 로고 파비콘의 코랄 "P"와 같은 색이다. */
export const BenefitSignal: Story = {
  args: { children: '혜택' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Tag variant="highlight">30% 할인</Tag>
      <Tag variant="highlight">쿠폰 5,000원</Tag>
    </div>
  ),
};

export const AllVariants: Story = {
  args: { children: '태그' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', maxWidth: 460 }}>
      {(['accent', 'accent-2', 'neutral', 'outline', 'success', 'warning', 'danger', 'highlight'] as const).map((v) => (
        <Tag key={v} variant={v}>
          {v}
        </Tag>
      ))}
    </div>
  ),
};
