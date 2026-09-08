<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-api-0066cc?style=for-the-badge&logo=json&logoColor=white" alt="Módulo api">

### Integração HTTP com o backend da LEC

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: centralizar toda comunicação HTTP com o backend da LEC.
- Limite: não contém componentes visuais nem regras de apresentação.

---

# <img src="https://img.shields.io/badge/Guidelines-HTTP_&_CSRF-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- `http.ts` concentra o uso de `fetch`, o envio do cookie de sessão, a obtenção do CSRF e a leitura de JSON ou PDF.
- Requisições mutáveis obtêm o token CSRF antes do envio e usam sempre credenciais da mesma origem.
- `ErroApi` traduz respostas `ProblemDetail`; qualquer retorno `401` dispara o evento `lec:sessao-expirada` sem expor HTML retornado por intermediários.
- `api-lec.ts` representa as 22 operações REST consumidas pela POC com funções nomeadas pelo domínio e parâmetros codificados com segurança; a obtenção do CSRF ocorre internamente antes das operações mutáveis.
- Componentes consomem essas funções; chamadas diretas a `fetch` não devem se espalhar pela interface.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
