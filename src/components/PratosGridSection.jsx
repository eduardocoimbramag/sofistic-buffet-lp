import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PratosGridSection = ({
  title = 'Pratos & Estações',
  items = [
    { title: 'Churrasco', image: `${process.env.PUBLIC_URL}/churrasco-card.webp` },
    { title: 'Crepe', image: `${process.env.PUBLIC_URL}/crepe-card.webp` },
    { title: 'Feijoada', image: `${process.env.PUBLIC_URL}/feijoada-card.webp` },
    { title: 'Sushi', image: `${process.env.PUBLIC_URL}/sushi-card.webp` },
    { title: 'Petiscos de Boteco', image: `${process.env.PUBLIC_URL}/petiscoboteco-card.webp` },
    { title: 'Ilha de Caldinhos', image: `${process.env.PUBLIC_URL}/ilhadecaldinho-card.jpeg` },
    { title: 'Drinks', image: `${process.env.PUBLIC_URL}/coquetel-card.webp` },
    { title: 'Salgados', image: `${process.env.PUBLIC_URL}/salgados-card.webp` }
  ],
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  const colors = {
    black: '#000000',
    white: '#FFFFFF',
    gold: '#e3d992'
  };

  const sectionStyles = {
    width: '100%',
    backgroundColor: colors.black,
    backgroundImage:
      'radial-gradient(ellipse at 18% 8%, rgba(227, 217, 146, 0.06), transparent 38%), radial-gradient(ellipse at 82% 92%, rgba(227, 217, 146, 0.04), transparent 42%)',
    padding: '5rem 1.5rem',
    position: 'relative'
  };

  const containerStyles = {
    maxWidth: '64rem',
    margin: '0 auto',
    position: 'relative'
  };

  const titleAnim = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22, filter: 'blur(6px)' },
        whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
        viewport: { once: true, amount: 0.4 },
        transition: { duration: 0.85, ease }
      };

  const cardAnim = (i) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30, scale: 0.96 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.65, delay: (i % 4) * 0.08, ease }
        };

  return (
    <section
      style={sectionStyles}
      className={className}
      aria-label="Pratos"
    >
      <style>{`
        .pratos-header {
          margin: 0 0 2.25rem;
          min-height: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .pratos-eyebrow {
          color: rgba(227, 217, 146, 0.85);
          letter-spacing: 0.4em;
          text-transform: uppercase;
          font-size: 0.7rem;
          font-weight: 600;
          margin: 0 0 0.7rem;
        }

        .pratos-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          text-align: center;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.7rem, 4.4vw, 2.65rem);
          background: linear-gradient(180deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        .pratos-title-line {
          display: block;
          width: 80px;
          height: 2px;
          margin: 0.85rem auto 0;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
          border-radius: 2px;
        }

        .pratos-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .pratos-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .pratos-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        .pratos-card {
          position: relative;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.04);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(227, 217, 146, 0.22);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
          border-radius: 1.4rem;
          padding: 2.5rem 1.5rem;
          min-height: 11.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            transform 520ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 520ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 520ms cubic-bezier(0.22, 1, 0.36, 1),
            background-size 1200ms cubic-bezier(0.22, 1, 0.36, 1);
          background-size: 110% auto;
        }

        .pratos-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.25) 0%,
            rgba(0, 0, 0, 0.55) 60%,
            rgba(0, 0, 0, 0.82) 100%
          );
          pointer-events: none;
          transition: background 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pratos-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.4rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(227, 217, 146, 0.55), rgba(227, 217, 146, 0) 38%, rgba(227, 217, 146, 0) 62%, rgba(227, 217, 146, 0.4));
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .pratos-card > * {
          position: relative;
          z-index: 1;
        }

        .pratos-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 60px rgba(0, 0, 0, 0.55), 0 0 30px rgba(227, 217, 146, 0.12);
          border-color: rgba(227, 217, 146, 0.6);
          background-size: 122% auto;
        }

        .pratos-card:hover::before {
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.15) 0%,
            rgba(0, 0, 0, 0.45) 60%,
            rgba(0, 0, 0, 0.78) 100%
          );
        }

        .pratos-card:hover::after {
          opacity: 1;
        }

        .pratos-card:hover .pratos-card-title {
          letter-spacing: 0.12em;
        }

        @media (prefers-reduced-motion: reduce) {
          .pratos-card,
          .pratos-card::before,
          .pratos-card::after,
          .pratos-card-title {
            transition: none;
          }

          .pratos-card:hover {
            transform: none;
            background-size: 110% auto;
          }
        }

        .pratos-card-title {
          margin: 0;
          color: ${colors.white};
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.3;
          font-size: clamp(1rem, 1.45vw, 1.15rem);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.6);
          transition: letter-spacing 520ms cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      <div style={containerStyles}>
        <header className="pratos-header">
          <motion.p className="pratos-eyebrow" {...titleAnim}>
            Cardápio Sofistic
          </motion.p>
          <motion.h2 className="pratos-title" {...titleAnim}>
            {title}
          </motion.h2>
          <motion.span className="pratos-title-line" aria-hidden="true" {...titleAnim} />
        </header>

        <div className="pratos-grid">
          {items.map((item, idx) => (
            <motion.article
              key={`${idx}-${item.title}`}
              className="pratos-card"
              style={{ backgroundImage: `url(${item.image})` }}
              {...cardAnim(idx)}
            >
              <h3 className="pratos-card-title">{item.title}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PratosGridSection;
