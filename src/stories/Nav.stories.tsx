import type { Meta, StoryObj } from '@storybook/react';
import { Nav } from '../components/Nav';
import { Logo } from '../components/Logo';

/**
 * 상단 네비게이션 바 레이아웃을 제공하는 컴포넌트입니다.
 */
const meta = {
  title: 'Layout/Nav',
  component: Nav,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    brand: {
      description: '좌측 브랜드 로고 영역',
    },
    children: {
      description: '우측 네비게이션 링크 등 아이템 영역',
    },
    className: {
      description: '추가 CSS 클래스',
      control: 'text'
    }
  }
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    brand: <Logo />,
    children: (
      <>
        <a href="#" aria-current="page">Home</a>
        <a href="#">Products</a>
        <a href="#">About</a>
      </>
    )
  }
};
