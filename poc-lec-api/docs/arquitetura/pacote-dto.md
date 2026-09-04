<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-dto-0066cc?style=for-the-badge&logo=json&logoColor=white" alt="Pacote dto">

### Contratos de entrada e saída da API

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-HTTP_Contracts-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: representar os dados recebidos e devolvidos pela API.
- Limite: DTO não é entidade de banco nem modelo persistente.

---

# <img src="https://img.shields.io/badge/Guidelines-DTOs-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Todos os tipos públicos deste pacote terminam com o sufixo `DTO`.
- Records são preferidos para manter os contratos pequenos e imutáveis.
- Validações de formato e obrigatoriedade pertencem ao DTO de entrada; regras de negócio permanecem nos serviços.
- Alterar um DTO pode alterar o contrato OpenAPI e deve ser tratado como mudança da interface com o frontend.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
