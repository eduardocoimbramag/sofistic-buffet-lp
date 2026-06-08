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
    'Mais de 3 mil eventos realizados com padrão elevado de qualidade gastronômica e operacional',
    'Expertise consolidada em buffet itinerante com atuação em casamentos, eventos empresariais, coffee break, feiras e congressos',
    'Equipe profissional qualificada em hospitalidade, manipulação segura de alimentos e atendimento para eventos de diferentes portes'
  ],
  ctaLabel = 'SOLICITE UM ORÇAMENTO',
  ctaHref = '#',
  videoSrc = `${process.env.PUBLIC_URL}/videoinfo.mp4`,
  videoPoster = '',
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
    backgroundColor: 'transparent',
    padding: '2.25rem clamp(1.5rem, 4vw, 4rem)'
  };

  const containerStyles = {
    maxWidth: '80rem',
    margin: '0 auto'
  };

  const animationBase = {
    viewport: { once: true, amount: 0.3 }
  };

  const ease = [0.22, 1, 0.36, 1];

  const titleAnimation = {
    initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.85, ease }
  };

  const mediaAnimation = {
    initial: { opacity: 0, scale: 0.94, y: 18 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.1, ease }
  };

  const contentAnimation = {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: 0.15, ease }
  };

  const listContainerAnim = {
    initial: 'hidden',
    whileInView: 'visible',
    variants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.09, delayChildren: 0.25 }
      }
    }
  };

  const listItemAnim = {
    variants: {
      hidden: { opacity: 0, x: -14 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease } }
    }
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
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }

        .about-panel {
          position: relative;
          background:
            radial-gradient(ellipse at top left, rgba(227, 217, 146, 0.10), transparent 35%),
            linear-gradient(180deg, rgba(8, 8, 8, 0.94) 0%, rgba(0, 0, 0, 0.94) 100%);
          border: 1px solid rgba(227, 217, 146, 0.45);
          border-radius: 1.5rem;
          padding: 1.5rem 1rem;
          max-width: 74rem;
          margin-left: auto;
          margin-right: auto;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(227, 217, 146, 0.06) inset;
          overflow: hidden;
        }

        .about-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(227, 217, 146, 0.55), rgba(227, 217, 146, 0) 38%, rgba(227, 217, 146, 0) 62%, rgba(227, 217, 146, 0.4));
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .about-panel::after {
          content: '';
          position: absolute;
          left: 50%;
          top: -1px;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
          pointer-events: none;
        }

        @media (min-width: 768px) {
          .about-panel {
            padding: 2rem 1.5rem;
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
            grid-template-columns: minmax(0, 44rem) minmax(0, 26rem);
            grid-template-rows: auto 1fr;
            justify-content: center;
            gap: 1.5rem;
          }

          .about-title {
            grid-column: 1 / -1;
            grid-row: 1;
            justify-self: center;
            text-align: center;
          }

          .about-media {
            grid-column: 2;
            grid-row: 2;
            justify-self: center;
          }

          .about-content {
            grid-column: 1;
            grid-row: 2;
            justify-self: end;
          }
        }

        .about-media {
          display: flex;
          justify-content: center;
        }

        .about-h2 {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.55rem, 3.8vw, 2.65rem);
          margin: 0;
          text-align: center;
          background: linear-gradient(180deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          text-shadow: 0 8px 30px rgba(227, 217, 146, 0.12);
        }

        .about-h2 + .about-h2-line {
          display: block;
          width: 96px;
          height: 2px;
          margin: 0.85rem auto 0;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
          border-radius: 2px;
        }

        .about-content {
          display: flex;
          flex-direction: column;
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
          margin: 1.1rem 0 0;
          display: grid;
          gap: 0.65rem;
        }

        .about-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          color: rgba(255, 255, 255, 0.92);
          font-family: sans-serif;
          line-height: 1.6;
          padding: 0.35rem 0.4rem;
          border-radius: 0.55rem;
          transition: background 280ms cubic-bezier(0.22, 1, 0.36, 1), transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-list-item:hover {
          background: rgba(227, 217, 146, 0.06);
          transform: translateX(4px);
        }

        .about-list-item .about-list-icon {
          margin-top: 0.15rem;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(227, 217, 146, 0.12);
          border: 1px solid rgba(227, 217, 146, 0.35);
          flex: 0 0 auto;
          transition: background 280ms ease, border-color 280ms ease, box-shadow 280ms ease;
        }

        .about-list-item:hover .about-list-icon {
          background: rgba(227, 217, 146, 0.22);
          border-color: rgba(227, 217, 146, 0.7);
          box-shadow: 0 0 14px rgba(227, 217, 146, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-list-item,
          .about-list-item .about-list-icon {
            transition: none;
          }

          .about-list-item:hover {
            transform: none;
          }
        }

        .about-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.4rem;
          align-self: center;
          margin-left: auto;
          margin-right: auto;
          color: #1a1a1a;
          text-decoration: none;
          font-family: sans-serif;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 0.95rem 1.6rem;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.85);
          background: linear-gradient(135deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 14px 30px rgba(227, 217, 146, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.25) inset;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .about-cta::before {
          content: '';
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
          transform: translateX(-60%) rotate(12deg);
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-cta:hover {
          transform: translateY(-3px) scale(1.02);
          filter: brightness(1.04);
          box-shadow: 0 22px 50px rgba(227, 217, 146, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
        }

        .about-cta:hover::before {
          transform: translateX(60%) rotate(12deg);
        }

        .about-cta:active {
          transform: translateY(-1px) scale(1);
        }

        .about-cta:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 4px;
          border-radius: 999px;
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
            width: 100%;
            max-width: 26rem;
            margin: 0 auto;
          }

          .about-media-wrap {
            aspect-ratio: 4 / 5;
          }
        }

        .about-media-wrap::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: radial-gradient(ellipse at center, rgba(227, 217, 146, 0.22), transparent 70%);
          filter: blur(20px);
          opacity: 0.85;
          z-index: 0;
          pointer-events: none;
        }

        .about-video {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 1.4rem;
          object-fit: cover;
          background: #000;
          border: 1px solid rgba(227, 217, 146, 0.6);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(227, 217, 146, 0.25) inset;
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 600ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-media-wrap:hover .about-video {
          transform: scale(1.015);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(227, 217, 146, 0.45) inset, 0 0 35px rgba(227, 217, 146, 0.18);
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
              <span className="about-h2-line" aria-hidden="true" />
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

              <motion.ul
                className="about-list"
                {...listContainerAnim}
                viewport={{ once: true, amount: 0.2 }}
              >
                {highlights.map((text, idx) => (
                  <motion.li
                    key={`${idx}-${text}`}
                    className="about-list-item"
                    {...listItemAnim}
                  >
                    <span className="about-list-icon" aria-hidden="true">
                      <Check size={14} color={colors.gold} strokeWidth={2.5} />
                    </span>
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

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
