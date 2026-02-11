import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';

const defaultItems = [
  {
    title: 'Almoço',
    description: 'Ideal para encontros corporativos e celebrações.',
  },
  {
    title: 'Brunch',
    description: 'Opções leves e sofisticadas para seu evento.',
  },
  {
    title: 'Casamento',
    description: 'Experiência completa com apresentação premium.',
  },
  {
    title: 'Mesa de antepastos',
    description: 'Seleção refinada para recepções e coquetéis.',
  },
  {
    title: 'Coffee Break',
    description: 'Praticidade e elegância para sua agenda.',
  },
  {
    title: 'Drinks para eventos',
    description: 'Coquetelaria com serviço profissional.',
  },
  {
    title: 'Buffet e catering',
    description: 'Soluções sob medida para qualquer formato.',
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

      const normalized = recenterIfNeeded(nextIndex);
      setVirtualIndex(normalized);

      const centerOffset = (viewportWidth - itemWidth) / 2;

      await controls.start({
        x: -normalized * itemSize + centerOffset,
        transition: prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 },
      });
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

  const sectionStyles = useMemo(
    () => ({
      width: '100%',
      background: colors.black,
      padding: '4rem 1.5rem',
    }),
    [colors.black]
  );

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

      const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1a1a1a"/>
      <stop offset="1" stop-color="#0d0d0d"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="92" height="92" rx="18" fill="url(#g)" stroke="#e3d992" stroke-opacity="0.55" stroke-width="2"/>
  <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#e3d992" font-family="Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="1">${initials}</text>
</svg>`;

      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    },
    []
  );

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
          color: ${colors.gold};
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
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
          flex: 0 0 var(--cardW);
          margin-right: var(--gap);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(227, 217, 146, 0.25);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border-radius: 1.25rem;
          padding: 2rem 1.5rem;
          min-height: 10rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
          transform-origin: center;
        }

        .servicos-card.is-active {
          transform: scale(1.08);
          border-color: rgba(227, 217, 146, 0.5);
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
          z-index: 2;
        }

        .servicos-card-media {
          width: 3.75rem;
          height: 3.75rem;
          border-radius: 0.9rem;
          display: block;
          margin: 0 auto 0.9rem;
          object-fit: cover;
          border: 1px solid rgba(227, 217, 146, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .servicos-card-title {
          margin: 0;
          color: ${colors.white};
          font-weight: 600;
          font-size: clamp(1.05rem, 1.4vw, 1.2rem);
          letter-spacing: 0.01em;
        }

        .servicos-card-desc {
          margin: 0.65rem 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.95rem;
          line-height: 1.35;
        }

        .servicos-controls {
          margin-top: 1.75rem;
          display: flex;
          justify-content: center;
          gap: 0.75rem;
        }

        .servicos-btn {
          appearance: none;
          border: 1px solid rgba(227, 217, 146, 0.35);
          background: rgba(255, 255, 255, 0.04);
          color: ${colors.white};
          border-radius: 999px;
          padding: 0.75rem 1.1rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .servicos-btn:hover {
          transform: translateY(-1px);
          border-color: rgba(227, 217, 146, 0.55);
          background: rgba(255, 255, 255, 0.06);
        }

        .servicos-btn:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 3px;
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
            min-height: 11rem;
          }
        }

        @media (min-width: 1024px) {
          .servicos-viewport {
            --visibleCards: 3;
            --visibleGaps: 2;
            --cardW: 19.5rem;
            --gap: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .servicos-card,
          .servicos-btn {
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
                  <div>
                    <img
                      className="servicos-card-media"
                      src={getPlaceholderImageSrc(item.title)}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                    <h3 className="servicos-card-title">{item.title}</h3>
                    <p className="servicos-card-desc">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>

        <div className="servicos-controls" aria-label="Controles do carrossel">
          <button type="button" className="servicos-btn" onClick={goPrev} aria-label="Anterior">
            Voltar
          </button>
          <button type="button" className="servicos-btn" onClick={goNext} aria-label="Próximo">
            Avançar
          </button>
        </div>
      </div>
    </section>
  );
}
