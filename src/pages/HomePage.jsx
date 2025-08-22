// src/pages/HomePage.jsx
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProjects from '../components/FeaturedProjects';
import Benefits from '../components/Benefits';
import CommunityGallery from '../components/CommunityGallery';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <Benefits />
        <CommunityGallery />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;