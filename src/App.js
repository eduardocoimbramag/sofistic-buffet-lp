import React from 'react';
import HeroSection from './components/HeroSection';
import StatsGridSection from './components/StatsGridSection';
import SobreSection from './components/SobreSection';
import PratosGridSection from './components/PratosGridSection';
import ServicosCarouselSection from './components/ServicosCarouselSection';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection 
        title="Buffet Elegance"
        slogan="Sabores únicos para momentos especiais"
      />
      <StatsGridSection />
      <SobreSection />
      <PratosGridSection />
      <ServicosCarouselSection />
    </div>
  );
}

export default App;
