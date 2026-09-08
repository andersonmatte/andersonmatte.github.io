<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-navegacao-0066cc?style=for-the-badge&logo=reactrouter&logoColor=white" alt="Módulo navegacao">

### Resolução do menu e classificação das rotas

[![React Router](https://img.shields.io/badge/React_Router-7.18.2-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: localizar itens do menu e classificar caminhos da aplicação.
- Limite: não renderiza páginas nem concede permissões.

---

# <img src="https://img.shields.io/badge/Guidelines-Route_Resolution-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- `localizarItemMenu` percorre recursivamente a árvore autorizada recebida da API.
- `normalizarCaminho` remove barras finais para que variações da mesma URL tenham tratamento consistente.
- O catálogo contém 17 caminhos funcionais conhecidos e permite distinguir acesso negado de endereço inexistente; a raiz também é reconhecida pela função pública.
- Perfis não são interpretados localmente; a presença do caminho no menu da API é a referência de acesso.
- As funções permanecem puras e cobertas por testes unitários, sem dependência do navegador ou do React.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
