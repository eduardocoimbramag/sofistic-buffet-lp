# Seção 06 - Formulário (Solicite um orçamento) - Documentação de Implementação

## Visão Geral
Seção React para exibir um **formulário de solicitação de orçamento** com estética premium e consistente com o padrão do projeto.

Requisitos-chave:
- **Fundo da seção**: Preto (`#000000`).
- **Título**: `"Solicite um orçamento"`.
- **Campos** (com `label`):
  1. Nome
  2. Telefone
  3. E-mail
  4. Tipo de evento (**seleção única** entre `Pessoal` e `Corporativo`) — apesar do pedido mencionar “checkbox”, o comportamento é **mutuamente exclusivo**.
  5. Quantitativo
  6. Descrição
  7. Checkbox de consentimento: `"Autorizo o contato para fins comerciais conforme a Política de Privacidade"`
- **Botão de enviar**.
- **Animação de surgir** ao entrar em viewport.
- **Responsividade**: mobile-first estrita com margem de segurança.
- **Acessibilidade**: tags semânticas, contraste adequado, foco visível, validações com mensagens claras.
- **Clean Code**: componente funcional, variáveis de design consistentes, baixo acoplamento.

## Referência do Projeto
- Usar `src/components/StatsGridSection.jsx` / `src/components/PratosGridSection.jsx` / `src/components/SobreSection.jsx` como base para:
  - Safe padding e `maxWidth`
  - Paleta (black/white/gold)
  - Padrão “estilos inline + bloco `<style>` local`
  - (Se usar animação) padrão `framer-motion` com `whileInView` e `viewport: { once: true }`

## Paleta de Cores
- **Black**: `#000000` (background)
- **White**: `#FFFFFF` (texto e labels)
- **Gold**: `#e3d992` (destaques, bordas, foco, botão)

## Arquitetura de Layout

### Container da Seção
- `section` com fundo preto.
- Safe padding (margem de segurança), mobile-first:
  - Sugestão: `padding: '4rem 1.5rem'`
- Container interno:
  - `maxWidth: '64rem'`
  - `margin: '0 auto'`

### Estrutura (recomendada)
- Header centralizado com `h2`.
- Um card/box “glass escuro” para o formulário (para elevar o design):
  - `background: rgba(255, 255, 255, 0.06)`
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid rgba(227, 217, 146, 0.25)`
  - `border-radius: 1.25rem`
  - `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35)`

### Grid do formulário
Mobile-first:
- **Mobile (default)**: 1 coluna
- **Tablet/desktop**: 2 colunas para campos curtos, mantendo campos longos em largura total

Sugestão:
- Nome, Telefone, E-mail, Quantitativo: podem ficar em 2 colunas em telas maiores
- Tipo de evento (Pessoal/Corporativo): largura total
- Descrição: largura total, textarea
- Consentimento: largura total
- Botão enviar: alinhado ao centro (ou à direita no desktop), com bom destaque

## Especificação dos Campos

### 1) Nome
- Tipo: `text`
- `autocomplete`: `name`
- `required`: sim

### 2) Telefone
- Tipo: `tel`
- `autocomplete`: `tel`
- `required`: sim
- Sugestão de máscara (opcional na fase de implementação): `(99) 99999-9999`

### 3) E-mail
- Tipo: `email`
- `autocomplete`: `email`
- `required`: sim

### 4) Tipo de evento (seleção única)
O pedido especifica “checkbox com duas opções onde só pode escolher uma”. Para acessibilidade/semântica, recomenda-se implementar como:
- **Opção recomendada A**: `fieldset` + `legend` + **radio buttons** (`type="radio"`) para escolha exclusiva
- **Opção alternativa B**: manter visual de “checkbox/toggle”, mas com comportamento de radio (controlado via estado)

Opções:
- `Pessoal`
- `Corporativo`

Requisitos:
- Deve ser impossível selecionar as duas.
- Deve ser navegável por teclado.

### 5) Quantitativo
- Tipo: `number`
- `min`: 1
- `step`: 1
- `required`: sim
- Label sugerido: `"Quantitativo (nº de pessoas)"`

### 6) Descrição
- Tipo: `textarea`
- `rows`: 4–6
- `required`: sim
- Placeholder sugestivo (opcional): data, local, preferências, restrições alimentares

### 7) Consentimento
- Tipo: `checkbox`
- `required`: recomendado (se for requisito legal/política)
- Texto exato:
  - `"Autorizo o contato para fins comerciais conforme a Política de Privacidade"`
- A “Política de Privacidade” deve ser um link (se já existir rota/âncora) ou texto por enquanto.

### Botão Enviar
- Tipo: `submit`
- Texto: `"Enviar"` (ou `"Solicitar orçamento"`)
- Estados:
  - normal
  - hover
  - focus-visible
  - disabled (quando inválido/enviando)

## Validação e UX

### Validação mínima
- Nome: não vazio
- Telefone: não vazio (e opcionalmente formato válido)
- Email: padrão HTML5 (`type=email`) + validação adicional opcional
- Tipo de evento: selecionado
- Quantitativo: `>= 1`
- Descrição: não vazio
- Consentimento: marcado (se definido como obrigatório)

### Mensagens de erro
- Devem aparecer próximas ao campo.
- Devem ter contraste e serem acessíveis:
  - usar `aria-describedby` apontando para o texto de erro
  - opcional: `role="alert"` em mensagens

### Envio (comportamento)
Como este projeto é landing page, opções para a fase de implementação:
- **Opção A**: apenas `console.log` / simular envio
- **Opção B**: integrar com endpoint (ex.: backend, Zapier/Make, Formspree)

A decisão depende do seu fluxo de captura de leads.

## Animação de surgir
- Recomendado: `framer-motion` (já presente no projeto)
- Padrão:
  - container do formulário: `initial={{ opacity: 0, y: 18 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `transition={{ duration: 0.6, ease: 'easeOut' }}`
  - `viewport={{ once: true, amount: 0.35 }}`

Acessibilidade:
- Respeitar `prefers-reduced-motion` (reduzir/remover animação)

## Semântica e Acessibilidade

### Estrutura semântica
- `section aria-label="Formulário de orçamento"`
- `h2` para o título
- `form` com `onSubmit`
- Agrupamentos:
  - `fieldset` + `legend` para “Tipo de evento”

### Labels e foco
- Cada campo deve ter `label` associado via `htmlFor`/`id`.
- Foco visível (outline dourado).

### Autocomplete
- Usar `autoComplete` apropriado em Nome/Telefone/E-mail.

## Estrutura Recomendada do Componente

### Nome sugerido
- `FormularioSection` (ou `OrcamentoFormSection`)

### Local do arquivo
- `src/components/FormularioSection.jsx`

### Integração no App
- Importar e renderizar após a Seção 05 (`ServicosCarouselSection`) em `src/App.js`.

## API (props sugeridas)
- `title`: `string` (default: `"Solicite um orçamento"`)
- `onSubmit`: `(payload) => Promise<void> | void` (opcional)
- `className`: `string` (opcional)

Payload sugerido:
- `name`: string
- `phone`: string
- `email`: string
- `eventType`: 'pessoal' | 'corporativo'
- `quantity`: number
- `description`: string
- `consent`: boolean

## Checklist de Implementação
- [ ] Criar `src/components/FormularioSection.jsx`
- [ ] Implementar `section` (fundo preto + safe padding)
- [ ] Implementar header com `h2` (`"Solicite um orçamento"`)
- [ ] Implementar card do formulário (glass escuro)
- [ ] Implementar inputs com labels e ids
- [ ] Implementar “Tipo de evento” (recomendado: radios em `fieldset`)
- [ ] Implementar checkbox de consentimento + link de Política de Privacidade
- [ ] Implementar validação + mensagens de erro acessíveis
- [ ] Implementar animação de surgir (`framer-motion`) com `prefers-reduced-motion`
- [ ] Integrar no `App.js`
- [ ] Testar responsividade (mobile/tablet/desktop)

---

**Status**: DOCUMENTADO (não implementado)
