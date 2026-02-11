# Seção 04 - Pratos (Grid 8 Cards) - Documentação de Implementação

## Visão Geral
Seção React para exibir um **grid de pratos/estações** (8 cards) com estética moderna, consistente com a **Seção 02 (StatsGridSection)**.

Requisitos-chave:
- **Fundo da seção**: Preto (`#000000`).
- **Grid**: 8 cards, com **4 colunas e 2 linhas no desktop** (4x2).
- **Responsividade**: estratégia **mobile-first** estrita com **margem de segurança**.
- **Acessibilidade**: tags semânticas (`section`, `h2`/`h3`), contraste adequado.
- **Padrão do projeto**: componente funcional, limpo (Clean Code), variáveis de design consistentes.

Conteúdo dos cards (fixo nesta versão):
1. Coqueteis
2. Crepe
3. Feijoada
4. Sushi
5. Ilha de Caldinhos
6. Salgados
7. Churrasco
8. Petiscos de Boteco

## Referência do Projeto
- Usar `src/components/StatsGridSection.jsx` como **base** para:
  - Estrutura geral (section + container + grid)
  - Espaçamentos (`padding`, `maxWidth`)
  - Estilo de card (borda, raio, sombra, hover, `prefers-reduced-motion`)

> Observação: apesar do Tailwind constar no projeto, a implementação atual segue majoritariamente **estilos inline + bloco `<style>` local**. Recomenda-se manter esse padrão.

## Paleta de Cores
- **Black**: `#000000` (background da seção)
- **White**: `#FFFFFF` (texto principal)
- **Gold**: `#e3d992` (destaques, bordas, ícones/opcionais)

## Arquitetura de Layout

### Container da Seção
- **Largura**: `100%`
- **Background**: `#000000`
- **Safe padding** (margem de segurança): manter padrão consistente com a seção 02.
  - Sugestão: `padding: '4rem 1.5rem'`
- **Container interno**:
  - `maxWidth: '64rem'` (mesmo da seção 02)
  - `margin: '0 auto'`

### Grid Responsivo (mobile-first)
A especificação pede 4x2 no desktop. Em mobile/tablet, ajustar para evitar cards espremidos.

Sugestão de breakpoints (CSS Grid):
- **Mobile (default)**: 1 coluna
  - `grid-template-columns: repeat(1, minmax(0, 1fr))`
- **sm (>= 640px)**: 2 colunas
  - `repeat(2, ...)`
- **lg (>= 1024px)**: 4 colunas
  - `repeat(4, ...)`

Assim, com 8 cards, o desktop naturalmente vira **2 linhas**.

**Gap**:
- Sugestão: `gap: 1.5rem` (mesmo da Seção 02)

## Card Design (inspirado na Seção 02)

### Efeito visual sugerido (glass adaptado ao fundo preto)
Como o fundo será preto, o “glass” deve ser um vidro escuro elegante:
- **Fundo do card**:
  - `background: 'rgba(255, 255, 255, 0.06)'`
- **Blur**:
  - `backdrop-filter: blur(12px)`
  - `-webkit-backdrop-filter: blur(12px)`
- **Borda**:
  - `border: '1px solid rgba(227, 217, 146, 0.25)'` (dourado sutil)
- **Sombra**:
  - `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35)`
- **Raio**:
  - `border-radius: 1.25rem`
- **Padding**:
  - `padding: 2rem 1.5rem`

### Hover (desktop)
- Leve elevação:
  - `transform: translateY(-4px)`
- Intensificar borda/sombra:
  - `border-color: rgba(227, 217, 146, 0.45)`
  - `box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45)`
- Transição suave:
  - `transition: transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease`

### Tipografia
- Título do card (nome do prato) deve ser legível e com presença:
  - Cor: `#FFFFFF`
  - Fonte: sans-serif
  - Peso: `600`
  - Tamanho: `clamp(1rem, 1.2vw, 1.1rem)`
  - Tracking opcional leve

### Ícone (opcional)
Se desejar reforçar sofisticação, pode incluir ícone `lucide-react` (ex.: `Utensils`, `Sparkles`, `Star`) em dourado.
- Cor do ícone: `#e3d992`

## Semântica e Acessibilidade
- Usar:
  - `section` com `aria-label` (ex.: `"Pratos"`)
  - Um heading para título da seção (recomendado): `h2`
  - Cards como `article` (ou `div`) com `h3` para o título de cada prato
- Contraste:
  - Texto branco no fundo preto (ok)
  - Dourado usado com parcimônia para destaque

## Estrutura Recomendada do Componente

### Nome sugerido
- `PratosGridSection` (ou `MenuGridSection`).

### Local do arquivo
- `src/components/PratosGridSection.jsx`

### Integração no App
- Importar e renderizar após a Seção 03 (`SobreSection`) no `src/App.js`.

## API (props sugeridas)
Mesmo com conteúdo fixo, é recomendado permitir customização:
- `items`: `string[]` (lista de pratos)
- `title`: `string` (ex.: `"Pratos & Estações"`)

Exemplo:
- `items=["Coqueteis", "Crepe", ...]`

## Checklist de Implementação
- [ ] Criar `src/components/PratosGridSection.jsx`
- [ ] Implementar `section` com fundo preto + safe padding
- [ ] Criar container interno com `maxWidth: '64rem'` e centralização
- [ ] Implementar grid responsivo (1 / 2 / 4 colunas)
- [ ] Implementar 8 cards com estilo glass escuro e hover
- [ ] Garantir headings semânticos (`h2` da seção, `h3` nos cards)
- [ ] Integrar no `App.js` após `SobreSection`
- [ ] Testar responsividade (mobile/tablet/desktop)
- [ ] Validar contraste e foco visível

---

**Status**: DOCUMENTADO (não implementado)
