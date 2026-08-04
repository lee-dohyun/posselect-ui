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
        accent: {
          DEFAULT: '#5980a6',
          100: '#eef6ff',
          200: '#d6ebff',
          300: '#b5d9fd',
          400: '#94bce3',
          500: '#749dc4',
          600: '#597ea3',
          700: '#416180',
          800: '#2c455d',
          900: '#1d2d3d',
        },
        'accent-2': {
          DEFAULT: '#728fab',
          100: '#eef6ff',
          200: '#d6ebff',
          300: '#bdd8f2',
          400: '#9ebbd8',
          500: '#7e9cb8',
          600: '#627d98',
          700: '#486077',
          800: '#314457',
          900: '#1f2d3a',
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
        6: '20.4px',
        8: '27.2px',
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
