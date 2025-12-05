import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import { setApplicationStatus, APPLICATION_STEPS } from '../utils/applicationStatus';
import { isProfileComplete } from '../utils/profileStorage';
import LoginRequiredModal from '../components/LoginRequiredModal';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import { getJobById } from '../data/jobsData';
import './DetailLowonganPage.css';

function DetailLowonganPage() {
  const { id } = useParams();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobData = getJobById(id);
    if (jobData) {
      setJob(jobData);
    } else {
      navigate('/lowongan', { replace: true });
    }
  }, [id, navigate]);

  if (!job) {
    return null;
  }

  // Calculate days ago
  const getDaysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'Hari ini' : `${diffDays} hari yang lalu`;
  };

  const handleApplyClick = () => {
    // Cek apakah user sudah login
    if (!isLoggedIn()) {
      setShowLoginModal(true);
      return;
    }
    
    // Cek apakah profile sudah lengkap
    if (!isProfileComplete()) {
      // Jika profile belum lengkap, langsung redirect ke profile
      navigate('/profile');
      return;
    }
    
    // Jika sudah login dan profile lengkap, tampilkan modal konfirmasi
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
            <div className="detail-header-content">
              <h1 className="detail-job-title">{job.title}</h1>
              <p className="detail-job-meta">
                {job.type} | {job.location} | {getDaysAgo(job.uploadDate)}
              </p>
              <p className="detail-job-upload">
                Diunggah: <span>{job.displayDate}</span>
              </p>
              <p className="detail-job-closing">
                Penutupan: <span>{job.closingDate}</span>
              </p>
            </div>

            <div className="detail-job-badge-wrapper">
              <span className="detail-job-badge">{job.employmentType}</span>
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
              {job.documents.length > 0 && (
                <>
                  {job.documents.map((doc, index) => (
                    <div key={index} className="detail-document-item">{doc}</div>
                  ))}
                </>
              )}
            </div>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title">Tentang Pekerjaan</h2>
            <div className="detail-description-box">
              <p>
                <strong>{job.description.overview}</strong>
              </p>
              
              <p style={{ marginTop: '20px', marginBottom: '12px' }}>
                <strong>Tanggung Jawab:</strong>
              </p>
              <ol>
                {job.description.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ol>

              <p style={{ marginTop: '20px', marginBottom: '12px' }}>
                <strong>Persyaratan:</strong>
              </p>
              <ol>
                {job.description.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ol>
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
            <h3 className="detail-modal-title">Lanjutkan Melamar?</h3>
            <p className="detail-modal-text">
              Data profil Anda sudah lengkap. Apakah Anda ingin melanjutkan untuk melamar lowongan ini?
            </p>
            <div className="detail-modal-actions">
              <button
                type="button"
                className="detail-modal-secondary"
                onClick={handleCloseModal}
              >
                Batal
              </button>
              <button
                type="button"
                className="detail-modal-primary"
                onClick={handleContinueApplication}
              >
                Ya, Lanjutkan
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


