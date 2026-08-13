import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/Button';
import { PlusIcon } from './fixtures';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'primary/secondary는 blueprint 프레임(헤어라인 테두리)을 자동으로 두르고, ghost만 프레임 없는 텍스트 액션이다. ' +
          '버튼에는 highlight(코랄) 컬러를 절대 쓰지 않는다 — 할인/쿠폰 등 혜택 신호 전용이라 액션 컬러(steel accent)와 역할이 섞이면 안 된다.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] },
    icon: { control: 'boolean' },
    block: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: '구매하기' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: '장바구니 담기' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: '더 보기' },
};

export const Disabled: Story = {
  args: { variant: 'primary', children: '품절', disabled: true },
};

/** `icon` prop은 정사각 아이콘 전용 버튼 모디파이어다. 아이콘 SVG는 children으로 직접 넣는다. */
export const IconOnly: Story = {
  args: { variant: 'primary', icon: true, 'aria-label': '추가', children: <PlusIcon /> },
};

/** `block`은 폼 제출처럼 컨테이너 전체 폭을 채워야 할 때. */
export const Block: Story = {
  args: { variant: 'primary', block: true, children: '결제하기' },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const AllVariants: Story = {
  args: { children: '버튼' },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary">구매하기</Button>
      <Button variant="secondary">장바구니 담기</Button>
      <Button variant="ghost">더 보기</Button>
      <Button variant="primary" icon aria-label="추가">
        <PlusIcon />
      </Button>
    </div>
  ),
};
