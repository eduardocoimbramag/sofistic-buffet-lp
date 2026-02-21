import React from 'react';

const PratosGridSection = ({
  title = 'Pratos & Estações',
  items = [
    { title: 'Churrasco', image: `${process.env.PUBLIC_URL}/churrasco-card.webp` },
    { title: 'Crepe', image: `${process.env.PUBLIC_URL}/crepe-card.webp` },
    { title: 'Feijoada', image: `${process.env.PUBLIC_URL}/feijoada-card.webp` },
    { title: 'Sushi', image: `${process.env.PUBLIC_URL}/sushi-card.webp` },
    { title: 'Petiscos de Boteco', image: `${process.env.PUBLIC_URL}/petiscoboteco-card.webp` },
    { title: 'Ilha de Caldinhos', image: `${process.env.PUBLIC_URL}/ilhadecaldinho-card.jpeg` },
    { title: 'Coqueteis', image: `${process.env.PUBLIC_URL}/coquetel-card.webp` },
    { title: 'Salgados', image: `${process.env.PUBLIC_URL}/salgados-card.webp` }
  ],
  className = ''
}) => {
  const colors = {
    black: '#000000',
    white: '#FFFFFF',
    gold: '#e3d992'
  };

  const sectionStyles = {
    width: '100%',
    backgroundColor: colors.black,
    padding: '4rem 1.5rem'
  };

  const containerStyles = {
    maxWidth: '64rem',
    margin: '0 auto'
  };

  return (
    <section
      style={sectionStyles}
      className={className}
      aria-label="Pratos"
    >
      <style>{`
        .pratos-header {
          margin: 0 0 2rem;
          min-height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pratos-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: ${colors.gold};
          text-align: center;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
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
          background-color: rgba(255, 255, 255, 0.06);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(227, 217, 146, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border-radius: 1.25rem;
          padding: 2.25rem 1.5rem;
          min-height: 10.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .pratos-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            rgba(0, 0, 0, 0.35),
            rgba(0, 0, 0, 0.72)
          );
          pointer-events: none;
        }

        .pratos-card > * {
          position: relative;
          z-index: 1;
        }

        .pratos-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
          border-color: rgba(227, 217, 146, 0.45);
        }

        @media (prefers-reduced-motion: reduce) {
          .pratos-card {
            transition: none;
          }

          .pratos-card:hover {
            transform: none;
          }
        }

        .pratos-card-title {
          margin: 0;
          color: ${colors.white};
          font-family: sans-serif;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.3;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
        }
      `}</style>

      <div style={containerStyles}>
        <header className="pratos-header">
          <h2 className="pratos-title">{title}</h2>
        </header>

        <div className="pratos-grid">
          {items.map((item, idx) => (
            <article
              key={`${idx}-${item.title}`}
              className="pratos-card"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <h3 className="pratos-card-title">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PratosGridSection;
