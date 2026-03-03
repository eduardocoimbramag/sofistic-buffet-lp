# 05 - Análise do erro (CORS) e solução aplicada

## 1. O que descobrimos com os testes

Você me passou dois pontos muito importantes:

1. **Abrindo a URL do App da Web no navegador**
   - Resposta: `{"ok":true,"method":"GET"}`
   - Isso significa que **o Apps Script está publicado corretamente** e responde ao `GET` pela função `doGet`.

2. **Testando o `fetch` pelo Console do navegador**
   - Erro mostrado:
   - `Access to fetch at 'https://script.google.com/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg/exec' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.`
   - Depois: `TypeError: Failed to fetch`

### O que isso quer dizer (em português simples)

- O erro **não é** mais de código errado no Apps Script ou na URL.
- O **Google** está recusando responder a requisições vindas do seu site (origem `http://localhost:3000`) com os cabeçalhos que o navegador envia.
- O nome técnico disso é **CORS** (Cross-Origin Resource Sharing).
- Em resumo:

> “O navegador só aceita respostas que tenham um cabeçalho especial (`Access-Control-Allow-Origin`). O Apps Script não devolve esse cabeçalho, então o navegador bloqueia a resposta.”

---

## 2. Por que isso acontece (sem entrar muito em detalhes técnicos)

Quando o seu código faz:

```javascript
fetch('https://script.google.com/.../exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ... })
})
```

O navegador entende que é uma requisição "sensível" (com JSON e cabeçalhos customizados) e faz uma checagem extra chamada **preflight** (uma requisição `OPTIONS` antes do `POST`).

O Apps Script **não responde com os cabeçalhos CORS esperados**, então o navegador **bloqueia** a chamada e mostra exatamente aquela mensagem que você viu.

Você, como desenvolvedor do site, **não consegue mudar os cabeçalhos da resposta do Google**. Então, do lado do frontend, você tem duas opções:

1. **Solução perfeita (backend próprio):**
   - Criar uma API sua (num servidor seu) que chama o Apps Script do lado do servidor.
   - O navegador fala com o seu servidor, e o seu servidor fala com o Google.
   - Essa é a solução mais limpa, mas exige backend e mais infraestrutura.

2. **Solução prática e simples (sem backend):**
   - Usar `fetch` com `mode: 'no-cors'`.
   - Aceitar que o navegador não vai te contar o resultado com detalhes, mas o Apps Script ainda vai receber o POST e gravar na planilha.

Como você me disse que está começando em programação e quer algo simples, apliquei a **segunda opção**.

---

## 3. O que eu mudei no código do formulário

### Arquivo alterado

- `src/components/FormularioSection.jsx`

### Trecho envolvido (envio do formulário)

Antes, o código fazia isso (lógica simplificada):

- Fazia `fetch` **sem** `mode: 'no-cors'`.
- Tentava ler `res.json()`.
- Conferia `res.ok` e `data.ok`.
- Se algo desse errado, lançava `Error` e mostrava mensagem de falha.

Isso funcionaria se o Apps Script devolvesse cabeçalhos CORS, mas não é o caso.

### Como ficou agora (conceito)

Agora o código faz:

- Usa `fetch` com `mode: 'no-cors'`.
- **Não** tenta mais fazer `res.json()` nem checar `res.ok`.
- Considera que, se a `Promise` do `fetch` não estourar erro de rede local, o pedido foi enviado para o Apps Script.

Na prática, eu troquei o bloco interno do `else` por algo equivalente a isto:

```javascript
await fetch(endpoint, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: payload.name,
    telefone: payload.phone,
    email: payload.email,
    tipoEvento: payload.eventType,
    quantitativo: String(payload.quantity ?? ''),
    descricao: payload.description,
    consentimento: payload.consent,
  }),
});
```

O restante da função (`setSubmitResult`, limpar os campos etc.) continua igual.

---

## 4. O que essa solução resolve (e o que não resolve)

### O que **resolve**

- O navegador **para de bloquear** a requisição com aquele erro gigante de CORS.
- O Apps Script **vai continuar recebendo** os dados normalmente (do ponto de vista do servidor, o POST é igual).
- A planilha deve começar a receber novas linhas quando você enviar o formulário.

### O que **não** resolve (limitações)

- O frontend **não consegue saber com certeza** se o Apps Script respondeu `{ ok: true }` ou se deu algum erro interno.
  - Com `no-cors`, a resposta fica "opaca" (o navegador não permite ler o conteúdo).
- Ou seja, do lado do site, a gente passa a **confiar** que, se não houve erro de rede local, o pedido foi entregue.
- Se algum dia o Apps Script quebrar (por exemplo, aba excluída), o site **não vai conseguir mostrar a mensagem de erro detalhada** automaticamente.

Para o cenário atual (landing page que grava numa planilha), essa limitação costuma ser aceitável.

---

## 5. Como você pode testar agora

### Passo 1 – Testar pelo formulário do site

1. Rode o projeto com `npm start`.
2. Abra `http://localhost:3000`.
3. Preencha o formulário normalmente.
4. Clique em enviar.
5. Verifique:
   - Se a mensagem de sucesso aparece: `Enviado com sucesso! Em breve entraremos em contato.`
   - Se uma nova linha apareceu na aba `pag1` da planilha.

### Passo 2 – Verificar a planilha

- Abra a planilha ligada ao Apps Script.
- Veja se a nova linha contém:
  - Nome, telefone, e-mail, tipo de evento, quantitativo, descrição, data, etc.

Se a linha apareceu, significa que **todo o fluxo está funcionando**:
- Formulário → Apps Script → Planilha.

---

## 6. Próximos passos (se algo ainda der errado)

Se, mesmo assim, **não** cair nada na planilha, os próximos pontos a conferir seriam:

1. Se o script está realmente ligado à planilha correta.
   - Caso não esteja, é possível usar `SpreadsheetApp.openById('ID_DA_PLANILHA')` em vez de `getActiveSpreadsheet()`.
2. Se a aba `pag1` não foi renomeada ou deletada.
3. Se há algum erro sendo registrado em **Executar → Registros** no Apps Script.

Se isso acontecer, você pode copiar exatamente a mensagem do log do Apps Script, e eu te ajudo a ajustar o trecho correspondente.

---

## 7. Resumo para você guardar

- O problema principal era **CORS** (navegador bloqueando a resposta do Apps Script).
- Eu ajustei o envio do formulário para usar `mode: 'no-cors'` e não depender mais de ler a resposta JSON.
- Assim, a chamada deixa de ser bloqueada pelo navegador e o Apps Script consegue receber e gravar os dados na planilha.
- A partir de agora, o foco é apenas confirmar que as linhas aparecem na aba `pag1` após o envio do formulário.
