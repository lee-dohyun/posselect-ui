import type { Preview } from '@storybook/react-vite';

// 소비 앱과 동일하게 토큰을 루트에서 한 번만 로드한다(`import '@posselect/ui/tokens.css'`).
// body 배경/폰트도 이 파일이 정의하므로 프리뷰 캔버스가 실제 화면과 같은 바탕에서 렌더링된다.
import '../src/styles/tokens.css';
import '../src/styles/tailwind.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    // tokens.css "Responsive layer"와 posselect-shell이 공유하는 브레이크포인트를 그대로
    // 뷰포트 프리셋으로 노출한다 — 컴포넌트를 고칠 때 세 폭을 바로 오갈 수 있어야
    // 반응형 회귀를 눈으로 잡는다(Redmine posselect #128).
    viewport: {
      options: {
        phone: { name: 'Phone 375 (≤480 규칙)', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet 768 (≤768 규칙)', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop 1280', styles: { width: '1280px', height: '900px' } },
      },
    },
  },
  globalTypes: {
    locale: {
      description: '다국어 텍스트 길이 확인용 로케일 스위처',
      defaultValue: 'ko',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'ko', title: '한국어 (기본)' },
          { value: 'en', title: 'English (1.2x 길어짐)' },
          { value: 'ja', title: '日本語 (한자/가나 폭 확인)' },
        ],
      },
    },
  },
  decorators: [
    (Story: any, context: any) => {
      // 로케일별 텍스트 길이 시뮬레이션을 위해 루트에 언어 속성을 부여 (실제 앱의 다국어 렌더링 환경 모방)
      if (typeof document !== 'undefined') {
        document.documentElement.lang = context.globals.locale || 'ko';
      }
      return Story();
    },
  ],
};

export default preview;
