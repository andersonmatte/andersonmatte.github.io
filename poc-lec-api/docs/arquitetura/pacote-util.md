<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-util-0066cc?style=for-the-badge&logo=openjdk&logoColor=white" alt="Pacote util">

### Funções auxiliares pequenas e sem estado compartilhado

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Utilities-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: reunir operações pequenas e reutilizáveis que não pertencem a um caso de uso específico.
- Limite: não contém fluxo de negócio, acesso a banco nem estado mutável compartilhado.

---

# <img src="https://img.shields.io/badge/Guidelines-Utilities-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Inclui normalização de usuário, anonimização de dados, pseudonimização de identificadores e apoio à correlação de requisições.
- Funções devem ter resultado previsível, responsabilidade única e testes isolados.
- Um utilitário não deve se tornar atalho para dependências entre camadas.
- Quando uma operação passar a coordenar regras ou dependências de negócio, ela deve ser movida para um serviço.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
