# Seção 02 - Grid Cards (Estatísticas) - Documentação de Implementação

## Visão Geral
Seção React para exibir três métricas do buffet em formato de **cards** com efeito **glass (vidro)**. A seção deve ser **totalmente responsiva** (desktop e mobile), com **margem de segurança** (safe padding) e visual moderno/elegante.

Conteúdo dos cards (fixo nesta versão):
- **Card 01**: "+300 Eventos Realizados"
- **Card 02**: "+50.000 Clientes Servidos"
- **Card 03**: "+100 Empresas Atendidas"

## Contexto do Projeto (importante)
- O projeto está em React (CRA).
- Apesar de existir import do Tailwind no `src/index.css`, a implementação atual do `HeroSection` utiliza **estilos inline (CSS-in-JS via objetos)**.
- Para manter consistência e evitar dependências/configurações adicionais, recomenda-se implementar esta seção também com **estilos inline**, no mesmo padrão.

## Requisitos de Layout

### Container da Seção
- **Background**: branco (`#ffffff`).
- **Largura**: `100%`.
- **Padding (safe area)**: usar padding horizontal para evitar conteúdo encostado nas bordas em mobile.
  - Sugestão: `padding: '4rem 1.5rem'` (vertical/horizontal)
- **Alinhamento**: centralizar conteúdo com um wrapper interno (container).
- **Container interno**:
  - `maxWidth: '64rem'` (aprox. 1024px)
  - `margin: '0 auto'`

### Grid (Cards)
- **Desktop**: 3 colunas.
- **Tablet**: 2 colunas.
- **Mobile**: 1 coluna.
- **Gap**: ~`1.25rem` a `2rem`.

Implementação sugerida com CSS Grid:
- `display: 'grid'`
- `gridTemplateColumns: 'repeat(1, minmax(0, 1fr))'` (mobile)
- Ajustar via media query:
  - `@media (min-width: 640px)` -> 2 colunas
  - `@media (min-width: 1024px)` -> 3 colunas

## Requisitos Visuais (Glass / Elegância)

### Estilo dos Cards (glass)
Objetivo: card com aparência de vidro sobre fundo branco, com profundidade sutil.

Sugestão de estilo (baseline):
- **Fundo**: branco translúcido
  - `background: 'rgba(255, 255, 255, 0.55)'`
- **Blur**: 
  - `backdropFilter: 'blur(12px)'`
  - `WebkitBackdropFilter: 'blur(12px)'` (Safari)
- **Borda**:
  - `border: '1px solid rgba(0, 0, 0, 0.08)'`
- **Sombra**:
  - `boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'`
- **Raio**:
  - `borderRadius: '1.25rem'`
- **Padding interno**:
  - `padding: '2rem 1.5rem'`

### Hover / Interação (desktop)
- Subir levemente o card:
  - `transform: 'translateY(-4px)'`
- Intensificar a sombra e a borda.
- Transição suave:
  - `transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease'`

### Tipografia
- Texto do card: deve ser legível e com hierarquia.
- Sugestão:
  - Valor destacado (ex.: `+300`): maior e com `fontWeight: 700`
  - Rótulo (ex.: `Eventos Realizados`): menor e com opacidade/cor levemente reduzida

Como o conteúdo vem em uma única string, a implementação pode:
- Manter tudo em uma linha (simples), ou
- Separar em duas linhas (recomendado para hierarquia):
  - `+300`
  - `Eventos Realizados`

## Acessibilidade
- Usar uma `section` com `aria-label` (ex.: `"Estatísticas"`).
- Cards podem ser `div` semânticos (conteúdo informativo), ou `article`.
- Garantir contraste adequado do texto (ex.: usar `#0f172a` ou `#111827`).

## Estrutura Recomendada de Componente

### Nome sugerido
- `StatsGridSection` (ou `GridCardSection`).

### Local do arquivo
- `src/components/StatsGridSection.jsx`

### Integração no App
- Importar e renderizar logo após `HeroSection` em `src/App.js`.

## Exemplo de API (props)
Mesmo com conteúdo fixo, é recomendado receber os itens via props para facilitar manutenção:
- `items`: array com `{ value, label }`

Exemplo de dados:
- `{ value: '+300', label: 'Eventos Realizados' }`
- `{ value: '+50.000', label: 'Clientes Servidos' }`
- `{ value: '+100', label: 'Empresas Atendidas' }`

## Checklist de Implementação
- [ ] Criar componente `StatsGridSection.jsx` em `src/components/`
- [ ] Implementar seção com fundo branco e padding de segurança
- [ ] Implementar grid responsivo (1 / 2 / 3 colunas)
- [ ] Implementar cards com estilo glass (blur, transparência, borda, sombra)
- [ ] Garantir tipografia consistente e elegante
- [ ] Inserir a seção no `App.js` após o `HeroSection`
- [ ] Testar em resoluções mobile/tablet/desktop

---

**Status**: DOCUMENTADO (não implementado)
