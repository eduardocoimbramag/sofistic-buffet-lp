# 12-botoes

## Objetivo
Documentar melhorias de alto nível para botões em duas áreas:

1. **CTA da seção** "BUFFET COM ALTO PADRÃO GASTRONÔMICO" (arquivo `src/components/SobreSection.jsx`).
   - Botão **dourado sólido** (`#e3d992`) sem transparência
   - Texto **branco**
   - Hover com sensação "premium" (efeitos sofisticados)

2. **Controles da seção Serviços** (arquivo `src/components/ServicosCarouselSection.jsx`).
   - Trocar botões "Voltar" e "Avançar" por botões arredondados com setas `<` e `>` (SVG ou caractere)
   - Adicionar indicador minimalista de **pontos** entre os botões
     - pontos inativos: **branco**
     - ponto ativo (card selecionado): **dourado**

**Importante:** esta documentação **não implementa** mudanças; apenas descreve como aplicar.

---

## 1) CTA (SobreSection) — estilo base (obrigatório)

### Onde alterar
- `src/components/SobreSection.jsx`
- CSS: `.about-cta` e `.about-cta:hover`

### Base sugerida (dourado sólido + branco)
Trocar o estilo atual para:

```css
.about-cta {
  background: #e3d992;
  border: 1px solid #e3d992;
  color: #ffffff;
}
```

Recomendado manter:
- `border-radius: 999px`
- `text-transform: uppercase`
- `font-weight: 600`

---

## 1.1) CTA — opções de hover “alto nível”
Abaixo estão 4 opções. Você pode aplicar só 1 (recomendado) para não exagerar.

### Opção A — "Lift + Shadow" (premium clássico)
Sensação de botão "subindo" com sombra quente:

```css
.about-cta {
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
  box-shadow: 0 10px 24px rgba(227, 217, 146, 0.18);
}

.about-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(227, 217, 146, 0.28);
  filter: brightness(1.02);
}
```

### Opção B — "Shine sweep" (reflexo passando)
Efeito de brilho atravessando o botão.

```css
.about-cta {
  position: relative;
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.about-cta::before {
  content: '';
  position: absolute;
  inset: -40% -60%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
  transform: translateX(-60%) rotate(12deg);
  transition: transform 450ms ease;
}

.about-cta:hover::before {
  transform: translateX(60%) rotate(12deg);
}

.about-cta:hover {
  transform: translateY(-1px);
}
```

### Opção C — "Soft glow" (aura dourada)
Uma aura sutil dourada no hover.

```css
.about-cta {
  transition: box-shadow 220ms ease, transform 220ms ease;
}

.about-cta:hover {
  transform: translateY(-1px);
  box-shadow:
    0 0 0 4px rgba(227, 217, 146, 0.18),
    0 16px 38px rgba(0, 0, 0, 0.35);
}
```

### Opção D — "Press" (feedback de clique refinado)
Além do hover, melhora o clique:

```css
.about-cta:active {
  transform: translateY(0px) scale(0.99);
}
```

---

## 1.2) Acessibilidade do CTA (recomendado)
Garantir foco visível:

```css
.about-cta:focus-visible {
  outline: 2px solid #e3d992;
  outline-offset: 4px;
}
```

---

## 2) Controles (Serviços) — setas arredondadas + indicador

### Onde alterar
- `src/components/ServicosCarouselSection.jsx`
- JSX: bloco `.servicos-controls`
- CSS: `.servicos-btn` (pode virar `.servicos-arrow-btn`) + classes do indicador

### Estrutura sugerida (JSX)
Trocar o conteúdo dos botões de texto para ícones e inserir o indicador no meio:

Exemplo estrutural:

```jsx
<div className="servicos-controls" aria-label="Controles do carrossel">
  <button type="button" className="servicos-arrow-btn" ...>...</button>

  <div className="servicos-dots" aria-label="Progresso do carrossel">
    {items.map((_, i) => (
      <span
        key={i}
        className={`servicos-dot${i === activeIndex ? ' is-active' : ''}`}
      />
    ))}
  </div>

  <button type="button" className="servicos-arrow-btn" ...>...</button>
</div>
```

Observação: o componente hoje usa `virtualIndex` e `items.length`. Para o indicador funcionar bem, o `activeIndex` deve ser normalizado:

- `activeIndex = ((virtualIndex % items.length) + items.length) % items.length`

---

## 2.1) Setas: opções de ícone

### Opção 1 — caracteres (mais simples)
- Botão anterior: `<`
- Botão próximo: `>`

### Opção 2 — SVG inline minimalista (recomendado)

Seta esquerda:
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

Seta direita:
```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

---

## 2.2) Estilo dos botões de seta (dourado sólido)

```css
.servicos-arrow-btn {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid #e3d992;
  background: #e3d992;
  color: #ffffff;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
}

.servicos-arrow-btn:hover {
  transform: translateY(-1px);
  filter: brightness(1.02);
  box-shadow: 0 14px 30px rgba(227, 217, 146, 0.22);
}

.servicos-arrow-btn:active {
  transform: translateY(0px) scale(0.99);
}

.servicos-arrow-btn:focus-visible {
  outline: 2px solid #e3d992;
  outline-offset: 4px;
}
```

---

## 2.3) Indicador minimalista (pontinhos)

```css
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
  background: rgba(255, 255, 255, 0.95);
  opacity: 0.85;
}

.servicos-dot.is-active {
  background: #e3d992;
  opacity: 1;
}
```

---

## Checklist de validação
- CTA (BUFFET):
  - dourado sólido + texto branco
  - hover perceptível e elegante
  - foco visível (teclado)
- Serviços:
  - setas clicáveis em mobile
  - indicador reflete item ativo corretamente
  - cores corretas (pontos brancos e ativo dourado)

---

## Próximo passo
Quando você autorizar, eu implemento:
- (A) um dos hovers premium do CTA no `SobreSection`
- (B) setas + dots no `ServicosCarouselSection` com `activeIndex` normalizado
