# 15-changecss

## Objetivo
Padronizar a estética de:

- **Carrossel da seção “Serviços”** (cards do carrossel)
- **CTA dentro de cada card** (idêntico ao botão “SOLICITE UM ORÇAMENTO” da seção “BUFFET COM ALTO PADRÃO GASTRONÔMICO”, porém menor)
- **Card do Formulário** (seção “Solicite um orçamento”)

…para ficar no mesmo padrão visual da seção **“BUFFET COM ALTO PADRÃO GASTRONÔMICO”** (no código: `SobreSection`), que usa **preto com transparência sutil** + **borda dourada**.

**Importante:** este documento descreve a implementação. Não aplica mudanças automaticamente.

---

## Contexto do código (onde mexer)

### Seção de referência (padrão visual)
- **Componente:** `src/components/SobreSection.jsx`
- **Painel de referência:** `.about-panel`
  - `background: rgba(0, 0, 0, 0.925);`
  - `border: 1px solid ${gold};`
  - `border-radius: 1.25rem;`
- **Botão de referência (“Solicite um orçamento”):** `.about-cta`
  - `border: 1px solid ${gold};`
  - `background: ${gold};`
  - `border-radius: 999px;`
  - brilho no hover via `::before`

### Seção Serviços (carrossel)
- **Componente:** `src/components/ServicosCarouselSection.jsx`
- **Cards do carrossel:** `.servicos-card`
  - hoje: `background: rgba(255, 255, 255, 0.06)` (glass claro)
  - hoje: `border: 1px solid rgba(227, 217, 146, 0.25)`

### Seção Formulário
- **Componente:** `src/components/FormularioSection.jsx`
- **Card do formulário:** `.form-card`
  - hoje: `background: ${colors.glassBg}` (`rgba(255, 255, 255, 0.06)`) (glass claro)
  - hoje: `border: 1px solid ${colors.glassBorder}` (`rgba(227, 217, 146, 0.25)`) (dourado suave)

---

## Mudança 1 — Carrossel “Serviços”: cards no padrão do “about-panel”

### O que mudar
No arquivo `src/components/ServicosCarouselSection.jsx`, ajustar `.servicos-card` (e opcionalmente `.servicos-card.is-active`) para ficar no padrão escuro do `.about-panel`.

### Sugestão de implementação
Ajustar o bloco `.servicos-card` para:

- `background: rgba(0, 0, 0, 0.925);`
- manter `border-radius: 1.25rem;` (já existe)
- `border: 1px solid ${colors.gold};` (ou dourado com opacidade, se quiser mais sutil)

Opcional (para manter o “active” elegante):
- trocar `border-color` do `.servicos-card.is-active` para um dourado levemente mais forte, mas ainda consistente.

### Observações
- Os cards já usam `backdrop-filter`. Se o background ficar bem escuro e opaco como `0.925`, o blur quase não aparece (o que é ok). Se você quiser manter mais “glass”, use algo como `rgba(0,0,0,0.75)`.

---

## Mudança 2 — CTA dentro de cada card de Serviços

### O que mudar
No arquivo `src/components/ServicosCarouselSection.jsx`:

1. Adicionar um elemento `<a>` ou `<button>` dentro do `<article className="servicos-card">`.
2. Criar uma classe, por exemplo `.servicos-card-cta`.
3. Replicar o estilo da `.about-cta`, com dimensões menores.

### Onde inserir no JSX
Dentro de cada card, após `.servicos-card-body` (ou dentro dele, no final), inserir algo equivalente a:

- CTA com label (ex.: "Solicite um orçamento")
- link rolando para `#orcamento` (o formulário tem `id="orcamento"`)

### Estilo: idêntico ao `.about-cta` (reduzido)
Copiar as regras de `.about-cta` e `.about-cta::before` de `SobreSection.jsx`, ajustando:

- `padding` menor (ex.: `0.55rem 0.9rem`)
- `font-size` menor (ex.: `0.8rem` a `0.9rem`)
- `margin-top` menor

### Acessibilidade / comportamento
- Se usar `<a href="#orcamento">`, você pode manter o scroll suave com uma função parecida com `handleCtaClick` do `SobreSection`.
- Garanta `:focus-visible` igual ao botão original.

---

## Mudança 3 — Formulário: card no padrão do “about-panel”

### O que mudar
No arquivo `src/components/FormularioSection.jsx`, ajustar `.form-card` para:

- `background: rgba(0, 0, 0, 0.925);`
- `border: 1px solid ${colors.gold};`

Opcional:
- Se quiser uniformizar ainda mais, usar exatamente o mesmo `border-radius`/`padding` do `.about-panel`.

### Observações
- O formulário já tem inputs escuros (`background: rgba(0, 0, 0, 0.28)`) e borda dourada suave. Com o card mais escuro, pode valer suavizar um pouco o background do input (ex.: `0.22`) para aumentar contraste. (Somente se necessário após visualizar.)

---

## Checklist de validação visual

- **Serviços (cards):** card escuro + borda dourada, coerente com a seção “BUFFET...”
- **CTA do card:** mesmo brilho/hover do “SOLICITE UM ORÇAMENTO”, porém menor e bem encaixado no card
- **Formulário:** card escuro + borda dourada, mantendo boa legibilidade
- **Hover/Focus:** outline dourado aparece em teclado (`:focus-visible`) nos CTAs

---

## Arquivos que serão alterados (quando você autorizar)

- `src/components/ServicosCarouselSection.jsx`
- `src/components/FormularioSection.jsx`

(Referência de estilo: `src/components/SobreSection.jsx`)
