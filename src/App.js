import React from 'react';
import HeroSection from './components/HeroSection';
import StatsGridSection from './components/StatsGridSection';
import SobreSection from './components/SobreSection';
import PratosGridSection from './components/PratosGridSection';
import ServicosCarouselSection from './components/ServicosCarouselSection';
import FormularioSection from './components/FormularioSection';
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
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)), url(${process.env.PUBLIC_URL}/backgroundsec3-4-5.jpg)`,
        }}
      >
        <SobreSection />
        <ServicosCarouselSection />
        <FormularioSection />
      </div>
      <PratosGridSection />
      <RodapeSection />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default App;
