<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/ADR_002-JPA_&_JDBC-0066cc?style=for-the-badge&logo=hibernate&logoColor=white" alt="ADR 002">

### Estratégia de persistência e consultas nos bancos da LEC

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-dblec_&_dbaghu-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
![Status](https://img.shields.io/badge/Status-Aceita-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Decision-Overview-0066cc?style=flat-square" alt="Decisão"> Visão geral

- Situação: aceita
- Decisão: usar JPA na fonte de dados primária `dblec` e manter JDBC nas consultas especializadas do AGHU.

---

# <img src="https://img.shields.io/badge/Guidelines-Persistence-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Entidades JPA representam tabelas do `dblec` usadas pela POC: lista de espera, usuário e perfil são mantidos pela aplicação; indicação cirúrgica é somente consultada.
- O pacote `entidade` contém exclusivamente essas entidades; records e modelos imutáveis ficam em `modelo`.
- DTOs e projeções permanecem separados das entidades.
- Lombok é limitado à remoção de código mecânico; `@Data` e setters automáticos não são usados nas entidades.
- Consultas e escritas das entidades do `dblec` usam JPQL, `EntityManager` ou repositórios Spring Data, sempre com parâmetros.
- Não serão adotados jOOQ, Criteria ou concatenação de valores em SQL.
- Consultas de leitura do `dbaghu` permanecem em JDBC para evitar um segundo contexto JPA e o mapeamento do banco legado.
- O Hibernate não cria nem altera tabelas; a propriedade `ddl-auto` permanece como `validate`.

Essa combinação introduz JPA sem repetir os grandes grafos de entidades e os relacionamentos excessivos do legado.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
