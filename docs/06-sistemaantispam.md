# 06 — Sistema Anti‑Spam (limitar 1 envio a cada 2 horas)

## Objetivo (requisito)

Você quer impedir spam no formulário do site, permitindo:

- **No máximo 1 envio a cada 2 horas** (por pessoa/usuário)

E quer que isso funcione mesmo se alguém tentar “forçar” envios repetidos.

> Importante: Como o formulário envia para um **Google Apps Script** (endpoint público), o anti‑spam **precisa existir no servidor** (no Apps Script) para ser realmente eficaz. Anti‑spam só no frontend é fácil de burlar.

---

## Conceito-chave: “Como identificar a pessoa?”

Para limitar “1 a cada 2 horas”, você precisa escolher uma forma de reconhecer o usuário.

As opções mais comuns:

### A) Identificar por **cookie/localStorage** (navegador)
- **Como funciona:** guarda um timestamp no navegador (ex.: `ultimoEnvio = Date.now()`).
- **Vantagens:** simples, rápido, não precisa mexer no Apps Script.
- **Desvantagens:** a pessoa pode burlar (aba anônima, limpar cache, outro navegador/celular).

### B) Identificar por **dados do formulário** (ex.: telefone ou e‑mail)
- **Como funciona:** se o telefone/e-mail já enviou nos últimos 120 min, bloquear.
- **Vantagens:** funciona melhor do que só cookie, porque o dado é “do mundo real”.
- **Desvantagens:** ainda pode burlar trocando o telefone/e-mail.

### C) Identificar por **IP**
- **Como funciona:** limita por IP.
- **Vantagens:** eficaz contra “robôs simples”.
- **Desvantagens:** no Apps Script é difícil obter IP real de forma confiável; e vários usuários podem compartilhar IP (ex.: empresa, wifi). Além disso, IP pode mudar.

### D) Combinação (recomendado)
- **Cookie/localStorage + Telefone/E-mail no servidor**.
- **Vantagens:** é o mais equilibrado.

---

## Onde implementar (o que realmente funciona)

Você tem 3 níveis possíveis.

## Nível 1 — Anti‑spam só no site (mais simples, menos seguro)

### O que faz
- Antes de enviar, o site verifica `localStorage`.
- Se foi enviado há menos de 2 horas, ele não envia e mostra uma mensagem.

### Quando usar
- Quando você quer algo imediato, simples, e aceita que não é 100% seguro.

### Regra (exemplo)
- Salvar `ultimoEnvioMs = Date.now()` ao concluir envio.
- Bloquear se `Date.now() - ultimoEnvioMs < 2h`.

### Limitação
- Qualquer pessoa pode burlar.

---

## Nível 2 — Anti‑spam no Apps Script (recomendado)

### O que faz
O Apps Script verifica se **aquele telefone/e-mail** já enviou nos últimos 120 minutos.

Se já enviou:
- Retorna `{ ok: false, error: 'Aguarde 2 horas para enviar novamente.' }`
- E **não grava** nova linha.

Se não enviou:
- Grava na planilha
- Retorna `{ ok: true }`

### Como guardar o “último envio”

Você tem duas formas principais:

#### Opção 2.1 — `CacheService` (mais fácil)
- Guarda a informação por 2 horas automaticamente (TTL).
- Bom para “limite por tempo” (exatamente seu caso).

**Prós**
- Simples.
- Não polui a planilha.

**Contras**
- Cache não é banco de dados: pode expirar/ser limpo em situações raras.

#### Opção 2.2 — `PropertiesService` (persistente)
- Salva o timestamp do último envio.

**Prós**
- Mais persistente.

**Contras**
- Pode crescer muito se você salvar uma chave por usuário (muitos envios).

#### Opção 2.3 — Conferir pela própria planilha
- Ler as últimas linhas e ver se aquele telefone/e-mail já aparece nos últimos 120 min.

**Prós**
- Não depende de cache.

**Contras**
- Mais lento.
- Mais código.

### Chave recomendada
- Preferir **telefone** (normalizado só dígitos) e/ou **e‑mail** em minúsculo.

Exemplo de chave:
- `spam:phone:81983284279`
- `spam:email:teste@teste.com`

---

## Nível 3 — Anti‑spam em dois lados (melhor UX + mais seguro)

### O que faz
- **No site:** bloqueia rápido (melhor experiência).
- **No Apps Script:** valida de verdade (segurança real).

### Por que é o melhor
- O usuário já recebe uma mensagem rápida sem “tentar enviar à toa”.
- Mesmo que tentem burlar o site, o Apps Script ainda bloqueia.

---

## Recomendação para o seu cenário (simples e eficaz)

Eu recomendo:

1) **Apps Script (obrigatório)**: bloquear por **telefone e/ou e‑mail** usando `CacheService` com 2 horas.

2) **Site (opcional)**: guardar em `localStorage` para melhorar UX (mas não confiar só nele).

---

## Fluxo de decisão (bem simples)

Quando o usuário clicar em “Enviar”:

1) (Opcional) O site checa `localStorage`.
2) O Apps Script recebe `doPost`.
3) O Apps Script:
   - Normaliza telefone/e-mail.
   - Checa no cache se existe registro recente.
   - Se existir: retorna erro.
   - Se não: grava e registra no cache por 2h.

---

## Mensagens para mostrar ao usuário

Exemplo de texto:
- **Bloqueado:** `Você já enviou uma solicitação recentemente. Aguarde 2 horas para enviar novamente.`
- **Sucesso:** `Enviado com sucesso! Em breve entraremos em contato.`

---

## Pontos de atenção

- O limite pode bloquear pessoas diferentes que usam o mesmo telefone/e-mail (o que é ok).
- Se você limitar por telefone, normalize para só dígitos para evitar duplicidade.
- Se você usar apenas o site (localStorage), alguém pode burlar facilmente.

---

## O que eu preciso de você para implementar depois (quando você autorizar)

Quando você quiser que eu implemente, me diga qual opção você escolheu:

- **Recomendado:** Nível 3 (Site + Apps Script)
- **Mínimo seguro:** Nível 2 (Apps Script)

E me confirme:

1) O bloqueio deve ser por:
   - telefone
   - e-mail
   - ou ambos
2) A mensagem exata que você quer mostrar.

Aí eu implemento com o mínimo de mudanças possível.
