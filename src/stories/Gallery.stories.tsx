import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gallery } from '../components/Gallery';
import { placeholder } from './fixtures';

const meta = {
  title: 'Components/Gallery',
  component: Gallery,
  parameters: {
    docs: {
      description: {
        component:
          '상품 상세용 메인 이미지 + 썸네일 스트립. 선택 상태는 컴포넌트 내부에서 관리하므로 썸네일을 눌러 바로 확인할 수 있다. ' +
          '모든 이미지는 `.duotone`(accent로 washed) + blueprint 프레임을 거친다 — 가공 없는 원본을 그대로 놓지 않는다. ' +
          '데스크톱은 5단 고정 그리드지만 768px 이하에서는 가로 스크롤 스트립으로 바뀐다(Phone 뷰포트로 확인).',
      },
    },
  },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    images: [
      { src: placeholder('정면'), alt: '무선 이어폰 Pro 정면' },
      { src: placeholder('측면'), alt: '무선 이어폰 Pro 측면' },
      { src: placeholder('케이스'), alt: '무선 이어폰 Pro 충전 케이스' },
      { src: placeholder('착용'), alt: '무선 이어폰 Pro 착용 컷' },
      { src: placeholder('구성품'), alt: '무선 이어폰 Pro 구성품' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 420 }}>{Story()}</div>],
};

/** 썸네일이 5개 미만이면 그리드가 비는 형태를 확인. */
export const FewImages: Story = {
  args: {
    images: [
      { src: placeholder('정면'), alt: '유기농 원두 정면' },
      { src: placeholder('후면'), alt: '유기농 원두 후면' },
    ],
  },
  decorators: [(Story) => <div style={{ width: 420 }}>{Story()}</div>],
};
