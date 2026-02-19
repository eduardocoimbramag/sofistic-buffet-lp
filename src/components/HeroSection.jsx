import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ 
  title = "Sofistic Buffet", 
  slogan = "Sabores únicos para momentos especiais",
  className = ""
}) => {
  // Configurações de animação
  const titleAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.5, duration: 1 }
  };

  const sloganAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay: 1, duration: 0.8 }
  };

  const heroStyles = {
    width: '100%',
    minHeight: '85vh',
    height: '100vh',
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
      className={`hero-section ${className}`}
      aria-label="Hero Section"
    >
      <style>{`
        .hero-section {
          position: relative;
          background-color: #000;
          background-image: url('/herobg.webp');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center top;
        }

        @media (min-width: 768px) {
          .hero-section {
            background-position: center center;
          }
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.70) 45%,
            rgba(0, 0, 0, 0.75) 100%
          );
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }
      `}</style>

      <div style={containerStyles} className="hero-content">
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