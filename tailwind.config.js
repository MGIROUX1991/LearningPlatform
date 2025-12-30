/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fef9f0',
          100: '#fdf2e0',
          200: '#fae4c0',
          300: '#f6d096',
          400: '#f1b86b',
          500: '#ed9f3f',
          600: '#df8320',
          700: '#b9661a',
          800: '#94511a',
          900: '#784418',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

