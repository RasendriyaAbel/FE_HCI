import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import { setApplicationStatus, APPLICATION_STEPS } from '../utils/applicationStatus';
import LoginRequiredModal from '../components/LoginRequiredModal';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './DetailLowonganPage.css';

function DetailLowonganPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Cek apakah user sudah login
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }
    // Jika sudah login, tampilkan modal konfirmasi
    setShowConfirm(true);
  };

  const handleCloseModal = () => {
    setShowConfirm(false);
  };

  const handleGoToProfile = () => {
    setShowConfirm(false);
    navigate('/profile');
  };

  const handleContinueApplication = () => {
    setShowConfirm(false);
    setApplicationStatus(APPLICATION_STEPS.KELENGKAPAN_BERKAS);
    navigate('/lamaran/kelengkapan-berkas');
  };

  return (
    <div className="detail-lowongan-page">
      <Header />

      <main className="detail-lowongan-content">
        <section className="detail-lowongan-card">
          <header className="detail-lowongan-header">
            <div>
              <h1 className="detail-job-title">Security Engineer</h1>
              <p className="detail-job-meta">
                Onsite | Bali, Indonesia | 7 hari yang lalu
              </p>
              <p className="detail-job-upload">
                Diunggah: <span>10 November 2025</span>
              </p>
              <p className="detail-job-closing">
                Penutupan: <span>17 November 2025</span>
              </p>
            </div>

            <div className="detail-job-badge-wrapper">
              <span className="detail-job-badge">Full Time</span>
            </div>
          </header>

          <div className="detail-lowongan-actions">
            <button
              type="button"
              className="detail-apply-button"
              onClick={handleApplyClick}
            >
              Lamar Sekarang
            </button>
            <button 
              type="button" 
              className="detail-save-button"
              onClick={() => {
                if (!isLoggedIn()) {
                  setShowLoginModal(true);
                } else {
                  // Logic untuk simpan lowongan
                  alert('Lowongan berhasil disimpan!');
                }
              }}
            >
              Simpan Lowongan Kerja
            </button>
          </div>

          <section className="detail-section">
            <h2 className="detail-section-title">Persyaratan Dokumen</h2>
            <div className="detail-requirements-box">
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

          <section className="detail-section">
            <h2 className="detail-section-title">Tentang Pekerjaan</h2>
            <div className="detail-description-box">
              <p>
                <strong>Lorem ipsum dolor sit amet consectetur adipiscing elit.</strong>
              </p>
              <ol>
                <li>
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
                  cursus mi pretium tellus duis convallis.
                </li>
                <li>Tempus leo eu aenean sed diam urna tempor.</li>
                <li>
                  Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
                  Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
                  hendrerit semper vel class aptent taciti sociosqu.
                </li>
              </ol>
              <p>
                <strong>Ad litora torquent per conubia nostra inceptos himenaeos.</strong>
              </p>
              <ol start="1">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                  faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
                  pretium tellus duis convallis.
                </li>
                <li>
                  Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
                  fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
                  malesuada lacinia integer nunc posuere.
                </li>
                <li>
                  Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora
                  torquent per conubia nostra inceptos himenaeos. Lorem ipsum dolor
                  sit amet consectetur adipiscing elit.
                </li>
              </ol>
              <p>
                Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
                cursus mi pretium tellus duis convallis.
              </p>
            </div>
          </section>
        </section>
      </main>

      {showConfirm && (
        <div className="detail-modal-backdrop" onClick={handleCloseModal}>
          <div
            className="detail-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="detail-modal-title">Sudah mengisi profil?</h3>
            <p className="detail-modal-text">
              Sebelum melamar lowongan, pastikan data profil Anda sudah terisi dengan
              lengkap.
            </p>
            <div className="detail-modal-actions">
              <button
                type="button"
                className="detail-modal-secondary"
                onClick={handleGoToProfile}
              >
                Belum, isi profil dulu
              </button>
              <button
                type="button"
                className="detail-modal-primary"
                onClick={handleContinueApplication}
              >
                Sudah, lanjut melamar
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      <Footer />
    </div>
  );
}

export default DetailLowonganPage;


