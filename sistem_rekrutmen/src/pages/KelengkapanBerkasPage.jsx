import { useNavigate } from 'react-router-dom';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './KelengkapanBerkasPage.css';

function KelengkapanBerkasPage() {
  const navigate = useNavigate();
  const documents = [
    { label: 'Pakta Integritas', fileName: 'Pakta_RasendriyaAbel.pdf' },
    { label: 'Transkrip Nilai', fileName: 'Transkrip_RasendriyaAbel.pdf' },
    { label: 'CV', fileName: 'CV_RasendriyaAbel.pdf' },
    { label: 'SKCK', fileName: 'SKCK_RasendriyaAbel.pdf' },
    { label: 'Ijazah', fileName: 'Ijazah_RasendriyaAbel.pdf' },
    { label: 'Portofolio', fileName: 'Portofolio_RasendriyaAbel.pdf' }
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
                <span>R</span>
              </div>
              <div className="kb-profile-info">
                <p className="kb-profile-name">Rasendriya Abel</p>
                <p className="kb-profile-email">rasendriyaabel@gmail.com</p>
              </div>
            </div>
          </section>

          <section className="kb-section">
            <h2 className="kb-section-title">Motivasi mendaftar</h2>
            <textarea
              className="kb-motivation-input"
              placeholder="Apa yang menjadi motivasi Anda untuk melamar di posisi ini ?"
              rows={4}
            />
          </section>

          <section className="kb-section">
            <h2 className="kb-section-title">Persyaratan Dokumen</h2>

            <div className="kb-documents-list">
              {documents.map((doc) => (
                <div key={doc.label} className="kb-document-block">
                  <p className="kb-doc-label">{doc.label}</p>
                  <div className="kb-doc-card">
                    <div className="kb-doc-left">
                      <div className="kb-doc-icon">
                        <span className="kb-doc-icon-line" />
                      </div>
                      <div className="kb-doc-text">
                        <p className="kb-doc-filename">{doc.fileName}</p>
                        <p className="kb-doc-meta">22 Oktober 2025 | 15.38</p>
                      </div>
                    </div>
                    <div className="kb-doc-actions">
                      <button type="button" className="kb-doc-view-button">
                        Lihat File
                      </button>
                      <button type="button" className="kb-doc-change-button">
                        Ganti File
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="kb-next-row">
            <button
              type="button"
              className="kb-next-button"
              onClick={() => navigate('/lamaran/review')}
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


