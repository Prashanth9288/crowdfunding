import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeaturedCampaigns from './components/FeaturedCampaigns';
import Community from './components/Community';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-purple-100 selection:text-purple-900">
      <Navbar />
      <div className="flex flex-col">
        <Hero />
        <HowItWorks />
        <FeaturedCampaigns />
        <Community />
        <Testimonials />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
