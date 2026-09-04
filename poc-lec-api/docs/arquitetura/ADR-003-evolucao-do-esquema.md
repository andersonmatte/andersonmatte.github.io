<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/ADR_003-Schema_Evolution-0066cc?style=for-the-badge&logo=flyway&logoColor=white" alt="ADR 003">

### Evolução governada do esquema existente da LEC

[![Flyway](https://img.shields.io/badge/Flyway-Controlled-CC0200?style=flat-square&logo=flyway&logoColor=white)](https://documentation.red-gate.com/fd)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-agendacirurgica-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
![Status](https://img.shields.io/badge/Status-Aceita-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Decision-Overview-0066cc?style=flat-square" alt="Decisão"> Visão geral

- Situação: aceita
- Decisão: manter o Flyway desabilitado por padrão e documentar sua execução controlada.

---

# <img src="https://img.shields.io/badge/Boundaries-Governance-orange?style=flat-square" alt="Limites"> Limites

- O Flyway pode atuar somente no esquema existente `agendacirurgica` do `dblec`.
- O Flyway não cria o esquema e nenhuma migração pode recriar ou alterar tabelas legadas sem decisão arquitetural específica.
- Como o esquema já é não vazio, a adoção inicial exige baseline explícito e autorizado.
- A execução deve usar credencial autorizada pelo DBA e ocorrer primeiro em homologação.
- Migrações aplicadas não são editadas; correções são feitas em uma nova versão.

O procedimento operacional está no README. A aplicação não ativa migrações nem baseline automaticamente sem as propriedades explícitas `lec.flyway.habilitado=true` e `lec.flyway.criar-baseline=true`.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
