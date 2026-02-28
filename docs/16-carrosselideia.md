# 16-carrosselideia

## Objetivo
Reduzir/eliminar a sensação de “delay para carregamento” quando o carrossel de **Serviços** chega no último card (ou próximo dele), mantendo a rolagem/animação fluida.

**Importante:** este documento descreve ideias de implementação. Não aplica mudanças automaticamente.

---

## Contexto do código
- **Componente:** `src/components/ServicosCarouselSection.jsx`
- **Imagens do card:**
  - `<img className="servicos-card-media" ... loading="lazy" />`
  - `src` aponta para imagens em `public/` via `process.env.PUBLIC_URL`
- **Loop infinito:** a lista é virtualizada (3x) e o índice é recentralizado após a animação.

---

## Sintoma observado
Quando o carrossel chega no “último” card (na prática: próximo do final do ciclo de itens), existe uma sensação de atraso/engasgo.

Esse tipo de atraso geralmente não é do “carrossel” em si, mas do pipeline do browser:

- **(A) Lazy-load + decodificação da imagem**
  - `loading="lazy"` pode adiar o carregamento/decodificação do próximo card.
  - WebP às vezes é decodificado no momento em que entra em viewport, o que cria micro travadas.
- **(B) Preload insuficiente para navegação rápida**
  - O usuário clica rápido em `>` e chega num card cuja imagem ainda não foi “aquecida”.

---

## Ideias de implementação (ordem recomendada)

### 1) Trocar `loading="lazy"` por eager (ou híbrido)
**O que fazer**
- No `<img>` do carrossel, trocar:
  - `loading="lazy"` -> `loading="eager"`

**Variação híbrida (mais equilibrada)**
- Apenas os cards “próximos” do ativo ficam eager.
- Exemplos:
  - ativo, próximo e anterior: eager
  - demais: lazy

**Prós**
- Normalmente resolve 80%+ do problema com mudança simples.

**Contras**
- Pode aumentar a transferência inicial e uso de memória se houver muitas imagens.

---

### 2) Pré-carregar (preload) todas as imagens do carrossel ao montar
**O que fazer**
- No `useEffect` do componente, criar `new Image()` para cada arquivo do carrossel e setar `img.src`.

**Forma sugerida (conceito)**
- Monta uma lista de URLs (as do `getServiceImageSrc`).
- Itera e cria imagens invisíveis para aquecer cache.

**Prós**
- Mantém a UX fluida mesmo com `lazy`.

**Contras**
- Ainda baixa tudo (só muda o “quando”).

---

### 3) Forçar decode antecipado das imagens
**O que fazer**
- Em browsers que suportam, usar `HTMLImageElement.decode()` após setar o `src` no preload.

**Prós**
- Reduz a chance de “travada” no exato momento que o card entra em viewport.

**Contras**
- Um pouco mais de complexidade e precisa fallback.

---

### 4) Ajustes finos de performance (se ainda sobrar micro travada)
- Manter `will-change: transform` no track (já existe via framer-motion, mas pode reforçar no CSS).
- Garantir que imagens estejam bem otimizadas (WebP com qualidade 80–90, dimensão correta).
- Evitar sombras muito pesadas em elementos animados (box-shadow grande pode custar mais em alguns dispositivos).

---

## Como validar (checklist)
- Clicar várias vezes no botão `>` até dar a volta completa.
- Testar em:
  - Desktop (Chrome)
  - Mobile (Android Chrome / iOS Safari)
- Verificar no DevTools:
  - Network: se ainda há downloads quando você chega no último card
  - Performance: se há picos no frame rendering ao trocar de card

---

## Proposta prática (recomendada para aplicar primeiro)
1. **Trocar `loading="lazy"` por `eager` no carrossel**
2. Se ainda tiver engasgo em mobile:
   - **Adicionar preload via `new Image()`**

---

## Arquivo a alterar (quando você autorizar)
- `src/components/ServicosCarouselSection.jsx`
