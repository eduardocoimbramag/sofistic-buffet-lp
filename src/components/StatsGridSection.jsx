import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function parseStatValue(rawValue) {
  const str = String(rawValue ?? '');
  const match = str.match(/[\d.,]+/);
  if (!match) return { prefix: str, number: null, suffix: '' };

  const numericRaw = match[0];
  const idx = str.indexOf(numericRaw);
  const prefix = str.slice(0, idx);
  const suffix = str.slice(idx + numericRaw.length);

  const normalized = numericRaw.replace(/\./g, '').replace(/,/g, '.');
  const number = Number(normalized);

  if (!Number.isFinite(number)) return { prefix: str, number: null, suffix: '' };

  return { prefix, number, suffix };
}

function formatNumber(n) {
  if (!Number.isFinite(n)) return '';
  return Math.round(n).toLocaleString('pt-BR');
}

function StatCounter({ value, duration = 1.6, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  const parsed = parseStatValue(value);

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion || parsed.number === null) {
      setDisplay(value);
      return;
    }

    let raf;
    const start = performance.now() + delay * 1000;
    const target = parsed.number;

    const tick = (now) => {
      if (now < start) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      const current = target * eased;
      setDisplay(`${parsed.prefix}${formatNumber(current)}${parsed.suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, delay, parsed.number, parsed.prefix, parsed.suffix, prefersReducedMotion]);

  return (
    <span ref={ref} className="stats-value" aria-label={String(value)}>
      {display}
    </span>
  );
}

const StatsGridSection = ({
  items = [
    { value: '+3.000', label: 'Eventos Realizados' },
    { value: '+50.000', label: 'Clientes Servidos' },
    { value: '+100', label: 'Empresas Atendidas' }
  ],
  className = ''
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sectionStyles = {
    width: '100%',
    backgroundColor: '#ffffff',
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.85)), url(${process.env.PUBLIC_URL}/statsbg.webp)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '4.5rem 1.5rem',
    position: 'relative'
  };

  const containerStyles = {
    maxWidth: '64rem',
    margin: '0 auto'
  };

  const cardAnim = (i) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.35 },
          transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
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
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
          border-radius: 1.4rem;
          padding: 2.25rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition:
            transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 380ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .stats-card::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: 1.4rem;
          background: linear-gradient(135deg, rgba(227, 217, 146, 0) 0%, rgba(227, 217, 146, 0.55) 50%, rgba(227, 217, 146, 0) 100%);
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 380ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .stats-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -60%;
          width: 60%;
          height: 200%;
          background: linear-gradient(110deg, transparent 0%, rgba(227, 217, 146, 0.25) 50%, transparent 100%);
          transform: skewX(-18deg);
          transition: left 700ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .stats-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0, 0, 0, 0.10), 0 0 0 1px rgba(227, 217, 146, 0.35);
          border-color: rgba(227, 217, 146, 0.4);
        }

        .stats-card:hover::before {
          opacity: 1;
        }

        .stats-card:hover::after {
          left: 130%;
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-card,
          .stats-card::before,
          .stats-card::after {
            transition: none;
          }

          .stats-card:hover {
            transform: none;
          }

          .stats-card:hover::after {
            left: -60%;
          }
        }

        .stats-value {
          display: inline-block;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(2rem, 4.4vw, 2.85rem);
          margin: 0;
          background: linear-gradient(180deg, #1f2937 0%, #0f172a 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stats-divider {
          width: 38px;
          height: 2px;
          margin: 0.85rem auto;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
          border-radius: 2px;
        }

        .stats-label {
          margin: 0;
          color: rgba(15, 23, 42, 0.78);
          font-family: sans-serif;
          font-weight: 700;
          font-size: clamp(0.88rem, 1.4vw, 1rem);
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
      `}</style>

      <div style={containerStyles}>
        <div className="stats-grid">
          {items.map((item, idx) => (
            <motion.article
              key={`${item.value}-${idx}`}
              className="stats-card"
              {...cardAnim(idx)}
            >
              <StatCounter value={item.value} delay={idx * 0.12} />
              <span className="stats-divider" aria-hidden="true" />
              <p className="stats-label">{item.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsGridSection;
