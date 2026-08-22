import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryTiles } from '../components/CategoryTiles';

const meta = {
  title: 'Components/CategoryTiles',
  component: CategoryTiles,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CategoryTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

const DummyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const Default: Story = {
  args: {
    columns: 4,
    items: [
      { id: '1', label: '과일/채소', icon: <DummyIcon />, href: '#' },
      { id: '2', label: '정육/계란', icon: <DummyIcon />, href: '#' },
      { id: '3', label: '수산/해산물', icon: <DummyIcon />, href: '#' },
      { id: '4', label: '우유/유제품', icon: <DummyIcon />, onClick: () => alert('클릭됨!') },
      { id: '5', label: '간편식/밀키트', icon: <DummyIcon /> },
      { id: '6', label: '면류/통조림', icon: <DummyIcon /> },
      { id: '7', label: '생수/음료', icon: <DummyIcon /> },
      { id: '8', label: '스낵/초콜릿', icon: <DummyIcon /> },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#f9f9f9', padding: '24px', borderRadius: '8px' }}>
      <CategoryTiles {...args} />
    </div>
  ),
};
