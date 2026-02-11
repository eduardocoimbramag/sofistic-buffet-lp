import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SobreSection = ({
  region = 'Sua Região',
  title = 'Buffet de Luxo para Eventos Exclusivos em',
  description =
    'Somos especialistas em criar experiências gastronômicas memoráveis com execução impecável, estética sofisticada e atendimento premium do primeiro contato ao último brinde.',
  highlights = [
    'Atendimento consultivo e personalizado',
    'Cardápios autorais com ingredientes selecionados',
    'Estrutura completa para eventos sociais e corporativos'
  ],
  ctaLabel = 'Conheça nosso portfólio',
  ctaHref = '#',
  videoSrc = 'https://www.w3schools.com/html/mov_bbb.mp4',
  videoPoster = 'https://www.w3schools.com/html/pic_trulli.jpg',
  className = ''
}) => {
  const colors = {
    black: '#000000',
    white: '#FFFFFF',
    gold: '#e3d992',
    textMuted: 'rgba(255, 255, 255, 0.82)'
  };

  const sectionStyles = {
    width: '100%',
    backgroundColor: colors.black,
    padding: '3rem clamp(1.5rem, 4vw, 4rem)'
  };

  const containerStyles = {
    maxWidth: '80rem',
    margin: '0 auto'
  };

  const animationBase = {
    viewport: { once: true, amount: 0.35 }
  };

  const titleAnimation = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7 }
  };

  const mediaAnimation = {
    initial: { opacity: 0, scale: 0.98 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, delay: 0.05 }
  };

  const contentAnimation = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.1 }
  };

  return (
    <section
      style={sectionStyles}
      className={`about-section ${className}`}
      aria-label="Quem Somos"
    >
      <style>{`
        @media (min-width: 768px) {
          .about-section {
            padding-top: 6rem;
            padding-bottom: 6rem;
          }
        }

        .about-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: minmax(0, 40rem) minmax(0, 40rem);
            grid-template-rows: auto 1fr;
            justify-content: center;
            gap: 1.5rem;
          }

          .about-title {
            grid-column: 1;
            grid-row: 1;
            justify-self: end;
          }

          .about-media {
            grid-column: 2;
            grid-row: 1 / span 2;
            justify-self: start;
          }

          .about-content {
            grid-column: 1;
            grid-row: 2;
            justify-self: end;
          }
        }

        .about-h2 {
          font-family: 'Playfair Display', serif;
          color: ${colors.gold};
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.75rem, 4.5vw, 3rem);
          margin: 0;
        }

        .about-description {
          font-family: sans-serif;
          color: ${colors.textMuted};
          font-size: 1.05rem;
          line-height: 1.75;
          margin: 0;
        }

        .about-list {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0 0;
          display: grid;
          gap: 0.9rem;
        }

        .about-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: rgba(255, 255, 255, 0.90);
          font-family: sans-serif;
          line-height: 1.6;
        }

        .about-cta {
          display: inline-block;
          margin-top: 1.5rem;
          color: ${colors.white};
          text-decoration: none;
          font-family: sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 600;
          padding-bottom: 0.2rem;
          background-image: linear-gradient(${colors.gold}, ${colors.gold});
          background-repeat: no-repeat;
          background-position: 0 100%;
          background-size: 0% 2px;
          transition: background-size 220ms ease;
        }

        .about-cta:hover {
          background-size: 100% 2px;
        }

        .about-cta:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 4px;
          border-radius: 0.25rem;
        }

        .about-media-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
        }

        @media (min-width: 768px) {
          .about-media-wrap {
            width: 100%;
            margin: 0 auto;
          }
        }

        @media (min-width: 1024px) {
          .about-media-wrap {
            width: 135%;
            margin-left: 2.5rem;
          }

          .about-media-wrap {
            aspect-ratio: 4 / 5;
          }
        }

        .about-video {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 1.25rem;
          object-fit: cover;
          background: #000;
          border: 2px solid ${colors.gold};
        }

        @media (prefers-reduced-motion: reduce) {
          .about-cta {
            transition: none;
          }
        }
      `}</style>

      <div style={containerStyles}>
        <div className="about-grid">
          <motion.div className="about-title" {...titleAnimation} {...animationBase}>
            <h2 className="about-h2">
              {title} <span style={{ color: colors.gold }}>{region}</span>
            </h2>
          </motion.div>

          <motion.div className="about-media" {...mediaAnimation} {...animationBase}>
            <div className="about-media-wrap">
              <video
                className="about-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={videoPoster}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </motion.div>

          <motion.div className="about-content" {...contentAnimation} {...animationBase}>
            <p className="about-description">{description}</p>

            <ul className="about-list">
              {highlights.map((text, idx) => (
                <li key={`${idx}-${text}`} className="about-list-item">
                  <span aria-hidden="true" style={{ marginTop: '0.15rem' }}>
                    <Check size={18} color={colors.gold} />
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <a className="about-cta" href={ctaHref}>
              {ctaLabel}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
