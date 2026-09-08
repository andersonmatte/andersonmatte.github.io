<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-Aplicacao-0066cc?style=for-the-badge&logo=react&logoColor=white" alt="Módulo Aplicacao">

### Composição da SPA e estado global da sessão

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.18.2-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: coordenar sessão, menu autorizado, rotas protegidas e composição das páginas.
- Limite: não contém formulários específicos nem detalhes do transporte HTTP.

---

# <img src="https://img.shields.io/badge/Guidelines-Session_&_Routes-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- A aplicação distingue os estados de carregamento, visitante, área autenticada e falha de inicialização.
- Ao iniciar, restaura a sessão pela API e carrega o menu permitido; autenticação, saída e expiração atualizam o estado global.
- O menu devolvido pela API decide se uma página funcional pode ser montada.
- Uma rota conhecida sem permissão apresenta 403; um endereço desconhecido apresenta 404.
- As páginas funcionais atuais são relatório de publicação, lista de espera, perfis, usuários e migração AGHU; os demais itens autorizados usam a página de funcionalidade em construção.
- Navegações programáticas restauram o foco no conteúdo principal para manter a experiência acessível.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
