import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../components/Logo';

/**
 * PosSelect 브랜드 워드마크입니다. 텍스트 대신 브랜드 이미지를 렌더링합니다.
 */
const meta = {
  title: 'Foundations/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '워드마크의 렌더링 높이(px) 설정',
      control: { type: 'number', min: 10, max: 100, step: 2 },
    },
    className: {
      description: '추가 CSS 클래스',
      control: 'text'
    }
  }
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 22,
  }
};

export const Large: Story = {
  args: {
    size: 40,
  }
};
