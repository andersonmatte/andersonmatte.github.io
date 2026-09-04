<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/ADR_001-Integration_Tests-0066cc?style=for-the-badge&logo=junit5&logoColor=white" alt="ADR 001">

### Banco utilizado nos testes de integração

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
[![H2](https://img.shields.io/badge/H2-PostgreSQL_Mode-blue?style=flat-square)](https://www.h2database.com/)
![Status](https://img.shields.io/badge/Status-Aceita-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Decision-Overview-0066cc?style=flat-square" alt="Decisão"> Visão geral

- Situação: aceita
- Decisão: manter H2 em memória com `MODE=PostgreSQL` nos testes de integração.

---

# <img src="https://img.shields.io/badge/Rationale-Why-blue?style=flat-square" alt="Motivo"> Motivo

A POC deve executar de forma rápida e sem depender de Docker ou de um banco externo. JUnit 5 continua como executor dos testes e Mockito permanece restrito às dependências simuladas dos testes unitários.

---

# <img src="https://img.shields.io/badge/Controls-Validation-success?style=flat-square" alt="Controles"> Controles

- Os esquemas e as restrições relevantes serão criados por SQL de teste.
- Consultas e mapeamentos JPA terão testes de integração no H2.
- Particularidades exclusivas do PostgreSQL deverão ser validadas em homologação antes da implantação.
- H2 não será apresentado como equivalência integral ao PostgreSQL.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
