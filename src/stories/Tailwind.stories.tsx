import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Tailwind',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div style={{ padding: 28, maxWidth: 800 }}>
      <h3>Tailwind 색상</h3>
      <p className="text-muted">
        <code>tailwind.config.js</code>에 정의된 색상 클래스들이 정상적으로 로드되는지 확인하고 문서화합니다.
        <code>tokens.css</code>의 변수들과 동기화되어 있어야 합니다. 드리프트 방지용.
      </p>

      <section style={{ marginBottom: 28 }}>
        <h5 style={{ marginBottom: 8 }}>Accent (기본 액션)</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {([100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map((step) => (
            <div key={step} style={{ width: 64 }}>
              <div className={`bg-accent-${step} border border-divider`} style={{ height: 64 }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{step}</div>
              <code style={{ fontSize: 10, opacity: 0.6 }}>bg-accent-{step}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h5 style={{ marginBottom: 8 }}>Accent 2 (보조 액션)</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {([100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map((step) => (
            <div key={step} style={{ width: 64 }}>
              <div className={`bg-accent-2-${step} border border-divider`} style={{ height: 64 }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{step}</div>
              <code style={{ fontSize: 10, opacity: 0.6 }}>bg-accent-2-{step}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h5 style={{ marginBottom: 8 }}>Highlight (할인/혜택 등)</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {([100, 200, 300, 400, 500, 600, 700, 800, 900] as const).map((step) => (
            <div key={step} style={{ width: 64 }}>
              <div className={`bg-highlight-${step} border border-divider`} style={{ height: 64 }} />
              <div style={{ fontSize: 11, marginTop: 4 }}>{step}</div>
              <code style={{ fontSize: 10, opacity: 0.6 }}>bg-highlight-{step}</code>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h5 style={{ marginBottom: 8 }}>시맨틱 및 기본</h5>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ width: 64 }}>
            <div className="bg-success border border-divider" style={{ height: 64 }} />
            <code style={{ fontSize: 10, opacity: 0.6 }}>bg-success</code>
          </div>
          <div style={{ width: 64 }}>
            <div className="bg-warning border border-divider" style={{ height: 64 }} />
            <code style={{ fontSize: 10, opacity: 0.6 }}>bg-warning</code>
          </div>
          <div style={{ width: 64 }}>
            <div className="bg-danger border border-divider" style={{ height: 64 }} />
            <code style={{ fontSize: 10, opacity: 0.6 }}>bg-danger</code>
          </div>
          <div style={{ width: 64 }}>
            <div className="bg-bg border border-divider" style={{ height: 64 }} />
            <code style={{ fontSize: 10, opacity: 0.6 }}>bg-bg</code>
          </div>
          <div style={{ width: 64 }}>
            <div className="bg-surface border border-divider" style={{ height: 64 }} />
            <code style={{ fontSize: 10, opacity: 0.6 }}>bg-surface</code>
          </div>
        </div>
      </section>
    </div>
  ),
};
