import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from '../components/Dialog';
import { Button } from '../components/Button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '백드롭 + blueprint 프레임 모달. 열림/닫힘 상태는 소비 측이 직접 들고 있고, 이 컴포넌트는 열려 있을 때만 렌더링한다. ' +
          '`actions` 슬롯에 버튼을 넣으며, 파괴적 액션이라도 버튼 컬러는 accent를 유지한다.',
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {
  args: {
    title: '주문을 취소할까요?',
    children: '취소 후에는 복구할 수 없습니다. 결제하신 금액은 3~5영업일 내에 환불됩니다.',
    actions: (
      <>
        <Button variant="secondary">닫기</Button>
        <Button variant="primary">취소하기</Button>
      </>
    ),
  },
};

export const SingleAction: Story = {
  args: {
    title: '주문이 완료되었습니다',
    children: '주문번호 #A-10231 · 배송 시작 시 알림을 보내드립니다.',
    actions: <Button variant="primary">주문내역 보기</Button>,
  },
};
