
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import ExampleOutput from '../components/ExampleOutput';
import Features from '../components/Features'; 
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ninja-dark text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <ExampleOutput />
        <Features />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
