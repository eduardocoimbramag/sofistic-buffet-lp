import React from 'react';
import HeroSection from './components/HeroSection';
import StatsGridSection from './components/StatsGridSection';
import SobreSection from './components/SobreSection';
import PratosGridSection from './components/PratosGridSection';
import ServicosCarouselSection from './components/ServicosCarouselSection';
import FormularioSection from './components/FormularioSection';
import RodapeSection from './components/RodapeSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection 
        title="Sofistic Buffet"
        slogan="Servimos com excelência"
      />
      <StatsGridSection />
      <SobreSection />
      <ServicosCarouselSection />
      <PratosGridSection />
      <FormularioSection />
      <RodapeSection />
    </div>
  );
}

export default App;
