import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  title = "Buffet Elegance", 
  slogan = "Sabores únicos para momentos especiais",
  className = ""
}) => {
  // Configurações de animação
  const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 }
  };

  const sloganAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 0.5, duration: 0.8 }
  };

  const heroStyles = {
    width: '100%',
    minHeight: '85vh',
    height: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 1.5rem'
  };

  const containerStyles = {
    textAlign: 'center',
    maxWidth: '64rem',
    margin: '0 auto'
  };

  const titleStyles = {
    fontFamily: "'Playfair Display', serif",
    color: '#e3d992',
    fontWeight: 'bold',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    fontSize: 'clamp(2.25rem, 8vw, 6rem)',
    willChange: 'transform'
  };

  const sloganStyles = {
    color: '#ffffff',
    fontFamily: 'sans-serif',
    fontSize: 'clamp(0.875rem, 2vw, 1.25rem)',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    maxWidth: '32rem',
    margin: '0 auto',
    willChange: 'transform'
  };

  return (
    <section 
      style={heroStyles}
      className={className}
      aria-label="Hero Section"
    >
      <div style={containerStyles}>
        {/* Título Principal */}
        <motion.h1
          style={titleStyles}
          {...titleAnimation}
        >
          {title}
        </motion.h1>

        {/* Slogan */}
        <motion.p
          style={sloganStyles}
          {...sloganAnimation}
        >
          {slogan}
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;