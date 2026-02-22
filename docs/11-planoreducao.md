# 11-planoreducao

## Objetivo
Reduzir a altura total (vertical) da seção **"BUFFET COM ALTO PADRÃO GASTRONÔMICO"** (`SobreSection`) sem perder sofisticação/legibilidade.

Sugestões de ajuste (a aplicar com cuidado e validar em desktop/tablet/mobile):
1. Reduzir `padding` top/bottom da seção.
2. Reduzir espaçamento de letras (letter-spacing) do conteúdo escrito.
3. Reduzir o espaçamento do `UL` (lista de highlights).
4. Reduzir o padding do botão de CTA.

## Onde alterar
- Arquivo: `src/components/SobreSection.jsx`
- Pontos relevantes:
  - `sectionStyles.padding` (padding geral da seção)
  - CSS `.about-section` dentro do `<style>` (padding top/bottom no tablet+)
  - CSS `.about-description` e `.about-list-item` (texto)
  - CSS `.about-list` (margem e gap)
  - CSS `.about-cta` (padding do botão)

---

## Diagnóstico rápido (como a altura é composta)
A altura final da seção é a soma aproximada de:
- `padding` externo da seção (`sectionStyles.padding` + `.about-section` no `@media`)
- `padding` interno do painel (`.about-panel`)
- `gap` do grid (`.about-grid`)
- margens e gaps do conteúdo (principalmente `.about-list` e `.about-list-item`)
- altura do vídeo (direita), que também puxa o bloco para baixo

A estratégia recomendada é reduzir **primeiro** o que “não altera tanto” o design:
- padding externo
- espaçamento do UL
- padding do CTA
E só depois mexer em letter-spacing/typography.

---

## 1) Reduzir padding top/bottom

### A) Padding base da seção (mobile-first)
Hoje em `sectionStyles`:

```js
padding: '3rem clamp(1.5rem, 4vw, 4rem)'
```

Sugestão 1 (redução leve):
```js
padding: '2.25rem clamp(1.5rem, 4vw, 4rem)'
```

Sugestão 2 (redução maior):
```js
padding: '2rem clamp(1.5rem, 4vw, 4rem)'
```

### B) Padding extra no tablet+
Hoje existe:

```css
@media (min-width: 768px) {
  .about-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}
```

Esse trecho é um dos principais responsáveis pela altura grande no desktop/tablet.

Sugestão 1 (mais equilibrado):
```css
@media (min-width: 768px) {
  .about-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}
```

Sugestão 2 (mais compacto):
```css
@media (min-width: 768px) {
  .about-section {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
  }
}
```

Observação: escolha **ou** (A) **ou** (B) primeiro para medir impacto, antes de reduzir os dois de uma vez.

---

## 2) Reduzir espaçamento das letras (conteúdo da esquerda)

### Onde mexer
- `.about-description` (parágrafo)
- `.about-list-item` (itens da lista)

Hoje o `.about-description` não tem `letter-spacing`. O `.about-list-item` também não.
Se o que você quer é diminuir o “ar” visual, os ajustes mais seguros costumam ser:
- reduzir `line-height`
- reduzir `text-indent`
- reduzir `gap`

Se ainda assim quiser mexer no espaçamento das letras, faça de forma sutil:

Exemplo (sutil e seguro):
```css
.about-description {
  letter-spacing: -0.01em;
}

.about-list-item {
  letter-spacing: -0.01em;
}
```

Evite valores muito agressivos (ex.: `-0.05em`) porque pode prejudicar legibilidade.

---

## 3) Reduzir espaçamento do UL

Hoje:
```css
.about-list {
  margin: 1.5rem 0 0;
  display: grid;
  gap: 0.9rem;
}
```

Sugestão (redução leve):
```css
.about-list {
  margin: 1.1rem 0 0;
  gap: 0.65rem;
}
```

Sugestão (redução maior):
```css
.about-list {
  margin: 1rem 0 0;
  gap: 0.55rem;
}
```

Além disso, você também pode reduzir o `gap` do próprio `.about-list-item`:

Hoje:
```css
.about-list-item {
  gap: 0.75rem;
}
```

Sugestão:
```css
.about-list-item {
  gap: 0.6rem;
}
```

---

## 4) Reduzir padding do botão CTA

Hoje:
```css
.about-cta {
  padding: 0.85rem 1.25rem;
}
```

Sugestão (compacto, sem perder presença):
```css
.about-cta {
  padding: 0.7rem 1.1rem;
}
```

Sugestão (mais compacto):
```css
.about-cta {
  padding: 0.65rem 1rem;
}
```

Se quiser reduzir também “altura percebida”, pode diminuir o `margin-top`:

Hoje:
```css
.about-cta {
  margin-top: 1.5rem;
}
```

Sugestão:
```css
.about-cta {
  margin-top: 1.1rem;
}
```

---

## Ordem recomendada para aplicar (para não se perder)
1. Reduzir `padding-top/padding-bottom` do `@media (min-width: 768px)`.
2. Reduzir `margin` e `gap` do `.about-list`.
3. Reduzir `padding` e `margin-top` do `.about-cta`.
4. Se necessário, pequenos ajustes de `line-height` e só então `letter-spacing`.

---

## Checklist de validação
- Desktop (>=1024px):
  - seção não fica “alta demais”
  - lista continua legível
  - CTA não fica pequeno demais
  - vídeo não estoura o painel
- Tablet (768px–1023px):
  - layout continua bonito
  - sem colapso de espaçamentos
- Mobile (<768px):
  - não fica apertado
  - CTA ainda tem área de clique confortável

---

## Próximo passo
Quando você autorizar, eu aplico os ajustes em `src/components/SobreSection.jsx` seguindo a ordem recomendada e te mostro o diff final.
