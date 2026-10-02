import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryTiles } from '../components/CategoryTiles';
import { CartIcon, HeadsetIcon, HistoryIcon, PlusIcon } from './fixtures';

const meta = {
  title: 'Components/CategoryTiles',
  component: CategoryTiles,
  parameters: {
    // 기본(centered)은 래퍼가 내용 폭으로 줄어 auto-fit 그리드가 1열로 접힌다 — 실제 사용처처럼 폭을 준다.
    layout: 'padded',
    docs: {
      description: {
        component:
          '대분류 카테고리 바로가기 타일. 각 타일은 일반 링크(`<a>`)라 JS 없이도 동작한다. ' +
          '데스크톱에서는 `auto-fit`으로 6~8개가 한 줄에 놓이고, **768px 이하에서는 4열 고정**(8개 = 2줄)으로 바뀐다. ' +
          '플로팅 레일인 `QuickMenu`와는 다른 컴포넌트다. 아이콘은 Lucide 인라인 SVG(`strokeWidth={1.5}`)를 직접 넘긴다.',
      },
    },
  },
} satisfies Meta<typeof CategoryTiles>;

export default meta;
type Story = StoryObj<typeof meta>;

/* 스토리는 픽스처 아이콘 4종을 돌려 쓴다 — 실제 카테고리 아이콘은 소비 앱이 정한다. */
const icons = [<CartIcon size={28} />, <HistoryIcon size={28} />, <HeadsetIcon size={28} />, <PlusIcon size={28} />];
const names = ['패션의류', '뷰티', '식품', '가전디지털', '생활용품', '홈인테리어', '스포츠레저', '도서'];
const items = names.map((label, i) => ({ id: 9001 + i, label, href: `#category-${9001 + i}`, icon: icons[i % icons.length] }));

/** 대분류 8개 — 실제 메인 페이지 구성. */
export const Default: Story = { args: { items } };

/** 6개일 때도 한 줄을 균등하게 채운다. */
export const SixItems: Story = { args: { items: items.slice(0, 6) } };
