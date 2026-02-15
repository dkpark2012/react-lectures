import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite' // 📝 [Technical Term] Tailwind CSS v4 Engine for Vite Integration
import path from 'path'

/**
 * @description Vite Configuration for Enterprise React Application
 * @module ViteConfig
 */
export default defineConfig({
  plugins: [
    /** @plugin Tailwind CSS v4 */
    tailwindcss(), 
    /** @plugin TanStack Router with Code Splitting Optimization */
    tanstackRouter({
      autoCodeSplitting: true, 
    }),
    /** @plugin React Fast Refresh and Optimization */
    react(),
  ],
  resolve: {
    /** * @description Alias Mapping for Absolute Paths 
     * Provides centralized path management and improves import readability
     */
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, './src/features'),
      '@components': path.resolve(__dirname, './src/components'),
      '@study': path.resolve(__dirname, './src/study'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
})