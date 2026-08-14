import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `cdn` 버킷(`docs/image-cdn-policy.md`)에 있는 브랜드 이미지 배리에이션 전체를 한눈에 보여주는 페이지.
 *
 * 예전엔 `BrandLogo`(Misc.stories.tsx)가 컬러 워드마크 하나만 사이즈별로 보여줘서, 모노톤 로고,
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

/**
 * cdn 버킷의 SVG 워드마크들은 패스로 아웃라인화된 벡터가 아니라 `<text font-family="Arial…">`,
 * 즉 뷰어의 폰트에 의존하는 텍스트다(2026-08-14 원본 확인). `Logo` 컴포넌트가 같은 이유로
 * Arial 기반 SVG를 걷어내고 래스터 자산으로 바꾼 적이 있다(posselect-ui `9e98c45`) — 그 문제가
 * cdn 자산에는 그대로 남아 있다. Storybook 미리보기는 서버에 Arial이 없어도 대체 폰트로
 * 그럴듯하게 보이므로 눈으로는 걸러지지 않는다는 점이 특히 위험하다. Redmine posselect #202.
 */
const SVG_TEXT_WARNING =
  '벡터가 아니라 Arial 의존 <text>다. Arial이 없는 환경(리눅스·상당수 안드로이드)에서는 다른 폰트로 대체돼 글자 모양이 달라진다. 벡터가 필요하면 이 파일을 쓰지 말 것.';

function AssetCard({
  file,
  label,
  note,
  warn,
  background = 'light',
  height = 64,
}: {
  file: string;
  label: string;
  note?: string;
  /** 이 자산을 쓰기 전에 반드시 알아야 할 제약. 눈에 띄게 표시된다. */
  warn?: string;
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
      {warn && (
        <div
          style={{
            fontSize: 11,
            marginTop: 4,
            padding: '4px 6px',
            background: 'var(--color-warning-bg)',
            color: 'var(--color-neutral-900)',
            borderLeft: '2px solid var(--color-warning)',
          }}
        >
          {warn}
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
        MinIO <code>cdn</code> 버킷에 있는 로고·파비콘 배리에이션 전체. 실제 화면에서 새 배리에이션이
        필요하면 여기서 파일명을 확인해 <code>{CDN}logos/…</code> 형태로 바로 참조하면 된다. 로고 컴포넌트로
        쓸 땐 이 URL을 직접 쓰지 말고 <code>Logo</code> 컴포넌트(Nav · Logo · Figure 페이지)를 쓴다.
      </p>

      <Section
        title="워드마크 — 기본"
        desc="정식 컬러(코랄 Pos + 블루 Select). ® 있는 버전과 없는 버전이 나뉜다. 픽셀 크기는 2026-08-14에 cdn 버킷 원본을 직접 열어 실측한 값이다."
      >
        <AssetCard
          file="logos/posselect-logo.svg"
          label="기본 (SVG)"
          height={40}
          warn={SVG_TEXT_WARNING}
        />
        <AssetCard file="logos/posselect-logo.png" label="기본 (PNG)" note="426×101" height={40} />
        <AssetCard
          file="logos/posselect-logo-hires.png"
          label="고해상도"
          note="1410×300 — 기본(426×101)의 3.3배"
          height={40}
        />
        <AssetCard
          file="logos/posselect-logo-no-r.svg"
          label="® 없음 (SVG)"
          height={40}
          warn={SVG_TEXT_WARNING}
        />
        <AssetCard
          file="logos/posselect-logo-no-r.png"
          label="® 없음 (PNG)"
          note="1410×300 · 52KB"
          height={40}
        />
        <AssetCard
          file="logos/posselect-logo-hires-no-r.png"
          label="® 없음 (PNG, -hires- 키)"
          note="1410×300 · 52KB"
          height={40}
          warn="위 '® 없음 (PNG)'와 같은 1410×300이다. 이름의 -hires- 가 실제 차이를 뜻하지 않으므로 둘 중 아무거나 써도 무방."
        />
        <AssetCard
          file="logos/posselect-logo-hires-no-r.webp"
          label="® 없음 (WebP) — Logo 컴포넌트가 쓰는 자산"
          note="1410×300 · 30KB (PNG 대비 42% 작음)"
          height={40}
        />
        <AssetCard file="logos/posselect-wordmark.png" label="워드마크" note="760×460" height={40} />
        <AssetCard
          file="logos/posselect-logo-kr.svg"
          label="한글 버전"
          height={40}
          warn="위와 같은 폰트 의존 문제 + skewX(-10)로 기울임을, stroke로 굵기를 흉내낸 SVG다. 'Apple SD Gothic Neo'/'Malgun Gothic'/'Noto Sans KR'이 없는 환경에서는 전혀 다른 글자로 보인다."
        />
      </Section>

      <Section title="워드마크 — 모노톤 / 다크 배경용" desc="단색 인쇄, 다크 배경 등 컬러를 못 쓰는 맥락용.">
        <AssetCard file="logos/posselect-logo-mono-black.png" label="모노톤 (블랙)" height={40} />
        <AssetCard
          file="logos/posselect-logo-mono-black-no-r.png"
          label="모노톤 (블랙, ® 없음)"
          height={40}
        />
        <AssetCard file="logos/posselect-logo-on-dark.png" label="다크 배경용" background="dark" height={40} />
        <AssetCard
          file="logos/posselect-logo-on-dark-no-r.png"
          label="다크 배경용 (® 없음)"
          background="dark"
          height={40}
        />
      </Section>

      <Section title="워드마크 — 정방형 / 스택형" desc="정사각 프로필 이미지, 태그라인 포함 스택 레이아웃 등.">
        <AssetCard file="logos/posselect-logo-square.png" label="정방형" height={80} />
        <AssetCard file="logos/posselect-logo-stacked.png" label="스택형" height={80} />
        <AssetCard file="logos/posselect-logo-stacked-no-r.png" label="스택형 (® 없음)" height={80} />
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

      <Section
        title="워드마크 — 태그라인 / 서브타이틀"
        desc="태그라인은 뒤쪽 수식어를 회색(#838485)으로 눌러 앞부분을 강조한다 — 영문 'for You', 한글 '당신을 위한'이 그 자리다(한글은 어순상 앞에 온다)."
      >
        <AssetCard file="logos/posselect-logo-tagline.png" label="태그라인 (영문)" note="457×168" height={60} />
        <AssetCard
          file="logos/posselect-logo-tagline-no-r.png"
          label="태그라인 (영문, ® 없음)"
          note="457×168"
          height={60}
        />
        <AssetCard
          file="logos/posselect-logo-tagline-kr.png"
          label="태그라인 (한글)"
          note="940×300 · '당신을 위한'이 회색"
          height={60}
        />
        <AssetCard
          file="logos/posselect-logo-tagline-kr-no-r.png"
          label="태그라인 (한글, ® 없음)"
          note="940×300"
          height={60}
        />
        <AssetCard file="logos/posselect-logo-with-subtitle.png" label="서브타이틀 포함" note="457×168" height={60} />
        <AssetCard
          file="logos/posselect-logo-with-subtitle-no-r.png"
          label="서브타이틀 포함 (® 없음)"
          note="457×168"
          height={60}
        />
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
