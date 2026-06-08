import React from 'react';
import HeroSection from './components/HeroSection';
import StatsGridSection from './components/StatsGridSection';
import SobreSection from './components/SobreSection';
import PratosGridSection from './components/PratosGridSection';
import ServicosCarouselSection from './components/ServicosCarouselSection';
import FormularioSection from './components/FormularioSection';
import MiceExperienceSections from './components/MiceExperienceSections';
import RodapeSection from './components/RodapeSection';
import WhatsAppFloatingButton from './components/WhatsAppFloatingButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection 
        title="Sofistic Buffet"
        slogan="Servimos com excelência"
      />
      <StatsGridSection />
      <div
        className="bg-sobre-servicos"
        style={{
          backgroundImage: `radial-gradient(circle at top center, rgba(227, 217, 146, 0.10), transparent 28%), linear-gradient(180deg, rgba(5, 5, 5, 0.78) 0%, rgba(11, 11, 11, 0.72) 46%, rgba(5, 5, 5, 0.82) 100%), url(${process.env.PUBLIC_URL}/backgroundsec3-4-5.jpg)`,
          backgroundSize: 'auto, auto, cover',
          backgroundPosition: 'center, center, center',
          backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
        }}
      >
        <SobreSection />
        <ServicosCarouselSection />
        <FormularioSection />
      </div>
      <MiceExperienceSections />
      <PratosGridSection />
      <RodapeSection />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
