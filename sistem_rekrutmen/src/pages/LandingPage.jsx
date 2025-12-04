import { isLoggedIn } from '../utils/auth';
import Header from '../components/explore/Header';
import LandingHeader from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import WhyJoinUs from '../components/landing/WhyJoinUs';
import CareerPath from '../components/landing/CareerPath';
import Testimonial from '../components/landing/Testimonial';
import Footer from '../components/landing/Footer';
import './LandingPage.css';

function LandingPage() {
  const loggedIn = isLoggedIn();

  return (
    <div className="landing-page">
      {loggedIn ? <Header /> : <LandingHeader />}
      <Hero />
      <WhyJoinUs />
      {loggedIn && <CareerPath />}
      <Testimonial />
      <Footer />
    </div>
  );
}

export default LandingPage;

