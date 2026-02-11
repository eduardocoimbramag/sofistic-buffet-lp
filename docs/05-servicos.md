# Seção 05 - Serviços (Carrossel 3 Cards / Infinito) - Documentação de Implementação

## Visão Geral
Seção React para exibir um **carrossel infinito** (arrastar/drag) de **serviços** com estética premium, consistente com o padrão do projeto (Seções 02/04).

Requisitos-chave:
- **Fundo da seção**: Preto (`#000000`).
- **Carrossel**:
  - Exibir **3 cards “amostra”** na viewport (em desktop), com o **card central em evidência** (ligeiramente maior).
  - **Infinito** (loop), com suporte a **arrastar**.
  - Total de **7 itens** (títulos fixos nesta versão).
  - **Botões** de avançar e retornar **na parte de baixo** do carrossel.
- **Animações**: fluidas, padrão de design profissional.
- **Responsividade**: estratégia **mobile-first** estrita com **margem de segurança**.
- **Acessibilidade**: semântica correta (`section`, headings), contraste adequado, controles acessíveis.

Itens (fixo nesta versão):
1. Almoço
2. Brunch
3. Casamento
4. Mesa de antepastos
5. Coffee Break
6. Drinks para eventos
7. Buffet e catering

Cada card:
- **Título** (o item acima)
- **Legenda curta** (placeholder) logo abaixo do título

## Referência do Projeto
- Usar `src/components/StatsGridSection.jsx` e `src/components/PratosGridSection.jsx` como base para:
  - Estrutura geral (section + container)
  - Safe padding e `maxWidth`
  - Tipografia e paleta (black/white/gold)

> Observação: apesar do Tailwind constar no projeto, as seções atuais seguem majoritariamente **estilos inline + bloco `<style>` local**. Recomenda-se manter esse padrão.

## Paleta de Cores
- **Black**: `#000000` (background da seção)
- **White**: `#FFFFFF` (texto principal)
- **Gold**: `#e3d992` (destaques, bordas, setas/ícones)

## Arquitetura de Layout

### Container da Seção
- `section` com `background: #000000`
- **Safe padding** (margem de segurança): padrão consistente com as seções anteriores.
  - Sugestão: `padding: '4rem 1.5rem'` (mobile-first)
- Container interno:
  - `maxWidth: '64rem'` (ou valor já usado nas seções 02/04)
  - `margin: '0 auto'`

### Cabeçalho
- Heading da seção: `h2` (ex.: `"Serviços"`)
- Título em dourado (`#e3d992`) e texto auxiliar opcional em branco.
- Centralização horizontal recomendada.

### Área do Carrossel
Estrutura recomendada (alto nível):
- Wrapper do carrossel (responsável por “cortar”/mascarar overflow)
- Track (linha horizontal com os cards)
- Cards (itens)
- Controles (prev/next) abaixo

## Comportamento do Carrossel

### Regras de visualização (responsivo / mobile-first)
- **Mobile (default)**:
  - 1 card principal por vez (central), com “peek” sutil dos lados (opcional)
  - Botões prev/next abaixo
- **Tablet (>= 640px)**:
  - 2 cards visíveis (com central levemente maior, quando aplicável)
- **Desktop (>= 1024px)**:
  - **3 cards visíveis**
  - **Card central em evidência** (maior)

> Observação: “3 cards visíveis” pode significar 3 totalmente visíveis + gutters, ou 1 central + 2 laterais parcialmente visíveis. A implementação deve priorizar estética e legibilidade.

### Card central em evidência
- O card “ativo” (central) deve ter:
  - `transform: scale(1.05 ~ 1.12)` (sugestão)
  - Borda dourada um pouco mais evidente
  - Sombra levemente mais forte
- Cards laterais:
  - Leve redução de escala e/ou opacidade (com cuidado para não ferir contraste)

### Infinito (loop)
O carrossel deve parecer contínuo.

Estratégias de implementação aceitáveis (escolher uma na fase de implementação):
- **Estratégia A (recomendada): biblioteca de carrossel com loop**
  - Ex.: `embla-carousel-react` com `loop: true`
  - Vantagens:
    - Loop e drag consistentes
    - Controle por botões nativo
    - Menos código “manual”
- **Estratégia B: implementação manual com `framer-motion`**
  - Usar `drag="x"` no track
  - Duplicar itens no track (ex.: renderizar 2–3 vezes) e fazer “recenter” quando atingir limites
  - Vantagens:
    - Mantém dependências atuais (`framer-motion` já existe)
  - Riscos:
    - Lógica de loop mais delicada (reposition)
    - Maior chance de edge cases

A decisão final deve priorizar:
- fluidez do drag
- previsibilidade do loop
- simplicidade de manutenção

### Arrastar (drag)
- O usuário deve poder arrastar no track horizontalmente.
- Deve haver “snap” para o card ativo (recomendado).
- Em dispositivos touch, drag deve ser natural.

### Botões (prev/next)
- Local: **parte inferior** do carrossel.
- Botões com:
  - Tamanho confortável (touch target)
  - Contraste alto
  - Estados de hover/focus visíveis
- Idealmente com ícones (ex.: setas) e texto acessível.

## Card Design (estética premium / glass escuro)
Cards devem manter consistência com o “glass” usado na seção 04.

Sugestão de estilo:
- Fundo: `rgba(255, 255, 255, 0.06)`
- Blur: `backdrop-filter: blur(12px)`
- Borda: `1px solid rgba(227, 217, 146, 0.25)`
- Raio: `1.25rem`
- Sombra: `0 10px 30px rgba(0, 0, 0, 0.35)`
- Padding: `2rem 1.5rem`

Tipografia:
- Título do card (`h3`): branco, peso 600
- Legenda: branco com opacidade (ex.: `rgba(255,255,255,0.8)`) para hierarquia

## Animações e Motion

### Animações sugeridas
- Entrada da seção (ao aparecer): fade + slide sutil
- Transição entre cards ativos: easing suave
- Escala do card central: transição de 200–300ms

### Acessibilidade de animações
- Respeitar `prefers-reduced-motion`:
  - Reduzir/eliminar transições de escala/entrada
  - Evitar animações contínuas

## Semântica e Acessibilidade

### Semântica
- `section` com `aria-label` (ex.: `"Serviços"`)
- Heading principal da seção: `h2`
- Cada card: `article` com `h3`

### Controles
- Botões prev/next devem ser `button` com:
  - `aria-label="Anterior"` e `aria-label="Próximo"`
- Se houver paginação/estado do slide:
  - Expor estado atual via `aria-live="polite"` (opcional)

### Teclado
- Botões prev/next acessíveis via teclado
- Foco visível (outline ou estilo custom com contraste)

## Estrutura Recomendada do Componente

### Nome sugerido
- `ServicosCarouselSection`

### Local do arquivo
- `src/components/ServicosCarouselSection.jsx`

### Integração no App
- Importar e renderizar após a Seção 04 (`PratosGridSection`) em `src/App.js`.

## API (props sugeridas)
Mesmo com conteúdo fixo, recomenda-se permitir customização:
- `title`: `string` (default: `"Serviços"`)
- `items`: `{ title: string; description: string }[]`
- `className`: `string` (opcional)

Itens default sugeridos (com legenda placeholder):
- `Almoço` — `"Ideal para encontros corporativos e celebrações."`
- `Brunch` — `"Opções leves e sofisticadas para seu evento."`
- `Casamento` — `"Experiência completa com apresentação premium."`
- `Mesa de antepastos` — `"Seleção refinada para recepções e coquetéis."`
- `Coffee Break` — `"Praticidade e elegância para sua agenda."`
- `Drinks para eventos` — `"Coquetelaria com serviço profissional."`
- `Buffet e catering` — `"Soluções sob medida para qualquer formato."`

## Checklist de Implementação
- [ ] Criar `docs/05-servicos.md` (este documento)
- [ ] Criar `src/components/ServicosCarouselSection.jsx`
- [ ] Implementar `section` (fundo preto + safe padding)
- [ ] Implementar header com `h2` (centralizado)
- [ ] Implementar carrossel com drag + loop (biblioteca ou manual)
- [ ] Implementar destaque do card central (escala/borda/sombra)
- [ ] Implementar botões prev/next abaixo
- [ ] Garantir `prefers-reduced-motion`
- [ ] Garantir acessibilidade (aria-labels, foco, headings)
- [ ] Testar responsividade (mobile/tablet/desktop)

---

**Status**: DOCUMENTADO (não implementado)
