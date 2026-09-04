<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-observabilidade-0066cc?style=for-the-badge&logo=opentelemetry&logoColor=white" alt="Pacote observabilidade">

### Correlação e registro seguro das requisições HTTP

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Observability-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: tornar o percurso das requisições rastreável com segurança.
- Limite: não contém regras de negócio nem registra conteúdo sensível.

---

# <img src="https://img.shields.io/badge/Guidelines-Safe_Logging-lightgrey?style=flat-square" alt="Diretrizes"> Diretrizes

- O filtro valida ou gera o `X-Correlation-ID`, mantém o identificador no MDC durante a requisição e o devolve na resposta.
- Cada conclusão registra método, rota sem parâmetros de consulta, situação HTTP, duração e origem pseudonimizada.
- O nível do evento acompanha o resultado: fluxo normal em `DEBUG`, respostas inesperadas de cliente em `WARN` e falhas de servidor em `ERROR`.
- Corpo HTTP, cookies, sessão, credenciais, token CSRF e dados pessoais não devem aparecer nos logs.
- O contexto de correlação deve sempre ser restaurado ao final para não misturar requisições processadas pela mesma thread.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
