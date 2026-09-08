<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/LEC_Nova-Frontend-0066cc?style=for-the-badge&logo=react&logoColor=white" alt="LEC Nova Frontend">

### Interface web da nova arquitetura da Lista de Espera Cirúrgica

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
![Status](https://img.shields.io/badge/Status-POC-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Informational-0066cc?style=flat-square" alt="Visão geral"> Visão geral

Interface da POC de migração da LEC (Lista de Espera Cirúrgica), construída com React 19.2.8, TypeScript 7.0.2 e componentes do Design System GOV.BR.

O projeto separa gradualmente a interface JSF/WildFly do legado. Esta etapa implementa autenticação, sessão, navegação por perfil, relatório de publicação, cadastro de listas de espera e gestão local de usuários e perfis; os demais itens do mapa funcional permanecem sinalizados como funcionalidades em construção.

---

# <img src="https://img.shields.io/badge/Scope-Migrated_Features-success?style=flat-square" alt="Escopo"> Escopo

- autenticação pelo Active Directory por meio da API;
- sessão por cookie, sem token no armazenamento local do navegador;
- menu calculado pela API conforme os perfis institucionais;
- identidade visual da LEC e princípios do Padrão Digital de Governo;
- relatório com seleção pesquisável e visualização do PDF no navegador;
- cadastro de listas de espera em uma única visão, com filtros, grade, paginação, inclusão, alteração e exclusão lógica;
- modo somente para consulta conforme a permissão recebida da API;
- cadastro de usuários e perfis, além da migração seletiva dos usuários do AGHU;
- React Router com retorno 403 para rota existente sem permissão e 404 para endereço inexistente;
- tratamento centralizado do retorno HTTP `401`, inclusive quando a API informa que o acesso local deixou de estar ativo;
- leiaute adaptável, recursos de acessibilidade e versão e data de compilação injetadas pelo Vite;
- compilação e implantação independentes do backend.

---

# <img src="https://img.shields.io/badge/Architecture-Project_Structure-blue?style=flat-square" alt="Arquitetura"> Arquitetura e organização

Frontend e API são publicados na mesma origem. Em desenvolvimento, o Vite encaminha `/api` para `localhost:8080`; em produção, o Nginx realiza esse encaminhamento. Assim, não há necessidade de CORS e os cookies podem usar `SameSite=Lax`.

```text
src
├── api                 cliente HTTP, CSRF e contratos da API
├── componentes         autenticação, estrutura, menu e páginas
├── Aplicacao.tsx       sessão, rotas protegidas e composição das páginas
├── estilos.css         apresentação baseada nos tokens GOV.BR
├── navegacao.ts        busca no menu autorizado e catálogo de rotas
├── navegacao.test.ts   testes da árvore de navegação
├── principal.tsx       ponto de entrada do React
└── tipos.ts            tipos retornados pela API
```

O código usa os termos da LEC e da API, como `UsuarioSessao`, `ItemMenu`, `EspecialidadeCirurgica`, `Fila`, `FilaCadastro`, `usuario`, `rotulo` e `especialidadeId`. Termos em inglês permanecem apenas quando pertencem a React, TypeScript, Vite, HTML, HTTP ou às bibliotecas integradas.

---

# <img src="https://img.shields.io/badge/Documentation-Architecture_Catalog-purple?style=flat-square" alt="Documentação"> Documentação da arquitetura

Os documentos complementares ficam centralizados em `docs/arquitetura`. Os nomes dos arquivos permanecem visíveis para facilitar sua localização no repositório.

| Módulo | Documento | Responsabilidade |
|---|---|---|
| `api` | [`modulo-api.md`](docs/arquitetura/modulo-api.md) | Cliente HTTP, CSRF, erros e operações consumidas do backend. |
| `Aplicacao` | [`modulo-aplicacao.md`](docs/arquitetura/modulo-aplicacao.md) | Sessão, menu autorizado, rotas protegidas e estado global. |
| `componentes` | [`modulo-componentes.md`](docs/arquitetura/modulo-componentes.md) | Estrutura visual, controles compartilhados e páginas funcionais. |
| `estilos` | [`modulo-estilos.md`](docs/arquitetura/modulo-estilos.md) | Identidade visual, responsividade e estados de interação. |
| `navegacao` | [`modulo-navegacao.md`](docs/arquitetura/modulo-navegacao.md) | Resolução do menu e classificação dos caminhos da SPA. |
| `principal` | [`modulo-principal.md`](docs/arquitetura/modulo-principal.md) | Inicialização do React e carregamento dos estilos globais. |
| `tipos` | [`modulo-tipos.md`](docs/arquitetura/modulo-tipos.md) | Contratos TypeScript compartilhados com a API e as páginas. |

---

# <img src="https://img.shields.io/badge/Features-Implemented_Pages-success?style=flat-square" alt="Funcionalidades"> Funcionalidades migradas

O menu reproduz as regras do legado:

| Grupo ou item | Regra |
|---|---|
| Indicação Cirúrgica e Gestão da LEC | visíveis a todo usuário autenticado |
| Aviso Cirúrgico | `SUPER`, `MED01` ou `ADMINLEC` e parâmetro institucional habilitado |
| Relatórios | publicação, Excel e histórico visíveis a todo usuário autenticado; relatório de aviso segue a regra anterior |
| Cadastros Básicos | lista de espera e destaque visíveis a todo usuário autenticado; modelo instrumental somente para `SUPER`, `ADMINLEC` ou `MED11` |
| Administração de usuários, perfis e migração AGHU | somente `SUPER` e `ADMINLEC` |
| Demais itens administrativos legados | somente `SUPER` |

As regras são aplicadas no servidor; ocultar um controle no React não concede nem revoga permissão.

O React Router controla o histórico e as URLs da SPA. Uma rota funcional somente é renderizada quando o mesmo caminho aparece no menu autorizado devolvido pela API. Se o caminho pertence à LEC, mas não está no menu do usuário, a página mostra 403; caminhos desconhecidos mostram 404. Sem sessão, nenhuma dessas páginas é montada e a autenticação é exibida.

No relatório de publicação, o usuário escolhe especialidade, lista de espera ou ambas, gera o documento com proteção CSRF e o visualiza sem persistência. Dados brutos de identificação do paciente não fazem parte do contrato da página.

Em `Lista de Espera`, filtros, resultado e formulário permanecem na mesma tela, como no legado. A grade só aparece após `Buscar`; `Limpar` retorna ao estado inicial. Os controles de manutenção são exibidos apenas quando `podeManter` é verdadeiro, mas a API continua sendo a autoridade da autorização.

As cinco páginas funcionais protegidas nesta etapa são relatório de publicação, lista de espera, perfis, usuários e migração de usuários do AGHU. Os demais caminhos conhecidos e autorizados apresentam a página de funcionalidade em construção.

---

# <img src="https://img.shields.io/badge/API-Consumed_Operations-blue?style=flat-square" alt="Integração com a API"> Integração com a API

| Grupo | Rotas consumidas |
|---|---|
| Autenticação | `GET /api/autenticacao/csrf`, `POST /api/autenticacao/entrar`, `GET /api/autenticacao/usuario`, `POST /api/autenticacao/sair` |
| Navegação | `GET /api/navegacao/menu` |
| Relatório | `GET /api/relatorios/publicacao/especialidades`, `GET /api/relatorios/publicacao/filas`, `POST /api/relatorios/publicacao/pdf` |
| Listas de espera | `GET /api/cadastros/filas/contexto`, `GET/POST /api/cadastros/filas`, `PUT/DELETE /api/cadastros/filas/{id}` |
| Perfis | `GET/POST /api/administracao/perfis`, `GET /api/administracao/perfis/ativos`, `PUT /api/administracao/perfis/{id}` |
| Usuários | `GET/POST /api/administracao/usuarios`, `PUT /api/administracao/usuarios/{id}` |
| Migração AGHU | `GET/POST /api/administracao/migracao-usuarios-aghu` |

O frontend consome as 22 operações REST publicadas pela POC. O cliente obtém o CSRF antes de cada chamada mutável e envia sempre as credenciais da mesma origem. O relatório e as telas administrativas consomem dados reais de `dblec` e `dbaghu`; a interface não possui massa fictícia para essas funcionalidades. Os contratos completos podem ser consultados no Swagger da API em `http://localhost:8080/swagger-ui.html`.

---

# <img src="https://img.shields.io/badge/Execution-Local_Development-green?style=flat-square" alt="Execução"> Executar localmente

Pré-requisitos:

- Node.js 24, definido em `.nvmrc` e na esteira; o mínimo aceito pelo projeto é Node 22.12;
- npm compatível com o `package-lock.json` versão 3;
- API disponível em `localhost:8080`.

Configure e inicie o backend com os bancos institucionais. Enquanto a credencial de AD não estiver disponível, o backend pode usar localmente o perfil explícito `desenvolvimento-sem-ad`:

```powershell
mvn spring-boot:run
```

Depois, no diretório do frontend:

```powershell
npm ci
npm run dev
```

Acesse `http://127.0.0.1:5173`.

Use um usuário institucional ativo no `dbaghu`. No perfil `desenvolvimento-sem-ad`, qualquer senha não vazia é aceita apenas localmente; no perfil padrão, a senha é validada no Active Directory.

A interface não armazena credenciais nem configurações de banco ou AD. O destino local da API está em [vite.config.ts](vite.config.ts).

O servidor de desenvolvimento usa a porta `5173`; `npm run preview` usa a porta `4173`. As duas portas são estritas e não mudam silenciosamente quando já estão ocupadas.

---

# <img src="https://img.shields.io/badge/Design-GOV.BR_&_Accessibility-1351B4?style=flat-square" alt="Design e acessibilidade"> Design System e acessibilidade

Versões: React 19.2.8, React Router 7.18.2, TypeScript 7.0.2, Vite 8.2.1, `@govbr-ds/core` 3.7.0 e `@govbr-ds/webcomponents`/`@govbr-ds/webcomponents-react` 2.1.2. A interface combina Web Components oficiais, elementos HTML semânticos e CSS próprio orientado pela identidade GOV.BR. O seletor pesquisável compartilhado usa semântica `combobox/listbox`.

Foram incluídos salto ao conteúdo, regiões semânticas, títulos hierárquicos, nomes acessíveis, estados `aria-*`, foco após navegação, tabela e diálogo nomeados, teclado, contraste institucional e respeito a `prefers-reduced-motion`. A homologação ainda deve incluir auditoria com leitores de tela e critérios eMAG/WCAG.

Referências: [fluxo de desenvolvimento GOV.BR](https://www.gov.br/ds/como-comecar/fluxo-dev) e [integração com React](https://govbr-ds.gitlab.io/bibliotecas/wbc/govbr-ds-wbc/docs/frameworks/react/).

---

# <img src="https://img.shields.io/badge/Quality-Tests_&_Build-success?style=flat-square" alt="Qualidade"> Qualidade e compilação

```powershell
npm test
npm run typecheck
npm run build
```

`dist/` é o artefato completo e não contém a API. A integração atual dos Web Components ainda concentra parte relevante do JavaScript; antes da produção, acompanhe o orçamento de desempenho e adote importação seletiva quando houver uma saída estável por componente.

Os 10 testes automatizados em Vitest 4.1.10 verificam o contrato HTTP em português, CSRF, operações administrativas, distinção 403/404, normalização dos caminhos e acesso do logo à página inicial. A esteira executa os testes antes de gerar `dist/`, e o próprio build também executa a verificação TypeScript.

---

# <img src="https://img.shields.io/badge/Deployment-Nginx_&_Pipeline-orange?style=flat-square" alt="Implantação"> Implantação

1. Execute `npm ci` e `npm run build` na esteira.
2. Publique `dist/` de forma atômica em `/var/www/lec/`.
3. Ajuste servidor e certificados em [deploy/nginx/lec-novo.conf](deploy/nginx/lec-novo.conf).
4. Instale a configuração, valide com `nginx -t` e recarregue o Nginx.

A configuração fornecida atende às rotas da SPA, cache dos arquivos versionados, revalidação do `index.html`, encaminhamento de `/api`, verificação de disponibilidade, cabeçalhos de segurança e visualização local do PDF. O TLS termina no Nginx e a API permanece na rede interna.

[azure-pipelines.yml](azure-pipelines.yml) instala dependências, testa, compila e publica apenas `dist/`. Alterações do frontend não exigem nova compilação do backend.

---

# <img src="https://img.shields.io/badge/Roadmap-Next_Steps-yellow?style=flat-square" alt="Próximos passos"> Próximos passos

- validar a experiência com usuários da LEC;
- formalizar a matriz dos módulos ainda não migrados;
- homologar o relatório com dados anonimizados;
- ampliar testes de componentes e jornadas;
- medir desempenho em homologação;
- versionar o contrato REST entre implantações independentes.

</div>
