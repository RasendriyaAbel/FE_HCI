import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Konfigurasi untuk GitHub Pages
// Base path akan otomatis diset berdasarkan nama repository saat build
const REPO_NAME = process.env.GITHUB_REPOSITORY_NAME || 'FE_HCI'
const basePath = process.env.GITHUB_PAGES === 'true' 
  ? (REPO_NAME.endsWith('.github.io') ? '/' : `/${REPO_NAME}/`)
  : '/'

export default defineConfig({
  plugins: [react()],
  base: basePath,
})
