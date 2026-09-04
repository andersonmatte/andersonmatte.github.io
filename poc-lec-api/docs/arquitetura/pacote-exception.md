<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-exception-0066cc?style=for-the-badge&logo=spring&logoColor=white" alt="Pacote exception">

### Exceções e respostas de erro seguras

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Error_Handling-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: representar falhas conhecidas e traduzi-las em respostas HTTP seguras.
- Limite: não implementa regras de negócio; apenas identifica e apresenta seus erros.

---

# <img src="https://img.shields.io/badge/Guidelines-Errors-red?style=flat-square" alt="Diretrizes"> Diretrizes

- Exceções específicas expressam autenticação inválida, filtros incorretos, ausência de dados e violações de regras.
- Enumerações de motivo permitem diferenciar falhas sem depender de textos livres.
- Classes `@RestControllerAdvice` convertem as exceções em `ProblemDetail`, com situação HTTP e identificador de correlação.
- Respostas não devem revelar consultas, credenciais, dados pessoais nem detalhes internos da aplicação.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
