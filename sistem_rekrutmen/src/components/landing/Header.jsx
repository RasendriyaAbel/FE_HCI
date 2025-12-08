import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getApplicationRoute } from '../../utils/applicationStatus';
import { isLoggedIn } from '../../utils/auth';
import LoginRequiredModal from '../LoginRequiredModal';
import logoImage from '../../assets/gambar/logo.png';
import './Header.css';

function Header() {
  const [activeButton, setActiveButton] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const lamaranRoute = getApplicationRoute();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setTimeout(() => setActiveButton(null), 200);
  };

  const handleNavClick = (e, path) => {
    // Cek apakah path memerlukan login
    const protectedPaths = ['/lamaran', '/profile', '/lowongan'];
    const requiresLogin = protectedPaths.some(protectedPath => 
      path && path.startsWith(protectedPath)
    );
    
    if (requiresLogin && !isLoggedIn()) {
      e.preventDefault();
      e.stopPropagation();
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileNavClick = (e, path) => {
    if (handleNavClick(e, path)) {
      setShowMobileMenu(false);
    }
  };

  const isLamaranActive = location.pathname.startsWith('/lamaran');
  const isAboutActive = location.pathname === '/tentang-kami';

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logoImage} alt="TRIPLE Logo" className="logo-image" />
        </Link>
        
        <button 
          className="mobile-menu-toggle"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
          <span className={`hamburger-line ${showMobileMenu ? 'active' : ''}`}></span>
        </button>
        
        <nav className={`nav-menu ${showMobileMenu ? 'mobile-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            Beranda
          </Link>
          <Link 
            to="/lowongan" 
            className={`nav-link ${location.pathname === '/lowongan' ? 'active' : ''}`}
            onClick={(e) => handleMobileNavClick(e, '/lowongan')}
          >
            Eksplor Lowongan
          </Link>
          <Link 
            to={lamaranRoute} 
            className={`nav-link ${isLamaranActive ? 'active' : ''}`}
            onClick={(e) => handleMobileNavClick(e, lamaranRoute)}
          >
            Lamaran
          </Link>
          <Link 
            to="/tentang-kami" 
            className={`nav-link ${isAboutActive ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
          >
            Tentang Kami
          </Link>
          
          <div className="mobile-header-actions">
            <Link to="/register" onClick={() => setShowMobileMenu(false)}>
              <button 
                className={`btn-primary mobile-btn ${activeButton === 'daftar' ? 'clicked' : ''}`}
                onClick={() => handleButtonClick('daftar')}
              >
                Daftar
              </button>
            </Link>
            <Link to="/login" onClick={() => setShowMobileMenu(false)}>
              <button 
                className={`btn-secondary mobile-btn ${activeButton === 'masuk' ? 'clicked' : ''}`}
                onClick={() => handleButtonClick('masuk')}
              >
                Masuk
              </button>
            </Link>
          </div>
        </nav>
        
        <div className="header-actions">
          <Link to="/register">
            <button 
              className={`btn-primary ${activeButton === 'daftar' ? 'clicked' : ''}`}
              onClick={() => handleButtonClick('daftar')}
            >
              Daftar
            </button>
          </Link>
          <Link to="/login">
            <button 
              className={`btn-secondary ${activeButton === 'masuk' ? 'clicked' : ''}`}
              onClick={() => handleButtonClick('masuk')}
            >
              Masuk
            </button>
          </Link>
        </div>
      </div>
      
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </header>
  );
}

export default Header;

