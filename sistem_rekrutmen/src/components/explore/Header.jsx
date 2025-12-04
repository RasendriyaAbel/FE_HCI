import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../assets/gambar/logo.png';
import './Header.css';

function Header() {
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    setTimeout(() => setActiveButton(null), 200);
  };

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
          >
            Eksplor Lowongan
          </Link>
          <a href="#lamaran" className="nav-link">Lamaran</a>
          <a href="#tentang" className="nav-link">Tentang Kami</a>
        </nav>
        
        <div className="header-actions">
          <div className="user-profile">
            <div className="user-icon">👤</div>
            <span className="user-name">Rasendriya Abel</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

