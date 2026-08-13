import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from '../components/Toast';
import { Button } from '../components/Button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '뷰포트 우하단 고정 알림. 표시 타이밍(자동 사라짐 등)은 이 컴포넌트가 갖고 있지 않고 소비 측 상태로 직접 제어한다. ' +
          '768px 이하에서는 좌우 여백만 남기고 폭을 채우며, QuickMenu 하단 탭바가 있으면 그 위로 올라간다.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['success', 'warning', 'danger'] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: { variant: 'success', children: '주문이 완료되었습니다' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: '재고가 3개 남았습니다' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: '결제에 실패했습니다' },
};

/** 실제 사용 방식 — 버튼을 눌러 띄우고 2초 뒤 소비 측에서 내린다. */
export const TriggeredByAction: Story = {
  args: { children: '장바구니에 담았습니다' },
  parameters: { controls: { disable: true } },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 40 }}>
        <Button
          variant="primary"
          onClick={() => {
            setOpen(true);
            setTimeout(() => setOpen(false), 2000);
          }}
        >
          장바구니 담기
        </Button>
        {open && <Toast variant="success">{args.children}</Toast>}
      </div>
    );
  },
};
