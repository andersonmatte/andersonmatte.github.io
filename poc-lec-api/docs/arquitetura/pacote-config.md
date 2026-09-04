<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-config-0066cc?style=for-the-badge&logo=springboot&logoColor=white" alt="Pacote config">

### Configuração da infraestrutura da aplicação

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Infrastructure-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: preparar a infraestrutura usada pela API.
- Limite: não contém regras de negócio nem tratamento de requisições.

---

# <img src="https://img.shields.io/badge/Guidelines-Configuration-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Configura as fontes de dados `dbaghu` e `dblec`, o Flyway, a documentação OpenAPI e recursos compartilhados, como data e hora.
- Classes iniciadas por `Propriedades` vinculam configurações externas e mantêm seus valores tipados.
- Senhas, endereços e demais valores próprios do ambiente permanecem fora do código-fonte.
- Cada configuração deve apenas criar e integrar componentes; decisões funcionais pertencem ao pacote `service`.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
