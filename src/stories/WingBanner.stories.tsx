import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WingBanner } from '../components/WingBanner';
import { Button } from '../components/Button';
import { placeholder } from './fixtures';

const meta = {
  title: 'Components/WingBanner',
  component: WingBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '화면 좌측 가장자리에 붙는 닫기 가능한 프로모션 날개 배너 — QuickMenu와 반대쪽에서 짝을 이룬다. ' +
          '할인 문구에는 highlight(코랄)를 쓰는데, 이건 실제 혜택 신호라 허용되는 유일한 자리 중 하나다. ' +
          '**480px 이하에서는 숨겨진다** — 132px짜리 날개가 놓일 좌측 여백이 폰에는 없고, 콘텐츠를 덮으면서까지 노출할 이유가 없다.',
      },
    },
  },
} satisfies Meta<typeof WingBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '이번주 특가',
    discount: '최대 50% 할인',
    deadline: '8/20까지',
    image: { src: placeholder('특가', 264, 200), alt: '이번주 특가' },
  },
  render: (args) => (
    <div style={{ minHeight: '120vh', padding: 24 }}>
      <p className="text-muted">뷰포트를 Phone으로 바꾸면 배너가 사라집니다.</p>
      <WingBanner {...args} />
    </div>
  ),
};

/** 닫기 동작 확인 — `onClose`는 소비 측 상태를 내리는 콜백이다. */
export const Closable: Story = {
  args: {
    title: '신규 회원 쿠폰',
    discount: '10,000원',
    deadline: '가입 후 7일',
    image: { src: placeholder('쿠폰', 264, 200), alt: '신규 회원 쿠폰' },
  },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: '120vh', padding: 24 }}>
        {!open && (
          <Button variant="secondary" onClick={() => setOpen(true)}>
            배너 다시 열기
          </Button>
        )}
        {open && <WingBanner {...args} onClose={() => setOpen(false)} />}
      </div>
    );
  },
};
