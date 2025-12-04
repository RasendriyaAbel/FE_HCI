import { useState } from 'react';
import './Testimonial.css';

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Mr. John Doe',
      position: 'Human Resources Development',
      image: '👨‍💼',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
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

