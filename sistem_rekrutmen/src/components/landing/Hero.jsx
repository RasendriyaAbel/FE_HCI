import gambarLanding from '../../assets/gambar/gambar_landing.png';
import './Hero.css';

function Hero() {
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
          <button className="hero-cta">
            Eksplor Lowongan Kami
          </button>
        </div>
        <div className="hero-image">
          <img src={gambarLanding} alt="Team" className="hero-image-img" />
        </div>
      </div>
    </section>
  );
}

export default Hero;

