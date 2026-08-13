import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from '../components/Timeline';

const meta = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '배송 진행 타임라인. `status`가 done/active면 점과 라벨이 accent로 채워지고, pending은 흐린 상태로 남는다.',
      },
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    steps: [
      { label: '주문 완료', time: '8/5 14:20', status: 'done' },
      { label: '결제 확인', time: '8/5 14:21', status: 'done' },
      { label: '배송 준비중', time: '8/5 16:40', status: 'active' },
      { label: '배송중', status: 'pending' },
      { label: '배송 완료', status: 'pending' },
    ],
  },
};

export const Delivered: Story = {
  args: {
    steps: [
      { label: '주문 완료', time: '8/1 09:12', status: 'done' },
      { label: '결제 확인', time: '8/1 09:13', status: 'done' },
      { label: '배송 준비중', time: '8/1 15:02', status: 'done' },
      { label: '배송중', time: '8/2 07:30', status: 'done' },
      { label: '배송 완료', time: '8/3 13:44', status: 'done' },
    ],
  },
};

export const JustOrdered: Story = {
  args: {
    steps: [
      { label: '주문 완료', time: '방금 전', status: 'active' },
      { label: '결제 확인', status: 'pending' },
      { label: '배송 준비중', status: 'pending' },
      { label: '배송중', status: 'pending' },
      { label: '배송 완료', status: 'pending' },
    ],
  },
};
