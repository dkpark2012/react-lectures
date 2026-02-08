import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // v4 전용 플러그인

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 💡 반드시 plugins 배열 안에 react()와 나란히 있어야 합니다!
  ],
});