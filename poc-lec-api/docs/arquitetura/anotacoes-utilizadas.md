<div style="background-color: #eaedf3; padding: 20px; border-radius: 10px;">

<div align="center">

# <img src="https://img.shields.io/badge/Documentation-Annotations-0066cc?style=for-the-badge&logo=springboot&logoColor=white" alt="Anotações da LEC Nova API">

### Referência das anotações utilizadas no backend e nos testes

[![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.1-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
![Status](https://img.shields.io/badge/Status-Atualizado-success?style=flat-square)
![License](https://img.shields.io/badge/License-Interno-lightgrey?style=flat-square)

</div>

---

# <img src="https://img.shields.io/badge/Overview-Reference-0066cc?style=flat-square" alt="Visão geral"> Visão geral

Este documento descreve as anotações presentes no código do backend, sua finalidade e os cuidados adotados na POC. O inventário contempla o código de produção e os testes automatizados.

---

# <img src="https://img.shields.io/badge/Principles-Guidelines-blue?style=flat-square" alt="Princípios"> Princípios adotados

- anotações devem reduzir infraestrutura repetitiva, sem ocultar regras de negócio;
- injeção de dependências é feita preferencialmente por construtor;
- entidades JPA não usam `@Data` nem setters automáticos;
- autorização real é aplicada pelo Spring Security; anotações OpenAPI apenas documentam o contrato;
- Hibernate valida o mapeamento, mas não cria nem altera tabelas;
- records continuam sendo usados para contratos e modelos imutáveis, sem Lombok.

---

# <img src="https://img.shields.io/badge/Spring-Configuration-6DB33F?style=flat-square&logo=spring&logoColor=white" alt="Spring"> Inicialização, configuração e componentes Spring

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@SpringBootApplication` | Spring Boot | Marca a classe principal, habilita autoconfiguração e varredura de componentes a partir de `br.gov.hubrasil.lec`. |
| `@Configuration` | Spring | Declara uma classe de configuração que fornece componentes ao contêiner. Na POC é usada para fontes de dados, segurança, OpenAPI, Flyway controlado e relógio com fuso horário institucional. |
| `@Bean` | Spring | Registra no contêiner o objeto retornado por um método, como `DataSource`, `JdbcClient`, filtros e componentes de teste. |
| `@ConfigurationProperties` | Spring Boot | Vincula um grupo de propriedades externas a uma classe tipada, evitando leitura manual de cada chave. |
| `@ConditionalOnProperty` | Spring Boot | Só cria a configuração quando uma propriedade possui o valor esperado. É usada para manter o Flyway desabilitado por padrão. |
| `@Profile` | Spring | Ativa uma implementação apenas em determinados perfis, como o autenticador explícito de `desenvolvimento-sem-ad`. |
| `@Component` | Spring | Registra uma classe de infraestrutura ou apoio como componente gerenciado. |
| `@Service` | Spring | Identifica serviços que concentram casos de uso e regras de negócio. |
| `@Repository` | Spring | Identifica implementações de persistência e habilita tradução das exceções de banco para a hierarquia do Spring. |
| `@Primary` | Spring | Define qual implementação deve ser escolhida quando existem vários componentes do mesmo tipo. O `dblec` é a fonte primária. |
| `@Qualifier` | Spring | Seleciona explicitamente um componente pelo nome, especialmente para distinguir `dblec` e `dbaghu`. |
| `@Value` | Spring | Injeta um valor ou recurso configurado em um ponto específico. É reservado para valores isolados; grupos de propriedades usam `@ConfigurationProperties`. |
| `@Order` | Spring | Define a precedência de componentes ordenáveis, como filtros ou tratadores. |
| `@Autowired` | Spring | Solicita injeção pelo contêiner. Em `CadastroFilaService`, identifica o construtor usado pelo Spring porque existe um segundo construtor, com relógio controlável, destinado aos testes. |

---

# <img src="https://img.shields.io/badge/API-REST_&_Errors-blue?style=flat-square" alt="API REST"> API REST e tratamento de erros

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@RestController` | Spring MVC | Declara um controller REST; o retorno dos métodos é serializado diretamente na resposta HTTP. |
| `@RequestMapping` | Spring MVC | Define o caminho base de um controller e, quando necessário, características comuns da rota. |
| `@GetMapping` | Spring MVC | Mapeia uma operação HTTP `GET`, destinada a consultas. |
| `@PostMapping` | Spring MVC | Mapeia uma operação HTTP `POST`, usada para autenticação, inclusão, migração ou geração. |
| `@PutMapping` | Spring MVC | Mapeia uma operação HTTP `PUT`, usada para atualização integral do contrato informado. |
| `@DeleteMapping` | Spring MVC | Mapeia uma operação HTTP `DELETE`, usada na exclusão lógica de lista de espera. |
| `@RequestParam` | Spring MVC | Obtém um parâmetro da URL, incluindo filtros, paginação e versão. Valores padrão e obrigatoriedade ficam visíveis na assinatura. |
| `@PathVariable` | Spring MVC | Obtém um identificador presente no caminho, como `/usuarios/{id}`. |
| `@RequestBody` | Spring MVC | Converte o JSON recebido para o DTO declarado no parâmetro. |
| `@RestControllerAdvice` | Spring MVC | Centraliza o tratamento de exceções produzidas por um conjunto de controllers. |
| `@ExceptionHandler` | Spring MVC | Associa uma exceção a um método que produz a resposta HTTP, normalmente um `ProblemDetail`. |

---

# <img src="https://img.shields.io/badge/Validation-Input-success?style=flat-square" alt="Validação"> Validação de entrada

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@Valid` | Jakarta Validation | Solicita a validação recursiva do DTO recebido antes da execução do controller. |
| `@NotNull` | Jakarta Validation | Impede valor nulo em um campo obrigatório. |
| `@NotBlank` | Jakarta Validation | Exige texto não nulo, não vazio e com algum caractere diferente de espaço. |
| `@NotEmpty` | Jakarta Validation | Exige coleção, mapa, vetor ou texto com ao menos um elemento. |
| `@Size` | Jakarta Validation | Restringe tamanho mínimo ou máximo de texto ou coleção. |
| `@Email` | Jakarta Validation | Verifica o formato básico do endereço eletrônico informado. |
| `@PositiveOrZero` | Jakarta Validation | Aceita somente números maiores ou iguais a zero, como a versão usada na exclusão. |

As anotações validam o formato do contrato. Regras que dependem do estado do banco, como duplicidade, perfil ativo ou preservação do último administrador, permanecem nos serviços.

---

# <img src="https://img.shields.io/badge/Security-Authorization-red?style=flat-square" alt="Segurança"> Segurança

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@EnableMethodSecurity` | Spring Security | Habilita autorização em métodos por meio de anotações como `@PreAuthorize`. |
| `@PreAuthorize` | Spring Security | Avalia a permissão antes de executar o método ou controller. É a proteção efetiva dos cadastros administrativos e das operações de lista de espera. |

Expressões como `@permissaoAdministracao.podeAdministrar(authentication)` dentro de `@PreAuthorize` referenciam um componente Spring. Não são novas anotações: são expressões SpEL avaliadas pelo Spring Security.

CSRF, sessão, cookies e rotas autenticadas são configurados em `SegurancaConfig`; não dependem de uma anotação no controller.

---

# <img src="https://img.shields.io/badge/Persistence-JPA_&_Transactions-59666C?style=flat-square&logo=hibernate&logoColor=white" alt="Persistência"> Persistência JPA e transações

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@Entity` | Jakarta Persistence | Declara uma classe persistente. Somente `FilaCadastro`, `IndicacaoCirurgica`, `Perfil` e `Usuario` são entidades. |
| `@Table` | Jakarta Persistence | Informa tabela e esquema correspondentes à entidade. |
| `@Id` | Jakarta Persistence | Identifica a chave primária. |
| `@GeneratedValue` | Jakarta Persistence | Define que o identificador é gerado pelo banco, usando identidade nas tabelas novas. |
| `@Column` | Jakarta Persistence | Mapeia o campo para uma coluna e registra restrições estruturais como nome, nulidade e tamanho. |
| `@Version` | Jakarta Persistence | Implementa bloqueio otimista; uma atualização concorrente com versão antiga é recusada. |
| `@ManyToMany` | Jakarta Persistence | Representa a associação de vários usuários com vários perfis. O carregamento permanece `LAZY`. |
| `@JoinTable` | Jakarta Persistence | Define a tabela técnica `usuario_perfil` usada pela associação. |
| `@JoinColumn` | Jakarta Persistence | Define as colunas estrangeiras presentes na tabela de associação. |
| `@EntityGraph` | Spring Data JPA | Solicita o carregamento controlado de uma associação para uma consulta específica, evitando acesso tardio fora da transação. |
| `@Query` | Spring Data JPA | Declara uma consulta JPQL explícita no repositório. Valores externos nunca são concatenados na consulta. |
| `@Param` | Spring Data | Associa o parâmetro Java ao parâmetro nomeado de uma consulta. |
| `@Transactional` | Spring | Define o limite transacional do caso de uso. Consultas usam `readOnly = true`; alterações usam a transação padrão. |

As consultas especializadas do `dbaghu` continuam em JDBC com parâmetros nomeados. Por isso, suas projeções não recebem anotações JPA.

---

# <img src="https://img.shields.io/badge/OpenAPI-Documentation-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="OpenAPI"> Documentação OpenAPI

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@OpenAPIDefinition` | Swagger/OpenAPI | Define informações gerais e tags do contrato da API. |
| `@Info` | Swagger/OpenAPI | Informa título, versão e descrição dentro de `@OpenAPIDefinition`. |
| `@Tag` | Swagger/OpenAPI | Agrupa operações por assunto no Swagger UI. |
| `@SecurityScheme` | Swagger/OpenAPI | Documenta o cookie `SESSAOLEC` como mecanismo de sessão. |
| `@Operation` | Swagger/OpenAPI | Define `operationId` estável e resumo de cada endpoint. |
| `@ApiResponse` | Swagger/OpenAPI | Documenta um código de resposta e seu significado. |
| `@ApiResponses` | Swagger/OpenAPI | Agrupa várias declarações `@ApiResponse` de uma operação. |
| `@SecurityRequirement` | Swagger/OpenAPI | Informa no contrato que a operação exige a sessão LEC. Não concede nem verifica permissão. |

`@SecurityRequirement` é apenas documentação. A exigência real da sessão vem de `SegurancaConfig`, e a autorização por perfil vem de `@PreAuthorize`.

---

# <img src="https://img.shields.io/badge/Java-Lombok-orange?style=flat-square&logo=openjdk&logoColor=white" alt="Java e Lombok"> Lombok e Java

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@Getter` | Lombok | Gera somente os métodos de leitura das entidades. Pode ser desabilitado em um campo com `@Getter(AccessLevel.NONE)` quando existe uma implementação defensiva. |
| `@NoArgsConstructor` | Lombok | Gera o construtor sem argumentos exigido pelo JPA, com acesso `PROTECTED`. |
| `@RequiredArgsConstructor` | Lombok | Gera o construtor para campos `final`, reduzindo código repetitivo de injeção em controllers, serviços e componentes simples. |
| `@Accessors` | Lombok | Mantém getters fluentes, como `fila.nome()`, compatíveis com o estilo dos records e com a API já existente. |
| `@Override` | Java | Confirma que um método sobrescreve ou implementa um método declarado no tipo pai. O compilador acusa assinaturas incompatíveis. |

O Lombok atua somente durante a compilação, está configurado como processador de anotações e é excluído do JAR executável. Não são usados `@Data`, `@Setter`, `@EqualsAndHashCode` ou `@ToString` nas entidades.

---

# <img src="https://img.shields.io/badge/Tests-Annotations-success?style=flat-square" alt="Testes"> Anotações exclusivas ou recorrentes nos testes

| Anotação | Origem | Uso na POC |
|---|---|---|
| `@Test` | JUnit 5 | Marca um método como caso de teste. |
| `@BeforeEach` | JUnit 5 | Executa a preparação antes de cada caso de teste. |
| `@AfterEach` | JUnit 5 | Executa a limpeza após cada caso de teste. |
| `@SpringBootTest` | Spring Test | Inicializa o contexto completo da aplicação para o teste de integração. |
| `@ActiveProfiles("teste")` | Spring Test | Ativa as configurações H2 e demais propriedades seguras de teste. |
| `@Import` | Spring Test | Inclui uma configuração de apoio específica no contexto do teste. |
| `@TestConfiguration` | Spring Boot Test | Declara componentes disponíveis somente durante os testes. |
| `@Autowired` | Spring Test | Injeta no teste componentes criados pelo contexto, como `WebApplicationContext` e repositórios. |
| `@Bean` | Spring | Cria substitutos ou componentes de apoio dentro da configuração de teste. |
| `@Primary` | Spring | Faz o substituto de teste prevalecer sobre uma implementação normal do mesmo contrato. |
| `@Qualifier` | Spring | Seleciona uma das duas fontes de dados ou outro componente nomeado durante o teste. |
| `@Override` | Java | Garante a implementação correta de contratos usados pelos repositórios de teste. |

Mockito é usado programaticamente nos testes unitários; atualmente não há dependência de anotações como `@Mock` ou `@InjectMocks`.

---

# <img src="https://img.shields.io/badge/References-Project_Files-purple?style=flat-square" alt="Referências"> Referências no projeto

- entidades JPA: `src/main/java/br/gov/hubrasil/lec/entidade`;
- records e modelos imutáveis: `src/main/java/br/gov/hubrasil/lec/modelo`;
- contratos REST: `src/main/java/br/gov/hubrasil/lec/dto`;
- configuração de segurança: `src/main/java/br/gov/hubrasil/lec/security/SegurancaConfig.java`;
- configuração OpenAPI: `src/main/java/br/gov/hubrasil/lec/config/DocumentacaoApiConfig.java`;
- testes de integração: `src/test/java/br/gov/hubrasil/lec/controller`.

---

<div align="center">

[![Voltar ao README](https://img.shields.io/badge/Documentation-Voltar_ao_README-0066cc?style=flat-square)](/)

</div>

</div>
