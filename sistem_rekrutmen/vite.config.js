import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Konfigurasi untuk GitHub Pages
// Base path untuk repository FE_HCI
function getBasePath() {
  // Cek environment variable dari GitHub Actions
  const repoName = process.env.GITHUB_REPOSITORY_NAME
  const fullRepo = process.env.GITHUB_REPOSITORY // Format: owner/repo-name
  const isGitHubPages = process.env.GITHUB_PAGES === 'true'
  
  // Jika menggunakan GitHub Pages
  if (isGitHubPages) {
    // Prioritas 1: GITHUB_REPOSITORY_NAME (sudah di-extract)
    if (repoName) {
      if (repoName.endsWith('.github.io')) {
        return '/'
      }
      return `/${repoName}/`
    }
    
    // Prioritas 2: Extract dari GITHUB_REPOSITORY (fallback)
    if (fullRepo) {
      const extractedName = fullRepo.split('/')[1]
      if (extractedName && !extractedName.endsWith('.github.io')) {
        return `/${extractedName}/`
      }
    }
    
    // Prioritas 3: Hardcode untuk FE_HCI (fallback terakhir)
    console.warn('⚠️  Repository name not detected, using default: FE_HCI')
    return '/FE_HCI/'
  }
  
  // Default untuk development
  return '/'
}

const basePath = getBasePath()

console.log('=== Vite Build Configuration ===')
console.log('GITHUB_PAGES:', process.env.GITHUB_PAGES)
console.log('GITHUB_REPOSITORY_NAME:', process.env.GITHUB_REPOSITORY_NAME)
console.log('GITHUB_REPOSITORY:', process.env.GITHUB_REPOSITORY)
console.log('Base path:', basePath)
console.log('===============================')

export default defineConfig({
  plugins: [react()],
  base: basePath,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
