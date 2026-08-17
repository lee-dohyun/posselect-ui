import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from '@storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('주문을 취소할까요?');
  },
};

export const SingleAction: Story = {
  args: {
    title: '주문이 완료되었습니다',
    children: '주문번호 #A-10231 · 배송 시작 시 알림을 보내드립니다.',
    actions: <Button variant="primary">주문내역 보기</Button>,
  },
};

/**
 * 뷰포트보다 긴 콘텐츠(약관 전문, 긴 폼 등)가 들어가는 경우.
 * 제목/액션은 고정, 본문(`dialog-body`)만 내부 스크롤되어 화면 밖으로 액션 버튼이
 * 밀려나지 않는다. `maxWidth`로 기본 440px보다 넓혀 장문 텍스트의 줄바꿈을 줄였다.
 */
export const LongContent: Story = {
  args: {
    title: '이용약관',
    maxWidth: 640,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <section key={i}>
            <h3 style={{ marginBottom: 6, fontSize: 14 }}>{`제${i + 1}조 (조항 제목)`}</h3>
            <p>
              이 항목은 스토리북에서 스크롤 동작을 확인하기 위한 예시 텍스트입니다. 실제
              약관 화면에서는 조항별 본문이 이 자리에 들어갑니다. 다이얼로그의 최대 높이를
              넘는 콘텐츠는 본문 영역만 스크롤되고, 제목과 하단 액션 버튼은 항상 화면에
              고정되어 보입니다.
            </p>
          </section>
        ))}
      </div>
    ),
    actions: <Button variant="secondary">닫기</Button>,
  },
};

export const MobileConfirm: Story = {
  ...Confirm,
  parameters: {
    viewport: { defaultViewport: 'phone' },
  },
};

export const MobileLongContent: Story = {
  ...LongContent,
  parameters: {
    viewport: { defaultViewport: 'phone' },
  },
};

export const MultiLanguage: Story = {
  args: {
    title: '本当にこの注文をキャンセルしますか？',
    children: 'This action cannot be undone. Are you sure you want to proceed with the cancellation of order #A-10231? Once cancelled, the items will be returned to the inventory.',
    actions: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm Cancellation</Button>
      </>
    ),
  },
};
