import type { Meta, StoryObj } from '@storybook/react';
import { BlueprintCorners } from '../components/Blueprint';

/**
 * 프레임 요소(`blueprint`) 모서리에 부착되는 십자선 마커 컴포넌트입니다.
 * 
 * 부모 요소에 `.blueprint` 클래스가 있어야 제 위치에 표시됩니다.
 */
const meta = {
  title: 'Foundations/BlueprintCorners',
  component: BlueprintCorners,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlueprintCorners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="blueprint" style={{ width: 200, height: 100, padding: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <BlueprintCorners />
      <span className="text-muted text-sm">Blueprint Frame</span>
    </div>
  ),
};
