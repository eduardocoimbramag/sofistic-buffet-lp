import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroSection = ({
  title = 'Sofistic Buffet',
  slogan = 'Sabores únicos para momentos especiais',
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion();

  const ornamentAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scaleX: 0 },
        animate: { opacity: 1, scaleX: 1 },
        transition: { delay: 0.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      };

  const titleAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { delay: 0.45, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      };

  const scrollAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.6, duration: 0.8 },
      };

  return (
    <section
      className={`hero-section ${className}`}
      aria-label="Hero Section"
    >
      <style>{`
        .hero-section {
          position: relative;
          width: 100%;
          min-height: 85vh;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 1.5rem;
          background-color: #000;
          background-image: url('/herobg.webp');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center top;
          overflow: hidden;
          isolation: isolate;
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
          background:
            radial-gradient(ellipse at 50% 35%, rgba(227, 217, 146, 0.10), transparent 55%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.65) 45%, rgba(0, 0, 0, 0.85) 100%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-section::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.45), transparent);
          z-index: 2;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 64rem;
          margin: 0 auto;
        }

        .hero-ornament {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1.5rem;
          color: #ffffff;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          font-size: 0.72rem;
          font-weight: 600;
          transform-origin: center;
        }

        .hero-ornament .line {
          width: clamp(28px, 6vw, 64px);
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
        }

        .hero-ornament .dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(227, 217, 146, 0.95);
          box-shadow: 0 0 12px rgba(227, 217, 146, 0.65);
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.05;
          margin: 0;
          font-size: clamp(2.5rem, 8.5vw, 6.5rem);
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          text-shadow: 0 12px 50px rgba(227, 217, 146, 0.18);
          will-change: transform, opacity, filter;
        }

        .hero-slogan {
          color: rgba(255, 255, 255, 0.92);
          font-family: sans-serif;
          font-size: clamp(0.875rem, 2vw, 1.25rem);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          max-width: 38rem;
          margin: 0 auto;
          will-change: transform, opacity;
          font-weight: 500;
        }

        .hero-scroll {
          position: absolute;
          left: 50%;
          bottom: 2.25rem;
          transform: translateX(-50%);
          z-index: 2;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
        }

        .hero-scroll-mouse {
          width: 22px;
          height: 36px;
          border: 1px solid rgba(227, 217, 146, 0.55);
          border-radius: 999px;
          position: relative;
          overflow: hidden;
        }

        .hero-scroll-mouse::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 6px;
          width: 3px;
          height: 8px;
          background: rgba(227, 217, 146, 0.9);
          border-radius: 999px;
          transform: translateX(-50%);
          animation: hero-scroll-dot 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }

        @keyframes hero-scroll-dot {
          0% {
            transform: translate(-50%, 0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          80% {
            transform: translate(-50%, 14px);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, 14px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-scroll-mouse::after {
            animation: none;
          }
        }
      `}</style>

      <div className="hero-content">
        <motion.h1 className="hero-title" {...titleAnim}>
          {title}
        </motion.h1>

        <motion.div className="hero-ornament" {...ornamentAnim}>
          <span className="line" />
          <span className="dot" aria-hidden="true" />
          <span>{slogan}</span>
          <span className="dot" aria-hidden="true" />
          <span className="line" />
        </motion.div>
      </div>

      <motion.div className="hero-scroll" {...scrollAnim} aria-hidden="true">
        <span>Role para descobrir</span>
        <span className="hero-scroll-mouse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
