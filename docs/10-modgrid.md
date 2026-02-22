# 10-modgrid

## Objetivo
Ajustar o grid da seção **"BUFFET COM ALTO PADRÃO GASTRONÔMICO"** (`SobreSection`) no desktop para:
1. A coluna da esquerda (texto) ficar **um pouco maior**.
2. A coluna da direita (vídeo) ficar **um pouco menor**, mais próxima da dimensão real do vídeo.
3. Centralizar o bloco do conteúdo (grid/painel) na seção, evitando “espaço sobrando” do lado do vídeo.

## Onde alterar
- Arquivo: `src/components/SobreSection.jsx`
- Bloco CSS dentro de `<style>`:
  - `.about-grid`
  - `.about-media`
  - `.about-media-wrap`
  - `.about-panel`

---

## Situação atual (desktop)
No breakpoint `@media (min-width: 1024px)`, o grid está fixo em duas colunas iguais:

- `grid-template-columns: minmax(0, 40rem) minmax(0, 40rem);`

Isso força a coluna do vídeo a ter a mesma largura da coluna do texto, gerando “folga”.

---

## 1) Reduzir a coluna da direita (vídeo) e aumentar a da esquerda (texto)

### Opção recomendada (coluna do vídeo com largura fixa/limitada)
Trocar em:

```css
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: minmax(0, 40rem) minmax(0, 40rem);
  }
}
```

Para algo neste estilo:

```css
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: minmax(0, 44rem) minmax(0, 26rem);
  }
}
```

Ajustes sugeridos (você escolhe o melhor “look”):
- **Mais texto / vídeo menor**:
  - `44rem` e `24rem`
- **Equilíbrio**:
  - `42rem` e `26rem`

### Opção alternativa (frações, mais fluido)
```css
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 1.35fr 0.85fr;
  }
}
```

---

## 2) Fazer a coluna do vídeo “encaixar” na largura do vídeo

Você já controla o tamanho do vídeo via `.about-media-wrap` (por exemplo `width: 68%`).
Se a coluna do vídeo ficar menor, pode fazer mais sentido controlar a largura com algo absoluto:

```css
@media (min-width: 1024px) {
  .about-media-wrap {
    width: 100%;
    max-width: 26rem;
    margin: 0 auto;
  }
}
```

Isso garante:
- vídeo não estoura
- vídeo não fica pequeno demais
- coluna fica coerente com o tamanho do vídeo

---

## 3) Centralizar o bloco (grid/painel) na seção

### Por que “parece” desalinhado às vezes
Mesmo com `justify-content: center` no grid, o painel pode ocupar toda a largura do container, e o conteúdo interno dá a sensação de que sobra espaço.

### Ajuste recomendado: limitar largura do painel e centralizar
Adicionar/ajustar em `.about-panel`:

```css
.about-panel {
  max-width: 74rem;
  margin-left: auto;
  margin-right: auto;
}
```

Se quiser o painel um pouco mais estreito:
- `max-width: 70rem`

### Alternativa: centralizar o grid dentro do painel via wrapper
Se necessário, você pode fazer o painel virar um container flex:

```css
.about-panel {
  display: flex;
  justify-content: center;
}

.about-grid {
  width: 100%;
  max-width: 74rem;
}
```

---

## Checklist de validação
- Desktop (>=1024px):
  - a coluna do texto é maior que a do vídeo
  - o vídeo não “sobra” espaço lateral perceptível
  - o conjunto (painel + grid) fica visualmente centralizado
- Tablet/mobile:
  - o layout continua em 1 coluna
  - nada quebra e o vídeo continua responsivo

---

## Próximo passo
Quando você autorizar, eu implemento no `SobreSection.jsx`:
- alteração de `grid-template-columns` no desktop
- ajustes opcionais no `.about-media-wrap` (`max-width`)
- `max-width + margin: auto` no `.about-panel` para centralizar o bloco
