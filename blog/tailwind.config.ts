import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primaryColor: '#92A8D1',
      gray: {
        100: '#f7fafc',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            'pre code': {
              span: {
                fontFamily: 'monaco',
              },
            },
            strong: {
              color: theme('colors.primaryColor'),
            },
            a: {
              textDecorationColor: theme('colors.primaryColor'),
              textDecorationThickness: '2px',
              textUnderlineOffset: '2px',
            },
            'li::marker': {
              color: theme('colors.primaryColor'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primaryColor'),
              backgroundColor: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
