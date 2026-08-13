import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../components/Card';
import { Tag } from '../components/Tag';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          '헤어라인 테두리 + 투명 배경의 blueprint 카드. 채움 배경을 넣거나 모서리를 둥글리지 않는다. ' +
          'elevation은 sm/md/lg 그림자 단계.',
      },
    },
  },
  argTypes: {
    elevation: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    kicker: '신상품',
    title: '무선 이어폰 Pro',
    children: '노이즈 캔슬링 · 30시간 재생',
    meta: '₩189,000',
  },
  decorators: [(Story) => <div style={{ width: 260 }}>{Story()}</div>],
};

/** `meta` 슬롯은 ReactNode라 가격 + 상태 태그를 함께 넣을 수 있다. */
export const WithStatusTag: Story = {
  args: {
    kicker: '가전디지털',
    title: '게이밍 모니터 27인치',
    children: '주사율 165Hz · HDR10',
    meta: (
      <>
        <span style={{ fontWeight: 800 }}>₩259,000</span>
        <Tag variant="warning">재고부족</Tag>
      </>
    ),
  },
  decorators: [(Story) => <div style={{ width: 260 }}>{Story()}</div>],
};

/** `.product-grid`(레이아웃 프리미티브) 위에 올린 실제 상품 목록 형태. 뷰포트를 바꿔 열 수 변화를 확인할 것. */
export const InProductGrid: Story = {
  args: { title: '상품' },
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => (
    <div className="container" style={{ paddingBlock: 24 }}>
      <div className="product-grid">
        {[
          { kicker: '로켓배송', title: '무선 이어폰 Pro', meta: '₩89,900' },
          { kicker: '로켓배송', title: '접이식 스탠딩 책상', meta: '₩129,000' },
          { kicker: '신선식품', title: '유기농 원두 1kg', meta: '₩18,500' },
          { kicker: '패션', title: '봄 신상 니트', meta: '₩34,900' },
          { kicker: '뷰티', title: '수분 진정 크림', meta: '₩22,000' },
          { kicker: '홈리빙', title: '극세사 이불 세트', meta: '₩45,000' },
        ].map((p) => (
          <Card key={p.title} kicker={p.kicker} title={p.title} meta={p.meta} />
        ))}
      </div>
    </div>
  ),
};
