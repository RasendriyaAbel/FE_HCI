# Checklist Deployment GitHub Pages

Gunakan checklist ini untuk memastikan deployment berhasil.

## ✅ Pre-Deployment Checklist

### 1. Pastikan GitHub Pages Sudah Diaktifkan
- [ ] Buka repository di GitHub: `https://github.com/rasendriyaabel/FE_HCI`
- [ ] Pergi ke **Settings** → **Pages** (di sidebar kiri)
- [ ] Di bagian **Source**, pilih **GitHub Actions** (BUKAN "Deploy from a branch")
- [ ] Klik **Save**
- [ ] Pastikan muncul pesan: "Your site is ready to be published at https://rasendriyaabel.github.io/FE_HCI/"

### 2. Pastikan Workflow File Ada
- [ ] File `.github/workflows/deploy.yml` ada di repository
- [ ] File sudah di-commit dan di-push ke branch `main`

### 3. Pastikan Kode Sudah Di-Push
```bash
git status  # Pastikan tidak ada uncommitted changes
git push origin main  # Push ke GitHub
```

## ✅ Deployment Checklist

### 4. Cek Workflow Berjalan
- [ ] Buka tab **Actions** di repository GitHub
- [ ] Pastikan workflow "Deploy to GitHub Pages" muncul
- [ ] Klik workflow terbaru untuk melihat detail
- [ ] Pastikan workflow **berhasil** (hijau, bukan merah/kuning)

### 5. Cek Log Build
Di dalam workflow, cek step "Build":
- [ ] Lihat log "Extract repository name" - pastikan menampilkan: `Repository name: FE_HCI`
- [ ] Lihat log "Build" - pastikan menampilkan:
  ```
  GITHUB_PAGES=true
  GITHUB_REPOSITORY_NAME=FE_HCI
  Base path: /FE_HCI/
  ```
- [ ] Lihat log "Verify build output" - pastikan:
  - ✓ index.html found
  - File index.html ada dan berisi konten

### 6. Cek Deployment
- [ ] Step "Deploy to GitHub Pages" berhasil
- [ ] Tidak ada error merah di log

## ✅ Post-Deployment Checklist

### 7. Verifikasi Website
- [ ] Buka: `https://rasendriyaabel.github.io/FE_HCI/`
- [ ] Website muncul (bukan 404)
- [ ] Test beberapa halaman:
  - [ ] Homepage (`/FE_HCI/`)
  - [ ] Login (`/FE_HCI/login`)
  - [ ] Register (`/FE_HCI/register`)

### 8. Jika Masih 404

**Cek di GitHub:**
1. Buka **Settings** → **Pages**
2. Pastikan **Source** adalah **GitHub Actions**
3. Lihat **Custom domain** - pastikan kosong (jika ada, hapus dulu)
4. Cek **Recent workflow runs** - pastikan ada deployment yang berhasil

**Cek Workflow:**
1. Buka tab **Actions**
2. Cek workflow terbaru - apakah berhasil?
3. Jika gagal, baca error message
4. Jika berhasil tapi masih 404, tunggu 1-2 menit (propagasi DNS)

**Cek Base Path:**
1. Di log workflow, cek "Build" step
2. Pastikan "Base path: /FE_HCI/" muncul
3. Jika berbeda, berarti repository name tidak terdeteksi

**Manual Fix:**
Jika semua sudah benar tapi masih 404:
1. Edit `vite.config.js`
2. Hardcode base path: `base: '/FE_HCI/'`
3. Commit dan push lagi

## 🔧 Troubleshooting

### Error: "Workflow not found"
- Pastikan file `.github/workflows/deploy.yml` ada
- Pastikan sudah di-commit dan push

### Error: "Permission denied"
- Pastikan repository Settings → Actions → General
- Di bagian "Workflow permissions", pilih "Read and write permissions"
- Centang "Allow GitHub Actions to create and approve pull requests"

### Error: "No such file or directory: dist/index.html"
- Build gagal
- Cek log error di step "Build"
- Pastikan `npm ci` berhasil
- Pastikan tidak ada error di `npm run build:github`

### Website 404 tapi workflow berhasil
1. Tunggu 1-2 menit (propagasi)
2. Clear cache browser (Ctrl+Shift+Delete)
3. Coba di incognito mode
4. Cek URL: pastikan ada trailing slash: `/FE_HCI/` (bukan `/FE_HCI`)
5. Cek base path di log workflow

## 📞 Butuh Bantuan?

Jika semua checklist sudah dilakukan tapi masih error:
1. Screenshot error di browser
2. Screenshot log workflow (step yang gagal)
3. Screenshot Settings → Pages di GitHub
4. Kirim ke developer untuk debugging

