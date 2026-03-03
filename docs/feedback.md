# Feedback (formulário -> planilha)

## Situação atual
- O formulário **já está tentando enviar** para o Google Apps Script (URL `/exec`).
- Como o envio falhou, o site estava mostrando uma mensagem genérica.
- Eu ajustei o código para o formulário mostrar o **erro real** (no texto do formulário) e também imprimir no **Console**.

---

## 1) O que eu mudei no site (já feito)
- **Arquivo:** `src/components/FormularioSection.jsx`
- **Mudança:** agora, quando dá erro, aparece o **motivo real** (ex.: permissão, aba não encontrada, erro de JSON, etc.).

Isso é o que vai dizer exatamente o que falta corrigir.

---

## 2) Quadro de checagem (Apps Script)

| Item | Onde ver | O que tem que estar | Se não estiver |
|---|---|---|---|
| URL correta | Apps Script -> Implantar -> Gerenciar implantações | URL termina com `/exec` e é de **App da Web** | Re-implantar como **App da Web** e copiar a URL `/exec` |
| Permissão de acesso | Na implantação do Web App | **Quem pode acessar:** "Qualquer pessoa" | Alterar para "Qualquer pessoa" e implantar nova versão |
| Aba da planilha | Código `SHEET_NAME` | Tem que ser exatamente o nome da guia (ex.: `pag1`) | Ajustar o nome para bater 100% |
| Planilha certa | Script ligado à planilha | `SpreadsheetApp.getActiveSpreadsheet()` aponta para a planilha correta | Se não estiver, usar `SpreadsheetApp.openById('...')` |

---

## 3) Como você valida em 30 segundos (bem simples)
1) Rode o site no `localhost`.
2) Preencha e envie o formulário.
3) Se aparecer erro no formulário, copie e cole aqui o texto exato.

Exemplos de erros comuns:
- `Aba não encontrada: pag1` -> o nome da guia está diferente.
- `Exception: You do not have permission to call appendRow` -> permissões/conta.
- `Falha ao enviar (403)` -> implantação não está pública para "Qualquer pessoa".

---

## 4) Próximo passo (o que eu preciso de você)
Me mande **o texto do erro** que aparece no formulário agora.

Com essa frase eu te digo exatamente qual ajuste fazer no Apps Script (ou no nome da aba) para começar a gravar na planilha.
