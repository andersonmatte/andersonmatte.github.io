<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-tipos-0066cc?style=for-the-badge&logo=typescript&logoColor=white" alt="Módulo tipos">

### Contratos TypeScript compartilhados pela interface

[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![OpenAPI](https://img.shields.io/badge/Contract-Backend_API-85EA2D?style=flat-square&logo=swagger&logoColor=black)](http://localhost:8080/swagger-ui.html)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: descrever em TypeScript os dados trocados com a API e compartilhados pela interface.
- Limite: tipos não executam validação em tempo de execução nem contêm comportamento.

---

# <img src="https://img.shields.io/badge/Guidelines-Type_Contracts-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Os nomes e campos acompanham os contratos do backend, como usuário, menu, fila, perfil e paginação.
- Campos opcionais, identificadores e versões devem refletir exatamente o JSON recebido ou enviado.
- Tipos de entrada e resposta são reutilizados pelo módulo `api` e pelos componentes consumidores.
- Estados exclusivos de uma página ou formulário permanecem no próprio componente para evitar contratos globais desnecessários.
- Mudanças neste arquivo devem ser coordenadas com o OpenAPI da API e verificadas pelo compilador TypeScript.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
