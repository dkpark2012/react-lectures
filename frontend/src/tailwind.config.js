/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 이 설정이 들어가는 순간 스타일이 살아납니다!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}