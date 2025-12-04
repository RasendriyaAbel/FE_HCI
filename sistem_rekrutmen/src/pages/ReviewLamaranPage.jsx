import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './ReviewLamaranPage.css';

function ReviewLamaranPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleConfirmApply = () => {
    setShowConfirm(false);
    setShowSuccess(true);
  };

  const handleGoToStatus = () => {
    setShowSuccess(false);
    navigate('/lamaran/status');
  };

  return (
    <div className="rl-page">
      <Header />

      <main className="rl-content">
        <section className="rl-card">
          <header className="rl-header">
            <h1 className="rl-title">Kelengkapan Berkas</h1>
            <p className="rl-subtitle">
              Pastikan seluruh informasi dan berkas yang ada di bawah sudah benar dan
              sesuai dengan data anda.
            </p>
          </header>

          <div className="rl-steps">
            <div className="rl-step">
              <span className="rl-step-number">1</span>
              <span className="rl-step-text">Cek Kelengkapan Berkas</span>
            </div>
            <div className="rl-step rl-step-active">
              <span className="rl-step-number">2</span>
              <span className="rl-step-text">Review Lamaran</span>
            </div>
          </div>

          <section className="rl-section">
            <div className="rl-job-header">
              <div>
                <h2 className="rl-job-title">Security Engineer</h2>
                <p className="rl-job-meta">
                  Onsite | Bali, Indonesia | 7 hari yang lalu
                </p>
                <p className="rl-job-upload">
                  Diunggah: <span>10 November 2025</span>
                </p>
                <p className="rl-job-closing">
                  Penutupan: <span>17 November 2025</span>
                </p>
              </div>
              <span className="rl-job-badge">Full Time</span>
            </div>
          </section>

          <section className="rl-section">
            <h3 className="rl-section-title">Persyaratan Dokumen</h3>
            <div className="rl-doc-box">
              <ul>
                <li>Pakta Integritas</li>
                <li>Transkrip Nilai</li>
                <li>CV</li>
                <li>SKCK</li>
              </ul>
              <ul>
                <li>Ijazah</li>
                <li>Portofolio</li>
              </ul>
            </div>
          </section>

          <section className="rl-section">
            <h3 className="rl-section-title">Pernyataan Komitmen Pelamar</h3>
            <div className="rl-commitment-box">
              <ol className="rl-commitment-list">
                <li>
                  Menjalankan seluruh rangkaian proses yang berjalan dengan penuh
                  tanggung jawab, termasuk namun tidak terbatas pada proses seleksi,
                  pembekalan, dan pelaksanaan kontrak kerja.
                </li>
                <li>
                  Menjaga kerahasiaan data Perusahaan atas pihak manapun, serta tidak
                  mengungkapkan/mempublikasikan informasi rahasia kepada siapapun tanpa
                  persetujuan tertulis dari Perusahaan.
                </li>
              </ol>

              <label className="rl-agreement">
                <input type="checkbox" />
                <span>
                  Saya setuju dengan syarat dan ketentuan komitmen ini
                </span>
              </label>
            </div>
          </section>

          <div className="rl-actions">
            <button
              type="button"
              className="rl-back-button"
              onClick={() => navigate('/lamaran/kelengkapan-berkas')}
            >
              Kembali
            </button>
            <button
              type="button"
              className="rl-submit-button"
              onClick={handleSubmitClick}
            >
              Daftar Lowongan
            </button>
          </div>
        </section>
      </main>

      {showConfirm && (
        <div className="rl-modal-backdrop" onClick={handleCloseConfirm}>
          <div
            className="rl-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="rl-modal-title">Konfirmasi Pendaftaran</h3>
            <p className="rl-modal-text">
              Apakah Anda yakin ingin mendaftar pada lowongan <strong>Security Engineer</strong>?
            </p>
            <div className="rl-modal-actions">
              <button
                type="button"
                className="rl-modal-secondary"
                onClick={handleCloseConfirm}
              >
                Batal
              </button>
              <button
                type="button"
                className="rl-modal-primary"
                onClick={handleConfirmApply}
              >
                Ya, daftar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="rl-modal-backdrop" onClick={handleGoToStatus}>
          <div
            className="rl-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="rl-modal-title">Lamaran berhasil dikirim</h3>
            <p className="rl-modal-text">
              Terima kasih, lamaran Anda telah berhasil dikirim. Anda dapat memantau
              proses seleksi melalui halaman status lamaran.
            </p>
            <div className="rl-modal-actions rl-modal-actions-center">
              <button
                type="button"
                className="rl-modal-primary"
                onClick={handleGoToStatus}
              >
                Lihat Status Lamaran
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ReviewLamaranPage;


