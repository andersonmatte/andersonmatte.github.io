<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Module-componentes-0066cc?style=for-the-badge&logo=react&logoColor=white" alt="Módulo componentes">

### Estrutura visual controles compartilhados e páginas

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![GOV.BR DS](https://img.shields.io/badge/GOV.BR_DS-Web_Components-1351B4?style=flat-square)](https://www.gov.br/ds/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: renderizar a estrutura visual, os controles reutilizáveis e as páginas funcionais.
- Limite: não controla a sessão global, o catálogo de rotas nem o transporte HTTP de baixo nível.

---

# <img src="https://img.shields.io/badge/Guidelines-UI_Components-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Componentes de estrutura organizam autenticação, cabeçalho, menu e conteúdo; componentes compartilhados atendem ícones, paginação, mensagens e seleção pesquisável.
- Cada página mantém apenas seu estado de interação e formulário, chamando as funções públicas do módulo `api`.
- Tipos compartilhados vêm de `tipos.ts`; tipos exclusivos de uma tela permanecem próximos ao componente.
- Ocultar ou desabilitar controles melhora a experiência, mas a API continua sendo a autoridade de autorização.
- Novos componentes devem preservar semântica, teclado, foco, atributos `aria-*` e os elementos do Design System GOV.BR.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
