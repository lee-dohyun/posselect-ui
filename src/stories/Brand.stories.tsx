import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `cdn` 버킷(`docs/image-cdn-policy.md`)에 있는 브랜드 이미지 배리에이션 전체를 한눈에 보여주는 페이지.
 *
 * 예전엔 `BrandLogo`(Misc.stories.tsx)가 컬러 워드마크 하나만 사이즈별로 보여줘서, 모노톤 로고/마크,
 * 파비콘 배리에이션, stacked·tagline·on-dark·square 등 나머지는 실제로 MinIO cdn 버킷에 다 있는데도
 * Storybook에서는 확인할 방법이 없었다(있는 파일이 없는 것처럼 보이는 원인). 이 페이지는 새 자산을
 * 추가하는 게 아니라 기존 cdn 버킷 파일을 그대로 노출만 한다 — 각 카드는 `image.posselect.com/cdn/<key>`
 * 짧은 경로(서명 불필요)로 원본을 직접 참조한다.
 */
const meta = {
  title: 'Foundations/브랜드 자산',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CDN = 'https://image.posselect.com/cdn/';

function AssetCard({
  file,
  label,
  note,
  background = 'light',
  height = 64,
}: {
  file: string;
  label: string;
  note?: string;
  background?: 'light' | 'dark' | 'checker';
  height?: number;
}) {
  const bg =
    background === 'dark'
      ? '#1a1a1a'
      : background === 'checker'
        ? 'repeating-conic-gradient(#e5e5e8 0% 25%, transparent 0% 50%) 0 0 / 16px 16px'
        : '#ffffff';

  return (
    <div style={{ width: 220 }}>
      <div
        style={{
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bg,
          border: '1px solid var(--color-divider)',
          padding: 12,
        }}
      >
        <img src={`${CDN}${file}`} alt={label} style={{ maxWidth: '100%', maxHeight: height }} />
      </div>
      <div style={{ fontSize: 12, marginTop: 6 }}>{label}</div>
      {note && (
        <div className="text-muted" style={{ fontSize: 11, marginTop: 2 }}>
          {note}
        </div>
      )}
      <code style={{ fontSize: 10, opacity: 0.6, wordBreak: 'break-all' }}>{file}</code>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h5 style={{ marginBottom: 4 }}>{title}</h5>
      {desc && (
        <p className="text-muted" style={{ maxWidth: 680, marginTop: 0, marginBottom: 12 }}>
          {desc}
        </p>
      )}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{children}</div>
    </section>
  );
}

export const AllAssets: Story = {
  render: () => (
    <div style={{ padding: 28 }}>
      <h3>브랜드 자산</h3>
      <p className="text-muted" style={{ maxWidth: 680 }}>
        MinIO <code>cdn</code> 버킷에 있는 로고·마크·파비콘 배리에이션 전체. 실제 화면에서 새 배리에이션이
        필요하면 여기서 파일명을 확인해 <code>{CDN}logos/…</code> 형태로 바로 참조하면 된다. 로고 컴포넌트로
        쓸 땐 이 URL을 직접 쓰지 말고 <code>Logo</code> 컴포넌트(Nav · Logo · Figure 페이지)를 쓴다.
      </p>

      <Section
        title="워드마크 — 기본"
        desc="정식 컬러(코랄 Pos + 블루 Select). ® 있는 버전과 없는 버전이 나뉜다."
      >
        <AssetCard file="logos/posselect-logo.svg" label="기본 (SVG)" height={40} />
        <AssetCard file="logos/posselect-logo.png" label="기본 (PNG)" height={40} />
        <AssetCard file="logos/posselect-logo-hires.png" label="고해상도" height={40} />
        <AssetCard file="logos/posselect-logo-no-r.svg" label="® 없음 (SVG)" height={40} />
        <AssetCard file="logos/posselect-logo-no-r.png" label="® 없음 (PNG)" height={40} />
        <AssetCard file="logos/posselect-logo-hires-no-r.png" label="® 없음 고해상도" height={40} />
        <AssetCard file="logos/posselect-wordmark.png" label="워드마크" height={40} />
        <AssetCard file="logos/posselect-logo-kr.svg" label="한글 버전" height={40} />
      </Section>

      <Section title="워드마크 — 모노톤 / 다크 배경용" desc="단색 인쇄, 다크 배경 등 컬러를 못 쓰는 맥락용.">
        <AssetCard file="logos/posselect-logo-mono-black.png" label="모노톤 (블랙)" height={40} />
        <AssetCard file="logos/posselect-logo-on-dark.png" label="다크 배경용" background="dark" height={40} />
      </Section>

      <Section title="워드마크 — 정방형 / 스택형" desc="정사각 프로필 이미지, 태그라인 포함 스택 레이아웃 등.">
        <AssetCard file="logos/posselect-logo-square.png" label="정방형" height={80} />
        <AssetCard file="logos/posselect-logo-stacked.png" label="스택형" height={80} />
        <AssetCard file="logos/posselect-logo-stacked-full.png" label="스택형 (태그라인 포함)" height={80} />
        <AssetCard file="logos/posselect-logo-stacked-full-no-r.png" label="스택형 (® 없음)" height={80} />
        <AssetCard
          file="logos/posselect-logo-stacked-full-light.png"
          label="스택형 라이트"
          background="dark"
          height={80}
        />
        <AssetCard
          file="logos/posselect-logo-stacked-full-light-no-r.png"
          label="스택형 라이트 (® 없음)"
          background="dark"
          height={80}
        />
      </Section>

      <Section title="워드마크 — 태그라인 / 서브타이틀">
        <AssetCard file="logos/posselect-logo-tagline.png" label="태그라인 (영문)" height={60} />
        <AssetCard file="logos/posselect-logo-tagline-kr.png" label="태그라인 (한글)" height={60} />
        <AssetCard file="logos/posselect-logo-with-subtitle.png" label="서브타이틀 포함" height={60} />
      </Section>

      <Section title="마크" desc="워드마크에서 분리된 심볼만. 파비콘·앱 아이콘·소셜 프로필 등에 쓴다.">
        <AssetCard file="marks/mark-recolored-master.png" label="마크 (컬러)" />
        <AssetCard file="marks/mark-mono-256.png" label="마크 (모노톤)" />
      </Section>

      <Section
        title="파비콘"
        desc="현재 storybook.posselect.com/store.front가 쓰는 정식 파비콘은 투명배경 코랄(favicon-transparent-red-*)이다. favicon-transparent-*(빨강 없는 버전)는 초기 블루 시안으로, 최종 코랄로 교체 확정되며 남은 이전 배리에이션이다."
      >
        <AssetCard file="favicons/favicon-transparent-red-256.png" label="투명배경 · 코랄 (정식, 256)" background="checker" />
        <AssetCard file="favicons/favicon-transparent-red-32.png" label="투명배경 · 코랄 (정식, 32)" background="checker" />
        <AssetCard file="favicons/favicon-256.png" label="불투명배경 (256)" />
        <AssetCard file="favicons/favicon-32.png" label="불투명배경 (32)" />
        <AssetCard file="favicons/favicon-transparent-256.png" label="투명배경 · 블루 (구 시안, 256)" background="checker" />
        <AssetCard file="favicons/favicon-transparent-32.png" label="투명배경 · 블루 (구 시안, 32)" background="checker" />
      </Section>

      <Section title="기타">
        <AssetCard file="misc/posselect-ci.png" label="CI 보드" height={90} />
        <AssetCard file="misc/_v_check.png" label="검수용 참고 이미지" height={90} />
      </Section>
    </div>
  ),
};
