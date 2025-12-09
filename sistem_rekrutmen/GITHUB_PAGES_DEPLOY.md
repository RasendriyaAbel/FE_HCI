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
Pastikan base path di `vite.config.js` sesuai dengan nama repository Anda.

### 404 Error
GitHub Pages memerlukan file `index.html` di root. Pastikan build menghasilkan file tersebut di folder `dist/`.

### Assets tidak dimuat
Pastikan semua path asset menggunakan path relatif atau base path yang benar.

