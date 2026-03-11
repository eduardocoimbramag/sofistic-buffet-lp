import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BriefcaseBusiness,
  Handshake,
  Sparkles,
  TrendingUp,
  Store,
  Presentation,
  PanelsTopLeft,
  Megaphone,
  Users,
} from 'lucide-react';

const standExperienceCards = [
  {
    title: 'Mais tempo de permanência no seu stand',
    icon: BriefcaseBusiness,
    eyebrow: 'Engajamento',
    description: 'Crie uma experiência gastronômica que convida o público a permanecer mais tempo e interagir com sua marca.',
  },
  {
    title: 'Mais conversas de negócios',
    icon: Handshake,
    eyebrow: 'Relacionamento',
    description: 'Um atendimento bem executado favorece abordagens mais naturais, networking qualificado e conexões relevantes.',
  },
  {
    title: 'Mais percepção de valor',
    icon: Sparkles,
    eyebrow: 'Posicionamento',
    description: 'Cada detalhe do serviço reforça sofisticação, organização e cuidado com a experiência do visitante.',
  },
  {
    title: 'Mais oportunidades comerciais',
    icon: TrendingUp,
    eyebrow: 'Performance',
    description: 'Transforme fluxo em oportunidades reais com uma presença mais memorável e estrategicamente planejada.',
  },
];

const eventStructureCards = [
  {
    title: 'Feiras',
    icon: Store,
    eyebrow: 'Presença de marca',
    description: 'Estrutura pensada para valorizar a marca e gerar impacto comercial desde o primeiro contato.',
  },
  {
    title: 'Congressos',
    icon: Presentation,
    eyebrow: 'Conteúdo e networking',
    description: 'Atendimento fluido e profissional para ambientes com alto fluxo, relacionamento e representação institucional.',
  },
  {
    title: 'Exposições',
    icon: PanelsTopLeft,
    eyebrow: 'Fluxo e experiência',
    description: 'Operação organizada para entregar experiência premium em ambientes de circulação intensa.',
  },
  {
    title: 'Lançamentos',
    icon: Megaphone,
    eyebrow: 'Impacto comercial',
    description: 'Soluções gastronômicas que acompanham momentos de apresentação, ativação e posicionamento de produtos.',
  },
  {
    title: 'Convenções',
    icon: Users,
    eyebrow: 'Integração corporativa',
    description: 'Atendimento elegante para encontros corporativos que exigem padrão elevado e excelente percepção de marca.',
  },
];

function RevealCard({ children, delay = 0 }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <motion.div whileTap={{ scale: 0.985 }} className="h-full">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

export default function MiceExperienceSections() {
  const prefersReducedMotion = useReducedMotion();

  const sectionMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.6, ease: 'easeOut' },
      };

  return (
    <section aria-label="Experiência MICE e estrutura corporativa" className="mice-sections-shell">
      <style>{`
        .mice-sections-shell {
          position: relative;
          overflow: hidden;
          padding: 5.5rem 1.5rem;
          background:
            radial-gradient(circle at top center, rgba(227, 217, 146, 0.08), transparent 22%),
            linear-gradient(180deg, #050505 0%, #0b0b0b 46%, #050505 100%);
        }

        .mice-sections-shell::before,
        .mice-sections-shell::after {
          content: '';
          position: absolute;
          inset-inline: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
        }

        .mice-sections-shell::before {
          top: 0;
        }

        .mice-sections-shell::after {
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent);
        }

        .mice-orb,
        .mice-orb-right {
          position: absolute;
          border-radius: 999px;
          filter: blur(70px);
          pointer-events: none;
        }

        .mice-orb {
          top: 40px;
          left: 50%;
          width: 320px;
          height: 320px;
          transform: translateX(-50%);
          background: rgba(227, 217, 146, 0.11);
        }

        .mice-orb-right {
          top: 28%;
          right: -40px;
          width: 220px;
          height: 220px;
          background: rgba(255, 255, 255, 0.05);
        }

        .mice-sections-wrap {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          gap: 4rem;
        }

        .mice-panel {
          position: relative;
          overflow: hidden;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background:
            radial-gradient(circle at top left, rgba(227, 217, 146, 0.12), transparent 30%),
            linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.018));
          box-shadow: 0 28px 90px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          padding: 2rem;
        }

        .mice-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 24%);
          pointer-events: none;
        }

        .mice-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.95rem;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.22);
          background: rgba(227, 217, 146, 0.08);
          color: #f2e7a8;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .mice-heading {
          margin: 1.2rem 0 0;
          color: #ffffff;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3.55rem);
          line-height: 1.06;
          letter-spacing: -0.03em;
        }

        .mice-copy {
          margin: 1.25rem 0 0;
          max-width: 680px;
          color: rgba(255,255,255,0.78);
          font-size: 1.02rem;
          line-height: 1.95;
        }

        .mice-hero-grid {
          display: grid;
          gap: 2.75rem;
          align-items: start;
        }

        .mice-stand-intro {
          max-width: 880px;
        }

        .mice-highlights {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.9rem;
          margin-top: 1.9rem;
          max-width: 700px;
        }

        .mice-highlight-box {
          border-radius: 22px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.18);
          padding: 1rem 1rem 1.05rem;
          box-shadow: 0 14px 30px rgba(0,0,0,0.14);
        }

        .mice-highlight-title {
          color: #e3d992;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }

        .mice-highlight-text {
          margin-top: 0.55rem;
          color: rgba(255,255,255,0.78);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .mice-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1.15rem;
        }

        .mice-grid-stand {
          margin-top: 2rem;
        }

        .mice-grid-structure {
          margin-top: 2.4rem;
        }

        .mice-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(180deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035));
          padding: 1.4rem;
          box-shadow: 0 16px 40px rgba(0,0,0,0.18);
        }

        .mice-card::before {
          content: '';
          position: absolute;
          inset-inline: 0;
          top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(227,217,146,0.7), transparent);
          opacity: 0.8;
        }

        .mice-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .mice-icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #e3d992;
          background: rgba(227, 217, 146, 0.1);
          border: 1px solid rgba(227, 217, 146, 0.2);
          box-shadow: 0 10px 30px rgba(227, 217, 146, 0.08);
        }

        .mice-card-tag {
          display: inline-flex;
          align-items: center;
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.18);
          color: rgba(255,255,255,0.62);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.66rem;
          font-weight: 700;
          text-align: right;
        }

        .mice-card-body {
          margin-top: 2rem;
        }

        .mice-card-title {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.18rem, 1.8vw, 1.45rem);
          line-height: 1.45;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .mice-card-description {
          margin: 0.9rem 0 0;
          color: rgba(255,255,255,0.64);
          font-size: 0.95rem;
          line-height: 1.8;
        }

        .mice-card-stand {
          min-height: 320px;
        }

        .mice-card-footer {
          margin-top: 1.75rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #e3d992;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .mice-card-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg, rgba(227,217,146,0.52), transparent);
        }

        .mice-center-copy {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        @media (min-width: 700px) {
          .mice-sections-shell {
            padding: 6rem 2rem;
          }

          .mice-panel {
            padding: 2.5rem;
          }

          .mice-grid-stand {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .mice-grid-structure {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (min-width: 1024px) {
          .mice-sections-shell {
            padding: 7rem 2.25rem;
          }

          .mice-grid-stand {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .mice-grid-structure {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        @media (max-width: 699px) {
          .mice-highlights {
            grid-template-columns: 1fr;
          }

          .mice-panel {
            border-radius: 26px;
            padding: 1.35rem;
          }

          .mice-card {
            min-height: 220px;
          }

          .mice-card-stand {
            min-height: 260px;
          }
        }
      `}</style>

      <div className="mice-orb" />
      <div className="mice-orb-right" />

      <div className="mice-sections-wrap">
        <motion.section
          {...sectionMotion}
          aria-labelledby="experiencia-no-stand-title"
          className="mice-panel"
        >
          <div className="mice-hero-grid">
            <div className="mice-stand-intro">
              <span className="mice-badge">MICE Experience</span>
              <h2 id="experiencia-no-stand-title" className="mice-heading">
                Experiência no Stand
              </h2>
              <p className="mice-copy">
                Mais do que servir: criamos experiências em eventos MICE (Meetings,
                Incentives, Conferences e Exhibitions). Cada detalhe influencia a percepção da sua
                marca. O Sofistic Buffet transforma o atendimento gastronômico do seu stand em uma
                experiência estratégica dentro de feiras e eventos corporativos.
              </p>

              <div className="mice-highlights">
                <div className="mice-highlight-box">
                  <div className="mice-highlight-title">Atendimento estratégico</div>
                  <div className="mice-highlight-text">
                    Hospitalidade que reforça valor percebido e amplia a presença da sua marca.
                  </div>
                </div>
                <div className="mice-highlight-box">
                  <div className="mice-highlight-title">Operação premium</div>
                  <div className="mice-highlight-text">
                    Estrutura preparada para feiras, exposições e ações comerciais de alto impacto.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mice-grid mice-grid-stand">
            {standExperienceCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <RevealCard key={card.title} delay={index * 0.08}>
                  <article className="mice-card mice-card-stand">
                    <div>
                      <div className="mice-card-top">
                        <div className="mice-icon-wrap">
                          <Icon size={26} strokeWidth={1.9} />
                        </div>
                        <span className="mice-card-tag">{card.eyebrow}</span>
                      </div>

                      <div className="mice-card-body">
                        <h3 className="mice-card-title">{card.title}</h3>
                        <p className="mice-card-description">{card.description}</p>
                      </div>
                    </div>

                    <div className="mice-card-footer">
                      <span>Impacto estratégico</span>
                      <span className="mice-card-line" />
                    </div>
                  </article>
                </RevealCard>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          aria-labelledby="estrutura-eventos-corporativos-title"
          className="mice-panel"
        >
          <div className="mice-center-copy">
            <span className="mice-badge">Estrutura especializada</span>
            <h2 id="estrutura-eventos-corporativos-title" className="mice-heading">
              Estrutura para Eventos Corporativos
            </h2>
            <p className="mice-copy" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Atendimento especializado para eventos do universo MICE, incluindo feiras,
              congressos e convenções empresariais.
            </p>
          </div>

          <div className="mice-grid mice-grid-structure">
            {eventStructureCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <RevealCard key={card.title} delay={index * 0.08}>
                  <article className="mice-card">
                    <div>
                      <div className="mice-card-top">
                        <div className="mice-icon-wrap">
                          <Icon size={26} strokeWidth={1.9} />
                        </div>
                        <span className="mice-card-tag">{card.eyebrow}</span>
                      </div>

                      <div className="mice-card-body">
                        <h3 className="mice-card-title">{card.title}</h3>
                        <p className="mice-card-description">{card.description}</p>
                      </div>
                    </div>

                    <div className="mice-card-footer">
                      <span>Operação especializada</span>
                      <span className="mice-card-line" />
                    </div>
                  </article>
                </RevealCard>
              );
            })}
          </div>
        </motion.section>
      </div>
    </section>
  );
}
