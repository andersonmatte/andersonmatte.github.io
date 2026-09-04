<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/LEC_Nova-API-0066cc?style=for-the-badge&logo=springboot&logoColor=white" alt="LEC Nova API">

### API REST da nova arquitetura da Lista de Espera Cirúrgica

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Maven](https://img.shields.io/badge/Maven-3.9+-orange?style=flat-square)](https://maven.apache.org/)
![Status](https://img.shields.io/badge/Status-POC-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Informational-0066cc?style=flat-square" alt="Visão geral"> Visão geral

API REST da POC de migração da LEC (Lista de Espera Cirúrgica). O projeto substitui o acoplamento JSF/WildFly por um monólito Spring Boot em camadas, executado como JAR independente em Java 21.

Esta etapa entrega autenticação, sessão, navegação por perfil, relatório de publicação, cadastro de listas de espera e gestão local de usuários e perfis com migração controlada do AGHU.

---

# <img src="https://img.shields.io/badge/Architecture-System_Overview-0066cc?style=flat-square" alt="Arquitetura"> Visão da arquitetura

```text
Navegador
   │ HTTPS + cookie de sessão + CSRF
   ▼
Nginx ── / ─────► SPA React
   │
   └── /api ────► LEC API
                       ├── Active Directory: validação da senha no perfil padrão
                       ├── dbaghu (leitura): usuários, vínculos, perfis legados,
                       │                     especialidades e pacientes
                       └── dblec (leitura e escrita): filas, indicações, usuários,
                                                     perfis e Flyway controlado
```

- Java 21, Spring Boot 4.1, Spring Security 7.1 e Springdoc 3.1;
- sessão HTTP na mesma origem, sem JWT no navegador e sem armazenamento de senha;
- CSRF por cookie e cabeçalho, com cookie de sessão `HttpOnly`;
- pools independentes para `dbaghu` (somente leitura) e `dblec` (escrita);
- JPA nas entidades do `dblec`, com escrita em filas, usuários e perfis, leitura de indicações cirúrgicas e Hibernate apenas validando o esquema;
- JDBC parametrizado nas leituras especializadas do `dbaghu`;
- Flyway restrito ao esquema existente `agendacirurgica`, desabilitado por padrão;
- pacote-base `br.gov.hubrasil.lec` e artefato independente do frontend.

---

# <img src="https://img.shields.io/badge/Scope-Migrated_Features-success?style=flat-square" alt="Escopo"> Escopo funcional migrado

| Módulo | Comportamento principal |
|---|---|
| Autenticação | No perfil padrão, valida a senha no AD; resolve o acesso na origem configurada, regenera a sessão e devolve apenas nome, usuário e perfis. |
| Navegação | Calcula no servidor o menu permitido pelos perfis obtidos da origem configurada. |
| Relatório de publicação | Consulta os bancos institucionais em tempo real, compõe especialidades, listas, indicações e pacientes em memória e gera o PDF sem persistência. |
| Cadastro de listas | Pesquisa paginada, inclui, altera e exclui logicamente listas, com auditoria, autorização e controle de versão. |
| Gestão de acessos | Mantém usuários e perfis locais, sem armazenar senha, restrita a `SUPER` e `ADMINLEC`. |
| Migração AGHU | Pesquisa usuários com perfil LEC ativo no AGHU e copia, de forma seletiva e idempotente, cadastro e associações para o `dblec`. |

Durante a transição, os perfis podem ser lidos do legado ou do cadastro local. São reconhecidos `SUPER`, `MED01`, `MED11`, `ADMINLEC`, `ADMINLEC_SEM_ALTERAR_POSICAO`, `ADMINLEC_SEM_CADASTRAR_FILA` e `ADMINLEC_SOMENTE_CONSULTAS`. Perfis desconhecidos não recebem permissões implicitamente.

No perfil padrão, a senha é validada no Active Directory. O perfil explícito `desenvolvimento-sem-ad` ignora essa validação somente no desenvolvimento local. Com `lec.seguranca.origem-perfis=legado`, acesso e perfis vêm de `casca.csc_usuario`, `casca.csc_perfis_usuarios`, `casca.csc_perfil`, `agh.rap_servidores` e `agh.rap_pessoas_fisicas`. Com `lec.seguranca.origem-perfis=local`, vêm de `agendacirurgica.usuario`, `agendacirurgica.perfil` e `agendacirurgica.usuario_perfil`. Mudanças locais são sincronizadas na requisição seguinte; inativar um usuário encerra sua sessão.

O relatório não possui dados ou repositórios simulados. Ele lê `agh.agh_especialidades`, `agh.mbc_especialidade_proc_cirgs` e `agh.aip_pacientes` no `dbaghu`, além de `agendacirurgica.fila` e `agendacirurgica.indicacao_cirurgica` no `dblec`. Preserva as regras do legado: exige especialidade, lista de espera ou ambas; considera indicações não excluídas; ordena por lista e posição; usa o nome social do paciente quando cadastrado; e publica somente posição, SWALIS e identificadores anonimizados. Nome, CPF e prontuário brutos não são expostos por JSON.

O cadastro usa `agendacirurgica.fila` e `agendacirurgica.indicacao_cirurgica` no `dblec`. Nome e observação são normalizados para maiúsculas; duplicidade é bloqueada; inativação e exclusão são impedidas quando há pacientes aguardando; e o campo `versao` protege contra alterações concorrentes. Escrita é permitida a `SUPER`, `ADMINLEC` e `ADMINLEC_SEM_ALTERAR_POSICAO`, salvo perfis explicitamente restritivos.

Não há transação distribuída: as leituras e escritas pertencem a seus respectivos bancos, e a composição entre eles ocorre no serviço.

---

# <img src="https://img.shields.io/badge/Structure-Code_Organization-blue?style=flat-square" alt="Estrutura"> Organização do código

```text
br.gov.hubrasil.lec
├── config             fontes de dados, Flyway, OpenAPI e propriedades
├── controller         endpoints REST
├── dto                contratos HTTP, todos com sufixo DTO
├── entidade           somente entidades JPA mapeadas para tabelas
├── exception          exceções e respostas de erro
├── modelo             records e modelos imutáveis do domínio
├── observabilidade     correlação e registro seguro das requisições
├── repository         interfaces de persistência
│   └── impl            implementações JPA/JDBC específicas com sufixo Impl
├── security           autenticação, autorização, sessão e CSRF
├── service            casos de uso e regras de negócio
└── util               funções auxiliares sem estado mutável compartilhado
```

Controladores tratam o contrato HTTP, serviços concentram regras e repositórios isolam os dados. DTOs, entidades, records, enumerações e tipos auxiliares ficam em arquivos próprios, sem classes internas. Classes `@Configuration` recebem nomes explícitos para sua responsabilidade e, em geral, usam o sufixo `Config`; classes de vinculação externa usam o prefixo `Propriedades`.

O Lombok reduz apenas código mecânico por meio de `@Getter`, `@NoArgsConstructor` e `@RequiredArgsConstructor`. Não se usa `@Data` nas entidades JPA, evitando geração automática de setters, `equals`, `hashCode` e `toString` sobre relacionamentos ou dados sensíveis.

A linguagem segue a LEC e o banco institucional: `EspecialidadeCirurgica`, `Fila`, `IndicacaoPublicacao`, `IdentificacaoPaciente`, `prontuario`, `usuario` e `perfil`. Termos em inglês permanecem apenas quando impostos pelas tecnologias integradas.

---

# <img src="https://img.shields.io/badge/Documentation-Architecture_Catalog-purple?style=flat-square" alt="Documentação"> Documentação da arquitetura

Os documentos complementares ficam centralizados em `docs/arquitetura` e podem ser consultados por finalidade.

## Guias e referências

| Documento | Conteúdo |
|---|---|
| [Como testar localmente](docs/arquitetura/como-testar-localmente.md) | Testes automatizados, preparação do ambiente e validação manual integrada. |
| [Anotações utilizadas](docs/arquitetura/anotacoes-utilizadas.md) | Inventário das anotações presentes no código e dos cuidados adotados. |

## Decisões arquiteturais

| Documento | Decisão |
|---|---|
| [ADR 001 — Banco dos testes de integração](docs/arquitetura/ADR-001-testes-de-integracao-com-h2.md) | Uso de H2 em memória com compatibilidade PostgreSQL nos testes. |
| [ADR 002 — Persistência JPA e consultas](docs/arquitetura/ADR-002-persistencia-jpa-e-consultas.md) | JPA no `dblec` e JDBC nas consultas especializadas do AGHU. |
| [ADR 003 — Evolução controlada do esquema](docs/arquitetura/ADR-003-evolucao-do-esquema.md) | Flyway desabilitado por padrão e execução governada. |
| [ADR 004 — Autenticação e perfis locais](docs/arquitetura/ADR-004-autenticacao-e-perfis-locais.md) | Validação da senha no AD e transição controlada dos perfis. |

## Responsabilidades dos pacotes

| Documento | Responsabilidade |
|---|---|
| [`config`](docs/arquitetura/pacote-config.md) | Fontes de dados, Flyway, OpenAPI e propriedades. |
| [`controller`](docs/arquitetura/pacote-controller.md) | Endpoints REST e contrato HTTP. |
| [`dto`](docs/arquitetura/pacote-dto.md) | Dados recebidos e devolvidos pela API. |
| [`entidade`](docs/arquitetura/pacote-entidade.md) | Entidades JPA mapeadas para tabelas. |
| [`exception`](docs/arquitetura/pacote-exception.md) | Exceções e respostas de erro seguras. |
| [`modelo`](docs/arquitetura/pacote-modelo.md) | Records e modelos imutáveis do domínio. |
| [`observabilidade`](docs/arquitetura/pacote-observabilidade.md) | Correlação e registro seguro das requisições. |
| [`repository`](docs/arquitetura/pacote-repository.md) | Contratos de persistência. |
| [`repository.impl`](docs/arquitetura/pacote-repository-impl.md) | Implementações JPA e JDBC específicas. |
| [`security`](docs/arquitetura/pacote-security.md) | Autenticação, autorização, sessão e CSRF. |
| [`service`](docs/arquitetura/pacote-service.md) | Casos de uso e regras de negócio. |
| [`util`](docs/arquitetura/pacote-util.md) | Funções auxiliares sem estado compartilhado. |

---

# <img src="https://img.shields.io/badge/Profiles-Execution_Modes-orange?style=flat-square" alt="Perfis"> Perfis de execução

| Perfil | Bancos | Senha | Uso |
|---|---|---|---|
| padrão | PostgreSQL reais | Active Directory | homologação e produção |
| `desenvolvimento-sem-ad` | PostgreSQL reais | qualquer valor não vazio | desenvolvimento local temporário |

Para usar bancos reais enquanto a credencial de AD não estiver disponível, acrescente apenas no arquivo local:

```properties
spring.profiles.active=desenvolvimento-sem-ad
```

Esse perfil ignora somente a validação da senha. Com `origem-perfis=legado`, usuário e vínculo ainda precisam estar ativos no `dbaghu`, e os perfis ativos encontrados são carregados. Com `origem-perfis=local`, o usuário e ao menos um de seus perfis precisam estar ativos no `dblec`. Ele reproduz de forma explícita o comportamento do legado em `dev`, `treinamento` e `localhost`. Nunca deve ser usado em homologação ou produção.

Com o arquivo externo configurado, execute `mvn spring-boot:run` ou inicie o JAR. Não existe mais perfil com massa fictícia no artefato da aplicação; o H2 permanece apenas no escopo automatizado de testes.

---

# <img src="https://img.shields.io/badge/Configuration-Build_&_Run-green?style=flat-square" alt="Configuração"> Configuração e execução real

Pré-requisitos: JDK 21, Maven 3.9+, PostgreSQL e conectividade com o Active Directory. O Maven Enforcer rejeita outra versão principal do Java.

A aplicação importa opcionalmente `./application-external.properties`, relativo ao diretório de trabalho. Copie o exemplo para o mesmo diretório em que o JAR será iniciado:

```powershell
Copy-Item deploy/application-external.properties.example application-external.properties
mvn clean package
java -jar target/lec-novo-backend-0.1.0-SNAPSHOT.jar
```

Configurações principais:

| Propriedade/variável | Finalidade |
|---|---|
| `lec.seguranca.diretorio.dominio` / `AD_DOMINIO` | domínio do AD |
| `lec.seguranca.diretorio.url` / `AD_URL` | URL LDAP/LDAPS usada no bind, por exemplo `ldap://servidor:389/` |
| `lec.seguranca.diretorio.tempo-conexao-ms` / `AD_TEMPO_CONEXAO_MS` | limite para conexão com o diretório; padrão 5 segundos |
| `lec.seguranca.diretorio.tempo-resposta-ms` / `AD_TEMPO_RESPOSTA_MS` | limite para resposta do diretório; padrão 5 segundos |
| `lec.fontes-dados.dbaghu.*` / `DBAGHU_*` | banco de usuários, perfis, especialidades e pacientes |
| `lec.fontes-dados.dblec.*` / `DBLEC_*` | banco de leitura e escrita da LEC |
| `lec.seguranca.cookie-csrf-seguro` / `LEC_COOKIE_SEGURO` | deve ser `true` sob HTTPS |
| `lec.seguranca.origem-perfis` / `LEC_ORIGEM_PERFIS` | `legado` durante a migração; `local` após homologação dos cadastros |
| `lec.flyway.habilitado` / `LEC_FLYWAY_HABILITADO` | habilita migrações; padrão `false` |
| `lec.flyway.esquema` / `LEC_FLYWAY_ESQUEMA` | esquema existente da LEC; padrão `agendacirurgica` |
| `lec.flyway.criar-baseline` / `LEC_FLYWAY_CRIAR_BASELINE` | autoriza explicitamente o baseline inicial; padrão `false` |
| `lec.flyway.versao-baseline` / `LEC_FLYWAY_VERSAO_BASELINE` | versão a registrar no baseline controlado |
| `lec.observabilidade.chave-pseudonimizacao` / `LEC_LOG_CHAVE_PSEUDONIMIZACAO` | chave secreta usada para pseudonimizar usuário e origem nos logs |
| `logging.file.name` / `LEC_LOG_ARQUIVO` | arquivo opcional de logs; no serviço Linux use `/var/log/lec/lec-novo-backend.log` |
| `logging.structured.format.file` / `LEC_LOG_FORMATO_ARQUIVO` | formato do arquivo; o padrão da aplicação é `logstash` |
| `logging.structured.format.console` / `LOGGING_STRUCTURED_FORMAT_CONSOLE` | habilita JSON no console de homologação/produção; deixe ausente no uso local |
| `logging.level.root` | nível das bibliotecas e da infraestrutura; padrão `WARN` |
| `logging.level.br.gov.hubrasil.lec` | nível dos eventos da aplicação; padrão `INFO` |
| `lec.observabilidade.ambiente` / `LEC_AMBIENTE` | identificação do ambiente adicionada ao JSON, por exemplo `homologacao` ou `producao` |

Variáveis de ambiente sobrescrevem os valores dos arquivos. Não versione senhas; mantenha o arquivo externo com acesso restrito ou use o cofre corporativo. Em produção, prefira `ldaps://` com certificado confiável para a JVM.

Correspondência com o legado:

| WildFly/JNDI | Nova configuração |
|---|---|
| `java:jboss/AgendaCirurgicaXADS` | `lec.fontes-dados.dblec.*` ou `DBLEC_*` |
| `java:jboss/AghuPostgresXADS` | `lec.fontes-dados.dbaghu.*` ou `DBAGHU_*` |

---

# <img src="https://img.shields.io/badge/Observability-Logs_&_Correlation-lightgrey?style=flat-square" alt="Observabilidade"> Logs, correlação e responsabilidade

No desenvolvimento local, o console conserva o formato textual padrão do Spring Boot, mais legível para acompanhamento humano. Quando `logging.file.name` é configurado, o arquivo é emitido em JSON no padrão `logstash`. Em homologação e produção, `logging.structured.format.console=logstash` também pode estruturar a saída destinada ao journald, Elastic ou à plataforma corporativa. O formato altera a apresentação; a quantidade de mensagens continua sendo controlada pelos níveis configurados.

Por padrão, bibliotecas e infraestrutura usam `WARN`, enquanto `br.gov.hubrasil.lec` usa `INFO`. Assim, permanecem visíveis os eventos funcionais e de segurança da LEC, sem o fluxo rotineiro de inicialização do Tomcat, Hikari e Spring. Requisições HTTP bem-sucedidas e ausência normal de sessão são `DEBUG`; respostas inesperadas de cliente são `WARN`; falhas de servidor são `ERROR`.

Cada resposta contém `X-Correlation-ID`; quando ocorre um erro tratado, o mesmo valor também aparece como `correlacaoId` no corpo `ProblemDetail`. O identificador recebido do cliente só é aceito quando possui formato seguro; caso contrário, a API gera um UUID.

São registrados método, rota sem consulta, situação HTTP, duração, eventos de autenticação e autorização, manutenção de listas e geração do relatório. Com a chave configurada, usuário e endereço de origem são pseudonimizados por HMAC-SHA-256. Não são registrados senha, token CSRF, cookie ou identificador de sessão, corpo HTTP, CPF, prontuário, nome de paciente, nome ou observação da lista, nem conteúdo do PDF.

Em produção, configure uma chave aleatória exclusiva com ao menos 32 caracteres e restrinja o acesso a ela e aos arquivos. A configuração fornecida gira o arquivo ao atingir 50 MB, conserva até 30 períodos diários e limita o conjunto a 2 GB; a retenção definitiva deve seguir a política institucional. Sem `logging.file.name`, não é criado arquivo e a saída permanece somente no console.

Exemplo local no `application-external.properties`:

```properties
lec.observabilidade.ambiente=desenvolvimento
lec.observabilidade.chave-pseudonimizacao=SUBSTITUIR_POR_CHAVE_ALEATORIA_COM_32_OU_MAIS_CARACTERES
logging.file.name=./logs/lec-novo-backend.log
```

Não configure `logging.structured.format.console` localmente. Assim, o terminal permanece no formato tradicional do Spring e `./logs/lec-novo-backend.log` recebe os eventos estruturados em JSON.

Para um diagnóstico temporário, acrescente:

```properties
logging.level.root=INFO
logging.level.br.gov.hubrasil.lec=DEBUG
```

Remova essas sobrescritas ao concluir a análise para retornar ao padrão operacional mais enxuto.

Exemplo para localizar toda a trajetória de uma requisição:

```powershell
Select-String -Path .\logs\lec-novo-backend.log -Pattern '"correlacaoId":"VALOR_RECEBIDO"'
```

---

# <img src="https://img.shields.io/badge/OpenAPI-Swagger_Contract-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="OpenAPI"> Swagger e contrato OpenAPI

Com a API em execução:

- Swagger UI: `http://localhost:8080/swagger-ui.html`;
- contrato JSON: `http://localhost:8080/v3/api-docs`;
- contrato YAML: `http://localhost:8080/v3/api-docs.yaml`.

O contrato é emitido em OpenAPI 3.0, formato estável e amplamente suportado pelas ferramentas de integração.

O teste `DocumentacaoApiIntegrationTest` valida na esteira as 22 operações publicadas: `operationId` único, resumo, tag, respostas e exigência da sessão por cookie nas rotas protegidas. O contrato também inclui o encerramento seguro da sessão. Uma mudança na quantidade de operações faz o `mvn verify` falhar e exige a revisão do teste; outras alterações de compatibilidade continuam exigindo revisão explícita do contrato.

A documentação é pública; as operações de negócio continuam protegidas. Na configuração atual, o cookie CSRF é `HttpOnly`, portanto o Swagger UI não consegue lê-lo para preencher automaticamente o cabeçalho. Use a interface React ou um cliente HTTP que preserve os cookies, obtenha `nomeCabecalho` e `token` em `GET /api/autenticacao/csrf` e envie esse cabeçalho nas operações mutáveis.

---

# <img src="https://img.shields.io/badge/API-POC_Routes-blue?style=flat-square" alt="Rotas"> Rotas da POC

| Método | Rota | Proteção | Finalidade |
|---|---|---|---|
| `GET` | `/api/autenticacao/csrf` | pública | obter CSRF |
| `POST` | `/api/autenticacao/entrar` | CSRF | autenticar e criar sessão |
| `GET` | `/api/autenticacao/usuario` | sessão | consultar usuário atual |
| `POST` | `/api/autenticacao/sair` | sessão + CSRF | encerrar sessão |
| `GET` | `/api/navegacao/menu` | sessão | consultar menu autorizado |
| `GET` | `/api/relatorios/publicacao/especialidades` | sessão | listar especialidades |
| `GET` | `/api/relatorios/publicacao/filas` | sessão | listar filas |
| `POST` | `/api/relatorios/publicacao/pdf` | sessão + CSRF | gerar PDF |
| `GET` | `/api/cadastros/filas/contexto` | sessão | consultar contexto e permissão |
| `GET` | `/api/cadastros/filas` | sessão | pesquisar listas |
| `POST` | `/api/cadastros/filas` | perfil + CSRF | incluir lista |
| `PUT` | `/api/cadastros/filas/{id}` | perfil + CSRF | alterar lista |
| `DELETE` | `/api/cadastros/filas/{id}?versao={versao}` | perfil + CSRF | excluir logicamente |
| `GET/POST` | `/api/administracao/perfis` | `SUPER` ou `ADMINLEC`; CSRF na escrita | pesquisar e incluir perfis |
| `GET` | `/api/administracao/perfis/ativos` | `SUPER` ou `ADMINLEC` | listar perfis associáveis |
| `PUT` | `/api/administracao/perfis/{id}` | `SUPER` ou `ADMINLEC` + CSRF | alterar perfil |
| `GET/POST` | `/api/administracao/usuarios` | `SUPER` ou `ADMINLEC`; CSRF na escrita | pesquisar e incluir usuários |
| `PUT` | `/api/administracao/usuarios/{id}` | `SUPER` ou `ADMINLEC` + CSRF | alterar usuário e perfis |
| `GET/POST` | `/api/administracao/migracao-usuarios-aghu` | `SUPER` ou `ADMINLEC`; CSRF na migração | pesquisar e migrar usuários do AGHU |
| `GET` | `/actuator/health` | pública | verificar disponibilidade |
| `GET` | `/actuator/info` | pública | consultar as informações expostas pela aplicação |

Os endpoints do Actuator não integram as 22 operações do OpenAPI, que está limitado a `/api/**`.

---

# <img src="https://img.shields.io/badge/Quality-Tests_&_Deployment-success?style=flat-square" alt="Qualidade"> Qualidade, banco e implantação

```powershell
mvn clean verify
java -jar target/lec-novo-backend-0.1.0-SNAPSHOT.jar
```

Os testes usam JUnit 5, Mockito nos testes unitários e H2 em memória com `MODE=PostgreSQL` nos testes de integração. Eles cobrem autenticação, menu, documentação OpenAPI, seleção e anonimização do relatório, PDF, cadastros, migração AGHU, JPA, auditoria, permissões, atualização da sessão, concorrência, CSRF, correlação e proteção de identificadores nos logs.

O H2 oferece execução rápida e reproduzível, mas não é tratado como equivalência integral ao PostgreSQL. Consultas, índices e plano de execução devem ser homologados no PostgreSQL institucional.

---

# <img src="https://img.shields.io/badge/Database-Access_Tables-336791?style=flat-square&logo=postgresql&logoColor=white" alt="Banco de dados"> Criar as tabelas de acesso no `dblec`

O script entregue é [V2__criar_gestao_local_acessos.sql](src/main/resources/banco/migracao/V2__criar_gestao_local_acessos.sql). Ele não cria esquema e não modifica tabelas legadas. Cria somente `agendacirurgica.perfil`, `agendacirurgica.usuario` e `agendacirurgica.usuario_perfil`; a terceira tabela mantém os vários perfis de cada usuário.

Para a conexão informada, o DBA pode executar o script diretamente. A senha não deve ser escrita no comando:

```powershell
& psql `
  --host=172.17.62.16 `
  --port=5432 `
  --dbname=dblec `
  --username=USUARIO_AUTORIZADO `
  --set=ON_ERROR_STOP=1 `
  --single-transaction `
  --file=src/main/resources/banco/migracao/V2__criar_gestao_local_acessos.sql
```

O `psql` solicitará a senha. Antes da execução: fazer backup, validar em homologação e confirmar que o usuário possui permissão para criar tabelas, índices e chaves estrangeiras no esquema existente `agendacirurgica`. Depois, mantenha inicialmente:

```properties
lec.seguranca.origem-perfis=legado
lec.flyway.habilitado=false
```

Entre com `SUPER` ou `ADMINLEC`, revise os perfis, execute **Administração → Migrar Usuários AGHU** e confira os usuários locais. Somente após a homologação altere para:

```properties
lec.seguranca.origem-perfis=local
```

---

# <img src="https://img.shields.io/badge/Flyway-Controlled_Migrations-CC0200?style=flat-square&logo=flyway&logoColor=white" alt="Flyway"> Como executar o Flyway, quando autorizado

O Flyway permanece desabilitado e não deve ser habilitado para a execução manual acima. Como `agendacirurgica` já é um esquema não vazio, sua adoção exige um baseline explícito:

1. faça backup e obtenha autorização do DBA;
2. valide primeiro em homologação;
3. confirme que `perfil`, `usuario` e `usuario_perfil` ainda não existem;
4. configure temporariamente `lec.flyway.habilitado=true`, `lec.flyway.esquema=agendacirurgica`, `lec.flyway.criar-baseline=true` e `lec.flyway.versao-baseline=1`;
5. inicie o JAR uma vez e confirme o baseline da `V1`, a aplicação da `V2` e a criação de `flyway_schema_history`;
6. pare a aplicação e retorne `lec.flyway.criar-baseline=false`; a permanência do Flyway habilitado deve seguir a governança do ambiente.

Escolha uma única estratégia para o ambiente: script direto pelo DBA ou Flyway. Se a `V2` já tiver sido executada manualmente, um futuro baseline deverá registrar a versão `2`, sem reaplicar o script. Migrações aplicadas nunca devem ser editadas; correções entram em uma nova versão.

As decisões estão resumidas em [docs/arquitetura](docs/arquitetura): testes H2, divisão JPA/JDBC, execução controlada do Flyway e gestão local de acessos.

As migrações usam o esquema existente `agendacirurgica`: a `V1` é apenas um marco sem DDL e a `V2` cria somente as três tabelas de acesso. O Flyway também mantém sua tabela técnica obrigatória `flyway_schema_history` quando é habilitado.

Na VM, copie o JAR e o arquivo protegido para `/opt/lec/backend/`, instale [deploy/systemd/lec-novo-backend.service](deploy/systemd/lec-novo-backend.service), prepare `/var/log/lec` e habilite o serviço. A unidade já define o diretório de trabalho. A porta da API deve permanecer interna, acessada pelo Nginx do frontend na mesma origem.

[azure-pipelines.yml](azure-pipelines.yml) executa `mvn clean verify` e publica somente o JAR; frontend e backend mantêm versionamento e implantação independentes.

---

# <img src="https://img.shields.io/badge/Roadmap-Next_Steps-yellow?style=flat-square" alt="Próximos passos"> Próximos passos

- validar consultas e índices em uma cópia anonimizada dos bancos;
- homologar LDAPS, certificados e tempos limite;
- validar as diferenças conhecidas entre H2 e PostgreSQL em homologação;
- formalizar e versionar a matriz completa perfil × permissão dos módulos ainda não migrados;
- integrar os logs estruturados e métricas à plataforma corporativa.

</div>
