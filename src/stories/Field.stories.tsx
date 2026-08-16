import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field, Input, Textarea } from '../components/Field';
import { Button } from '../components/Button';

const meta = {
  title: 'Components/Field',
  component: Field,
  parameters: {
    docs: {
      description: {
        component:
          '`Field`는 라벨 + 입력 요소를 묶는 래퍼이고, 실제 입력은 `Input`/`Textarea`를 children으로 넣는다. ' +
          '포커스 링은 브라우저 기본 파란 링이 아니라 `:focus-visible`의 2px accent 링을 쓴다 — 입력 칸을 탭으로 이동해 확인할 것.',
      },
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '이메일',
    children: <Input placeholder="you@example.com" />,
  },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const WithTextarea: Story = {
  args: {
    label: '배송 요청사항',
    children: <Textarea placeholder="부재 시 경비실에 맡겨주세요" />,
  },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const RequiredAndHelpText: Story = {
  args: {
    label: '아이디',
    required: true,
    helpText: '영문 소문자/숫자, 4~16자',
    children: <Input placeholder="id" />,
  },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    required: true,
    error: '올바른 이메일 형식이 아닙니다.',
    children: <Input className="input-error" defaultValue="wrong-email" />,
  },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const LoginForm: Story = {
  args: { label: '폼', children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Field label="이메일">
        <Input type="email" placeholder="you@example.com" />
      </Field>
      <Field label="비밀번호">
        <Input type="password" placeholder="********" />
      </Field>
      <Button variant="primary" block>
        로그인
      </Button>
    </div>
  ),
};
