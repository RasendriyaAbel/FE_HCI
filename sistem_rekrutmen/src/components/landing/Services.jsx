import { useState } from 'react';
import './Services.css';

function Services() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      title: 'SECURITY & SAFETY SERVICE',
      company: 'PT. ANDAL AMAN ABADI',
      location: 'Bali',
      description: 'Kami menyediakan layanan keamanan dan keselamatan profesional dengan operator yang terlatih dan berpengalaman dari latar belakang militer, kepolisian, dan komersial.',
      items: [
        'Estate Security',
        'Hotel Protection',
        'Residential Protection',
        'Corporate Function Security',
        'Bank Protection Security',
        'Supermarket Protection Services'
      ]
    }
  ];

  const totalSlides = services.length;

  return (
    <section className="services">
      <div className="services-container">
        <h2 className="section-title">Layanan Kami</h2>
        <div className="services-content">
          <div className="service-card">
            <div className="service-header">
              <h3 className="service-title">{services[currentSlide].title}</h3>
              <p className="service-company">{services[currentSlide].company}</p>
              <p className="service-location">{services[currentSlide].location}</p>
            </div>
            <p className="service-description">{services[currentSlide].description}</p>
            <ul className="service-list">
              {services[currentSlide].items.map((item, index) => (
                <li key={index} className="service-item">{item}</li>
              ))}
            </ul>
          </div>
          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;

