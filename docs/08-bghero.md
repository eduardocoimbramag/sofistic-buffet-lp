# Seção 08 - Background do Hero (Imagem Responsiva) - Documentação de Implementação

## Visão Geral
Documentação para aplicar a imagem enviada como **background do Hero** (Seção 01) com adaptação para diferentes dispositivos, mantendo estética premium e boa legibilidade do texto.

Requisitos-chave:
- **Paleta**: Black `#000000`, White `#FFFFFF`, Gold `#e3d992`.
- **Hero com background image** em modo `cover`.
- **Responsividade**: estratégia mobile-first com margem de segurança.
- **Acessibilidade**: garantir contraste do título/slogan (usar overlay), respeitar `prefers-reduced-motion` (sem animações “pesadas” no background).
- **Performance**: imagens otimizadas e carregamento adequado por breakpoint.

## Arquivos/Localização das Imagens
Recomendação: salvar as imagens em `src/assets/hero/` (ou `public/hero/` se preferir URLs diretas sem build pipeline).

### Nome padrão sugerido
- `hero-bg-mobile.webp`
- `hero-bg-tablet.webp`
- `hero-bg-desktop.webp`
- `hero-bg-2k.webp` (opcional)
- `hero-bg-4k.webp` (opcional)

Opcional (fallback): versões `.jpg` equivalentes.

> Observação: se você tiver versões diferentes por dispositivo (edição no Photoshop), mantenha o **mesmo enquadramento do assunto principal** no centro (área segura), pois `cover` corta bordas.

## Tamanhos recomendados (export)
Exportar por largura (mantendo proporção adequada para foto/colagem). Sugestão prática:
- **Mobile**: 900×1600 (ou 1080×1920)
- **Tablet**: 1536×2048
- **Desktop**: 1920×1080 (ou 2560×1440 para mais nitidez)
- **4K (opcional)**: 3840×2160

Formato:
- Preferível: **WebP** (qualidade 70–82)
- Alternativa moderna: **AVIF** (qualidade 45–60)
- Fallback: **JPG** (qualidade 70–80)

## Estratégias de Implementação (escolher 1)

### Estratégia A (recomendada): `background-image` com media queries
Aplicar background no `HeroSection` e trocar por breakpoint via CSS.

Vantagens:
- Simples de manter
- Mantém o layout atual (Hero com texto central)

Pontos de atenção:
- Para múltiplas resoluções/formatos, preferir `image-set` quando possível.

#### Exemplo de regra de background (conceitual)
- Mobile (default): `hero-bg-mobile.webp`
- `min-width: 640px`: `hero-bg-tablet.webp`
- `min-width: 1024px`: `hero-bg-desktop.webp`
- `min-width: 1536px`: `hero-bg-2k.webp`

### Estratégia B: `<picture>` + `<img>` como camada de fundo
Renderizar uma imagem absoluta atrás do conteúdo com `object-fit: cover`.

Vantagens:
- Melhor controle de `srcset` e formatos (WebP/AVIF)

Pontos de atenção:
- Precisa garantir que o background não “capture” clique/seleção
- Exige mais estrutura de markup

## Overlay (legibilidade do título e slogan)
Como o background é detalhado, recomenda-se aplicar um overlay para garantir contraste.

Sugestão de overlay:
- Um gradiente suave:
  - `background: linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.70) 45%, rgba(0,0,0,0.75) 100%)`

Boas práticas:
- Overlay como `::before` com `position: absolute` e `inset: 0`
- Conteúdo do Hero acima do overlay com `position: relative; z-index: 1`

## Ajustes de posicionamento da imagem
Para garantir uma boa leitura (principalmente em mobile), considerar:
- `background-position: center;`
- Ajustar por breakpoint se necessário:
  - Mobile: `center top`
  - Desktop: `center center`

## Responsividade e margem de segurança
O Hero atual usa `padding: 0 1.5rem`. Manter para evitar texto colado nas bordas.

Se o background estiver “muito pesado” visualmente:
- aumentar overlay
- adicionar uma leve sombra no texto (ex.: `text-shadow: 0 8px 24px rgba(0,0,0,0.45)`)

## Acessibilidade
- Evitar inserir a imagem como conteúdo com significado (é decorativa).
- Se usar `<img>` como background, usar `alt=""`.
- Garantir contraste do texto:
  - título dourado (`#e3d992`)
  - slogan branco (`#FFFFFF`)
  - overlay para manter legibilidade

## Performance
- Otimizar as imagens (WebP/AVIF) e manter o tamanho sob controle.
- Preferir carregar uma imagem adequada ao dispositivo:
  - background por breakpoint
- Evitar múltiplos downloads simultâneos:
  - não declarar várias imagens em `image-set` com densidades muito próximas se isso causar downloads extras em alguns browsers.

## Onde implementar no código
Arquivo atual:
- `src/components/HeroSection.jsx`

Mudanças típicas (na fase de implementação):
- Adicionar classe no Hero (ex.: `hero-section`) e aplicar background via `<style>` local
- Incluir overlay com pseudo-elemento ou div absoluta

## Checklist de Implementação
- [ ] Criar pasta para assets (ex.: `src/assets/hero/`) e adicionar as imagens exportadas
- [ ] Ajustar `HeroSection.jsx` para usar background com `cover`
- [ ] Adicionar overlay para legibilidade
- [ ] Aplicar troca por breakpoints (mobile/tablet/desktop)
- [ ] Ajustar `background-position` se necessário
- [ ] Validar contraste e responsividade

---

**Status**: DOCUMENTADO (não implementado)
