<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-repository-0066cc?style=for-the-badge&logo=postgresql&logoColor=white" alt="Pacote repository">

### Contratos de persistência da aplicação

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Data_Access-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: definir como os casos de uso consultam e persistem dados.
- Limite: não contém regras de negócio nem coordena fluxos da aplicação.

---

# <img src="https://img.shields.io/badge/Guidelines-Contracts-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- Interfaces próprias descrevem operações em termos do domínio, sem expor detalhes de conexão aos serviços.
- Interfaces Spring Data são usadas nos cadastros locais de usuário e perfil; os demais acessos usam contratos próprios quando exigem consultas especializadas ou controle explícito.
- Consultas devem receber parâmetros, nunca valores concatenados no comando.
- Implementações específicas que exigem JPA ou JDBC ficam no subpacote `repository.impl`.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
