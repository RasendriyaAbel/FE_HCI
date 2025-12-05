import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setApplicationStatus, APPLICATION_STEPS } from '../utils/applicationStatus';
import { getPersonalData, getDocumentsData } from '../utils/profileStorage';
import { getUserData } from '../utils/auth';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './KelengkapanBerkasPage.css';

function KelengkapanBerkasPage() {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState(null);
  const [documents, setDocuments] = useState({});
  const [motivation, setMotivation] = useState('');

  useEffect(() => {
    // Load data dari profile
    const savedPersonalData = getPersonalData();
    const savedDocuments = getDocumentsData();
    const authUser = getUserData();

    if (savedPersonalData) {
      setPersonalData(savedPersonalData);
    } else if (authUser) {
      // Fallback ke data auth jika profile belum diisi
      setPersonalData({
        namaLengkap: authUser.name || 'User',
        email: authUser.email || ''
      });
    }

    if (savedDocuments) {
      setDocuments(savedDocuments);
    }
  }, []);

  const handleNext = () => {
    setApplicationStatus(APPLICATION_STEPS.REVIEW);
    navigate('/lamaran/review');
  };

  // Get required documents from job (we'll need to get this from context or route state)
  // For now, using default documents
  const requiredDocuments = [
    'Pakta Integritas',
    'Transkrip Nilai',
    'CV',
    'SKCK',
    'Ijazah',
    'Portofolio'
  ];

  return (
    <div className="kb-page">
      <Header />

      <main className="kb-content">
        <section className="kb-card">
          <header className="kb-header">
            <h1 className="kb-title">Kelengkapan Berkas</h1>
            <p className="kb-subtitle">
              Pastikan seluruh informasi dan berkas yang ada di bawah sudah benar dan
              sesuai dengan data anda.
            </p>
          </header>

          <div className="kb-steps">
            <div className="kb-step kb-step-active">
              <span className="kb-step-number">1</span>
              <span className="kb-step-text">Cek Kelengkapan Berkas</span>
            </div>
            <div className="kb-step">
              <span className="kb-step-number">2</span>
              <span className="kb-step-text">Review Lamaran</span>
            </div>
          </div>

          <section className="kb-section">
            <h2 className="kb-section-title">Data Pribadi</h2>
            <div className="kb-profile-card">
              <div className="kb-profile-avatar">
                <span>{personalData?.namaLengkap?.charAt(0)?.toUpperCase() || 'U'}</span>
              </div>
              <div className="kb-profile-info">
                <p className="kb-profile-name">{personalData?.namaLengkap || 'User'}</p>
                <p className="kb-profile-email">{personalData?.email || ''}</p>
              </div>
            </div>
          </section>

          <section className="kb-section">
            <h2 className="kb-section-title">Motivasi mendaftar</h2>
            <textarea
              className="kb-motivation-input"
              placeholder="Apa yang menjadi motivasi Anda untuk melamar di posisi ini ?"
              rows={4}
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </section>

          <section className="kb-section">
            <h2 className="kb-section-title">Persyaratan Dokumen</h2>

            <div className="kb-documents-list">
              {requiredDocuments.map((docLabel) => {
                const docData = documents[docLabel];
                return (
                  <div key={docLabel} className="kb-document-block">
                    <p className="kb-doc-label">{docLabel}</p>
                    <div className="kb-doc-card">
                      <div className="kb-doc-left">
                        <div className="kb-doc-icon">
                          <span className="kb-doc-icon-line" />
                        </div>
                        <div className="kb-doc-text">
                          {docData && docData.fileName ? (
                            <>
                              <p className="kb-doc-filename">{docData.fileName}</p>
                              <p className="kb-doc-meta">{docData.uploadDate || ''}</p>
                            </>
                          ) : (
                            <p className="kb-doc-filename" style={{ color: '#999' }}>
                              Dokumen belum diunggah
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="kb-doc-actions">
                        {docData && docData.fileName ? (
                          <>
                            <button type="button" className="kb-doc-view-button">
                              Lihat File
                            </button>
                            <button type="button" className="kb-doc-change-button">
                              Ganti File
                            </button>
                          </>
                        ) : (
                          <button 
                            type="button" 
                            className="kb-doc-view-button"
                            onClick={() => navigate('/profile?tab=dokumen')}
                          >
                            Upload File
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="kb-next-row">
            <button
              type="button"
              className="kb-next-button"
              onClick={handleNext}
            >
              Selanjutnya
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default KelengkapanBerkasPage;


