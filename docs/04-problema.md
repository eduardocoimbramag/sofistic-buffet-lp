# 04 - Problema ("Failed to fetch") e solução

## 1. O que está acontecendo

- O formulário do site está tentando enviar os dados para o Google Apps Script usando **fetch**.
- A URL usada no código é:
  - `https://script.google.com/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg/exec`
- O Apps Script está implantado como **App da Web**, executando como **EU** e com acesso para **Qualquer pessoa**.
- O código do Apps Script tem duas funções:
  - `doPost(e)` → recebe os dados do formulário e grava na planilha.
  - `doGet(e)` → responde `{ ok: true, method: 'GET' }` quando abrimos a URL no navegador.
- Quando o site tenta enviar o formulário, aparece a mensagem **"Failed to fetch"**.

### O que significa "Failed to fetch"

Essa mensagem não vem do Apps Script. Ela vem do navegador e quer dizer:

> "Nem consegui chegar na resposta do servidor. Algo bloqueou ou quebrou a requisição antes da resposta."

Ou seja, é um erro **de rede / bloqueio**, não um erro de lógica do `doPost`.

---

## 2. Possíveis causas (no seu caso)

### 2.1. URL do App da Web

Pelo arquivo `03-info.md`, a URL mostrada na tela do Apps Script é:

- `https://script.google.com/a/sofisticbuffet.com.br/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg`

Para o **fetch** funcionar, a URL deve ser a versão **pública** (sem o `/a/sofisticbuffet.com.br` no meio), normalmente com `/exec` no final:

- `https://script.google.com/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg/exec`

No código React (`FormularioSection.jsx`), a URL já está nesse formato correto. Então, neste ponto, **URL parece ok**.

### 2.2. Teste abrindo a URL no navegador

Quando você abre a URL no navegador, apareceu antes:

- `Função de script não encontrada: doGet`

Isso aconteceu porque naquela hora o script só tinha `doPost`. Depois você adicionou a função `doGet`:

```javascript
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, method: 'GET' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Agora, ao abrir a URL no navegador, o esperado é aparecer algo como:

```json
{"ok":true,"method":"GET"}
```

Se isso aparecer, significa:

- A URL do App da Web está **certa**.
- A implantação está **ativa**.

### 2.3. CSP/CORS (Content Security Policy / Segurança do navegador)

Se mesmo assim o formulário mostrar **"Failed to fetch"**, o mais provável é:

- O navegador está **bloqueando a chamada** para `https://script.google.com`.
- Esse bloqueio pode vir de:
  - Políticas de segurança (CSP) do ambiente de produção.
  - Extensões, proxy ou rede corporativa.

No **localhost** (rodando com `npm start`), normalmente **não existe CSP**, então a chamada deveria funcionar.

Se você está rodando o site em outro ambiente (por exemplo Vercel ou Netlify) e testando lá, a CSP desse ambiente pode bloquear a URL.

---

## 3. O que conferir, passo a passo (bem simples)

### Passo 1 – Confirmar que o Apps Script está respondendo

1. Abra a URL do App da Web no navegador (em modo anônimo, se possível):
   - `https://script.google.com/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg/exec`
2. Se aparecer algo como:
   - `{ ok: true, method: 'GET' }`

   então o Apps Script **está respondendo corretamente**.

Se aparecer mensagem de erro diferente, o problema está na implantação do Apps Script (não no site).

### Passo 2 – Testar pelo Console do navegador

1. Abra o Chrome.
2. Aperte **F12** → aba **Console**.
3. Cole este código (ajustado para a sua URL atual):

```javascript
fetch('https://script.google.com/macros/s/AKfycbzFuoYFQPP61Rk7qa86TWeCM-9wUH0bzhWHClU3owQHQGWlYQlaDmKpuFbZJk_7pac6Tg/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Teste via console',
    telefone: '11999999999',
    email: 'teste@teste.com',
    tipoEvento: 'Pessoal',
    quantitativo: '10',
    descricao: 'Teste direto no Apps Script'
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

4. Veja o resultado no console:
   - Se aparecer `{ ok: true }` e uma nova linha na planilha → **Apps Script está ok**.
   - Se der erro (mensagem em vermelho) → copie essa mensagem, porque ela diz exatamente o problema.

### Passo 3 – Testar pelo formulário do site (localhost)

1. Rode o projeto com `npm start`.
2. Acesse o site pelo endereço `http://localhost:3000` (ou semelhante).
3. Preencha o formulário normalmente e envie.
4. Veja:
   - A mensagem que o formulário mostra (agora ele exibe a **mensagem real do erro**).
   - O que aparece no **Console** do navegador (F12 → aba Console).

Se no console aparecer algo como:

- `Refused to connect to 'https://script.google.com/...' because it violates the document's Content Security Policy` → **CSP** está bloqueando.
- `TypeError: Failed to fetch` sem mais detalhes → pode ser CSP ou rede (proxy, firewall).

---

## 4. Resumo do problema provável

Com base nas informações que você passou:

- O código do Apps Script (`doPost` + `doGet`) está **correto** para receber o JSON e gravar na aba `pag1`.
- A URL usada no React (`FormularioSection.jsx`) está no formato público correto (`/macros/s/.../exec`).
- A implantação está como **App da Web**, executando como **EU**, acesso **Qualquer pessoa**.
- Portanto, a causa mais provável para o "Failed to fetch" é:
  - **Bloqueio do navegador (CSP/CORS ou rede)**, e não um erro de código no Apps Script ou no React.

---

## 5. O que você precisa me enviar para eu fechar o diagnóstico

Depois de seguir os passos acima, me mande **apenas duas coisas**:

1. O que aparece na tela quando você abre a URL do App da Web no navegador.
2. A mensagem exata que aparece no **Console** do navegador ao enviar o formulário pelo site (localhost).

Com essas duas informações, eu consigo dizer com precisão:

- Se é um problema de rede/CSP.
- Se falta algum ajuste no Apps Script.
- Ou se é algum detalhe ainda no código do formulário.
