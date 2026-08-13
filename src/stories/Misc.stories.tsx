import type { Meta, StoryObj } from '@storybook/react-vite';
import { Nav } from '../components/Nav';
import { Logo } from '../components/Logo';
import { Figure } from '../components/Figure';
import { placeholder } from './fixtures';

/**
 * 낱개로 스토리 파일을 둘 만큼 표면적이 넓지 않은 컴포넌트 묶음(Nav / Logo / Figure).
 */
const meta = {
  title: 'Components/Nav · Logo · Figure',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `brand`는 ReactNode라 보통 `<Logo />`를 넣고, 링크는 children으로 구성한다.
 * 768px 이하에서는 줄바꿈되도록 되어 있다.
 */
export const NavBar: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Nav brand={<Logo />}>
      <a href="#" aria-current="page">
        홈
      </a>
      <a href="#">베스트</a>
      <a href="#">신상품</a>
      <a href="#">장바구니</a>
    </Nav>
  ),
};

/**
 * 브랜드명을 화면에 노출할 땐 항상 이 컴포넌트를 쓰거나 텍스트 "PosSelect"로 적는다 —
 * "POSSELECT"(전체 대문자)는 금지.
 */
export const BrandLogo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <Logo size={16} />
      <Logo size={22} />
      <Logo size={36} />
      <Logo size={56} />
    </div>
  ),
};

/**
 * 콘텐츠 사진은 반드시 `.duotone`(accent로 washed) + blueprint 프레임을 거친다.
 * 가공 없는 원본 이미지를 그대로 배치하지 않는다.
 */
export const ImageFigure: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Figure src={placeholder('상품컷', 720, 480)} alt="무선 이어폰 Pro" caption="정품 인증 상품컷" />
    </div>
  ),
};
