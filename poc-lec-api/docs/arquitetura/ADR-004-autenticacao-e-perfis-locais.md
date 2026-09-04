<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/ADR_004-Authentication_&_Profiles-0066cc?style=for-the-badge&logo=springsecurity&logoColor=white" alt="ADR 004">

### Autenticação institucional e transição dos perfis da LEC

[![Spring Security](https://img.shields.io/badge/Spring_Security-7.1-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)](https://spring.io/projects/spring-security)
[![Active Directory](https://img.shields.io/badge/Active_Directory-LDAP-0078D4?style=flat-square&logo=microsoft&logoColor=white)](https://learn.microsoft.com/windows-server/identity/ad-ds/)
![Status](https://img.shields.io/badge/Status-Aceita-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Decision-Overview-0066cc?style=flat-square" alt="Decisão"> Visão geral

- Situação: aceita
- Decisão: no perfil padrão, o Active Directory valida a senha, e o `dblec` pode se tornar a fonte dos usuários e perfis autorizados na LEC.

---

# <img src="https://img.shields.io/badge/Credentials-Validation-red?style=flat-square" alt="Credencial"> Validação da credencial

No perfil padrão, a API realiza somente o bind LDAP `login@domínio`, com autenticação simples e tempos limite explícitos, reproduzindo a validação do legado. Após um bind bem-sucedido, o contexto é fechado; a API não pesquisa grupos ou atributos no AD, pois acesso e perfis pertencem à origem configurada no banco. A senha existe apenas durante a requisição e não é persistida nem registrada em log. O perfil `desenvolvimento-sem-ad` ignora temporariamente o bind, aceita somente credenciais não vazias e nunca deve ser usado em homologação ou produção.

Falhas de credencial, indisponibilidade do diretório e ausência de acesso local são diferenciadas somente nos logs internos. A resposta HTTP permanece genérica para não revelar a existência de contas.

---

# <img src="https://img.shields.io/badge/Model-Local_Access-blue?style=flat-square" alt="Modelo"> Modelo

- `agendacirurgica.perfil`: catálogo de perfis.
- `agendacirurgica.usuario`: usuários autorizados na LEC; não armazena senha.
- `agendacirurgica.usuario_perfil`: associação muitos-para-muitos necessária para preservar os vários perfis de um usuário legado.

As duas primeiras são tabelas de negócio. A terceira é uma tabela técnica de relacionamento.

Somente `SUPER` e `ADMINLEC` podem manter usuários, perfis e executar a migração consultiva do AGHU. Perfis desconhecidos podem compor a sessão, mas não recebem permissões privilegiadas implicitamente.

Na origem local, um usuário precisa possuir ao menos um perfil ativo. Na origem legada, a implementação atual exige usuário e vínculo ativos e carrega os perfis ativos encontrados; se nenhum perfil for encontrado, a sessão mantém somente a autorização básica, sem permissões específicas de perfil.

---

# <img src="https://img.shields.io/badge/Transition-Migration-orange?style=flat-square" alt="Transição"> Transição

1. Executar o script que adiciona somente as três tabelas ao esquema existente `agendacirurgica`.
2. Manter `lec.seguranca.origem-perfis=legado`.
3. Migrar e revisar usuários pela tela administrativa.
4. Alterar para `lec.seguranca.origem-perfis=local`.

O arquivo externo escolhe a origem dos perfis, mas não armazena usuários nem suas associações.

Quando a origem é local, a API sincroniza o acesso com o banco a cada requisição autenticada. Alterações de perfil passam a valer imediatamente e um usuário inativado tem sua sessão encerrada.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
