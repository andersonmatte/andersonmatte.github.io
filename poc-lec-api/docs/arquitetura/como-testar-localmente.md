<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Testing-Local_Guide-0066cc?style=for-the-badge&logo=junit5&logoColor=white" alt="Guia de testes locais">

### Validação automatizada e manual do backend e do frontend

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
[![Maven](https://img.shields.io/badge/Maven-3.9+-orange?style=flat-square)](https://maven.apache.org/)
[![Node.js](https://img.shields.io/badge/Node.js-24_LTS-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Test_Scope-0066cc?style=flat-square" alt="Visão geral"> Visão geral

Este guia cobre três verificações diferentes:

1. testes automatizados do backend com H2;
2. testes automatizados e compilação do frontend;
3. teste manual integrado, com frontend, backend e bancos institucionais.

---

# <img src="https://img.shields.io/badge/Paths-Project_Directories-lightgrey?style=flat-square" alt="Diretórios"> Diretórios usados nos exemplos

```text
Backend:  C:\Users\ander\IdeaProjects\lec-novo-backend
Frontend: C:\Users\ander\WebstormProjects\lec-novo-frontend
```

Adapte os caminhos caso os projetos sejam movidos.

---

# <img src="https://img.shields.io/badge/Setup-Prerequisites-orange?style=flat-square" alt="Pré-requisitos"> Pré-requisitos

- JDK 21;
- Maven 3.9 ou superior;
- Node.js 24 LTS, ou no mínimo 22.12;
- npm 11 ou superior;
- acesso à rede ou VPN institucional para o teste com PostgreSQL e AD;
- tabelas existentes nos bancos `dblec` e `dbaghu`;
- três tabelas locais de acesso criadas no esquema existente `agendacirurgica` do `dblec` pelo script `V2__criar_gestao_local_acessos.sql`.

Confira as ferramentas:

```powershell
java -version
mvn -version
node --version
npm --version
```

---

# <img src="https://img.shields.io/badge/Step_1-Backend_&_H2-blue?style=flat-square" alt="Etapa 1"> 1. Testar somente o backend com H2

Os testes automatizados não precisam de PostgreSQL, VPN, Active Directory nem `application-external.properties`.

```powershell
Set-Location -LiteralPath 'C:\Users\ander\IdeaProjects\lec-novo-backend'
mvn clean verify
```

O perfil `teste` cria dois bancos H2 independentes em memória:

- `dblec`, simulando o banco de escrita;
- `dbaghu`, simulando o banco legado de leitura.

Ambos usam `MODE=PostgreSQL`. As estruturas são carregadas por:

```text
src/test/resources/banco/estrutura-dblec-teste.sql
src/test/resources/banco/estrutura-dbaghu-teste.sql
```

O resultado esperado é:

```text
Tests run: 48, Failures: 0, Errors: 0, Skipped: 0
BUILD SUCCESS
```

O comando também valida o contrato OpenAPI e gera:

```text
target/lec-novo-backend-0.1.0-SNAPSHOT.jar
```

Para executar somente uma classe durante o desenvolvimento:

```powershell
mvn -Dtest=AdministracaoAcessosControllerIntegrationTest test
```

H2 oferece velocidade e isolamento, mas não substitui a homologação das consultas, índices e desempenho no PostgreSQL institucional.

---

# <img src="https://img.shields.io/badge/Step_2-Frontend_Validation-61DAFB?style=flat-square&logo=react&logoColor=black" alt="Etapa 2"> 2. Testar somente o frontend

Os testes automatizados do frontend não exigem que o backend esteja iniciado.

```powershell
Set-Location -LiteralPath 'C:\Users\ander\WebstormProjects\lec-novo-frontend'
npm ci
npm test
npm run typecheck
npm run build
```

Resultados esperados:

- testes Vitest aprovados;
- TypeScript sem erros;
- artefato de produção criado em `dist/`.

Durante o desenvolvimento, os testes podem permanecer em observação:

```powershell
npm run test:watch
```

---

# <img src="https://img.shields.io/badge/Step_3-Database_Setup-336791?style=flat-square&logo=postgresql&logoColor=white" alt="Etapa 3"> 3. Preparar o banco para o teste integrado

O Hibernate está configurado com `ddl-auto=validate`: ele valida as tabelas, mas não cria nem altera o banco.

Antes da primeira inicialização, solicite ao DBA ou execute com uma credencial autorizada:

```text
src/main/resources/banco/migracao/V2__criar_gestao_local_acessos.sql
```

O script não cria um esquema novo e não modifica as tabelas existentes. Ele adiciona somente:

- `agendacirurgica.perfil`;
- `agendacirurgica.usuario`;
- `agendacirurgica.usuario_perfil`.

Execução segura pelo PowerShell, com uma credencial autorizada:

```powershell
Set-Location -LiteralPath 'C:\Users\ander\IdeaProjects\lec-novo-backend'
& psql `
  --host=172.17.62.16 `
  --port=5432 `
  --dbname=dblec `
  --username=SEU_USUARIO_DBLEC `
  --set=ON_ERROR_STOP=1 `
  --single-transaction `
  --file='src/main/resources/banco/migracao/V2__criar_gestao_local_acessos.sql'
```

Confira o resultado antes de iniciar a aplicação:

```sql
SELECT
    to_regclass('agendacirurgica.perfil'),
    to_regclass('agendacirurgica.usuario'),
    to_regclass('agendacirurgica.usuario_perfil');
```

O Flyway deve continuar desabilitado durante esse teste, salvo autorização e estratégia de migração previamente definidas.

---

# <img src="https://img.shields.io/badge/Step_4-Backend_Configuration-green?style=flat-square" alt="Etapa 4"> 4. Configurar o backend para o teste manual

Crie `application-external.properties` no diretório a partir do qual o backend será iniciado. Não versione esse arquivo.

Exemplo mínimo para desenvolvimento local com bancos reais e sem validar temporariamente a senha no AD:

```properties
spring.profiles.active=desenvolvimento-sem-ad

lec.fontes-dados.dblec.url=jdbc:postgresql://172.17.62.16:5432/dblec
lec.fontes-dados.dblec.usuario=SEU_USUARIO_DBLEC
lec.fontes-dados.dblec.senha=SUA_SENHA_DBLEC
lec.fontes-dados.dblec.tamanho-maximo-pool=5
lec.fontes-dados.dblec.minimo-ocioso=1
lec.fontes-dados.dblec.somente-leitura=false

lec.fontes-dados.dbaghu.url=jdbc:postgresql://172.17.62.46:5432/pgh-sem-hist
lec.fontes-dados.dbaghu.usuario=SEU_USUARIO_DBAGHU
lec.fontes-dados.dbaghu.senha=SUA_SENHA_DBAGHU
lec.fontes-dados.dbaghu.tamanho-maximo-pool=5
lec.fontes-dados.dbaghu.minimo-ocioso=1
lec.fontes-dados.dbaghu.somente-leitura=true

lec.seguranca.origem-perfis=legado
lec.seguranca.cookie-csrf-seguro=false
server.servlet.session.cookie.secure=false

lec.flyway.habilitado=false
lec.flyway.esquema=agendacirurgica
lec.flyway.criar-baseline=false

lec.observabilidade.ambiente=local
lec.observabilidade.chave-pseudonimizacao=chave-local-de-teste-com-mais-de-32-caracteres
logging.level.root=WARN
logging.level.br.gov.hubrasil.lec=INFO
```

Cuidados:

- `desenvolvimento-sem-ad` ignora somente a validação da senha;
- a senha digitada precisa ter algum valor;
- com `origem-perfis=legado`, o usuário e o vínculo ainda precisam estar ativos no `dbaghu`, e os perfis ativos encontrados são carregados;
- com `origem-perfis=local`, o usuário e ao menos um de seus perfis precisam estar ativos no `dblec`;
- esse perfil nunca deve ser usado em homologação ou produção;
- cookies seguros precisam ficar `false` somente porque o teste local usa HTTP;
- não alterne entre `localhost` e `127.0.0.1` durante a mesma sessão, pois cookies pertencem ao nome do host;
- não configure arquivo de log de produção em `/var/log` durante o teste no Windows.

## Origem dos perfis

Use inicialmente:

```properties
lec.seguranca.origem-perfis=legado
```

Nesse modo, acesso e perfis são consultados nas tabelas `casca` e `agh`. Ele permite que `SUPER` ou `ADMINLEC` acesse a tela **Administração → Migrar Usuários AGHU**.

Depois de migrar e conferir os usuários locais, teste a nova gestão alterando para:

```properties
lec.seguranca.origem-perfis=local
```

Reinicie o backend após alterar o arquivo. Nesse modo, a senha continua sendo validada pelo AD no perfil padrão, mas acesso e perfis vêm de `agendacirurgica.usuario`, `agendacirurgica.perfil` e `agendacirurgica.usuario_perfil`.

---

# <img src="https://img.shields.io/badge/Step_5-Start_Backend-success?style=flat-square" alt="Etapa 5"> 5. Iniciar o backend

## Opção A — Maven

Com `application-external.properties` na raiz do backend:

```powershell
Set-Location -LiteralPath 'C:\Users\ander\IdeaProjects\lec-novo-backend'
mvn spring-boot:run
```

## Opção B — JAR

```powershell
Set-Location -LiteralPath 'C:\Users\ander\IdeaProjects\lec-novo-backend'
mvn clean package
java -jar '.\target\lec-novo-backend-0.1.0-SNAPSHOT.jar'
```

O arquivo externo é procurado em `./application-external.properties`, relativo ao diretório atual. Se o JAR for copiado para outro diretório, copie também o arquivo externo e execute o comando a partir daquele diretório.

Não feche esse terminal enquanto estiver testando o frontend.

---

# <img src="https://img.shields.io/badge/Step_6-Backend_Check-success?style=flat-square" alt="Etapa 6"> 6. Confirmar o backend

Em outro PowerShell:

```powershell
Invoke-RestMethod -Uri 'http://localhost:8080/actuator/health'
```

Resposta esperada:

```text
status
------
UP
```

Documentação disponível:

- Swagger UI: `http://localhost:8080/swagger-ui.html`;
- OpenAPI JSON: `http://localhost:8080/v3/api-docs`;
- OpenAPI YAML: `http://localhost:8080/v3/api-docs.yaml`.

O Swagger UI permite consultar o contrato e executar operações que não exigem CSRF. Na configuração atual, o cookie CSRF é `HttpOnly`, portanto a interface não consegue copiá-lo automaticamente para o cabeçalho. Para validar autenticação e operações mutáveis, use o frontend integrado ou um cliente HTTP que preserve os cookies, obtenha `nomeCabecalho` e `token` em `GET /api/autenticacao/csrf` e envie o cabeçalho retornado.

---

# <img src="https://img.shields.io/badge/Step_7-Integrated_Frontend-61DAFB?style=flat-square&logo=react&logoColor=black" alt="Etapa 7"> 7. Iniciar o frontend integrado

Com o backend disponível na porta 8080:

```powershell
Set-Location -LiteralPath 'C:\Users\ander\WebstormProjects\lec-novo-frontend'
npm ci
npm run dev
```

Acesse sempre pelo mesmo endereço durante a sessão:

```text
http://127.0.0.1:5173
```

O Vite encaminha `/api` e `/actuator` para `http://localhost:8080`. O navegador permanece na mesma origem do frontend; não é necessário habilitar CORS.

No perfil `desenvolvimento-sem-ad`, informe:

- um login institucional com acesso ativo à LEC;
- qualquer senha não vazia.

No perfil padrão, use a senha real do Active Directory.

---

# <img src="https://img.shields.io/badge/Step_8-Manual_Checklist-purple?style=flat-square" alt="Etapa 8"> 8. Roteiro de validação manual

## Sessão e segurança

- autenticar e confirmar nome e perfis exibidos;
- atualizar a página e verificar que a sessão permanece ativa;
- sair e confirmar que uma rota protegida volta para a autenticação;
- confirmar que chamadas mutáveis sem CSRF recebem `403`;
- testar somente com dados e credenciais autorizados.

## Navegação e rotas

- clicar no logotipo da LEC e confirmar o retorno à página inicial;
- acessar uma rota inexistente e confirmar a página `404`;
- com um perfil sem administração, forçar `/modulos/perfis` e confirmar a página `403`;
- sem sessão, tentar uma URL funcional e confirmar que o conteúdo protegido não é montado.

## Lista de espera

- pesquisar por nome e especialidade;
- criar uma lista;
- alterar a lista e conferir o incremento de versão;
- testar as validações de duplicidade e de pacientes aguardando;
- executar a exclusão lógica com um perfil autorizado.

## Relatório de publicação

- selecionar especialidade, lista de espera ou ambas;
- gerar o PDF;
- conferir ordenação, SWALIS e anonimização;
- confirmar que nome, CPF e prontuário brutos não aparecem no contrato JSON.

## Administração

- confirmar que somente `SUPER` e `ADMINLEC` recebem Usuários, Perfis e Migrar Usuários AGHU no menu;
- cadastrar e alterar perfil;
- cadastrar usuário e associar perfis ativos;
- migrar usuários selecionados do AGHU;
- alternar para `origem-perfis=local` e validar o acesso migrado;
- inativar um usuário local e confirmar o encerramento da sessão na requisição seguinte.

---

# <img src="https://img.shields.io/badge/Step_9-Active_Directory-0078D4?style=flat-square&logo=microsoft&logoColor=white" alt="Etapa 9"> 9. Testar com Active Directory real

Para validar o AD, remova:

```properties
spring.profiles.active=desenvolvimento-sem-ad
```

E configure:

```properties
lec.seguranca.diretorio.dominio=ebserhnet.ebserh.gov.br
lec.seguranca.diretorio.url=ldaps://SERVIDOR_AD/
lec.seguranca.diretorio.tempo-conexao-ms=5000
lec.seguranca.diretorio.tempo-resposta-ms=5000
```

Use somente uma URL LDAP ou LDAPS válida. Não inclua o nome da propriedade dentro do valor. Exemplo incorreto:

```text
lec.seguranca.diretorio.url=lec.seguranca.diretorio.url=ldap://servidor/
```

Em LDAPS, o certificado da autoridade emissora precisa ser confiável para a JVM.

---

# <img src="https://img.shields.io/badge/Support-Troubleshooting-yellow?style=flat-square" alt="Solução de problemas"> 10. Problemas comuns

| Sintoma | Verificação |
|---|---|
| A inicialização parece parada | Aguarde a abertura dos dois pools. Verifique VPN, DNS, host, porta e tempo limite dos bancos. |
| `Connection refused` ou tempo limite | Confirme conectividade com `dblec` e `dbaghu`, firewall e credenciais. |
| Erro de validação de esquema | Execute o script autorizado e confira esquemas, tabelas e tipos esperados. Hibernate não cria as tabelas. |
| Login retorna `401` no modo sem AD | No modo legado, confira usuário e vínculo ativos; no modo local, confira usuário e ao menos um perfil ativo. |
| Operação retorna `403` | Confira perfil, cookie de sessão e token CSRF. Em HTTP local, os dois cookies seguros devem estar desabilitados. |
| Frontend informa falha de rede | Confirme o backend em `localhost:8080` e o proxy de `vite.config.ts`. |
| Porta 8080 ou 5173 ocupada | Encerre o processo anterior ou altere conscientemente a configuração dos dois lados. |
| IntelliJ não reconhece código Lombok | Reimporte o Maven e confirme suporte ao Lombok e processamento de anotações na IDE. O Maven já configura o processador explicitamente. |
| Swagger abre, mas autenticação ou escrita falha com `403` | O Swagger não lê o cookie CSRF `HttpOnly`; use o frontend ou um cliente que envie no cabeçalho o token devolvido por `GET /api/autenticacao/csrf`. |

---

# <img src="https://img.shields.io/badge/Finish-Cleanup-lightgrey?style=flat-square" alt="Encerramento"> Encerramento

Pare os processos com `Ctrl+C` nos respectivos terminais. Os bancos H2 dos testes são descartados automaticamente; os testes manuais com PostgreSQL alteram dados reais e devem usar registros autorizados para desenvolvimento ou homologação.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
