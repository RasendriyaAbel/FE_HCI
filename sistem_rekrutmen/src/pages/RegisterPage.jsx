import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser } from '../utils/userStorage';
import logoImage from '../assets/gambar/logo.png';
import vectorLogin from '../assets/gambar/vector_login.png';
import './RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    password: '',
    konfirmasiPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error untuk field ini
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap harus diisi';
    } else if (formData.namaLengkap.trim().length < 3) {
      newErrors.namaLengkap = 'Nama lengkap minimal 3 karakter';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.konfirmasiPassword) {
      newErrors.konfirmasiPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.konfirmasiPassword) {
      newErrors.konfirmasiPassword = 'Password dan konfirmasi password tidak cocok';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulasi delay untuk UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simpan user
    const result = saveUser({
      namaLengkap: formData.namaLengkap.trim(),
      email: formData.email.trim(),
      password: formData.password,
      name: formData.namaLengkap.trim() // Alias untuk kompatibilitas
    });

    setLoading(false);

    if (result.success) {
      // Register berhasil - arahkan ke login page dengan pesan sukses
      navigate('/login', { 
        state: { 
          message: 'Registrasi berhasil! Silakan login dengan akun Anda.' 
        } 
      });
    } else {
      setErrors({ email: result.message || 'Gagal mendaftar' });
    }
  };

  return (
    <div className="register-page">
      <div className="register-background">
        <img src={vectorLogin} alt="Vector Background" className="register-vector-bg" />
      </div>

      <div className="register-container">
        <div className="register-form">
          <div className="register-logo">
            <img src={logoImage} alt="TRIPLE Logo" className="register-logo-img" />
          </div>
          
          <h1 className="register-title">Daftarkan Akun Anda Sekarang</h1>
          <p className="register-subtitle">Isi bagian-bagian berikut</p>

          <form onSubmit={handleSubmit} className="register-form-content">
            <div className="form-group">
              <label htmlFor="namaLengkap" className="form-label">Nama Lengkap</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  id="namaLengkap"
                  name="namaLengkap"
                  className={`form-input ${errors.namaLengkap ? 'input-error' : ''}`}
                  placeholder="Masukkan Nama Lengkap anda disini"
                  value={formData.namaLengkap}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.namaLengkap && (
                <span className="field-error">{errors.namaLengkap}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="L22 6L12 13L2 6" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="Masukkan Email anda disini"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="Masukkan Password anda disini"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.password && (
                <span className="field-error">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="konfirmasiPassword" className="form-label">Konfirmasi Password</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="konfirmasiPassword"
                  name="konfirmasiPassword"
                  className={`form-input ${errors.konfirmasiPassword ? 'input-error' : ''}`}
                  placeholder="Masukkan Ulang Password anda disini"
                  value={formData.konfirmasiPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.konfirmasiPassword && (
                <span className="field-error">{errors.konfirmasiPassword}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={`register-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Memproses...
                </>
              ) : (
                'Daftar'
              )}
            </button>

            <p className="login-link">
              Sudah punya akun? <Link to="/login" className="login-link-text">Masuk sekarang</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="register-footer">
        <p>© 2025 PT Andal Aman Abadi</p>
      </footer>
    </div>
  );
}

export default RegisterPage;

