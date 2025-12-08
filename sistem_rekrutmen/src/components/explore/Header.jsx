import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getApplicationRoute } from '../../utils/applicationStatus';
import { isLoggedIn, logout, getUserData } from '../../utils/auth';
import LoginRequiredModal from '../LoginRequiredModal';
import logoImage from '../../assets/gambar/logo.png';
import './Header.css';

function Header() {
  const [activeButton, setActiveButton] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lamaranRoute = getApplicationRoute();
  const userData = getUserData();

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

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleMobileNavClick = (e, path) => {
    if (handleNavClick(e, path)) {
      setShowMobileMenu(false);
    }
  };

  const handleProfileLinkClick = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
    // Reload page untuk update state
    window.location.reload();
  };

  // Close dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const isLamaranActive = location.pathname.startsWith('/lamaran');
  const isAboutActive = location.pathname === '/tentang-kami';
  const userName = userData?.name || 'Rasendriya Abel';

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
        </nav>
        
        <div className="header-actions">
          <div 
            className="user-profile" 
            onClick={handleProfileClick}
            ref={dropdownRef}
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <div className="user-icon">👤</div>
            <span className="user-name">{userName}</span>
            
            {showDropdown && (
              <div className="user-dropdown">
                <Link
                  to="/profile"
                  className="dropdown-profile-link"
                  onClick={handleProfileLinkClick}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <button 
                  type="button"
                  className="dropdown-logout-btn"
                  onClick={handleLogout}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
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

