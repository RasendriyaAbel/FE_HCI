# Panduan Deployment ke GitHub Pages

Proyek ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages menggunakan GitHub Actions.

## Langkah-langkah Deployment

### 1. Aktifkan GitHub Pages di Repository

1. Buka repository Anda di GitHub
2. Pergi ke **Settings** → **Pages**
3. Di bagian **Source**, pilih **GitHub Actions**
4. Simpan perubahan

### 2. Push Kode ke GitHub

Setelah mengaktifkan GitHub Pages, setiap kali Anda push ke branch `main`, website akan otomatis di-deploy.

```bash
git add .
git commit -m "Setup GitHub Pages deployment"
git push origin main
```

### 3. Tunggu Deployment Selesai

1. Pergi ke tab **Actions** di repository GitHub Anda
2. Tunggu workflow "Deploy to GitHub Pages" selesai
3. Setelah selesai, website akan tersedia di: `https://username.github.io/REPO_NAME/`

## Konfigurasi Base Path

Base path otomatis dikonfigurasi berdasarkan nama repository:
- Jika repository: `username/my-repo` → website di: `https://username.github.io/my-repo/`
- Jika repository: `username/username.github.io` → website di: `https://username.github.io/`

Jika Anda perlu mengubah base path secara manual, edit file `vite.config.js` dan ubah nilai `REPO_NAME` default.

## Build Lokal untuk Testing

Untuk test build dengan konfigurasi GitHub Pages:

```bash
npm run build:github
```

Untuk preview build lokal:

```bash
npm run build
npm run preview
```

## Troubleshooting

### Routing tidak bekerja
- Pastikan base path di `vite.config.js` sesuai dengan nama repository Anda
- Pastikan `BrowserRouter` menggunakan `basename` yang benar (sudah dikonfigurasi otomatis)
- File `404.html` sudah dikonfigurasi untuk redirect ke `index.html`

### 404 Error
- Pastikan GitHub Pages sudah diaktifkan dengan source **GitHub Actions**
- Pastikan workflow deployment sudah berjalan dan berhasil (cek di tab Actions)
- Pastikan base path sesuai dengan nama repository (`/FE_HCI/` untuk repo `FE_HCI`)
- File `404.html` sudah dikonfigurasi untuk menangani routing

### Assets tidak dimuat
- Pastikan semua path asset menggunakan path relatif atau base path yang benar
- Base path otomatis di-set oleh Vite berdasarkan konfigurasi di `vite.config.js`

### Build gagal
- Pastikan semua dependencies terinstall: `npm ci`
- Cek log di GitHub Actions untuk detail error
- Pastikan Node.js version sesuai (20.x)

### Website masih menunjukkan 404 setelah deployment
1. Tunggu beberapa menit untuk propagasi DNS
2. Cek URL yang benar: `https://username.github.io/REPO_NAME/` (dengan trailing slash)
3. Pastikan workflow deployment sudah selesai dan berhasil
4. Clear cache browser atau coba di incognito mode
5. Pastikan base path di `vite.config.js` sesuai dengan nama repository

