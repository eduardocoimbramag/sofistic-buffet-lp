# 13-formmod — Ajustes na seção de Orçamento (Formulário)

## Objetivo
Aplicar melhorias visuais e de usabilidade na seção de orçamento (`FormularioSection.jsx`), mantendo o mesmo padrão premium do site.

## Escopo das mudanças
1) **Botão de envio**
- Trocar a estilização atual do botão `Enviar` (classe `.form-btn`) para ficar **idêntico** ao CTA da segunda seção (CTA do Sobre: “Solicite um orçamento”), incluindo:
  - **Dourado sólido**
  - **Texto branco**
  - **Efeito shine/sweep** no hover (faixa brilhante atravessando)
  - Hover com leve elevação e sombra dourada
  - `:focus-visible` acessível

2) **Redução horizontal de alguns campos / melhor ocupação do grid**
- Diminuir a largura visual de:
  - **Quantitativo** (até 5 dígitos)
  - **Telefone** (DDD 2 dígitos com parênteses fixos + número 8/9 dígitos)
- Corrigir “espaços gigantes” em:
  - **Tipo de evento** (2 opções)
  - **Consentimento / Política de Privacidade**

## Estado atual (referência)
Arquivo: `src/components/FormularioSection.jsx`
- Grid:
  - Mobile: 1 coluna (`.form-grid`)
  - >= 640px: 2 colunas (`grid-template-columns: repeat(2, 1fr)`) e `.span-2` para ocupar as duas.
- Inputs usam `.form-input`/`.form-textarea` com `width: 100%`.
- Botão atual: `.form-btn` com fundo translúcido (não é o CTA dourado sólido).
- Telefone atual: um único `<input type="tel">` sem máscara/estrutura.
- Quantitativo atual: `<input type="number">` sem limite superior de dígitos.
- `Tipo de evento`: fieldset com `.form-options` em `flex-wrap`.
- Consentimento: label `.form-consent` ocupando toda a largura (`.span-2`).

## 1) Botão de envio igual CTA do Sobre
### O que fazer
- Replicar no Formulário a mesma receita do CTA `.about-cta` (SobreSection), aplicando ao botão do formulário.

### Proposta de implementação
- Criar uma classe específica para o botão do formulário, por exemplo:
  - `.form-cta` (ou substituir o `.form-btn` atual)
- Copiar os estilos do CTA do Sobre, incluindo pseudo-elemento `::before` para o shine:
  - `background: #e3d992;`
  - `border: 1px solid #e3d992;`
  - `color: #ffffff;`
  - `position: relative; overflow: hidden;`
  - `::before` com `linear-gradient(...)` e `transform` animado no hover
  - hover com `translateY(-1px)` e `box-shadow` dourada
  - manter `:focus-visible` com outline dourado
  - estado `:disabled` com opacidade e sem transform

### Aceitação (visual)
- Deve ficar **visualmente indistinguível** do CTA do Sobre (mesma cor, brilho e comportamento no hover).

## 2) Campos menores (Quantitativo e Telefone)

### 2.1 Quantitativo (até 5 dígitos)
#### Objetivo
- O campo não deve “parecer” um campo de texto enorme, já que só recebe um número curto.

#### Proposta (HTML/JS)
- Manter `type="number"` ou migrar para `type="text"` com `inputMode="numeric"`.
- Garantir limite de **até 5 dígitos**:
  - Opção A (simples): `type="text"`, `inputMode="numeric"`, filtrar no `onChange` para manter apenas dígitos e cortar para 5.
  - Opção B: manter `type="number"`, validar no `onChange`/`handleSubmit` e recusar valores com mais de 5 dígitos (lembrando que `maxLength` não funciona em `type="number"`).

#### Proposta (CSS/layout)
- Em >= 640px, permitir que o campo ocupe menos espaço:
  - Criar classe `.field-compact`
  - Usar `max-width` (ex.: `10rem` a `14rem`) e `justify-self: start` para não esticar.

### 2.2 Telefone (DDD com parênteses fixos + número 8/9 dígitos)
#### Objetivo
- Fixar visualmente os parênteses do DDD e restringir formato para reduzir erros.

#### Proposta (UI)
- Substituir o único input de telefone por **dois inputs** lado a lado:
  - DDD (2 dígitos)
  - Número (8 ou 9 dígitos)
- Renderizar os parênteses como texto fixo, por exemplo:
  - `(` antes do input de DDD e `)` depois, sem o usuário apagar

Exemplo de layout (conceito):
- `(` [DDD] `)` [Número]

#### Proposta (validação)
- Forçar somente dígitos no `onChange`.
- Limites:
  - DDD: exatamente 2 dígitos
  - Número: 8 ou 9 dígitos
- No `payload`, montar `phone` como string no formato:
  - `(DD) NNNNNNNNN` (com espaço) ou `(DD)NNNNNNNNN` (sem espaço) — definir um padrão e manter consistente.

#### Proposta (CSS/layout)
- Criar um wrapper:
  - `.phone-row { display:flex; align-items:center; gap: 0.5rem; }`
- Inputs com larguras controladas:
  - DDD com `width` pequeno (ex.: `3.5rem` a `4.25rem`)
  - Número com `max-width` (ex.: `14rem` a `18rem`)

## 3) Tipo de evento (eliminar espaço vazio)
### Problema atual
- O fieldset ocupa a largura total (`.span-2`) e, dependendo do alinhamento/estilo, pode sobrar área “vazia” desnecessária.

### Proposta
- Manter `.span-2` (porque é um grupo/fieldset), mas:
  - Tornar o container interno `.form-options` mais “justo” e alinhado à esquerda
  - Remover/ajustar qualquer `justify-content` que empurre itens
  - Se necessário, limitar a largura do fieldset com `max-width` e centralizar/alinhar

Sugestões de CSS:
- `.form-fieldset { width: 100%; }` (mantém)
- `.form-options { justify-content: flex-start; }`
- `.form-radio { width: fit-content; }` (evita esticar)

## 4) Consentimento (reduzir área vazia)
### Problema atual
- A caixa de consentimento (`.form-consent`) tem padding generoso e o texto pode gerar um bloco muito alto/largo.

### Proposta
- Ajustar CSS para ficar mais compacto sem perder legibilidade:
  - reduzir `padding`
  - reduzir levemente `font-size`
  - melhorar quebra de linha com `max-width` e `line-height`

Sugestões:
- `.form-consent { padding: 0.75rem 0.9rem; }`
- `.form-consent span { line-height: 1.35; font-size: 0.95rem; }`
- Em desktop, opcional: `max-width` para não “esticar” demais

## Checklist de aceitação
- **Botão enviar** com o mesmo visual/efeitos do CTA do Sobre.
- **Quantitativo** limitado a 5 dígitos e com largura visual menor em desktop.
- **Telefone** com parênteses fixos e inputs com limites (DDD 2 dígitos + número 8/9).
- **Tipo de evento** sem espaço vazio aparente (chips/radios ficam “justos”).
- **Consentimento** mais compacto, sem “caixa gigante” desnecessária.
- Acessibilidade:
  - `:focus-visible` claro
  - mensagens de erro permanecem funcionando
  - labels e `aria-describedby` não quebram

## Observações
- Este documento descreve a implementação. **Nenhuma alteração de código foi aplicada ainda.**
