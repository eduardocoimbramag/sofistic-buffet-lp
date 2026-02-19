# Seção 07 - Rodapé (Institucional) - Documentação de Implementação

## Visão Geral
Seção React para implementar um **rodapé institucional** (footer) seguindo a identidade do site.

Requisitos-chave:
- **Fundo do rodapé**: Branco (`#FFFFFF`).
- **Linha superior de separação** entre as seções: **dourada** (`#e3d992`).
- **Responsividade**: mobile-first estrita com **margem de segurança**.
- **Acessibilidade**: semântica correta (`footer`, headings, links), foco visível e bom contraste.
- **Padrão do projeto**: componente funcional, Clean Code, variáveis de design consistentes e estilos inline + `<style>` local.

## Paleta de Cores
- **Black**: `#000000` (texto principal e links)
- **White**: `#FFFFFF` (background do rodapé)
- **Gold**: `#e3d992` (linha superior, detalhes e hover)

## Arquitetura de Layout

### Estrutura do Rodapé
- Usar tag semântica:
  - `footer` (em vez de `section`), com `aria-label` (ex.: `"Rodapé"`).
- Linha superior:
  - `border-top: 1px solid #e3d992` (ou `2px` para maior presença)

### Container
- Safe padding (margem de segurança), mobile-first:
  - Sugestão: `padding: '3rem 1.5rem 2rem'`
- Container interno:
  - `maxWidth: '64rem'`
  - `margin: '0 auto'`

### Grid/colunas (padrão institucional)
Sugestão de estrutura com 3 áreas principais:
1) **Marca / resumo**
- Nome da marca + frase curta (ex.: posicionamento/assinatura)

2) **Links rápidos**
- Lista de links para seções do site (âncoras)

3) **Contato**
- Telefone, e-mail e cidade/atuação

> Observação: como o projeto ainda pode não ter todas as âncoras/rotas, os links podem apontar para `#` ou para ids das seções quando existirem.

#### Responsividade
- **Mobile (default)**: 1 coluna (stack)
- **Tablet (>= 640px)**: 2 colunas
- **Desktop (>= 1024px)**: 3 colunas

#### Espaçamento
- `gap: 1.5rem` (mobile)
- `gap: 2rem` (tablet/desktop)

## Conteúdo Recomendado

### Marca / Resumo
- Heading: `h3` (ou `h2` se for o primeiro heading do footer)
- Texto curto em `p`

### Links rápidos
- Heading: `h3`
- `nav aria-label="Links do rodapé"` com lista (`ul`/`li`) de `a`

Sugestão de links:
- Início
- Quem Somos
- Pratos
- Serviços
- Orçamento

### Contato
- Heading: `h3`
- Lista (`ul`) de itens de contato:
  - Telefone (link `tel:`)
  - E-mail (link `mailto:`)
  - Endereço/cidade (texto)

## Estilo (design profissional)

### Tipografia
- Títulos (`h3`):
  - Fonte: `Playfair Display` (consistência com títulos das seções)
  - Cor: `#000000`
  - Tamanho: `clamp(1.05rem, 1.5vw, 1.25rem)`

- Texto/links:
  - Cor: `rgba(0, 0, 0, 0.78)`
  - Tamanho: `0.95rem ~ 1rem`

### Links
- Estado normal: preto
- Hover/focus: dourado (ou underline dourado)
- Foco visível:
  - `outline: 2px solid #e3d992; outline-offset: 2px;`

### Subfooter (linha final)
Recomendado incluir uma faixa inferior com:
- `© Ano - Nome da marca. Todos os direitos reservados.`
- Opcional: link para Política de Privacidade

Estilo:
- `margin-top: 2rem`
- `padding-top: 1rem`
- `border-top: 1px solid rgba(227, 217, 146, 0.6)` (mais sutil que a linha principal)

## Acessibilidade
- `footer` com `aria-label`
- `nav` com `aria-label` para o bloco de links
- Links de contato usando `tel:` e `mailto:`
- Manter contraste alto: texto preto sobre fundo branco
- Respeitar `prefers-reduced-motion` caso use microanimações (opcional)

## Estrutura Recomendada do Componente

### Nome sugerido
- `RodapeSection` (ou `FooterSection`)

### Local do arquivo
- `src/components/RodapeSection.jsx`

### Integração no App
- Importar e renderizar como **último elemento** em `src/App.js`.

## API (props sugeridas)
Para permitir flexibilidade:
- `brandName`: `string` (default: `"Buffet Elegance"`)
- `tagline`: `string` (texto curto)
- `links`: `{ label: string; href: string }[]`
- `phone`: `string`
- `email`: `string`
- `location`: `string`
- `className`: `string`

## Checklist de Implementação
- [ ] Criar `src/components/RodapeSection.jsx`
- [ ] Implementar `footer` (fundo branco)
- [ ] Adicionar `border-top` dourado (separador entre seções)
- [ ] Implementar container com `maxWidth` e safe padding
- [ ] Implementar grid responsivo (1/2/3 colunas)
- [ ] Implementar links acessíveis e foco visível
- [ ] Implementar subfooter com copyright
- [ ] Testar responsividade e contraste

---

**Status**: DOCUMENTADO (não implementado)
