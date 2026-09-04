<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-repository.impl-0066cc?style=for-the-badge&logo=postgresql&logoColor=white" alt="Pacote repository.impl">

### Implementações JPA e JDBC específicas dos bancos

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Data_Implementation-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: implementar os contratos de persistência que exigem código JPA ou JDBC.
- Limite: não decide regras de negócio nem controla respostas HTTP.

---

# <img src="https://img.shields.io/badge/Guidelines-JPA_&_JDBC-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Implementações terminam com o sufixo `Impl` e deixam explícita a fonte de dados utilizada.
- JPA atende as entidades do `dblec`, tanto nas escritas quanto nas consultas; JDBC atende as leituras especializadas do `dbaghu`.
- SQL usa parâmetros e seus resultados são convertidos em entidades, modelos ou projeções internas.
- Projeções de linha podem permanecer com visibilidade restrita ao pacote e não devem escapar para controladores ou serviços.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
