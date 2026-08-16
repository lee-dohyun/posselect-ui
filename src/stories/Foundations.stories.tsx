import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * 디자인 토큰을 눈으로 확인하는 페이지. 예전엔 컬러 램프/스페이싱/타이포를 확인하려면
 * `src/styles/tokens.css`를 직접 열어 값을 읽어야 했다(Redmine posselect #127).
 */
const meta = {
  title: 'Foundations/디자인 토큰',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const RAMP_STEPS = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

function Ramp({ name, prefix }: { name: string; prefix: string }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h5 style={{ marginBottom: 8 }}>{name}</h5>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {RAMP_STEPS.map((step) => (
          <div key={step} style={{ width: 92 }}>
            <div
              style={{
                height: 56,
                background: `var(--color-${prefix}-${step})`,
                border: '1px solid var(--color-divider)',
              }}
            />
            <div style={{ fontSize: 11, marginTop: 4 }}>{step}</div>
            <code style={{ fontSize: 10, opacity: 0.6 }}>--color-{prefix}-{step}</code>
          </div>
        ))}
      </div>
    </section>
  );
}

function Swatch({ token, label }: { token: string; label: string }) {
  return (
    <div style={{ width: 150 }}>
      <div style={{ height: 56, background: `var(${token})`, border: '1px solid var(--color-divider)' }} />
      <div style={{ fontSize: 12, marginTop: 4 }}>{label}</div>
      <code style={{ fontSize: 10, opacity: 0.6 }}>{token}</code>
    </div>
  );
}

export const Colors: Story = {
  render: () => (
    <div style={{ padding: 28 }}>
      <h3>컬러</h3>
      <p className="text-muted" style={{ maxWidth: 620 }}>
        단일 accent 기반 모노톤 팔레트. accent(steel blue)는 버튼/링크/active 등 <b>상시 액션 전용</b>,
        highlight(코랄)는 할인가·쿠폰 같은 <b>실제 혜택 신호 전용</b>이며 버튼이나 상시 내비게이션에는 절대 쓰지 않는다.
      </p>

      <section style={{ marginBottom: 28 }}>
        <h5 style={{ marginBottom: 8 }}>기본</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Swatch token="--color-bg" label="배경" />
          <Swatch token="--color-surface" label="표면" />
          <Swatch token="--color-text" label="본문" />
          <Swatch token="--color-accent" label="accent (액션)" />
          <Swatch token="--color-highlight" label="highlight (혜택)" />
        </div>
      </section>

      <Ramp name="Accent (액션)" prefix="accent" />
      <Ramp name="Neutral" prefix="neutral" />
      <Ramp name="Highlight (혜택 신호 전용)" prefix="highlight" />

      <section>
        <h5 style={{ marginBottom: 8 }}>시맨틱 (주문·재고 상태 전용)</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Swatch token="--color-success" label="success (배송완료)" />
          <Swatch token="--color-warning" label="warning (재고부족)" />
          <Swatch token="--color-danger" label="danger (품절)" />
        </div>
      </section>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ padding: 28 }}>
      <h3>타이포그래피</h3>
      <p className="text-muted" style={{ maxWidth: 620 }}>
        헤딩 Barlow Condensed 600 / 본문 Barlow 400. Barlow 계열엔 한글 글리프가 없어 Pretendard → Malgun Gothic →
        system-ui 순으로 fallback을 둔다 — 아래에서 <b>한글은 Pretendard, 영문·숫자는 Barlow</b>로 렌더링되는 걸 확인할 수 있다.
        768px 이하에서는 h1~h4가 한 단계씩 작아진다(뷰포트를 바꿔 확인).
      </p>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => {
        const Tag = `h${level}` as const;
        return (
          <div key={level} style={{ marginBottom: 12 }}>
            <Tag>제목 Heading {level} · 12,345원</Tag>
            <code style={{ fontSize: 11, opacity: 0.6 }}>&lt;h{level}&gt;</code>
          </div>
        );
      })}
      <hr className="hr" />
      <p style={{ maxWidth: 620 }}>
        본문 텍스트입니다. Body copy mixing 한글 and Latin at 15px / line-height 1.55. 가격 표기 ₩189,000처럼 숫자가
        섞이면 숫자만 Barlow로 보입니다.
      </p>
      <p className="text-muted">흐린 보조 텍스트(.text-muted)</p>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: 28 }}>
      <h3>스페이싱</h3>
      <p className="text-muted">3.4px 단위의 촘촘한 스케일.</p>
      {([1, 2, 3, 4, 5, 6, 8] as const).map((step) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <code style={{ fontSize: 11, width: 100 }}>--space-{step}</code>
          <div style={{ height: 14, width: `var(--space-${step})`, background: 'var(--color-accent)' }} />
        </div>
      ))}
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div style={{ padding: 28 }}>
      <h3>브레이크포인트</h3>
      <p className="text-muted" style={{ maxWidth: 680 }}>
        <code>tokens.css</code>의 "Responsive layer"와 <code>posselect-shell</code>(공통 헤더/푸터)이 <b>공유</b>하는 값이다.
        미디어쿼리는 <code>var()</code>를 읽지 못해 CSS 변수로 뺄 수 없고 두 저장소에 리터럴로 중복돼 있으므로,
        <b> 한쪽을 바꾸면 반드시 다른 쪽도 같이 바꿔야 한다.</b>
      </p>
      <table className="table" style={{ maxWidth: 680 }}>
        <thead>
          <tr>
            <th>경계</th>
            <th>적용 대상</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>max-width: 768px</code>
            </td>
            <td>디스플레이 타이포 축소, .container 패딩 축소, .product-grid 트랙 축소, Nav 줄바꿈, Gallery 썸네일 가로 스크롤, Toast/Dialog/EmptyState 여백 보정, 헤더/푸터(shell) 축약</td>
          </tr>
          <tr>
            <td>
              <code>max-width: 480px</code>
            </td>
            <td>.product-grid 2열 고정, QuickMenu 하단 탭바 전환, WingBanner 숨김, 헤더 검색창을 둘째 줄로 분리(shell)</td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

/**
 * README의 접근성 규칙을 pass/fail 예시로 나란히 둔 페이지.
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ padding: 28, maxWidth: 680 }}>
      <h3>접근성</h3>

      <h5 style={{ marginTop: 20 }}>본문 텍스트에 accent를 쓸 때</h5>
      <p className="text-muted">
        accent 원색은 본문 크기 텍스트 대비가 3:1 수준이라 문단에 쓰기엔 부족하다. 진한 ramp 단계를 쓴다.
      </p>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div className="card blueprint" style={{ flex: '1 1 260px' }}>
          <div className="card-kicker">하지 말 것</div>
          <p style={{ color: 'var(--color-accent)', margin: 0 }}>
            이 문단은 <code>--color-accent</code>를 그대로 썼습니다. 대비가 부족합니다.
          </p>
        </div>
        <div className="card blueprint" style={{ flex: '1 1 260px' }}>
          <div className="card-kicker">권장</div>
          <p style={{ color: 'var(--color-accent-700)', margin: 0 }}>
            이 문단은 <code>--color-accent-700</code>을 썼습니다. 본문에 적합합니다.
          </p>
        </div>
      </div>

      <h5 style={{ marginTop: 28 }}>키보드 포커스</h5>
      <p className="text-muted">
        브라우저 기본 파란 링 대신 <code>:focus-visible</code>에 2px accent 링을 준다. 아래 요소들을 Tab으로 이동해 확인.
      </p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button className="btn btn-secondary blueprint">포커스 확인용 버튼</button>
        <input className="input" style={{ width: 200 }} placeholder="입력 칸" />
        <a href="#">링크</a>
      </div>
    </div>
  ),
};
