import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const SobreSection = ({
  region = '',
  title = 'BUFFET COM ALTO PADRÃO GASTRONÔMICO',
  description =
    'O Sofistic Buffet é referência em buffet para eventos em Recife e Região Metropolitana do Recife, oferecendo soluções completas para eventos corporativos, casamentos, coffee breaks, feiras, congressos e celebrações sociais. Nossa missão é servir com excelência, superar expectativas e proporcionar experiências gastronômicas memoráveis para cada cliente.',
  highlights = [
    'Estrutura preparada para buffet corporativo, eventos sociais, confraternizações empresariais e celebrações especiais',
    'Planejamento completo de buffet para eventos, incluindo logística, montagem, serviço e suporte especializado',
    'Mais de 5 mil eventos realizados com padrão elevado de qualidade gastronômica e operacional',
    'Expertise consolidada em buffet itinerante com atuação em casamentos, eventos empresariais, coffee break, feiras e congressos',
    'Equipe profissional qualificada em hospitalidade, manipulação segura de alimentos e atendimento para eventos de diferentes portes'
  ],
  ctaLabel = 'SOLICITE UM ORÇAMENTO',
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
    backgroundColor: '#000000',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='700' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23E3D992' stroke-width='1.5'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23E3D992'%3E%3Ccircle cx='769' cy='229' r='15'/%3E%3Ccircle cx='539' cy='269' r='15'/%3E%3Ccircle cx='603' cy='493' r='15'/%3E%3Ccircle cx='731' cy='737' r='15'/%3E%3Ccircle cx='520' cy='660' r='15'/%3E%3Ccircle cx='309' cy='538' r='15'/%3E%3Ccircle cx='295' cy='764' r='15'/%3E%3Ccircle cx='40' cy='599' r='15'/%3E%3Ccircle cx='102' cy='382' r='15'/%3E%3Ccircle cx='127' cy='80' r='15'/%3E%3Ccircle cx='370' cy='105' r='15'/%3E%3Ccircle cx='578' cy='42' r='15'/%3E%3Ccircle cx='237' cy='261' r='15'/%3E%3Ccircle cx='390' cy='382' r='15'/%3E%3C/g%3E%3C/svg%3E\")",
    backgroundRepeat: 'repeat',
    backgroundSize: '700px 700px',
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

  const handleCtaClick = (e) => {
    const targetId = 'orcamento';
    const el = document.getElementById(targetId);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        .about-panel {
          background: rgba(0, 0, 0, 0.925);
          border: 1px solid ${colors.gold};
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
        }

        @media (min-width: 768px) {
          .about-panel {
            padding: 2.5rem 2rem;
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
          text-align: justify;
          text-indent: 2.5em;
          hyphens: none;
          -webkit-hyphens: none;
          overflow-wrap: normal;
          word-break: normal;
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
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.5rem;
          align-self: center;
          color: ${colors.white};
          text-decoration: none;
          font-family: sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0.85rem 1.25rem;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.55);
          background: rgba(227, 217, 146, 0.12);
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .about-cta:hover {
          transform: translateY(-1px);
          border-color: rgba(227, 217, 146, 0.8);
          background: rgba(227, 217, 146, 0.18);
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
        <div className="about-panel">
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

              <a className="about-cta" href={ctaHref} onClick={handleCtaClick}>
                {ctaLabel}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreSection;
