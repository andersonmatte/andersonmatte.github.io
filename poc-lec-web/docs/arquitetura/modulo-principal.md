<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-principal-0066cc?style=for-the-badge&logo=react&logoColor=white" alt="Módulo principal">

### Inicialização do React no documento HTML

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: iniciar a aplicação no documento HTML.
- Limite: não contém regras de negócio, sessão ou definição de páginas.

---

# <img src="https://img.shields.io/badge/Guidelines-Bootstrap-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Importa os tokens globais do Design System GOV.BR e a folha de estilos da aplicação.
- Monta `Aplicacao` no elemento `#aplicacao` por meio de `createRoot`.
- `StrictMode` mantém verificações de desenvolvimento e `BrowserRouter` fornece o contexto de navegação da SPA.
- Inicializações globais indispensáveis podem ficar neste módulo; qualquer coordenação funcional pertence a `Aplicacao.tsx`.
- O ponto de entrada deve permanecer pequeno para tornar explícitas as dependências carregadas por toda a interface.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
