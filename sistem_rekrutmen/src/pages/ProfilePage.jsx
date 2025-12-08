import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/explore/Header';
import Footer from '../components/landing/Footer';
import { saveProfileData, getProfileData } from '../utils/profileStorage';
import { getUserData } from '../utils/auth';
import { getLastViewedJob } from '../utils/jobStorage';
import { autoFillData, generateDummyFile, dummyDocumentFiles } from '../utils/autoFillData';
import './ProfilePage.css';

function ProfilePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('data-pribadi');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

  useEffect(() => {
    // Check if there's a tab parameter in URL
    const tabParam = searchParams.get('tab');
    if (tabParam === 'dokumen') {
      setActiveTab('dokumen');
    }
  }, [searchParams]);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Load existing profile data
  const existingProfile = getProfileData();
  const authUser = getUserData();
  
  const [personalData, setPersonalData] = useState({
    tentangSaya: existingProfile?.personalData?.tentangSaya || '',
    namaLengkap: existingProfile?.personalData?.namaLengkap || authUser?.name || '',
    tanggalLahir: existingProfile?.personalData?.tanggalLahir || '',
    jenisKelamin: existingProfile?.personalData?.jenisKelamin || '',
    email: existingProfile?.personalData?.email || authUser?.email || '',
    alamatTinggal: existingProfile?.personalData?.alamatTinggal || '',
    alamatDomisili: existingProfile?.personalData?.alamatDomisili || ''
  });

  const [documents, setDocuments] = useState(
    existingProfile?.documents || {}
  );

  const documentItems = [
    'Pakta Integritas',
    'Portofolio',
    'CV',
    'Transkrip Nilai',
    'SKCK',
    'Ijazah',
    'Dokumen lainnya'
  ];

  const handlePersonalDataChange = (field, value) => {
    setPersonalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDocumentUpload = (docLabel, file) => {
    if (file) {
      const fileName = file.name;
      const uploadDate = new Date().toLocaleString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      setDocuments(prev => ({
        ...prev,
        [docLabel]: {
          fileName,
          uploadDate,
          file: file // Store file object for later use
        }
      }));
    }
  };

  // Auto-fill handler untuk input fields
  const handleAutoFill = (field, value) => {
    if (!personalData[field] || personalData[field] === '') {
      handlePersonalDataChange(field, value);
    }
  };

  // Auto-fill handler untuk dokumen
  const handleAutoFillDocument = (docLabel) => {
    if (!documents[docLabel] || !documents[docLabel].fileName) {
      const dummyFile = generateDummyFile(dummyDocumentFiles[docLabel] || `${docLabel.toLowerCase().replace(/\s+/g, '_')}.pdf`);
      handleDocumentUpload(docLabel, dummyFile);
    }
  };

  const handleSavePersonalData = () => {
    const profileData = {
      personalData,
      documents: documents || {}
    };
    saveProfileData(profileData);
    setSaveMessage('Data pribadi berhasil disimpan!');
    // Tampilkan popup konfirmasi setelah simpan
    setShowSaveConfirmation(true);
  };

  const handleSaveDocuments = () => {
    const profileData = {
      personalData: personalData || {},
      documents
    };
    saveProfileData(profileData);
    setSaveMessage('Dokumen berhasil disimpan!');
    // Tampilkan popup konfirmasi setelah simpan
    setShowSaveConfirmation(true);
  };

  const handleGoToLastJob = () => {
    setShowSaveConfirmation(false);
    const lastJob = getLastViewedJob();
    if (lastJob && lastJob.url) {
      navigate(lastJob.url);
    } else {
      navigate('/lowongan');
    }
  };

  const handleGoToHome = () => {
    setShowSaveConfirmation(false);
    navigate('/');
  };

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

                  {saveMessage && (
                    <div className="profile-save-message" style={{
                      padding: '12px',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      fontSize: '14px'
                    }}>
                      {saveMessage}
                    </div>
                  )}

                  <div className="profile-field-group">
                    <label htmlFor="tentang-saya" className="profile-label">
                      Tentang Saya
                    </label>
                    <textarea
                      id="tentang-saya"
                      className="profile-textarea"
                      placeholder="Tuliskan deskripsi mengenai diri anda... (maks:1000 kata)"
                      rows={6}
                      value={personalData.tentangSaya}
                      onChange={(e) => handlePersonalDataChange('tentangSaya', e.target.value)}
                      onClick={() => handleAutoFill('tentangSaya', autoFillData.profile.tentangSaya)}
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
                      value={personalData.namaLengkap}
                      onChange={(e) => handlePersonalDataChange('namaLengkap', e.target.value)}
                      onClick={() => handleAutoFill('namaLengkap', autoFillData.profile.namaLengkap)}
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
                        value={personalData.tanggalLahir}
                        onChange={(e) => handlePersonalDataChange('tanggalLahir', e.target.value)}
                        onClick={() => handleAutoFill('tanggalLahir', autoFillData.profile.tanggalLahir)}
                      />
                    </div>
                    <div className="profile-field-group">
                      <label htmlFor="jenis-kelamin" className="profile-label">
                        Jenis Kelamin
                      </label>
                      <select
                        id="jenis-kelamin"
                        className="profile-input profile-select"
                        value={personalData.jenisKelamin}
                        onChange={(e) => handlePersonalDataChange('jenisKelamin', e.target.value)}
                        onClick={() => !personalData.jenisKelamin && handleAutoFill('jenisKelamin', autoFillData.profile.jenisKelamin)}
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
                      value={personalData.email}
                      onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                      onClick={() => handleAutoFill('email', autoFillData.profile.email)}
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
                      value={personalData.alamatTinggal}
                      onChange={(e) => handlePersonalDataChange('alamatTinggal', e.target.value)}
                      onClick={() => handleAutoFill('alamatTinggal', autoFillData.profile.alamatTinggal)}
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
                      value={personalData.alamatDomisili}
                      onChange={(e) => handlePersonalDataChange('alamatDomisili', e.target.value)}
                      onClick={() => handleAutoFill('alamatDomisili', autoFillData.profile.alamatDomisili)}
                    />
                  </div>

                  <div className="profile-submit-row">
                    <button 
                      type="button" 
                      className="profile-submit-button"
                      onClick={handleSavePersonalData}
                    >
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

                  {saveMessage && (
                    <div className="profile-save-message" style={{
                      padding: '12px',
                      backgroundColor: '#d1fae5',
                      color: '#065f46',
                      borderRadius: '8px',
                      marginBottom: '20px',
                      fontSize: '14px'
                    }}>
                      {saveMessage}
                    </div>
                  )}

                  <div className="profile-documents-list">
                    {documentItems.map((label) => {
                      const docData = documents[label];
                      return (
                        <div key={label} className="profile-document-block">
                          <p className="profile-doc-label">{label}</p>
                          <div className="profile-doc-card">
                            <div className="profile-doc-left">
                              <div className="profile-doc-icon">
                                <span className="profile-doc-icon-line" />
                              </div>
                              <span className="profile-doc-status">
                                {docData && docData.fileName 
                                  ? docData.fileName 
                                  : 'Dokumen belum diunggah'}
                              </span>
                            </div>
                            <label 
                              className="profile-doc-upload-button" 
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => {
                                if (!docData || !docData.fileName) {
                                  e.preventDefault();
                                  handleAutoFillDocument(label);
                                }
                              }}
                            >
                              {docData && docData.fileName ? 'Ganti File' : 'Upload File'}
                              <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                  if (e.target.files[0]) {
                                    handleDocumentUpload(label, e.target.files[0]);
                                  }
                                }}
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="profile-submit-row">
                    <button 
                      type="button" 
                      className="profile-submit-button"
                      onClick={handleSaveDocuments}
                    >
                      Simpan Data
                    </button>
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </main>

      {showSaveConfirmation && (
        <div className="profile-modal-backdrop" onClick={() => setShowSaveConfirmation(false)}>
          <div
            className="profile-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="profile-modal-title">Data Berhasil Disimpan</h3>
            <p className="profile-modal-text">
              Data profil Anda telah berhasil disimpan. Apakah Anda ingin kembali ke halaman lowongan terakhir atau kembali ke beranda?
            </p>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="profile-modal-secondary"
                onClick={handleGoToHome}
              >
                Kembali ke Beranda
              </button>
              <button
                type="button"
                className="profile-modal-primary"
                onClick={handleGoToLastJob}
              >
                Kembali ke Lowongan
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ProfilePage;


