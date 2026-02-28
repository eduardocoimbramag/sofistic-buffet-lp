import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FormularioSection({
  title = 'Solicite um orçamento',
  onSubmit,
  className = '',
}) {
  const colors = useMemo(
    () => ({
      black: '#000000',
      white: '#FFFFFF',
      gold: '#e3d992',
      glassBg: 'rgba(255, 255, 255, 0.06)',
      glassBorder: 'rgba(227, 217, 146, 0.25)',
    }),
    []
  );

  const prefersReducedMotion = useReducedMotion();

  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    quantity: '',
    description: '',
    consent: false,
  });

  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState('');

  const errors = useMemo(() => {
    const next = {};

    if (!values.name.trim()) next.name = 'Informe seu nome.';

    const digits = String(values.phone || '').replace(/\D/g, '');
    if (!digits) next.phone = 'Informe seu telefone.';
    else if (digits.length < 10) next.phone = 'Informe um telefone válido (DDD + número).';
    else if (digits.length === 10) {
      // DDD (2) + número (8)
    } else if (digits.length === 11) {
      // DDD (2) + número (9)
    } else {
      next.phone = 'Informe um telefone válido (DDD + 8 ou 9 dígitos).';
    }
    if (!values.email.trim()) next.email = 'Informe seu e-mail.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Informe um e-mail válido.';
    }

    if (!values.eventType) next.eventType = 'Selecione o tipo de evento.';

    const qtyDigits = String(values.quantity || '').replace(/\D/g, '');
    const qty = Number(qtyDigits);
    if (!qtyDigits) next.quantity = 'Informe o quantitativo.';
    else if (qtyDigits.length > 5) next.quantity = 'Use até 5 dígitos.';
    else if (!Number.isFinite(qty) || qty < 1) next.quantity = 'Use um número válido (mínimo 1).';

    if (!values.consent) next.consent = 'É necessário autorizar o contato para prosseguir.';

    return next;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  const setField = (key) => (e) => {
    const { type, value, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [key]: type === 'checkbox' ? checked : value,
    }));
  };

  const setDigitsField = (key, maxLen) => (e) => {
    const digits = String(e.target.value || '').replace(/\D/g, '').slice(0, maxLen);
    setValues((prev) => ({
      ...prev,
      [key]: digits,
    }));
  };

  const setPhoneMasked = (e) => {
    const digits = String(e.target.value || '').replace(/\D/g, '').slice(0, 11);
    const ddd = digits.slice(0, 2);
    const rest = digits.slice(2);

    let formatted = '';
    if (digits.length === 0) formatted = '';
    else if (digits.length <= 2) formatted = `(${ddd}`;
    else formatted = `(${ddd}) ${rest}`;

    setValues((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const markTouched = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const showError = (key) => Boolean(touched[key] && errors[key]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      email: true,
      eventType: true,
      quantity: true,
      consent: true,
    });

    if (!isValid) {
      setSubmitResult('');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitResult('');

      const digits = String(values.phone || '').replace(/\D/g, '');
      const dddDigits = digits.slice(0, 2);
      const phoneDigits = digits.slice(2);
      const qtyDigits = String(values.quantity || '').replace(/\D/g, '');

      const payload = {
        name: values.name.trim(),
        phone: `(${dddDigits}) ${phoneDigits}`.trim(),
        email: values.email.trim(),
        eventType: values.eventType,
        quantity: Number(qtyDigits),
        description: values.description.trim(),
        consent: Boolean(values.consent),
      };

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // fallback: no-op (landing page)
        await Promise.resolve();
      }

      setSubmitResult('Enviado com sucesso! Em breve entraremos em contato.');
      setValues({
        name: '',
        phone: '',
        email: '',
        eventType: '',
        quantity: '',
        description: '',
        consent: false,
      });
      setTouched({});
    } catch (_err) {
      setSubmitResult('Não foi possível enviar agora. Tente novamente em instantes.');
    } finally {
      setSubmitting(false);
    }
  };

  const sectionStyles = useMemo(
    () => ({
      width: '100%',
      background: 'transparent',
      padding: '4rem 1.5rem',
    }),
    []
  );

  const containerStyles = useMemo(
    () => ({
      maxWidth: '64rem',
      margin: '0 auto',
    }),
    []
  );

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
        viewport: { once: true, amount: 0.35 },
      };

  return (
    <section
      id="orcamento"
      style={sectionStyles}
      className={className}
      aria-label="Formulário de orçamento"
    >
      <style>{`
        .form-header {
          margin: 0 0 2rem;
          min-height: 4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .form-title {
          margin: 0;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          color: ${colors.gold};
          line-height: 1.1;
          letter-spacing: -0.02em;
          font-size: clamp(1.5rem, 4vw, 2.25rem);
        }

        .form-card {
          background: rgba(0, 0, 0, 0.925);
          border: 1px solid ${colors.gold};
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border-radius: 1.25rem;
          padding: 1.75rem 1.25rem;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(1, minmax(0, 1fr));
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .field-compact {
          max-width: 14rem;
          justify-self: start;
        }

        .form-label {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          letter-spacing: 0.01em;
          font-size: 0.95rem;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          color: ${colors.white};
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(227, 217, 146, 0.18);
          border-radius: 0.9rem;
          padding: 0.9rem 0.95rem;
          outline: none;
          box-shadow: 0 0 0 rgba(0,0,0,0);
          transition: border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }

        .form-textarea {
          resize: vertical;
          min-height: 3rem;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.45);
        }

        .form-input:focus,
        .form-textarea:focus {
          border-color: rgba(227, 217, 146, 0.65);
          box-shadow: 0 0 0 4px rgba(227, 217, 146, 0.16);
          background: rgba(0, 0, 0, 0.34);
        }

        .form-error {
          color: rgba(255, 192, 192, 0.95);
          font-size: 0.9rem;
          line-height: 1.25;
        }

        .form-fieldset {
          border: 1px solid rgba(227, 217, 146, 0.18);
          border-radius: 1rem;
          padding: 1rem;
        }

        .form-fieldset.is-compact {
          width: fit-content;
          max-width: 100%;
          justify-self: start;
        }

        .right-block {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .eventtype-fieldset {
          width: fit-content;
          max-width: 100%;
        }

        .eventtype-options {
          margin-top: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.85rem;
          align-items: flex-start;
        }

        .form-legend {
          padding: 0 0.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .form-options {
          margin-top: 0.75rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: flex-start;
        }

        .form-radio {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.65rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(227, 217, 146, 0.2);
          background: rgba(0, 0, 0, 0.22);
          color: rgba(255, 255, 255, 0.92);
          width: fit-content;
        }

        .form-radio input {
          accent-color: ${colors.gold};
        }

        .form-consent {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
          padding: 0.75rem 0.9rem;
          border-radius: 1rem;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(227, 217, 146, 0.18);
          color: rgba(255, 255, 255, 0.92);
        }

        .form-consent.is-compact {
          width: fit-content;
          max-width: 100%;
        }

        .form-consent-wrap {
          display: flex;
          justify-content: flex-start;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .form-footer .form-consent-wrap {
          flex: 1 1 auto;
        }

        .form-footer .form-actions {
          margin-top: 0;
          justify-content: flex-end;
        }

        .form-consent span {
          line-height: 1.35;
          font-size: 0.95rem;
        }

        .form-consent input {
          margin-top: 0.2rem;
          accent-color: ${colors.gold};
        }

        .form-actions {
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
        }

        .form-btn {
          appearance: none;
          border: 1px solid ${colors.gold};
          background: ${colors.gold};
          color: ${colors.white};
          border-radius: 999px;
          padding: 0.85rem 1.35rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
        }

        .form-btn::before {
          content: '';
          position: absolute;
          inset: -40% -60%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.35), transparent);
          transform: translateX(-60%) rotate(12deg);
          transition: transform 450ms ease;
        }

        .form-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.02);
          box-shadow: 0 14px 30px rgba(227, 217, 146, 0.22);
        }

        .form-btn:hover::before {
          transform: translateX(60%) rotate(12deg);
        }

        .form-btn:focus-visible {
          outline: 2px solid ${colors.gold};
          outline-offset: 3px;
        }

        .form-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
          filter: none;
        }

        .form-result {
          margin-top: 1.25rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.35;
        }

        @media (min-width: 640px) {
          .form-card {
            padding: 2.25rem 2rem;
          }

          .form-grid {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 1.15rem;
          }

          .span-2 {
            grid-column: 1 / -1;
          }

          .right-block {
            grid-column: 2;
            grid-row: 1 / span 2;
            display: grid;
            grid-template-columns: minmax(0, 14rem) auto;
            grid-template-rows: auto auto;
            column-gap: 0.95rem;
            row-gap: 1.15rem;
            align-items: start;
          }

          .right-block .right-phone {
            grid-column: 1;
            grid-row: 1;
          }

          .right-block .right-qty {
            grid-column: 1;
            grid-row: 2;
          }

          .right-block .eventtype-fieldset {
            grid-column: 2;
            grid-row: 1 / span 2;
            align-self: start;
          }

          .form-footer {
            flex-wrap: nowrap;
            align-items: center;
          }

          .form-footer .form-consent-wrap {
            flex: 1;
          }

          .form-footer .form-actions {
            flex: 0 0 auto;
          }

          .form-actions {
            justify-content: flex-end;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .form-input,
          .form-textarea,
          .form-btn {
            transition: none;
          }

          .form-btn::before {
            transition: none;
          }
        }
      `}</style>

      <div style={containerStyles}>
        <header className="form-header">
          <h2 className="form-title">{title}</h2>
        </header>

        <motion.div className="form-card" {...motionProps}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label" htmlFor="orc-name">Nome</label>
                <input
                  id="orc-name"
                  className="form-input"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={setField('name')}
                  onBlur={markTouched('name')}
                  aria-invalid={showError('name')}
                  aria-describedby={showError('name') ? 'orc-name-err' : undefined}
                />
                {showError('name') && (
                  <div id="orc-name-err" className="form-error" role="alert">
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="right-block">
                <div className="form-field field-compact right-phone">
                  <label className="form-label" htmlFor="orc-phone">Telefone</label>
                  <input
                    id="orc-phone"
                    className="form-input"
                    type="tel"
                    autoComplete="tel"
                    inputMode="numeric"
                    maxLength={15}
                    required
                    value={values.phone}
                    onChange={setPhoneMasked}
                    onBlur={markTouched('phone')}
                    aria-invalid={showError('phone')}
                    aria-describedby={showError('phone') ? 'orc-phone-err' : undefined}
                  />
                  {showError('phone') && (
                    <div id="orc-phone-err" className="form-error" role="alert">
                      {errors.phone}
                    </div>
                  )}
                </div>

                <fieldset className="form-fieldset eventtype-fieldset" aria-label="Tipo de evento">
                  <legend className="form-legend">Tipo de evento</legend>
                  <div className="eventtype-options" onBlur={markTouched('eventType')}>
                    <label className="form-radio">
                      <input
                        type="radio"
                        name="orc-eventType"
                        value="pessoal"
                        required
                        checked={values.eventType === 'pessoal'}
                        onChange={setField('eventType')}
                      />
                      Pessoal
                    </label>

                    <label className="form-radio">
                      <input
                        type="radio"
                        name="orc-eventType"
                        value="corporativo"
                        checked={values.eventType === 'corporativo'}
                        onChange={setField('eventType')}
                      />
                      Corporativo
                    </label>
                  </div>

                  {showError('eventType') && (
                    <div className="form-error" role="alert">
                      {errors.eventType}
                    </div>
                  )}
                </fieldset>

                <div className="form-field field-compact right-qty">
                  <label className="form-label" htmlFor="orc-qty">Quantitativo</label>
                  <input
                    id="orc-qty"
                    className="form-input"
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    required
                    value={values.quantity}
                    onChange={setDigitsField('quantity', 5)}
                    onBlur={markTouched('quantity')}
                    aria-invalid={showError('quantity')}
                    aria-describedby={showError('quantity') ? 'orc-qty-err' : undefined}
                  />
                  {showError('quantity') && (
                    <div id="orc-qty-err" className="form-error" role="alert">
                      {errors.quantity}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-field">
                <label className="form-label" htmlFor="orc-email">E-mail</label>
                <input
                  id="orc-email"
                  className="form-input"
                  type="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={setField('email')}
                  onBlur={markTouched('email')}
                  aria-invalid={showError('email')}
                  aria-describedby={showError('email') ? 'orc-email-err' : undefined}
                />
                {showError('email') && (
                  <div id="orc-email-err" className="form-error" role="alert">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="form-field span-2">
                <label className="form-label" htmlFor="orc-desc">Descrição</label>
                <textarea
                  id="orc-desc"
                  className="form-textarea"
                  value={values.description}
                  onChange={setField('description')}
                  onBlur={markTouched('description')}
                  aria-invalid={false}
                />
              </div>

              <div className="span-2 form-footer">
                <div className="form-consent-wrap">
                  <label className="form-consent is-compact">
                    <input
                      type="checkbox"
                      required
                      checked={values.consent}
                      onChange={setField('consent')}
                      onBlur={markTouched('consent')}
                      aria-invalid={showError('consent')}
                      aria-describedby={showError('consent') ? 'orc-consent-err' : undefined}
                    />
                    <span>
                      Autorizo o contato para fins comerciais conforme a Política de Privacidade
                    </span>
                  </label>
                  {showError('consent') && (
                    <div id="orc-consent-err" className="form-error" role="alert">
                      {errors.consent}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button className="form-btn" type="submit" disabled={submitting}>
                    {submitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            </div>

            {submitResult && <div className="form-result">{submitResult}</div>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
