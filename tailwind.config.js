/** @type {import('tailwindcss').Config} */
import animate from 'tailwindcss-animate'

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'sans-serif'],
      },
      colors: {
        ink: 'hsl(var(--ink))',
        parchment: 'hsl(var(--parchment))',
        coral: 'hsl(var(--coral))',
        sea: 'hsl(var(--sea))',
        moss: 'hsl(var(--moss))',
        clay: 'hsl(var(--clay))',
        mist: 'hsl(var(--mist))',
      },
      boxShadow: {
        soft: '0 20px 60px -32px rgba(12, 24, 26, 0.6)',
        card: '0 18px 40px -30px rgba(22, 31, 30, 0.6)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 7s ease infinite',
      },
    },
  },
  plugins: [animate],
}

