# Seção 03 - About Us (Quem Somos) - Documentação de Implementação

## Visão Geral
Seção React **"Quem Somos"** com foco em **autoridade**, **SEO** e **conversão**, equilibrando **mídia rica** (vídeo) com estrutura semântica e conteúdo rastreável.

A seção deve seguir a paleta do projeto:
- **Black**: `#000000`
- **White**: `#FFFFFF`
- **Gold**: `#e3d992`

Requisitos globais:
- **Mobile-first estrito** com **margem de segurança**.
- **Acessibilidade**: tags semânticas (`section`, `h2`, etc.) e contraste adequado.
- **Padrão do projeto**: componentes funcionais, clean code, variáveis/constantes de design consistentes.

## Dependências
- **React** (componente funcional)
- **Framer Motion** (animações com `whileInView`)
- **lucide-react** (ícones `Check` ou `Star` em dourado)

> Observação: o projeto já utiliza Framer Motion e possui `lucide-react` nas dependências.

## Objetivos de SEO (o que garantir)
- **Título H2** forte, com intenção local/serviço.
- Texto descritivo com termos relacionados (buffet, luxo, eventos, corporativo, casamento etc.), sem exagerar (evitar keyword stuffing).
- `video` com `poster` e texto de apoio ao redor (crawler-friendly).
- `aria-label` na seção e hierarquia correta de headings.

## Arquitetura de Layout

### Container
Conforme especificação:
- `max-w-7xl mx-auto px-6 py-12 md:py-24`

**Como o projeto atual está em estilos inline**, recomenda-se converter esse container para equivalentes CSS-in-JS:
- `maxWidth: '80rem'` (aprox. Tailwind `max-w-7xl`)
- `margin: '0 auto'`
- `paddingLeft/Right: '1.5rem'` (px-6)
- `paddingTop/Bottom: '3rem'` (py-12)
- Em telas médias (`>= 768px`), aumentar para `6rem` (py-24)

### Grid principal
- `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`

Recomendação CSS:
- Mobile (default): 1 coluna
- `@media (min-width: 1024px)`: 2 colunas
- `gap: 3rem`
- `alignItems: 'center'`

## Conteúdo e Semântica

### Headline (H2)
- Fonte serifada
- Cor preta
- Texto:
  - `Buffet de Luxo para Eventos Exclusivos em [Inserir Região]`

Recomendações:
- A região deve ser uma prop (ex.: `region="São Paulo"`), para manter reutilizável e SEO local.
- Tipografia responsiva (mobile-first):
  - `fontSize: clamp(1.75rem, 4.5vw, 3rem)`
  - `lineHeight: 1.1`

### Parágrafo descritivo
- Sans-serif
- Cinza escuro (ex.: `rgba(15, 23, 42, 0.78)` ou `#1f2937`)
- Largura confortável em desktop (pode usar `maxWidth: '36rem'` no bloco de texto)

### Lista de diferenciais (bullets)
- Estrutura: `ul` + `li` (semântica)
- Ícones Lucide (`Check` ou `Star`) em dourado `#e3d992`
- Espaçamento e alinhamento em flex

Exemplos de diferenciais (sugestões — texto final é seu):
- Atendimento premium e consultivo
- Cardápios autorais e execução impecável
- Estrutura para eventos corporativos e sociais

### CTA secundário
- Tipo: `a` (link) com estilo de underline/border-bottom dourado
- Hover animado: aumentar a largura/espessura do border-bottom ou usar um pseudo-elemento (no padrão do projeto, pode ser feito com `linear-gradient` + background-size animado)

Requisitos:
- Contraste e foco visível (`:focus-visible`)
- Texto curto e orientado à ação (ex.: "Conheça nosso portfólio" / "Falar com um especialista")

## Mídia (lado direito)

### Container de vídeo
- Proporção:
  - `aspect-video` **ou** `aspect-[4/5]` conforme especificação

Como não há utilitários Tailwind garantidos, recomenda-se:
- Wrapper com `position: relative`
- Aspect ratio via `aspectRatio: '16 / 9'` ou `aspectRatio: '4 / 5'`

### Tag <video>
Requisitos:
- `autoPlay`
- `muted`
- `loop`
- `playsInline`
- `poster` (imagem) para SEO e carregamento

Recomendações adicionais:
- `preload="metadata"` (boa prática para performance)
- `style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1.25rem' }}`

### Moldura (profundidade)
- Elemento absoluto atrás do vídeo
- Borda dourada `#e3d992`
- Deslocamento: `15px` (direita/baixo) para profundidade

Exemplo conceitual:
- `frame` (absoluto): `top: 15px; left: 15px; right: -15px; bottom: -15px; border: 2px solid #e3d992; borderRadius: 1.25rem;`
- `video` acima com `position: relative; zIndex: 1;`

## Responsividade (regra de ordem)
Requisito explícito:
- Em `lg`: **texto à esquerda**, **vídeo à direita**.
- Em mobile: ordem deve ser:
  1) **Título**
  2) **Vídeo**
  3) **Texto descritivo** (parágrafo + lista + CTA)

Implementação sugerida (sem Tailwind):
- Estruturar JSX em blocos separados:
  - Bloco A: título
  - Bloco B: mídia
  - Bloco C: descrição (parágrafo + lista + CTA)
- No desktop (`>= 1024px`), usar CSS Grid com `gridTemplateAreas` ou posicionar os blocos com `order` via classes.

## Animações (Framer Motion)
- Usar `whileInView` com `viewport: { once: true }`.
- Entradas suaves e elegantes:
  - Título: fade + slide-up leve
  - Vídeo: fade + scale sutil
  - Descrição: fade + slide-up com delay

Recomendações:
- Respeitar `prefers-reduced-motion` (opcional, mas recomendado)
- Duração ~ 0.6s a 0.9s

## API do Componente (props sugeridas)
Para SEO local e reuso:
- `region` (string) — substitui `[Inserir Região]`
- `title` (string) — opcional (default com o texto padrão)
- `description` (string)
- `highlights` (string[]) — lista de diferenciais
- `ctaLabel` (string)
- `ctaHref` (string)
- `videoSrc` (string)
- `videoPoster` (string)

## Estrutura recomendada do arquivo
- **Nome**: `SobreSection.jsx`
- **Local**: `src/components/SobreSection.jsx`
- **Integração**: importar no `src/App.js` e renderizar após a seção 02 (Stats)

## Checklist de Implementação
- [ ] Criar `src/components/SobreSection.jsx` (componente funcional)
- [ ] Aplicar container `max-w-7xl mx-auto px-6 py-12 md:py-24` (equivalente em inline styles)
- [ ] Implementar grid `1 col` (mobile) e `2 col` (lg)
- [ ] Garantir ordem mobile: Título -> Vídeo -> Descrição
- [ ] Criar headline `h2` serifada em preto com região via prop
- [ ] Parágrafo em cinza escuro legível
- [ ] Lista `ul/li` com ícones Lucide (dourado)
- [ ] CTA link com hover animado (border-bottom dourada)
- [ ] Vídeo com `autoplay/muted/loop/playsinline` e `poster`
- [ ] Moldura dourada absoluta atrás do vídeo com offset 15px
- [ ] Framer Motion `whileInView` + `viewport: { once: true }`
- [ ] Revisar contraste e foco visível

---

**Status**: DOCUMENTADO (não implementado)
