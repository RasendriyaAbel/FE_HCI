import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { setLoginStatus } from '../utils/auth';
import { validateLogin } from '../utils/userStorage';
import logoImage from '../assets/gambar/logo.png';
import vectorLogin from '../assets/gambar/vector_login.png';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Cek jika ada message dari register page
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear message setelah 5 detik
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error ketika user mulai mengetik
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Validasi form
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Mohon isi email dan password terlebih dahulu');
      setLoading(false);
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Format email tidak valid');
      setLoading(false);
      return;
    }

    // Simulasi delay untuk UX
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validasi login
    const result = validateLogin(formData.email, formData.password);
    
    if (result.success) {
      // Login berhasil - simpan status login dengan data user
      setLoginStatus(true, {
        email: result.user.email,
        name: result.user.namaLengkap || result.user.name || 'User',
        id: result.user.id
      });
      
      // Redirect ke home
      navigate('/');
    } else {
      setError(result.message || 'Email atau password salah');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <img src={vectorLogin} alt="Vector Background" className="login-vector-bg" />
      </div>

      <div className="login-container">
        <div className="login-form">
          <div className="login-logo">
            <img src={logoImage} alt="TRIPLE Logo" className="login-logo-img" />
          </div>
          
          <h1 className="login-title">Masuk ke Akun</h1>
          <p className="login-subtitle">Selamat Datang</p>

          <form onSubmit={handleSubmit} className="login-form-content">
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
                  className="form-input"
                  placeholder="Masukkan Email anda disini"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  className={`form-input ${error && error.includes('password') ? 'input-error' : ''}`}
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
            </div>

            {successMessage && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                <span>{successMessage}</span>
              </div>
            )}

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="form-footer">
              <a href="#forgot" className="forgot-password">Lupa Password?</a>
            </div>

            <button 
              type="submit" 
              className={`login-button ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>

            <p className="register-link">
              Belum punya akun? <Link to="/register" className="register-link-text">Daftar disini</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="login-footer">
        <p>© 2025 PT Andal Aman Abadi</p>
      </footer>
    </div>
  );
}

export default LoginPage;


