# 14-levantamento — Redução drástica de altura na seção de Orçamento

## Objetivo
Reduzir de forma significativa a altura (principalmente vertical) da seção de orçamento (`FormularioSection.jsx`), mantendo:
- legibilidade
- hierarquia visual
- acessibilidade
- consistência com o estilo premium do site

**Este documento é um levantamento de alternativas. Não implementa nada.**

---

## Diagnóstico rápido (pontos que mais “consomem” altura)
Arquivo: `src/components/FormularioSection.jsx`
- **Padding externo da seção**: `padding: 4rem 1.5rem` (muito alto)
- **Header**:
  - `.form-header` tem `margin-bottom: 2rem` e `min-height: 4rem`
  - Título usa `clamp(...)` e pode ficar grande em algumas larguras
- **Card** (`.form-card`): `padding: 1.75rem 1.25rem` (mais “alto” do que o necessário)
- **Grid**:
  - `gap: 1rem` em todos os campos
  - cada `.form-field` tem `gap: 0.45rem`
- **Textarea** (`Descrição`): `min-height: 7.5rem` + resize vertical
- **Consentimento** ainda é um bloco com padding, mesmo compacto
- **Mensagens de erro** adicionam altura (principalmente em validações “ao blur”)

---

## Alternativas (você escolhe o que autoriza)

### Opção A — “Compactação de espaçamento” (baixo risco / alto ganho)
**Ideia**: manter a estrutura atual, mas reduzir agressivamente paddings/gaps.

Mudanças sugeridas:
- Seção: `padding: 3rem 1.25rem` ou `2.5rem 1.25rem`
- Header:
  - remover `min-height: 4rem` (ou reduzir para `2.5rem`)
  - reduzir `margin-bottom: 2rem` para `1.25rem` ou `1rem`
- Card:
  - `padding: 1.25rem 1rem` (mobile)
  - `padding: 1.5rem 1.25rem` (>=640px)
- Grid:
  - `gap: 1rem` => `0.75rem` (mobile)
  - `gap: 1.15rem` => `0.85rem` (>=640px)
- `.form-field gap`: `0.45rem` => `0.3rem`

**Impacto esperado**:
- Redução grande sem mexer em UX/ordem dos campos.

---

### Opção B — “Descrição menor + autoexpand” (médio risco / alto ganho)
**Ideia**: a textarea é uma das maiores fontes de altura.

Alternativas:
- B1) **Reduzir `min-height`** para `5rem` (ou `4.5rem`)
- B2) Trocar textarea por **input + ‘Detalhes (opcional)’ expansível**:
  - Ex.: botão “Adicionar detalhes” que abre a textarea
- B3) **Auto-grow**:
  - textarea inicia com `rows={2}` e cresce conforme digita

**Impacto esperado**:
- Em média, melhora bastante a dobra (principalmente em desktop).

---

### Opção C — “Reorganização do grid” (médio risco / ganho médio)
**Ideia**: reduzir o número de linhas, agrupando campos na mesma linha.

Exemplos:
- C1) Linha 1: Nome (col 1), Telefone (col 2)
- C2) Linha 2: E-mail (col 1), Quantitativo (col 2)
- C3) Linha 3: Tipo de evento (compacto), CTA “Enviar” na mesma linha (à direita)
- C4) Descrição (opcional) em acordeão

**Observação**:
- Já existe 2 colunas >=640px, mas dá para “otimizar” spans e posicionar CTA.

---

### Opção D — “Consentimento mais enxuto” (baixo risco / ganho pequeno-médio)
**Ideia**: reduzir a altura do bloco de consentimento.

Alternativas:
- D1) Reduzir padding e font-size:
  - padding: `0.75rem 0.9rem` => `0.55rem 0.75rem`
  - font-size: `0.95rem` => `0.9rem`
- D2) Deixar o texto mais curto + link “Política de Privacidade” clicável
  - Ex.: “Autorizo contato comercial. Li a Política de Privacidade.”

---

### Opção E — “Botão/ações mais compactas” (baixo risco / ganho pequeno)
**Ideia**: o CTA dourado é lindo, mas pode ser mais baixo.

Alternativas:
- reduzir `padding` do botão:
  - `0.85rem 1.35rem` => `0.7rem 1.1rem`
- reduzir o `margin-top` de `.form-actions`
- alinhar o botão na mesma linha de algum campo (ver Opção C)

---

### Opção F — “Mensagens de erro sem empurrar layout” (médio risco / ganho médio)
**Ideia**: erro aparecendo abaixo do campo aumenta altura e “estoura” a seção.

Alternativas:
- F1) Reservar espaço fixo para erro:
  - Ex.: `.form-error { min-height: 1.2em; }`
  - (Evita layout jumping; não reduz tanto a altura máxima, mas estabiliza)
- F2) Mostrar erro em tooltip/inline menor (mais complexo)
- F3) Exibir erro apenas no submit (menos ruído, menos altura durante preenchimento)

---

### Opção G — “Título mais compacto / header menor” (baixo risco / ganho pequeno-médio)
**Ideia**: reduzir o impacto visual do header.

Alternativas:
- diminuir o `clamp` do título
- reduzir `line-height`
- remover `min-height` do header e diminuir o `margin-bottom`

---

## Recomendações (pacotes prontos)

### Pacote 1 (rápido e seguro)
- Opção A + B1 + E

### Pacote 2 (mais agressivo)
- Pacote 1 + C3 (CTA na linha do tipo de evento) + D1

### Pacote 3 (mudança de UX para máxima redução)
- Pacote 2 + B2 (Descrição via acordeão) + F3 (erros só no submit)

---

## Perguntas para você escolher o rumo (pra eu implementar certo)
1) A “Descrição” pode ser **opcional e recolhida** (acordeão), ou precisa ficar sempre visível?
2) Você prefere reduzir altura sacrificando um pouco o “respiro premium” (mais compacto) ou manter o visual e reduzir só o essencial?
3) Mensagens de erro: podem aparecer só no submit?

---

## Status
Documento criado para você escolher o que autoriza implementar. Nenhuma alteração aplicada por este arquivo.
