# Troubleshooting Error 404 dan 503 di GitHub Pages

## Error 503 (Service Unavailable)

Error 503 biasanya terjadi karena:

### 1. Deployment Masih Berjalan
- **Solusi**: Tunggu 2-5 menit setelah push ke GitHub
- Cek status di tab **Actions** → pastikan workflow sudah **hijau** (berhasil)
- Refresh browser setelah deployment selesai

### 2. GitHub Pages Sedang Update
- **Solusi**: Tunggu beberapa menit dan coba lagi
- GitHub Pages butuh waktu untuk propagate perubahan

### 3. Workflow Gagal
- **Solusi**: 
  1. Buka tab **Actions** di GitHub
  2. Cek workflow terbaru
  3. Jika merah, klik untuk lihat error
  4. Perbaiki error dan push lagi

## Error 404 (File Not Found)

Error 404 berarti file tidak ditemukan. Cek hal berikut:

### 1. Pastikan GitHub Pages Sudah Diaktifkan
1. Buka: `https://github.com/rasendriyaabel/FE_HCI/settings/pages`
2. Di bagian **Source**, pastikan pilih **GitHub Actions** (BUKAN "Deploy from a branch")
3. Klik **Save**

### 2. Pastikan Workflow Berhasil
1. Buka tab **Actions**
2. Cek workflow "Deploy to GitHub Pages"
3. Pastikan status **hijau** (berhasil)
4. Jika merah, baca error dan perbaiki

### 3. Pastikan Base Path Benar
- Base path harus: `/FE_HCI/` (dengan trailing slash)
- Cek di log workflow step "Build" → harus muncul `VITE_BASE_PATH: /FE_HCI/`
- Cek di `vite.config.js` → `base: process.env.VITE_BASE_PATH || '/FE_HCI/'`

### 4. Pastikan URL Benar
- URL yang benar: `https://rasendriyaabel.github.io/FE_HCI/`
- **PENTING**: Harus ada trailing slash di akhir (`/FE_HCI/` bukan `/FE_HCI`)
- Jika tidak ada trailing slash, tambahkan manual di browser

### 5. Clear Cache Browser
- Tekan `Ctrl + Shift + Delete` (Windows) atau `Cmd + Shift + Delete` (Mac)
- Clear cache dan cookies
- Atau gunakan **Incognito/Private mode**

### 6. Tunggu Propagasi DNS
- Setelah deployment selesai, tunggu 1-2 menit
- GitHub Pages butuh waktu untuk update

## Checklist Debugging

Gunakan checklist ini untuk debugging:

- [ ] GitHub Pages diaktifkan dengan source **GitHub Actions**
- [ ] Workflow berhasil (hijau di tab Actions)
- [ ] Base path di log workflow adalah `/FE_HCI/`
- [ ] URL yang dibuka: `https://rasendriyaabel.github.io/FE_HCI/` (dengan trailing slash)
- [ ] Sudah menunggu 2-5 menit setelah deployment selesai
- [ ] Sudah clear cache browser
- [ ] Sudah coba di incognito mode
- [ ] File `index.html` ada di `dist/` (cek di log workflow)

## Verifikasi Build Output

Di log workflow, cek step "Verify build output":
- Harus muncul: `✓ index.html found`
- Jika tidak muncul, berarti build gagal

## Jika Semua Sudah Benar Tapi Masih Error

1. **Cek Settings → Pages**:
   - Pastikan **Source** adalah **GitHub Actions**
   - Lihat **Custom domain** → harus kosong
   - Lihat **Recent workflow runs** → harus ada deployment yang berhasil

2. **Manual Trigger Workflow**:
   - Buka tab **Actions**
   - Klik workflow "Deploy to GitHub Pages"
   - Klik **Run workflow** → **Run workflow** lagi
   - Tunggu selesai

3. **Cek Repository Name**:
   - Pastikan repository name adalah `FE_HCI` (bukan `FE_HCAI` atau lainnya)
   - Base path harus sesuai dengan repository name

4. **Coba Build Lokal**:
   ```bash
   cd sistem_rekrutmen
   VITE_BASE_PATH=/FE_HCI/ npm run build
   ```
   - Cek apakah folder `dist/` terbuat
   - Cek apakah `dist/index.html` ada
   - Jika tidak ada, berarti ada masalah dengan build

## Kontak Support

Jika semua sudah dicoba tapi masih error:
1. Screenshot error di browser
2. Screenshot log workflow (step yang gagal)
3. Screenshot Settings → Pages
4. Kirim ke developer untuk debugging lebih lanjut

