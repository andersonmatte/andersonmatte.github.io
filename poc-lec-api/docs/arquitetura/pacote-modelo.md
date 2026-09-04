<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-modelo-0066cc?style=for-the-badge&logo=openjdk&logoColor=white" alt="Pacote modelo">

### Records e modelos imutáveis do domínio

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Domain_Models-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: representar dados e conceitos internos usados pelos casos de uso.
- Limite: seus tipos não são mapeamentos JPA e são internos por padrão. A exceção atual é `ItemMenu`, reutilizado dentro de `RespostaMenuDTO`; por isso, alterações em sua estrutura podem afetar o contrato HTTP.

---

# <img src="https://img.shields.io/badge/Guidelines-Models-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Records e outros tipos imutáveis representam acesso, auditoria, filas, pacientes, navegação e composição de relatórios.
- Esses modelos transportam dados entre repositórios e serviços sem acoplamento ao mecanismo de persistência. Quando um modelo for reutilizado em um DTO, esse acoplamento ao contrato deve permanecer explícito e ser considerado na evolução da API.
- Validações próprias do conceito podem ficar no modelo; orquestração e regras de caso de uso permanecem em `service`.
- Cada tipo fica em arquivo próprio e deve ter um propósito de domínio claro.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
