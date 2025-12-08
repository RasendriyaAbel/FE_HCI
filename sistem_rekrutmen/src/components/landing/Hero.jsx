import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/auth';
import LoginRequiredModal from '../LoginRequiredModal';
import gambarLanding from '../../assets/gambar/gambar_landing.png';
import './Hero.css';

function Hero() {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      setShowLoginModal(true);
    } else {
      navigate('/lowongan');
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Ayo Memulai Karir Bersama Kami
          </h1>
          <p className="hero-subtitle">
            Bersama kita membangun potensi mulai dari awal hingga akhir yang tak terbatas
          </p>
          <button 
            type="button"
            className="hero-cta"
            onClick={handleExploreClick}
          >
            Eksplor Lowongan Kami
          </button>
        </div>
        <div className="hero-image">
          <img src={gambarLanding} alt="Team" className="hero-image-img" />
        </div>
      </div>
      
      <LoginRequiredModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </section>
  );
}

export default Hero;

