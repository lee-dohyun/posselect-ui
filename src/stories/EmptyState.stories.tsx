import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '../components/EmptyState';
import { Button } from '../components/Button';
import { CartIcon, HistoryIcon } from './fixtures';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'blueprint 프레임 안에 아이콘 + 제목 + 설명 + 액션 버튼 1개. 액션은 하나만 두어 다음 행동을 분명히 한다.',
      },
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyCart: Story = {
  args: {
    icon: <CartIcon size={40} />,
    title: '장바구니가 비어 있습니다',
    description: '마음에 드는 상품을 담아보세요.',
    action: <Button variant="primary">쇼핑 계속하기</Button>,
  },
};

export const NoOrders: Story = {
  args: {
    icon: <HistoryIcon size={40} />,
    title: '주문 내역이 없습니다',
    description: '첫 주문을 하시면 여기에서 배송 상태를 확인할 수 있습니다.',
    action: <Button variant="primary">인기 상품 보기</Button>,
  },
};

/** 설명/액션 없이 제목만 두는 최소 형태. */
export const TitleOnly: Story = {
  args: {
    icon: <CartIcon size={40} />,
    title: '표시할 상품이 없습니다',
  },
};
