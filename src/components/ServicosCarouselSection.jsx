import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const defaultItems = [
  {
    title: 'Buffet e Catering',
    description:
      'Buffet para eventos sociais e corporativos com catering completo, alta gastronomia e apresentação impecável. Experiências que encantam e fortalecem sua marca.',
  },
  {
    title: 'Almoço',
    description:
      'Almoço para eventos sociais e corporativos, com cardápios personalizados e serviço de excelência. Ideal para receber bem em qualquer ocasião.',
  },
  {
    title: 'Brunch',
    description:
      'Brunch sofisticado para eventos sociais e corporativos. Leve, elegante e perfeito para encontros especiais, reuniões e networking.',
  },
  {
    title: 'Casamento',
    description:
      'Buffet para casamento com gastronomia refinada e atendimento impecável. Cada detalhe pensado para tornar seu grande dia inesquecível.',
  },
  {
    title: 'Mesa de Frios',
    description:
      'Mesa de antepastos premium para eventos sociais e corporativos. Sofisticação, variedade e apresentação que encantam à primeira vista.',
  },
  {
    title: 'Coffee Break',
    description:
      'Coffee break em Recife ideal para eventos corporativos e sociais. Opções gourmet, serviço ágil e apresentação elegante.',
  },
  {
    title: 'Eventos de Grande Porte',
    description:
      'Estrutura completa para eventos de grande porte com planejamento e execução impecáveis. Soluções sob medida para grandes celebrações e eventos corporativos.',
  },
  {
    title: 'Buffet para Stand',
    description:
      'Buffet para stand com serviço estratégico para feiras e eventos corporativos. Atraia visitantes, gere conexão e valorize sua marca com uma experiência diferenciada.',
  },
];

export default function ServicosCarouselSection({
  title = 'Serviços',
  items = defaultItems,
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

  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();

  const viewportRef = useRef(null);
  const slotMeasureRef = useRef(null);

  const [itemSize, setItemSize] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [virtualIndex, setVirtualIndex] = useState(items.length);

  const activeIndex = useMemo(() => {
    const n = items.length;
    if (!n) return 0;
    return ((virtualIndex % n) + n) % n;
  }, [items.length, virtualIndex]);

  const virtualItems = useMemo(() => {
    const safe = Array.isArray(items) ? items : [];
    return [...safe, ...safe, ...safe];
  }, [items]);

  const recenterIfNeeded = useCallback(
    (nextIndex) => {
      const n = items.length;
      if (n === 0) return nextIndex;

      if (nextIndex < n * 0.5) return nextIndex + n;
      if (nextIndex > n * 2.5) return nextIndex - n;
      return nextIndex;
    },
    [items.length]
  );

  const measure = useCallback(() => {
    if (!slotMeasureRef.current) return;

    const el = slotMeasureRef.current;
    const width = el.getBoundingClientRect().width;
    const computed = window.getComputedStyle(el);
    const marginRight = Number.parseFloat(computed.marginRight || '0') || 0;

    const nextSize = Math.max(0, Math.round(width + marginRight));
    if (!nextSize) return;

    setItemWidth((prev) => {
      const nextWidth = Math.max(0, Math.round(width));
      if (prev === nextWidth) return prev;
      return nextWidth;
    });

    if (viewportRef.current) {
      const nextViewport = Math.max(0, Math.round(viewportRef.current.getBoundingClientRect().width));
      setViewportWidth((prev) => {
        if (prev === nextViewport) return prev;
        return nextViewport;
      });
    }

    setItemSize((prev) => {
      if (prev === nextSize) return prev;
      return nextSize;
    });
  }, []);

  useEffect(() => {
    measure();

    if (!viewportRef.current || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(viewportRef.current);

    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (!itemSize || !itemWidth || !viewportWidth || items.length === 0) return;

    const centeredIndex = items.length;
    setVirtualIndex(centeredIndex);

    const centerOffset = (viewportWidth - itemWidth) / 2;
    controls.set({ x: -centeredIndex * itemSize + centerOffset });
  }, [controls, itemSize, itemWidth, items.length, viewportWidth]);

  const animateToIndex = useCallback(
    async (nextIndex) => {
      if (!itemSize || !itemWidth || !viewportWidth) return;

      const targetIndex = nextIndex;
      setVirtualIndex(targetIndex);

      const centerOffset = (viewportWidth - itemWidth) / 2;

      await controls.start({
        x: -targetIndex * itemSize + centerOffset,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
      });

      const normalized = recenterIfNeeded(targetIndex);
      if (normalized !== targetIndex) {
        setVirtualIndex(normalized);
        controls.set({ x: -normalized * itemSize + centerOffset });
      }
    },
    [controls, itemSize, itemWidth, prefersReducedMotion, recenterIfNeeded, viewportWidth]
  );

  const goPrev = useCallback(() => {
    animateToIndex(virtualIndex - 1);
  }, [animateToIndex, virtualIndex]);

  const goNext = useCallback(() => {
    animateToIndex(virtualIndex + 1);
  }, [animateToIndex, virtualIndex]);

  const onDragEnd = useCallback(
    async (_event, info) => {
      if (!itemSize || !itemWidth || !viewportWidth) return;

      const offset = info.offset.x;
      const velocity = info.velocity.x;

      const centerOffset = (viewportWidth - itemWidth) / 2;

      const projectedX = -virtualIndex * itemSize + centerOffset + offset + velocity * 0.08;
      const nextIndex = Math.round((centerOffset - projectedX) / itemSize);

      await animateToIndex(nextIndex);
    },
    [animateToIndex, itemSize, itemWidth, viewportWidth, virtualIndex]
  );

  const sectionStyles = {
    width: '100%',
    backgroundColor: 'transparent',
    padding: '4rem 1.5rem',
  };

  const containerStyles = useMemo(
    () => ({
      maxWidth: '64rem',
      margin: '0 auto',
    }),
    []
  );

  const getPlaceholderImageSrc = useCallback(
    (label) => {
      const safeLabel = String(label || '').trim();
      const initials = safeLabel ? safeLabel.slice(0, 2).toUpperCase() : 'SB';

      const seed = Array.from(safeLabel).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      const hue = seed % 360;
      const hue2 = (hue + 28) % 360;
      const hue3 = (hue + 70) % 360;

      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue}, 35%, 18%)"/>
      <stop offset="1" stop-color="hsl(${hue2}, 35%, 10%)"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="rgba(255,255,255,0.00)"/>
      <stop offset="0.45" stop-color="rgba(255,255,255,0.08)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0.00)"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="596" height="356" rx="26" fill="url(#bg)" stroke="#e3d992" stroke-opacity="0.45" stroke-width="2"/>

  <circle cx="100" cy="90" r="62" fill="hsl(${hue3}, 45%, 22%)" opacity="0.85"/>
  <circle cx="160" cy="120" r="52" fill="hsl(${hue2}, 40%, 18%)" opacity="0.75"/>
  <circle cx="520" cy="78" r="86" fill="hsl(${hue}, 40%, 16%)" opacity="0.7"/>

  <rect x="18" y="18" width="564" height="110" rx="22" fill="url(#shine)" opacity="0.9"/>

  <rect x="38" y="230" width="524" height="90" rx="22" fill="rgba(0,0,0,0.25)" stroke="rgba(227,217,146,0.22)"/>
  <text x="70" y="280" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="28" font-weight="700" opacity="0.95">${safeLabel}</text>
  <text x="70" y="312" fill="rgba(255,255,255,0.75)" font-family="Arial, sans-serif" font-size="18">Preview do serviço</text>

  <rect x="468" y="248" width="72" height="72" rx="18" fill="rgba(0,0,0,0.35)" stroke="rgba(227,217,146,0.35)"/>
  <text x="504" y="292" text-anchor="middle" dominant-baseline="middle" fill="#e3d992" font-family="Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="1">${initials}</text>
</svg>`;

      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    },
    []
  );

  const getServiceImageSrc = useCallback(
    (title) => {
      const imageByTitle = {
        'Almoço': 'Almoço.webp',
        'Brunch': 'Brunch.webp',
        'Buffet e Catering': 'Buffet-e-Catering.webp',
        'Buffet para Stand': 'Buffet-para-Stand.webp',
        'Casamento': 'Casamento.webp',
        'Coffee Break': 'Coffee-Break.webp',
        'Eventos de Grande Porte': 'Eventos-de-Grande-Porte.webp',
        'Mesa de Frios': 'Mesa-de-Frios.webp',
      };

      const fileName = imageByTitle[String(title || '').trim()];
      if (!fileName) return getPlaceholderImageSrc(title);
      return `${process.env.PUBLIC_URL}/${fileName}`;
    },
    [getPlaceholderImageSrc]
  );

  const handleCtaClick = useCallback((e) => {
    const targetId = 'orcamento';
    const el = document.getElementById(targetId);
    if (!el) return;

    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section style={sectionStyles} className={className} aria-label="Serviços">
      <style>{`
        .servicos-header {
          margin: 0 0 2rem;
          min-height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .servicos-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.7rem, 4.4vw, 2.65rem);
          background: linear-gradient(180deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          position: relative;
        }

        .servicos-title::after {
          content: '';
          display: block;
          width: 80px;
          height: 2px;
          margin: 0.85rem auto 0;
          background: linear-gradient(90deg, transparent, rgba(227, 217, 146, 0.85), transparent);
          border-radius: 2px;
        }

        .servicos-viewport {
          overflow: hidden;
          position: relative;
          width: min(100%, calc(var(--visibleCards) * var(--cardW) + var(--visibleGaps) * var(--gap)));
          margin: 0 auto;
          padding: 0.25rem 0;
          touch-action: pan-y;
        }

        .servicos-track {
          display: flex;
          align-items: stretch;
          will-change: transform;
          user-select: none;
          -webkit-user-select: none;
          cursor: grab;
        }

        .servicos-track:active {
          cursor: grabbing;
        }

        .servicos-card {
          position: relative;
          flex: 0 0 var(--cardW);
          margin-right: var(--gap);
          background:
            radial-gradient(ellipse at top, rgba(227, 217, 146, 0.05), transparent 55%),
            linear-gradient(180deg, rgba(12, 12, 12, 0.96) 0%, rgba(0, 0, 0, 0.96) 100%);
          border: 1px solid rgba(227, 217, 146, 0.35);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.45);
          border-radius: 1.4rem;
          padding: 1.25rem 1.25rem 1.5rem;
          min-height: 18rem;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            transform 380ms cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 380ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 380ms cubic-bezier(0.22, 1, 0.36, 1),
            opacity 380ms cubic-bezier(0.22, 1, 0.36, 1);
          transform-origin: center;
          overflow: hidden;
          opacity: 0.7;
        }

        .servicos-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.4rem;
          padding: 1px;
          background: linear-gradient(135deg, rgba(227, 217, 146, 0.5), rgba(227, 217, 146, 0) 35%, rgba(227, 217, 146, 0) 65%, rgba(227, 217, 146, 0.5));
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 380ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .servicos-card.is-active {
          border-color: rgba(227, 217, 146, 0.9);
          box-shadow: 0 22px 55px rgba(0, 0, 0, 0.55), 0 0 35px rgba(227, 217, 146, 0.15);
          z-index: 2;
          opacity: 1;
          transform: scale(1.02);
        }

        .servicos-card.is-active::before {
          opacity: 1;
        }

        .servicos-card:hover {
          opacity: 1;
        }

        .servicos-card:hover .servicos-card-media {
          transform: scale(1.05);
          border-color: rgba(227, 217, 146, 0.55);
        }

        .servicos-card-media-wrap {
          position: relative;
          width: 100%;
          height: 8.5rem;
          margin: 0 0 1rem;
          border-radius: 1rem;
          overflow: hidden;
        }

        .servicos-card-media-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.45) 100%);
          pointer-events: none;
        }

        .servicos-card-media {
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          display: block;
          object-fit: cover;
          border: 1px solid rgba(227, 217, 146, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1), border-color 380ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .servicos-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 0.25rem;
        }

        .servicos-card-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          color: #f6efbf;
          font-weight: 700;
          font-size: clamp(1.15rem, 1.6vw, 1.35rem);
          letter-spacing: 0.005em;
          line-height: 1.2;
        }

        .servicos-card-desc {
          margin: 0.65rem 0 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 0.92rem;
          line-height: 1.5;
        }

        .servicos-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
          align-self: center;
          margin-left: auto;
          margin-right: auto;
          color: #1a1a1a;
          text-decoration: none;
          font-family: sans-serif;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 0.78rem;
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.85);
          background: linear-gradient(135deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(227, 217, 146, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.25) inset;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }

        .servicos-card-cta::before {
          content: '';
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
          transform: translateX(-60%) rotate(12deg);
          transition: transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .servicos-card-cta:hover {
          transform: translateY(-2px) scale(1.02);
          filter: brightness(1.04);
          box-shadow: 0 18px 38px rgba(227, 217, 146, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.35) inset;
        }

        .servicos-card-cta:hover::before {
          transform: translateX(60%) rotate(12deg);
        }

        .servicos-card-cta:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 4px;
          border-radius: 999px;
        }

        .servicos-controls {
          margin-top: 1.75rem;
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .servicos-arrow-btn {
          appearance: none;
          width: 48px;
          height: 48px;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.85);
          background: linear-gradient(135deg, #f6efbf 0%, #e3d992 55%, #c9b878 100%);
          color: #1a1a1a;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 12px 28px rgba(227, 217, 146, 0.20), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .servicos-arrow-btn:hover {
          transform: translateY(-2px) scale(1.05);
          filter: brightness(1.04);
          box-shadow: 0 18px 38px rgba(227, 217, 146, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.4) inset;
        }

        .servicos-arrow-btn:active {
          transform: translateY(0px) scale(0.97);
        }

        .servicos-arrow-btn:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 4px;
        }

        .servicos-dots {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 44px;
        }

        .servicos-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.4);
          transition: width 320ms cubic-bezier(0.22, 1, 0.36, 1), background 320ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .servicos-dot.is-active {
          width: 22px;
          background: ${colors.gold};
          box-shadow: 0 0 12px rgba(227, 217, 146, 0.55);
        }

        /* Mobile-first sizing */
        .servicos-viewport {
          --visibleCards: 1;
          --visibleGaps: 0;
          --cardW: min(18rem, calc(100vw - 3rem));
          --gap: 1rem;
        }

        @media (min-width: 640px) {
          .servicos-viewport {
            --visibleCards: 2;
            --visibleGaps: 1;
            --cardW: 18.5rem;
            --gap: 1.25rem;
          }

          .servicos-card {
            min-height: 19rem;
          }

          .servicos-card-media {
            height: 9rem;
          }
        }

        @media (min-width: 1024px) {
          .servicos-viewport {
            --visibleCards: 3;
            --visibleGaps: 2;
            --cardW: 19.5rem;
            --gap: 1.5rem;
          }

          .servicos-card {
            min-height: 20rem;
          }

          .servicos-card-media {
            height: 9.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .servicos-card,
          .servicos-arrow-btn {
            transition: none;
          }

          .servicos-card.is-active {
            transform: none;
          }
        }
      `}</style>

      <div style={containerStyles}>
        <header className="servicos-header">
          <h2 className="servicos-title">{title}</h2>
        </header>

        <div ref={viewportRef} className="servicos-viewport">
          <motion.div
            className="servicos-track"
            drag="x"
            dragMomentum={false}
            onDragEnd={onDragEnd}
            animate={controls}
            initial={false}
            style={{ x: 0 }}
            aria-label="Carrossel de serviços"
          >
            {virtualItems.map((item, idx) => {
              const isActive = idx === virtualIndex;

              return (
                <article
                  key={`${item.title}-${idx}`}
                  ref={idx === 0 ? slotMeasureRef : null}
                  className={`servicos-card${isActive ? ' is-active' : ''}`}
                  aria-label={item.title}
                >
                  <div className="servicos-card-media-wrap">
                    <img
                      className="servicos-card-media"
                      src={getServiceImageSrc(item.title)}
                      alt={item.title}
                      loading="lazy"
                      draggable={false}
                      onError={(e) => {
                        if (e.currentTarget.dataset.fallbackApplied) return;
                        e.currentTarget.dataset.fallbackApplied = '1';
                        e.currentTarget.src = getPlaceholderImageSrc(item.title);
                      }}
                    />
                  </div>
                  <div className="servicos-card-body">
                    <h3 className="servicos-card-title">{item.title}</h3>
                    <p className="servicos-card-desc">{item.description}</p>
                  </div>
                  <a className="servicos-card-cta" href="#orcamento" onClick={handleCtaClick}>
                    Solicite um orçamento
                  </a>
                </article>
              );
            })}
          </motion.div>
        </div>

        <div className="servicos-controls" aria-label="Controles do carrossel">
          <button
            type="button"
            className="servicos-arrow-btn"
            onClick={goPrev}
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="servicos-dots" aria-label="Progresso do carrossel">
            {items.map((_, i) => (
              <span
                key={i}
                className={`servicos-dot${i === activeIndex ? ' is-active' : ''}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="servicos-arrow-btn"
            onClick={goNext}
            aria-label="Próximo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
