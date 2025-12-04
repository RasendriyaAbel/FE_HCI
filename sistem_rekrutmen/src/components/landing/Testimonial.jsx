import { useState } from 'react';
import './Testimonial.css';

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Mr. I Made Warsa, SH',
      position: 'Director',
      image: '👨‍💼',
      quote: 'Di PT Andal Aman Abadi, kami percaya bahwa kesuksesan datang dari kerja sama tim yang solid, inovasi yang berkelanjutan, dan integritas dalam setiap langkah. Kami berkomitmen untuk menciptakan lingkungan di mana setiap individu dapat berkembang dan mencapai potensi terbaik mereka. Bergabunglah dengan kami dan jadilah bagian dari perjalanan menuju keunggulan bersama.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="testimonial">
      <div className="testimonial-container">
        <button 
          className="carousel-btn prev" 
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          ←
        </button>
        
        <div className="testimonial-content">
          <div className="testimonial-image">
            <div className="image-wrapper">
              <div className="person-avatar">{current.image}</div>
            </div>
          </div>
          
          <div className="testimonial-text">
            <div className="testimonial-card">
              <p className="testimonial-quote">"{current.quote}"</p>
              <a href="#selengkapnya" className="read-more">selengkapnya >></a>
            </div>
          </div>
        </div>
        
        <button 
          className="carousel-btn next" 
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
      
      <div className="testimonial-info">
        <h3 className="testimonial-name">{current.name}</h3>
        <p className="testimonial-position">{current.position}</p>
      </div>
    </section>
  );
}

export default Testimonial;

