import type { Meta, StoryObj } from '@storybook/react';
import { Figure } from '../components/Figure';

/**
 * 이미지와 캡션을 묶어서 보여주는 컴포넌트입니다.
 * 내부에 `.blueprint` 모서리 장식과 듀오톤 필터를 적용합니다.
 */
const meta = {
  title: 'Components/Figure',
  component: Figure,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: '이미지 URL 주소',
      control: 'text'
    },
    alt: {
      description: '이미지 대체 텍스트',
      control: 'text'
    },
    caption: {
      description: '이미지 하단 캡션',
      control: 'text'
    }
  }
} satisfies Meta<typeof Figure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80',
    alt: 'Technology background with integrated circuit',
    caption: 'Figure 1: Example circuit'
  }
};
