<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-security-0066cc?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Pacote security">

### Autenticação, autorização, sessão e CSRF

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Security-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: aplicar autenticação, autorização, sessão e proteção CSRF.
- Limite: não mantém cadastros de negócio nem persiste credenciais.

---

# <img src="https://img.shields.io/badge/Guidelines-Security-red?style=flat-square" alt="Diretrizes"> Diretrizes

- No perfil padrão, a senha é validada no Active Directory, existe apenas durante a requisição e nunca é armazenada ou registrada em log. O perfil `desenvolvimento-sem-ad` aceita apenas valores não vazios, destina-se exclusivamente ao desenvolvimento local e nunca deve ser usado em homologação ou produção.
- O usuário autenticado permanece em sessão HTTP, sem JWT no navegador.
- Perfis e permissões controlam o acesso aos casos de uso. Perfis desconhecidos podem compor a sessão, mas não recebem permissões privilegiadas implicitamente.
- A configuração de filtros trata CSRF, respostas de acesso negado e sincronização do acesso local sem expor informações sensíveis.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
