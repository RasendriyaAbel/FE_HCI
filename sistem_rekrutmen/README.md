# Sistem Rekrutmen

Aplikasi web untuk sistem rekrutmen yang dibangun dengan React dan Vite.

## 🚀 Fitur

- Landing page
- Login dan Register
- Explore lowongan kerja
- Detail lowongan
- Profile management
- Kelengkapan berkas lamaran
- Review dan status lamaran

## 📦 Instalasi

```bash
npm install
```

## 🛠️ Development

```bash
npm run dev
```

## 🏗️ Build

```bash
npm run build
```

## 📤 Deployment ke GitHub Pages

Proyek ini sudah dikonfigurasi untuk deployment otomatis ke GitHub Pages menggunakan GitHub Actions.

### Cara Setup:

1. **Push kode ke GitHub repository**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push origin main
   ```

2. **Aktifkan GitHub Pages di repository settings:**
   - Buka repository di GitHub
   - Pergi ke **Settings** → **Pages**
   - Di bagian **Source**, pilih **GitHub Actions**
   - Simpan perubahan

3. **Workflow akan otomatis berjalan:**
   - Setiap push ke branch `main` atau `master` akan trigger deployment
   - Atau bisa trigger manual dari tab **Actions** → **Deploy to GitHub Pages** → **Run workflow**

4. **Akses aplikasi:**
   - Setelah deployment selesai, aplikasi akan tersedia di:
   - `https://[username].github.io/[repository-name]/`

### Catatan Penting:

- Pastikan nama repository di GitHub sesuai dengan yang digunakan di workflow
- Base path otomatis disesuaikan dengan nama repository
- Jika menggunakan custom domain, update `vite.config.js` untuk mengubah base path

## 📝 Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint

## 🛠️ Tech Stack

- React 19
- Vite 7
- React Router DOM
- ESLint

## 📄 Lisensi

Private project
