import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from '../components/Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: '신선한 과일 특가',
        subtitle: '최대 50% 할인 혜택',
        bgColor: '#ff7b54',
        imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800',
        link: '#',
      },
      {
        id: '2',
        title: '여름 맞이 시원한 음료',
        subtitle: '다양한 음료수를 만나보세요',
        bgColor: '#29c7ac',
        imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=800',
        link: '#',
      },
      {
        id: '3',
        title: '신규 가입 이벤트',
        subtitle: '첫 구매 시 무료배송 쿠폰 지급',
        bgColor: '#543864',
        link: '#',
      },
    ],
    autoPlayInterval: 3000,
  },
  render: (args) => (
    <div style={{ height: '300px', maxWidth: '800px', margin: '0 auto' }}>
      <Carousel {...args} />
    </div>
  ),
};
