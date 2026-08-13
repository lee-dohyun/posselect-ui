/**
 * Tailwind theme extension mirroring src/styles/tokens.css exactly.
 * Consuming apps: import this as a preset —
 *   // tailwind.config.js
 *   module.exports = { presets: [require('@posselect/ui/tailwind.config.js')], content: [...] }
 */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        bg: '#f2f2f3',
        surface: '#e9e9ea',
        ink: '#1d1f20',
        divider: 'color-mix(in srgb, #1d1f20 16%, transparent)',
        // 2026-08-04: action color moved to a more saturated blue (see tokens.css note).
        accent: {
          DEFAULT: '#234e95',
          100: '#ecf1f8',
          200: '#d2ddee',
          300: '#adc0e1',
          400: '#7d9bcf',
          500: '#4c77bd',
          600: '#33558b',
          700: '#28416c',
          800: '#1d2f4e',
          900: '#132034',
        },
        'accent-2': {
          DEFAULT: '#728fab',
          100: '#ecf1f8',
          200: '#d2ddee',
          300: '#adc0e1',
          400: '#7d9bcf',
          500: '#4c77bd',
          600: '#33558b',
          700: '#28416c',
          800: '#1d2f4e',
          900: '#132034',
        },
        neutral: {
          100: '#f5f5f8',
          200: '#e7e7ea',
          300: '#d4d4d7',
          400: '#b7b7ba',
          500: '#98989b',
          600: '#7a7a7d',
          700: '#5d5d60',
          800: '#424244',
          900: '#2b2b2d',
        },
        success: { DEFAULT: '#6f9b7e', bg: '#e9f1ec' },
        warning: { DEFAULT: '#c9a35f', bg: '#f6efe0' },
        danger: { DEFAULT: '#b06a63', bg: '#f5e8e6' },
        // posselect-only — discount/coupon badges & logo accent, never buttons/nav.
        highlight: {
          DEFAULT: '#d1553c',
          100: '#faedea',
          200: '#f3d4cd',
          300: '#eab0a4',
          400: '#dd816f',
          500: '#d46149',
          600: '#d1553c',
          700: '#993824',
          800: '#6f291a',
          900: '#4a1b12',
        },
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', '"Pretendard"', '-apple-system', '"Malgun Gothic"', 'system-ui', 'sans-serif'],
        body: ['"Barlow"', '"Pretendard"', '-apple-system', '"Malgun Gothic"', 'system-ui', 'sans-serif'],
      },
      spacing: {
        1: '3.4px',
        2: '6.8px',
        3: '10.2px',
        4: '13.6px',
        5: '17px',
        6: '20.4px',
        8: '27.2px',
      },
      // tokens.css 맨 아래 "Responsive layer"와 같은 경계. Tailwind 기본 screens는
      // min-width(모바일 퍼스트)라 max-width로 쓰인 저쪽 규칙과 경계가 어긋나므로,
      // 기본값을 덮지 않고 max-* 변형을 따로 추가해 정확히 같은 값을 노출한다.
      screens: {
        'max-md': { max: '768px' },
        'max-sm': { max: '480px' },
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        lg: '7px',
        blueprint: '0px',
      },
      boxShadow: {
        sm: '0 1px 2px color-mix(in srgb, #2b2b2d 14%, transparent)',
        md: '0 3px 10px color-mix(in srgb, #2b2b2d 16%, transparent)',
        lg: '0 12px 32px color-mix(in srgb, #2b2b2d 22%, transparent)',
      },
    },
  },
  plugins: [],
};
