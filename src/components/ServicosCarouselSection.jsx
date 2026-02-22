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
      backgroundColor: 'transparent',
      padding: '4rem 1.5rem',
    }),
    [colors.black]
  );

  const containerStyles = useMemo(
    () => ({
      maxWidth: '80rem',
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

        .servicos-panel {
          background: rgba(0, 0, 0, 0.925);
          border: 1px solid ${colors.gold};
          border-radius: 1.25rem;
          padding: 1rem 0.75rem;
          max-width: 74rem;
          margin-left: auto;
          margin-right: auto;
        }

        @media (min-width: 768px) {
          .servicos-panel {
            padding: 1.25rem 1rem;
          }
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
          padding: 1.25rem 1.25rem 1.5rem;
          min-height: 18rem;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
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
          width: 100%;
          height: 8.5rem;
          border-radius: 1rem;
          display: block;
          margin: 0 0 1rem;
          object-fit: cover;
          border: 1px solid rgba(227, 217, 146, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
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
          .servicos-btn {
            transition: none;
          }

          .servicos-card.is-active {
            transform: none;
          }
        }
      `}</style>

      <div style={containerStyles}>
        <div className="servicos-panel">
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
                    <img
                      className="servicos-card-media"
                      src={getPlaceholderImageSrc(item.title)}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="servicos-card-body">
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
      </div>
    </section>
  );
}
