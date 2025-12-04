import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setLoginStatus } from '../utils/auth';
import logoImage from '../assets/gambar/logo.png';
import vectorLogin from '../assets/gambar/vector_login.png';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana: email dan password harus terisi
    if (formData.email.trim() !== '' && formData.password.trim() !== '') {
      // Login berhasil - simpan status login
      setLoginStatus(true, {
        email: formData.email,
        name: 'Rasendriya Abel' // Default name, bisa diambil dari response API
      });
      console.log('Login berhasil:', formData);
      navigate('/');
    } else {
      // Jika form kosong, tampilkan alert (opsional)
      alert('Mohon isi email dan password terlebih dahulu');
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
                  type="password"
                  id="password"
                  name="password"
                  className="form-input"
                  placeholder="Masukkan Password anda disini"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <a href="#forgot" className="forgot-password">Lupa Password?</a>
            </div>

            <button type="submit" className="login-button">
              Masuk
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

