import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickMenu } from '../components/QuickMenu';
import { CartIcon, HeadsetIcon, HistoryIcon } from './fixtures';

const meta = {
  title: 'Components/QuickMenu',
  component: QuickMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '스크롤을 따라다니는 플로팅 퀵메뉴. 데스크톱에서는 화면 우측 가장자리에 세로 레일로 붙고, ' +
          '**480px 이하에서는 하단 탭바로 전환**된다(폰에는 레일이 들어갈 좌우 여백이 없다). ' +
          'Phone 뷰포트로 바꿔 전환을 확인할 것 — `body`에 하단 여백이 자동으로 붙어 페이지 끝이 가려지지 않는다.',
      },
    },
  },
} satisfies Meta<typeof QuickMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { icon: <HistoryIcon />, label: '최근 본' },
  { icon: <CartIcon />, label: '장바구니', badge: 3 },
  { icon: <HeadsetIcon />, label: '고객센터' },
];

export const Default: Story = {
  args: {
    items,
    onScrollTop: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
  render: (args) => (
    <div style={{ minHeight: '150vh', padding: 24 }}>
      <p className="text-muted">스크롤해도 퀵메뉴가 따라옵니다. 뷰포트를 Phone으로 바꾸면 하단 탭바가 됩니다.</p>
      <QuickMenu {...args} />
    </div>
  ),
};

/** 배지(장바구니 수량) 없이, "맨 위로" 버튼도 뺀 최소 구성. */
export const WithoutScrollTop: Story = {
  args: {
    items: [
      { icon: <HistoryIcon />, label: '최근 본' },
      { icon: <CartIcon />, label: '장바구니' },
    ],
  },
  render: (args) => (
    <div style={{ minHeight: '150vh', padding: 24 }}>
      <QuickMenu {...args} />
    </div>
  ),
};
