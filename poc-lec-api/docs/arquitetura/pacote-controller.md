<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-controller-0066cc?style=for-the-badge&logo=spring&logoColor=white" alt="Pacote controller">

### Endpoints REST e contrato HTTP da API

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-HTTP-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: expor o contrato HTTP da API.
- Limite: não contém regras de negócio nem acesso direto ao banco.

---

# <img src="https://img.shields.io/badge/Guidelines-REST-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Recebe parâmetros e DTOs, aplica as validações do contrato e delega o caso de uso ao serviço correspondente.
- Define rota, método HTTP, autorização, código de resposta e tipo de conteúdo.
- Devolve DTOs ou arquivos produzidos pela aplicação, sem expor entidades JPA.
- Violações de negócio são lançadas pelos serviços; falhas de formato e obrigatoriedade também podem ser produzidas pelo Spring MVC e pela Jakarta Validation. O pacote `exception` converte essas falhas em respostas HTTP seguras.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
