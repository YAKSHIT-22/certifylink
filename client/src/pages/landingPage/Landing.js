import React from "react";
import HeroSection from "../../components/pagesComponents/landingPage/HeroSection";
import AboutSection from "../../components/pagesComponents/landingPage/AboutSection";
import ContactSection from "../../components/pagesComponents/landingPage/ContactSection";

const Landing = () => {
  
  return (
    <main className="w-screen isolate">
    <HeroSection/>
    <AboutSection/>
    <ContactSection/>
    </main>
  );
};

export default Landing;
