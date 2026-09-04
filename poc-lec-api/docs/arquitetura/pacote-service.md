<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-service-0066cc?style=for-the-badge&logo=spring&logoColor=white" alt="Pacote service">

### Casos de uso e regras de negócio da LEC

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Application_Services-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: executar os casos de uso e concentrar as decisões funcionais da aplicação.
- Limite: não define rotas HTTP nem contém SQL.

---

# <img src="https://img.shields.io/badge/Guidelines-Business_Rules-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Serviços validam regras, coordenam repositórios, registram eventos e produzem os resultados entregues pelos controladores.
- Os limites transacionais dos casos de uso do `dblec` são definidos nesta camada. Consultas técnicas usadas diretamente pela segurança ou persistência podem declarar uma transação local somente leitura no repositório.
- Dados do `dbaghu` e do `dblec` são combinados em memória; não existe transação distribuída entre os bancos.
- A geração do relatório e do PDF faz parte do caso de uso, preservando anonimização e ausência de persistência do documento.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
