import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import WhyJoinUs from '../components/landing/WhyJoinUs';
import Services from '../components/landing/Services';
import Testimonial from '../components/landing/Testimonial';
import Footer from '../components/landing/Footer';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <WhyJoinUs />
      <Services />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default LandingPage;

