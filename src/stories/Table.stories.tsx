import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from '../components/Table';
import { Tag } from '../components/Tag';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'thead/tbody/tr/td는 네이티브 그대로 쓰고 `Table`은 `.table` 클래스와 `.table-wrap` 스크롤 컨테이너만 씌우는 얇은 래퍼다. ' +
          '스크롤 컨테이너 덕분에 열이 많은 표도 페이지 전체를 가로로 밀지 않고 표 안에서만 스크롤된다 — ' +
          'Phone 뷰포트로 바꿔 `ManyColumns` 스토리를 확인할 것.',
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrderList: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          <th>주문번호</th>
          <th>상품</th>
          <th>결제금액</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#A-10231</td>
          <td>무선 이어폰 Pro</td>
          <td>₩89,900</td>
          <td>
            <Tag variant="success">배송완료</Tag>
          </td>
        </tr>
        <tr>
          <td>#A-10232</td>
          <td>접이식 스탠딩 책상</td>
          <td>₩129,000</td>
          <td>
            <Tag variant="accent">배송중</Tag>
          </td>
        </tr>
        <tr>
          <td>#A-10233</td>
          <td>유기농 원두 1kg</td>
          <td>₩18,500</td>
          <td>
            <Tag variant="danger">품절취소</Tag>
          </td>
        </tr>
      </tbody>
    </Table>
  ),
};

/**
 * admin.front 주문/상품 관리, product.front 장바구니가 실제로 쓰는 열 수.
 * Phone 뷰포트에서 표만 가로 스크롤되고 페이지 자체는 밀리지 않아야 한다.
 */
export const ManyColumns: Story = {
  render: () => (
    <Table>
      <thead>
        <tr>
          <th>주문번호</th>
          <th>주문일</th>
          <th>주문자</th>
          <th>상품</th>
          <th>수량</th>
          <th>결제수단</th>
          <th>결제금액</th>
          <th>상태</th>
        </tr>
      </thead>
      <tbody>
        {[
          ['#A-10231', '2026-08-11', '이도현', '무선 이어폰 Pro', '1', '카드', '₩89,900', '배송완료'],
          ['#A-10232', '2026-08-12', '김서연', '접이식 스탠딩 책상', '2', '카드', '₩258,000', '배송중'],
          ['#A-10233', '2026-08-13', '박준호', '유기농 원두 1kg', '3', '무통장', '₩55,500', '입금대기'],
        ].map((row) => (
          <tr key={row[0]}>
            {row.slice(0, 7).map((cell, i) => (
              <td key={i} style={{ whiteSpace: 'nowrap' }}>
                {cell}
              </td>
            ))}
            <td>
              <Tag variant="neutral">{row[7]}</Tag>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  ),
};
