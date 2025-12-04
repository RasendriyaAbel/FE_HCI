import { useState } from 'react';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import './ProfilePage.css';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('data-pribadi');

  const documentItems = [
    'Pakta Integritas',
    'Portofolio',
    'CV',
    'Transkrip Nilai',
    'SKCK',
    'Ijazah',
    'Dokumen lainnya'
  ];

  return (
    <div className="profile-page">
      <Header />

      <main className="profile-content">
        <section className="profile-layout">
          <aside className="profile-summary-card">
            <div className="profile-avatar-circle">
              <span className="profile-avatar-initial">R</span>
            </div>
            <div className="profile-summary-text">
              <p className="profile-name">Rasendriya Abel</p>
              <p className="profile-email">rasendriyaabel@gmail.com</p>
            </div>
            <div className="profile-position-box">
              <p className="profile-position-title">Security Engineer</p>
              <p className="profile-position-meta">Onsite | Bali, Indonesia</p>
            </div>
            <button type="button" className="profile-selection-button">
              Seleksi Administrasi
            </button>
          </aside>

          <section className="profile-form-card">
            <div className="profile-tabs">
              <button
                type="button"
                className={`profile-tab ${
                  activeTab === 'data-pribadi' ? 'profile-tab-active' : ''
                }`}
                onClick={() => setActiveTab('data-pribadi')}
              >
                Data Pribadi
              </button>
              <button
                type="button"
                className={`profile-tab ${
                  activeTab === 'dokumen' ? 'profile-tab-active' : ''
                }`}
                onClick={() => setActiveTab('dokumen')}
              >
                Dokumen
              </button>
            </div>

            <div className="profile-form-inner">
              {activeTab === 'data-pribadi' && (
                <>
                  <h2 className="profile-section-title">Data Pribadi</h2>

                  <div className="profile-field-group">
                    <label htmlFor="tentang-saya" className="profile-label">
                      Tentang Saya
                    </label>
                    <textarea
                      id="tentang-saya"
                      className="profile-textarea"
                      placeholder="Tuliskan deskripsi mengenai diri anda... (maks:1000 kata)"
                      rows={6}
                    />
                  </div>

                  <div className="profile-field-group">
                    <label htmlFor="nama-lengkap" className="profile-label">
                      Nama Lengkap
                    </label>
                    <input
                      id="nama-lengkap"
                      className="profile-input"
                      type="text"
                      defaultValue="Rasendriya Abel"
                    />
                  </div>

                  <div className="profile-field-row">
                    <div className="profile-field-group">
                      <label htmlFor="tanggal-lahir" className="profile-label">
                        Tanggal Lahir
                      </label>
                      <input
                        id="tanggal-lahir"
                        className="profile-input profile-input-with-addon"
                        type="text"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    <div className="profile-field-group">
                      <label htmlFor="jenis-kelamin" className="profile-label">
                        Jenis Kelamin
                      </label>
                      <select
                        id="jenis-kelamin"
                        className="profile-input profile-select"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Pilih jenis kelamin anda...
                        </option>
                        <option value="laki-laki">Laki-laki</option>
                        <option value="perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>

                  <div className="profile-field-group">
                    <label htmlFor="email" className="profile-label">
                      Email
                    </label>
                    <input
                      id="email"
                      className="profile-input"
                      type="email"
                      defaultValue="rasendriyaabel@gmail.com"
                    />
                  </div>

                  <div className="profile-field-group">
                    <label htmlFor="alamat-tinggal" className="profile-label">
                      Alamat Tempat Tinggal
                    </label>
                    <input
                      id="alamat-tinggal"
                      className="profile-input"
                      type="text"
                      placeholder="Tuliskan alamat tempat tinggal yang anda tempati sekarang.."
                    />
                  </div>

                  <div className="profile-field-group">
                    <label htmlFor="alamat-domisili" className="profile-label">
                      Alamat Domisili
                    </label>
                    <input
                      id="alamat-domisili"
                      className="profile-input"
                      type="text"
                      placeholder="Tuliskan alamat tempat tinggal asal anda.."
                    />
                  </div>

                  <div className="profile-submit-row">
                    <button type="button" className="profile-submit-button">
                      Simpan Data
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'dokumen' && (
                <>
                  <h2 className="profile-section-title">Kelengkapan Dokumen</h2>
                  <p className="profile-doc-subtitle">
                    Lengkapi dokumen dibawah ini untuk mempermudah proses pendaftaran
                    lowongan
                  </p>

                  <div className="profile-documents-list">
                    {documentItems.map((label) => (
                      <div key={label} className="profile-document-block">
                        <p className="profile-doc-label">{label}</p>
                        <div className="profile-doc-card">
                          <div className="profile-doc-left">
                            <div className="profile-doc-icon">
                              <span className="profile-doc-icon-line" />
                            </div>
                            <span className="profile-doc-status">
                              Dokumen belum diunggah
                            </span>
                          </div>
                          <button
                            type="button"
                            className="profile-doc-upload-button"
                          >
                            Upload File
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="profile-submit-row">
                    <button type="button" className="profile-submit-button">
                      Simpan Data
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;


