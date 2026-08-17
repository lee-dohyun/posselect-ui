import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent, expect } from '@storybook/test';
import { Pagination } from '../components/Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          '페이지 목록은 첫/끝/현재±1만 보여주고 나머지는 `…`로 축약한다. `page`는 소비 측 상태이므로 아래 스토리들은 실제로 클릭해 동작을 확인할 수 있다.',
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 실제로 눌러가며 축약(`…`) 규칙이 어떻게 바뀌는지 확인할 수 있는 인터랙티브 스토리. */
export const Interactive: Story = {
  args: { page: 5, totalPages: 12, onPageChange: () => {} },
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination page={page} totalPages={args.totalPages} onPageChange={setPage} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = canvas.getByLabelText('다음');
    const prevBtn = canvas.getByLabelText('이전');
    
    // Test interactions
    await userEvent.click(nextBtn);
    await expect(canvas.getByRole('button', { name: '6', current: 'page' })).toBeInTheDocument();
    
    await userEvent.click(prevBtn);
    await expect(canvas.getByRole('button', { name: '5', current: 'page' })).toBeInTheDocument();
  },
};

/** 첫 페이지에서는 "이전" 버튼이 비활성이고 앞쪽 생략이 없다. */
export const FirstPage: Story = {
  args: { page: 1, totalPages: 12, onPageChange: () => {} },
};

/** 마지막 페이지에서는 "다음"이 비활성. */
export const LastPage: Story = {
  args: { page: 12, totalPages: 12, onPageChange: () => {} },
};

/** 전체가 몇 장 안 되면 생략 기호가 아예 나오지 않는다. */
export const FewPages: Story = {
  args: { page: 2, totalPages: 3, onPageChange: () => {} },
};

export const Mobile: Story = {
  ...Interactive,
  parameters: {
    viewport: { defaultViewport: 'phone' },
  },
};
