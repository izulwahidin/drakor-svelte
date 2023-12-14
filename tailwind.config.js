/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'primary': '#040F0F',
        'secondary': '#1F2937',
        'accent': '#EAB308',
      },
    },
  },
  plugins: [],
};