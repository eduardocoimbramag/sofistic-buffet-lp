import React, { useMemo } from 'react';

export default function RodapeSection({
  brandName = 'Sofistic Buffet',
  tagline = 'Servimos com excelência',
  links = [
    { label: 'Início', href: '#top' },
    { label: 'Quem Somos', href: '#sobre' },
    { label: 'Pratos', href: '#pratos' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Orçamento', href: '#orcamento' },
  ],
  phone = '(81) 989328-4279',
  email = 'xxx@gmail.com',
  location = 'Recife - PE',
  className = '',
}) {
  const colors = useMemo(
    () => ({
      black: '#000000',
      white: '#FFFFFF',
      gold: '#e3d992',
    }),
    []
  );

  const footerStyles = useMemo(
    () => ({
      width: '100%',
      background: colors.white,
      borderTop: `2px solid ${colors.gold}`,
    }),
    [colors.gold, colors.white]
  );

  const containerStyles = useMemo(
    () => ({
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '3rem 1.5rem 2rem',
    }),
    []
  );

  const year = new Date().getFullYear();

  return (
    <footer style={footerStyles} className={className} aria-label="Rodapé">
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.75rem;
        }

        .footer-title {
          margin: 0 0 0.75rem;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: ${colors.black};
          line-height: 1.15;
          letter-spacing: -0.02em;
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
        }

        .footer-text {
          margin: 0;
          color: rgba(0, 0, 0, 0.78);
          line-height: 1.55;
          font-size: 0.98rem;
        }

        .footer-links {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.6rem;
        }

        .footer-link {
          color: rgba(0, 0, 0, 0.82);
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 160ms ease, text-decoration-color 160ms ease;
        }

        .footer-link:hover {
          color: ${colors.gold};
        }

        .footer-link:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 3px;
          border-radius: 0.35rem;
        }

        .footer-meta {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0.55rem;
        }

        .footer-meta a {
          color: rgba(0, 0, 0, 0.82);
          text-decoration: none;
          font-weight: 600;
        }

        .footer-meta a:hover {
          color: ${colors.gold};
        }

        .footer-sub {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(227, 217, 146, 0.6);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          text-align: center;
        }

        .footer-subtext {
          margin: 0;
          color: rgba(0, 0, 0, 0.7);
          font-size: 0.95rem;
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }

          .footer-sub {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.25fr 1fr 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-link {
            transition: none;
          }
        }
      `}</style>

      <div style={containerStyles}>
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">{brandName}</h3>
            <p className="footer-text">{tagline}</p>
          </div>

          <div>
            <h3 className="footer-title">Links rápidos</h3>
            <nav aria-label="Links do rodapé">
              <ul className="footer-links">
                {links.map((l) => (
                  <li key={l.href + l.label}>
                    <a className="footer-link" href={l.href}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h3 className="footer-title">Contato</h3>
            <ul className="footer-meta">
              <li>
                <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a>
              </li>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span className="footer-text">{location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-sub">
          <p className="footer-subtext">© {year} {brandName}. Todos os direitos reservados.</p>
          <a className="footer-link" href="#privacidade">
            Política de Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
