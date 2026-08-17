import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '../components/SegmentedControl';
import { useState } from 'react';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {} as any,
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState('list');
    return (
      <SegmentedControl
        name="view-mode"
        value={val}
        onChange={setVal}
        options={[
          { label: 'List View', value: 'list' },
          { label: 'Grid View', value: 'grid' },
          { label: 'Map View', value: 'map', disabled: true },
        ]}
      />
    );
  }
};
