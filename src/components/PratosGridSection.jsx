import React from 'react';

const PratosGridSection = ({
  title = 'Pratos & Estações',
  items = [
    'Coqueteis',
    'Crepe',
    'Feijoada',
    'Sushi',
    'Ilha de Caldinhos',
    'Salgados',
    'Churrasco',
    'Petiscos de Boteco'
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
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(227, 217, 146, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
          min-height: 8.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
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
          font-weight: 600;
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
          {items.map((text, idx) => (
            <article key={`${idx}-${text}`} className="pratos-card">
              <h3 className="pratos-card-title">{text}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PratosGridSection;
