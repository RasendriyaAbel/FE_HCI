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
        
        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Beranda
          </Link>
          <Link 
            to="/lowongan" 
            className={`nav-link ${location.pathname === '/lowongan' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/lowongan')}
          >
            Eksplor Lowongan
          </Link>
          <Link 
            to={lamaranRoute} 
            className={`nav-link ${isLamaranActive ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, lamaranRoute)}
          >
            Lamaran
          </Link>
          <Link 
            to="/tentang-kami" 
            className={`nav-link ${isAboutActive ? 'active' : ''}`}
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
                <button 
                  type="button"
                  className="dropdown-logout-btn"
                  onClick={handleLogout}
                >
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

