/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['Pally', 'Comic Sans MS', 'sans-serif'],
      body: ['Pally', 'Comic Sans MS', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'nenu-bg': "url('/src/assets/image/nenu-bg.png')",
      }
    },
  },
  plugins: [],
};
