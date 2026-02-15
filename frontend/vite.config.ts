import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path' // 💡 [Technical Term] Node.js Path Module: 파일 경로를 계산해주는 도구예요.

export default defineConfig({
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true, 
    }),
    react(),
  ],
  resolve: {
    alias: {
      // 💡 [Technical Term] Alias Mapping (별칭 매핑)
      // '@'는 src 폴더 전체, '@features'는 그 안의 features 폴더만 쏙 가리키게 만들었어요.
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@study': path.resolve(__dirname, './src/study'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
})