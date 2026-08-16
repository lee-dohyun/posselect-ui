import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../components/Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'sample',
    label: 'Option 1',
    value: '1',
  }
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Radio name="group1" label="Credit Card" value="cc" defaultChecked />
      <Radio name="group1" label="Bank Transfer" value="bank" />
      <Radio name="group1" label="Paypal" value="paypal" disabled />
    </div>
  )
};
