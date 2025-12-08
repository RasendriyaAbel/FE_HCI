# Dokumentasi Deployment Frontend

Dokumentasi ini menjelaskan langkah-langkah untuk melakukan deployment aplikasi Sistem Rekrutmen Frontend ke berbagai platform.

## 📋 Daftar Isi

- [Prerequisites](#prerequisites)
- [Build Aplikasi](#build-aplikasi)
- [Deployment ke Vercel](#deployment-ke-vercel)
- [Deployment ke Netlify](#deployment-ke-netlify)
- [Deployment ke GitHub Pages](#deployment-ke-github-pages)
- [Deployment Manual (Static Hosting)](#deployment-manual-static-hosting)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Sebelum melakukan deployment, pastikan Anda telah menginstall:

- **Node.js** (versi 18 atau lebih tinggi)
- **npm** atau **yarn** atau **pnpm**
- **Git** (untuk version control)

### Verifikasi Instalasi

```bash
node --version  # Harus >= 18.0.0
npm --version   # Harus >= 8.0.0
git --version
```

---

## Build Aplikasi

### 1. Install Dependencies

```bash
cd sistem_rekrutmen
npm install
```

### 2. Build untuk Production

```bash
npm run build
```

Setelah build selesai, folder `dist/` akan dibuat yang berisi file-file yang siap untuk di-deploy.

### 3. Preview Build (Opsional)

Untuk melihat hasil build sebelum deploy:

```bash
npm run preview
```

Aplikasi akan berjalan di `http://localhost:4173`

---

## Deployment ke Vercel

Vercel adalah platform yang sangat cocok untuk aplikasi React dengan Vite.

### Metode 1: Deploy via Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login ke Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
vercel
```

Ikuti instruksi yang muncul. Untuk production:

```bash
vercel --prod
```

### Metode 2: Deploy via GitHub Integration

1. **Push code ke GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Import Project di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Klik "Add New Project"
   - Pilih repository GitHub Anda
   - Vercel akan otomatis mendeteksi Vite
   - Klik "Deploy"

3. **Konfigurasi Build Settings** (jika diperlukan)
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Konfigurasi Vercel (vercel.json)

Buat file `vercel.json` di root project:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Deployment ke Netlify

### Metode 1: Deploy via Netlify CLI

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login ke Netlify**

```bash
netlify login
```

3. **Deploy**

```bash
netlify deploy
```

Untuk production:

```bash
netlify deploy --prod
```

### Metode 2: Deploy via Drag & Drop

1. **Build aplikasi**

```bash
npm run build
```

2. **Drag folder `dist/` ke Netlify**
   - Buka [app.netlify.com/drop](https://app.netlify.com/drop)
   - Drag folder `dist/` ke halaman tersebut

### Metode 3: Deploy via GitHub Integration

1. **Push code ke GitHub** (sama seperti Vercel)

2. **Import Project di Netlify**
   - Buka [app.netlify.com](https://app.netlify.com)
   - Klik "Add new site" > "Import an existing project"
   - Pilih repository GitHub Anda
   - Konfigurasi build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Klik "Deploy site"

### Konfigurasi Netlify (netlify.toml)

Buat file `netlify.toml` di root project:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Deployment ke GitHub Pages

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Update package.json

Tambahkan script berikut:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://<username>.github.io/<repository-name>"
}
```

**Catatan**: Ganti `<username>` dan `<repository-name>` dengan informasi GitHub Anda.

### 3. Update vite.config.js

Tambahkan konfigurasi base:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/<repository-name>/'  // Ganti dengan nama repository Anda
})
```

### 4. Deploy

```bash
npm run deploy
```

### 5. Enable GitHub Pages

1. Buka repository di GitHub
2. Pergi ke **Settings** > **Pages**
3. Pilih source: **gh-pages branch** > **/ (root)**
4. Klik **Save**

---

## Deployment Manual (Static Hosting)

Untuk hosting static seperti AWS S3, Google Cloud Storage, atau server sendiri:

### 1. Build Aplikasi

```bash
npm run build
```

### 2. Upload Folder `dist/`

Upload seluruh isi folder `dist/` ke hosting provider Anda.

### 3. Konfigurasi Server

Pastikan server dikonfigurasi untuk:

- **Serve `index.html` untuk semua routes** (untuk React Router)
- **Enable gzip compression**
- **Set proper MIME types**

#### Contoh konfigurasi Nginx:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/sistem-rekrutmen;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Contoh konfigurasi Apache (.htaccess):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

---

## Environment Variables

Jika aplikasi memerlukan environment variables, buat file `.env` untuk development dan `.env.production` untuk production.

### Contoh .env

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=Sistem Rekrutmen
```

### Menggunakan di Code

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

**Catatan**: Di Vite, environment variables harus diawali dengan `VITE_` untuk bisa diakses di client-side.

### Set Environment Variables di Platform

#### Vercel
- Settings > Environment Variables
- Tambahkan variable dengan prefix `VITE_`

#### Netlify
- Site settings > Build & deploy > Environment
- Tambahkan variable dengan prefix `VITE_`

---

## Troubleshooting

### 1. Build Error: Module not found

**Solusi**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. 404 Error pada Route

**Penyebab**: Server tidak dikonfigurasi untuk SPA routing.

**Solusi**: Pastikan semua routes mengarah ke `index.html` (lihat konfigurasi server di atas).

### 3. Assets tidak ter-load

**Penyebab**: Base path tidak sesuai.

**Solusi**: 
- Untuk GitHub Pages, set `base` di `vite.config.js`
- Untuk custom domain, set `base: '/'`

### 4. CORS Error

**Penyebab**: API server tidak mengizinkan request dari domain frontend.

**Solusi**: Konfigurasi CORS di backend untuk mengizinkan domain frontend.

### 5. LocalStorage tidak bekerja

**Penyebab**: Browser menggunakan mode private/incognito atau localStorage disabled.

**Solusi**: Pastikan browser mendukung localStorage dan tidak dalam mode incognito.

---

## Post-Deployment Checklist

Setelah deployment, pastikan untuk:

- [ ] ✅ Test semua halaman dapat diakses
- [ ] ✅ Test routing (navigasi antar halaman)
- [ ] ✅ Test login dan register
- [ ] ✅ Test fitur yang menggunakan localStorage
- [ ] ✅ Test responsive design di berbagai device
- [ ] ✅ Test di berbagai browser (Chrome, Firefox, Safari, Edge)
- [ ] ✅ Verifikasi semua assets (gambar, font) ter-load dengan benar
- [ ] ✅ Check console untuk error
- [ ] ✅ Test performance (PageSpeed Insights)
- [ ] ✅ Setup custom domain (jika diperlukan)
- [ ] ✅ Setup SSL/HTTPS
- [ ] ✅ Setup analytics (jika diperlukan)
- [ ] ✅ Setup error tracking (jika diperlukan)

---

## Tips Optimasi

### 1. Enable Compression

Pastikan server mengaktifkan gzip/brotli compression.

### 2. Optimasi Images

- Gunakan format modern (WebP, AVIF)
- Lazy load images
- Gunakan CDN untuk assets

### 3. Code Splitting

Vite sudah otomatis melakukan code splitting. Pastikan menggunakan dynamic imports untuk route besar.

### 4. Caching Strategy

- Static assets: Cache 1 tahun
- HTML: No cache atau cache pendek
- API responses: Sesuai kebutuhan

---

## Support

Jika mengalami masalah saat deployment, silakan:

1. Check dokumentasi platform yang digunakan
2. Check console untuk error messages
3. Review log deployment di platform
4. Pastikan semua prerequisites terpenuhi

---

## Referensi

- [Vite Documentation](https://vitejs.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [React Router Documentation](https://reactrouter.com/)

---

**Last Updated**: 2025

