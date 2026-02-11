import React from 'react';

const StatsGridSection = ({
  items = [
    { value: '+300', label: 'Eventos Realizados' },
    { value: '+50.000', label: 'Clientes Servidos' },
    { value: '+100', label: 'Empresas Atendidas' }
  ],
  className = ''
}) => {
  const sectionStyles = {
    width: '100%',
    backgroundColor: '#ffffff',
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
      aria-label="Estatísticas"
    >
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .stats-card {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease;
        }

        .stats-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.10);
          border-color: rgba(0, 0, 0, 0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-card {
            transition: none;
          }

          .stats-card:hover {
            transform: none;
          }
        }

        .stats-value {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          margin: 0;
        }

        .stats-label {
          margin: 0.75rem 0 0;
          color: rgba(15, 23, 42, 0.75);
          font-family: sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.05rem);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
      `}</style>

      <div style={containerStyles}>
        <div className="stats-grid">
          {items.map((item, idx) => (
            <article key={`${item.value}-${idx}`} className="stats-card">
              <p className="stats-value">{item.value}</p>
              <p className="stats-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGridSection;
