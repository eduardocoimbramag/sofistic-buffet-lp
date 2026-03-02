# 01-projetoform

## Objetivo
Salvar os dados enviados pelo formulário do site em uma **Google Sheets** usando **Google Apps Script**.

Você já tem a planilha com as colunas:

- **A:** Nome
- **B:** Telefone
- **C:** E-mail
- **D:** Tipo do Evento
- **E:** Quantitativo
- **F:** Descrição
- **G:** Data da solicitação
- **H:** IP (por enquanto não vamos preencher)

**Requisito de “próxima linha vazia”:**
- Vamos escrever sempre na **próxima linha após a última linha com conteúdo**.
- No Google Sheets isso é o comportamento padrão de `appendRow()`.

**Importante:** este documento é apenas passo a passo. Não altera o código do site ainda.

---

## Parte 1 — Preparar a planilha

1) Abra sua planilha no Google Sheets.

2) (Recomendado) Na primeira linha, coloque cabeçalhos:
- A1: `Nome`
- B1: `Telefone`
- C1: `E-mail`
- D1: `Tipo do Evento`
- E1: `Quantitativo`
- F1: `Descrição`
- G1: `Data da solicitação`
- H1: `IP`

3) Copie o **ID da planilha** (você vai usar no script):
- Ele fica na URL, algo assim:
  - `https://docs.google.com/spreadsheets/d/<ID_AQUI>/edit#gid=0`

---

## Parte 2 — Criar o Google Apps Script

1) Na planilha, vá em:
- **Extensões** -> **Apps Script**

2) Apague o conteúdo e cole um script base (exemplo abaixo).

### Script (exemplo)
Crie/cole no arquivo `Code.gs`:

```javascript
function doPost(e) {
  try {
    // 1) Ajuste para o nome real da sua aba (guia) da planilha
    var SHEET_NAME = 'Página1';

    // 2) Pega o conteúdo enviado pelo site
    // Vamos suportar JSON (recomendado)
    var body = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var data = JSON.parse(body);

    // 3) Abre a planilha vinculada ao script (a própria planilha)
    // Se o script estiver criado a partir da planilha, isso geralmente funciona.
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Aba não encontrada: ' + SHEET_NAME);

    // 4) Monta a linha no formato das colunas A..H
    // Coluna G: Data da solicitação
    // Coluna H: IP (não vamos usar agora -> vazio)
    var now = new Date();

    var row = [
      (data.nome || ''),
      (data.telefone || ''),
      (data.email || ''),
      (data.tipoEvento || ''),
      (data.quantitativo || ''),
      (data.descricao || ''),
      now,
      ''
    ];

    // 5) Escreve na “próxima linha livre”
    // appendRow sempre adiciona abaixo da última linha com conteúdo.
    sheet.appendRow(row);

    // 6) Resposta para o site
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Ajustes que você precisa fazer
- **`SHEET_NAME`**: troque para o nome exato da sua aba (ex.: `Página1`, `Respostas`, etc.)

---

## Parte 3 — Deploy do Apps Script como Web App

1) No Apps Script, clique em:
- **Implantar** -> **Nova implantação**

2) Selecione o tipo:
- **App da Web**

3) Configure:
- **Descrição**: algo como `Formulário do site`
- **Executar como**: `Eu` (se tiver opção)
- **Quem pode acessar**:
  - Para teste rápido: `Qualquer pessoa` (ou `Qualquer pessoa, mesmo anônima`)

4) Clique em **Implantar**.
- Ele vai pedir permissões. Aceite.

5) Copie a **URL do Web App**.
- Você vai usar essa URL no `fetch` do site depois.

---

## Parte 4 — Testar antes de mexer no site

Você pode testar com Postman/Insomnia, ou até pelo console do navegador com `fetch`.

### Exemplo de payload (JSON)
```json
{
  "nome": "Eduardo",
  "telefone": "11999999999",
  "email": "edu@email.com",
  "tipoEvento": "Casamento",
  "quantitativo": "120",
  "descricao": "Evento noturno, com mesa de frios e ilha gastronômica"
}
```

### Exemplo de teste com `fetch`
(Substitua `SUA_URL_AQUI` pela URL do Web App)

```javascript
fetch('SUA_URL_AQUI', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'Eduardo',
    telefone: '11999999999',
    email: 'edu@email.com',
    tipoEvento: 'Casamento',
    quantitativo: '120',
    descricao: 'Evento noturno...'
  })
}).then(r => r.json()).then(console.log);
```

Se estiver tudo certo, deve aparecer `{ ok: true }` e uma nova linha será criada na planilha.

---

## Parte 5 — Observações importantes (iniciante)

### 1) Sobre “escrever na próxima linha vazia”
- `appendRow()` adiciona na **linha subsequente à última linha com conteúdo**.
- Se você tiver “buracos” (linhas vazias no meio), `appendRow()` **não** preenche esses buracos: ele sempre escreve no final.
- Se você quiser preencher o **primeiro buraco vazio** (não recomendado no início), dá para fazer, mas complica o script.

### 2) Data da solicitação (Coluna G)
- No exemplo eu salvo um `new Date()`.
- Você pode formatar depois na planilha.

### 3) IP (Coluna H)
- Do lado do Apps Script, o IP real do cliente normalmente não vem de forma confiável.
- Se no futuro você quiser IP, a abordagem muda (pode envolver outro serviço ou cabeçalhos específicos).

### 4) Segurança
Se você abrir como “Qualquer pessoa”, qualquer um com a URL consegue postar.
Melhorias futuras comuns:
- Checar um `token` secreto no payload.
- Validar campos obrigatórios.
- Rate limit.

---

## Próximo passo (quando você autorizar)
Quando você confirmar, eu te ajudo a:
- Ajustar o `FormularioSection.jsx` para enviar os campos via `fetch` para o Web App.
- Tratar loading / sucesso / erro no UI.
