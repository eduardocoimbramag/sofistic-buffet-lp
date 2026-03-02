# 02-posimp

## Objetivo
Você já implantou (deploy) o **Google Apps Script** como **App da Web**.
Agora o objetivo é:

1. Confirmar que o endpoint está recebendo dados.
2. Confirmar que a planilha está gravando na linha correta.
3. Só depois, integrar o formulário do site.

**Importante:** este documento é apenas instruções. Não implementa nada no código do site.

---

## Dados da sua implantação
- **URL do App da Web (endpoint):**
  - `https://script.google.com/macros/s/AKfycbyV6LBGn0dqImKinLfhzIjvddTNmV9oV7AsfwFsmlN4cZ-M9DQnhbPTM_KiyphR2NXHCA/exec`

- **Código de implantação (deployment id):**
  - `AKfycbyV6LBGn0dqImKinLfhzIjvddTNmV9oV7AsfwFsmlN4cZ-M9DQnhbPTM_KiyphR2NXHCA`

---

## Passo 1 — Confirmar permissões do Web App
No Apps Script, revise a implantação:

1) Apps Script -> **Implantar** -> **Gerenciar implantações**

2) Abra a implantação atual e confira:
- **Tipo:** App da Web
- **Executar como:** você (geralmente “Eu”)
- **Quem pode acessar:**
  - Para funcionar a partir do seu site sem login: **Qualquer pessoa** (ou “Qualquer pessoa, mesmo anônima”)

Se não estiver assim, você precisa **editar** e **implantar nova versão**.

### Observação de segurança (recomendado)
Com **“Qualquer pessoa”**, qualquer pessoa com a URL consegue enviar dados.

Para reduzir spam/uso indevido, recomenda-se (próxima etapa):
- Exigir um `token` secreto no payload.
- Validar campos obrigatórios.

---

## Passo 2 — Fazer um teste simples (sem o site)

### Teste recomendado: Console do navegador
1) Abra o Chrome
2) Aperte `F12` -> aba **Console**
3) Cole e rode (troque os dados se quiser):

```javascript
fetch('https://script.google.com/macros/s/AKfycbyV6LBGn0dqImKinLfhzIjvddTNmV9oV7AsfwFsmlN4cZ-M9DQnhbPTM_KiyphR2NXHCA/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Teste Site',
    telefone: '11999999999',
    email: 'teste@teste.com',
    tipoEvento: 'Aniversário',
    quantitativo: '80',
    descricao: 'Teste de envio para planilha'
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### Resultado esperado
- No console: algo como `{ ok: true }`
- Na planilha: uma nova linha preenchida nas colunas A..G
  - A: Nome
  - B: Telefone
  - C: E-mail
  - D: Tipo do Evento
  - E: Quantitativo
  - F: Descrição
  - G: Data

---

## Passo 3 — Validar se está gravando na “linha correta”

### O que significa “linha correta” nesse cenário
Usando `appendRow()`:
- Ele grava **sempre após a última linha com conteúdo**.
- Isso atende o seu requisito de “se existe conteúdo nas linhas, escrever na subsequente”.

### Como validar
- Faça 2 ou 3 envios seguidos no console.
- Verifique se cada envio vira uma nova linha, sem sobrescrever a anterior.

---

## Passo 4 — Se der erro, como diagnosticar

### 1) Se o `fetch` retornar `{ ok: false, error: "..." }`
- Leia o texto do `error`.
- Normalmente é:
  - **Nome da aba errado** (`SHEET_NAME` não confere)
  - **Aba não existe**
  - Erro de parse do JSON (payload não é JSON)

### 2) Se não chegar nada na planilha
Verifique:
- Você está testando na planilha certa?
- O script está realmente ligado a essa planilha (se você criou o script via “Extensões -> Apps Script”, geralmente sim)
- Em **Executar** -> **Registros** (Logs), veja se aparece algo.

---

## Passo 5 — Próximo passo (quando você autorizar): integrar no formulário do site

Quando você confirmar que o teste acima gravou na planilha, o próximo passo será:

- No `FormularioSection.jsx`:
  - Capturar os valores do formulário
  - Fazer `fetch(WEBSITE_APP_URL, { method: 'POST', headers, body: JSON.stringify(...) })`
  - Mostrar estados no UI:
    - “Enviando...”
    - “Enviado com sucesso”
    - “Erro ao enviar”

**Nota:** isso pode envolver CORS e/ou redirecionamentos do Apps Script.
Na prática, a integração costuma funcionar bem com `fetch`, mas às vezes é necessário ajustar como você lê a resposta.

---

## O que eu preciso de você (pra próxima etapa)
Depois que você rodar o teste do console:

- Você recebeu `{ ok: true }`?
- A linha apareceu na planilha?
- Qual o nome exato da aba (ex.: `Página1`)?

Com isso eu consigo te orientar no ajuste final do script e, quando você autorizar, integrar no site.
