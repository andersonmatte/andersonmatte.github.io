<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Package-entidade-0066cc?style=for-the-badge&logo=hibernate&logoColor=white" alt="Pacote entidade">

### Mapeamentos JPA das tabelas do dblec

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
![Camada](https://img.shields.io/badge/Architecture-Persistence-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Responsibility-0066cc?style=flat-square" alt="Visão geral"> Visão geral

- Responsabilidade: mapear as tabelas do `dblec` acessadas pela aplicação por JPA.
- Limite: contém somente entidades JPA.

---

# <img src="https://img.shields.io/badge/Guidelines-JPA-blue?style=flat-square" alt="Diretrizes"> Diretrizes

- As entidades atuais representam fila, indicação cirúrgica, usuário e perfil. Fila, usuário e perfil são mantidos pela aplicação; indicação cirúrgica é somente consultada.
- Tabelas apenas consultadas no `dbaghu` não recebem entidades; seu acesso permanece em JDBC.
- Entidades não são usadas como contrato HTTP e não devem ser devolvidas pelos controladores.
- Não se usa `@Data` nem setters automáticos. Alterações de estado devem ocorrer por métodos explícitos, preservando invariantes e evitando exposição acidental de dados.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](../../README.md)

</div>

</div>
