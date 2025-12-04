import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './StatusLamaranPage.css';

function StatusLamaranPage() {
  const steps = [
    {
      title: 'Seleksi Administrasi',
      description: 'Berkas anda sedang divalidasi oleh tim rekruter'
    },
    {
      title: 'Tes Kemampuan Akademik',
      description: ''
    },
    {
      title: 'Wawancara User dan HRD',
      description: ''
    },
    {
      title: 'Onboarding',
      description: ''
    }
  ];

  return (
    <div className="sl-page">
      <Header />

      <main className="sl-content">
        <section className="sl-layout">
          <aside className="sl-summary-card">
            <div className="sl-summary-header">
              <div className="sl-avatar-circle">
                <span>R</span>
              </div>
              <div>
                <p className="sl-name">Rasendriya Abel</p>
                <p className="sl-email">rasendriyaabel@gmail.com</p>
              </div>
            </div>
            <div className="sl-position-box">
              <p className="sl-position-title">Security Engineer</p>
              <p className="sl-position-meta">Onsite | Bali, Indonesia</p>
            </div>
            <button type="button" className="sl-status-badge">
              Seleksi Administrasi
            </button>
          </aside>

          <section className="sl-status-card">
            <h1 className="sl-status-title">Status Lamaran</h1>
            <div className="sl-timeline-wrapper">
              <div className="sl-timeline">
                {steps.map((step, index) => (
                  <div key={step.title} className="sl-timeline-item">
                    <div className="sl-timeline-line-container">
                      <span className="sl-timeline-dot" />
                      {index < steps.length - 1 && (
                        <span className="sl-timeline-line" />
                      )}
                    </div>
                    <div className="sl-timeline-text">
                      <p className="sl-step-title">{step.title}</p>
                      {step.description && (
                        <p className="sl-step-description">{step.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default StatusLamaranPage;


