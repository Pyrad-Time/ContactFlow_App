# ContactFlow

ContactFlow é uma aplicação Full Stack no estilo CRM, desenvolvida para gerenciar contatos, oportunidades e histórico de interações.

O projeto foi criado como um MVP de portfólio com foco em práticas reais de desenvolvimento Full Stack, incluindo API REST, banco de dados relacional, dashboard com métricas, documentação de API e interface responsiva.

## Funcionalidades

- Cadastro, listagem, edição e exclusão de contatos
- Busca e filtros por nome, status e origem
- Página de detalhes do contato
- Registro e exclusão de interações por contato
- Dashboard com métricas gerais
- Gráficos de contatos por status e origem
- Listagem dos últimos contatos adicionados
- Listagem das últimas interações registradas
- Documentação da API com Swagger/OpenAPI
- Interface responsiva com CSS mobile-first

## Tecnologias

### Frontend

- React
- Vite
- JavaScript
- React Router
- CSS
- Recharts

### Backend

- Node.js
- Express
- PostgreSQL
- Docker
- SQL
- Swagger/OpenAPI

## Diferenciais Técnicos

- Aplicação Full Stack com integração completa entre frontend, backend e banco de dados
- Backend organizado em camadas, seguindo a estrutura `routes → controllers → repositories → database`
- Uso de PostgreSQL com SQL puro, sem ORM
- Modelagem relacional entre contatos e interações
- Uso de chave estrangeira com `ON DELETE CASCADE` para remover automaticamente interações vinculadas a um contato excluído
- Constraints no banco para limitar os valores permitidos de `status` e `source`
- Restrição de e-mail único para evitar contatos duplicados
- Trigger para atualização automática do campo `updated_at` ao editar um contato
- Dashboard consumindo dados reais da API
- Gráficos dinâmicos com Recharts para visualização de contatos por status e origem
- Documentação interativa da API com Swagger/OpenAPI
- Interface responsiva construída com CSS puro e abordagem mobile-first

## Arquitetura e Decisões Técnicas

O projeto foi organizado com separação de responsabilidades entre frontend, backend e banco de dados.

### Backend

O backend segue uma estrutura em camadas:

```txt
routes → controllers → repositories → database
```

### Routes

As rotas definem os endpoints da API e direcionam cada requisição para o controller responsável.

Principais grupos de rotas:

```txt
/api/contacts
/api/contacts/:id/interactions
/api/dashboard
```

### Controllers

Os controllers são responsáveis por receber as requisições, validar dados básicos, chamar os repositories e retornar as respostas para o frontend.

Responsabilidades principais:

- Receber parâmetros da URL
- Receber dados do corpo da requisição
- Validar campos obrigatórios
- Chamar a camada de repository
- Retornar respostas de sucesso ou erro
- Definir status HTTP adequados

### Repositories

Os repositories concentram a comunicação com o banco de dados.

Eles executam as queries SQL responsáveis por criar, buscar, atualizar e excluir dados.

Essa separação evita que regras de banco fiquem misturadas diretamente nas rotas ou controllers.

### Database

A camada de database é responsável por configurar a conexão com o PostgreSQL e disponibilizar o acesso ao banco para os repositories.

O projeto utiliza PostgreSQL com Docker e SQL puro, sem ORM.

## Banco de Dados

O banco de dados foi modelado com foco em contatos e histórico de interações.

### Tabela `contacts`

Armazena as principais informações dos contatos:

- Nome
- E-mail
- Telefone
- Empresa
- Cargo
- Origem
- Status
- Observações
- Data de criação
- Data de atualização

### Tabela `contact_interactions`

Armazena o histórico de interações relacionadas a cada contato.

Cada interação pertence a um contato específico através da coluna `contact_id`.

## Regras e Constraints do Banco

O banco possui regras para manter a consistência dos dados.

### Status permitidos

A coluna `status` aceita apenas valores definidos:

```txt
new
in_contact
client
partner
archived
```

### Origens permitidas

A coluna `source` aceita apenas valores definidos:

```txt
linkedin
whatsapp
instagram
referral
event
website
other
```

### E-mail único

A tabela de contatos possui restrição de e-mail único, evitando o cadastro duplicado do mesmo contato.

### Relacionamento entre contatos e interações

As interações possuem relacionamento com a tabela de contatos por meio de chave estrangeira.

Quando um contato é excluído, suas interações também são removidas automaticamente através de `ON DELETE CASCADE`.

## Trigger de Atualização

O banco possui uma trigger para atualizar automaticamente o campo `updated_at` sempre que um contato é alterado.

Isso permite registrar quando um contato foi modificado pela última vez sem precisar controlar essa atualização manualmente no frontend.

## Screenshots

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Lista de Contatos

![Contacts](./screenshots/contacts.png)

### Novo Contato

![New Contact](./screenshots/new-contact.png)

### Editar Contato

![Edit Contact](./screenshots/edit-contact.png)

### Detalhes do Contato

![Contact Details](./screenshots/contact-details.png)

### Documentação Swagger/OpenAPI

![Swagger Documentation](./screenshots/swagger-docs.png)

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Pyrad-Time/ContactFlow-App.git
cd ContactFlow-App
```

### 2. Configure o backend

Entre na pasta do backend:

```bash
cd back-end
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro de `back-end/`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/contactflow
PORT=3000
```

> Caso sua configuração do Docker utilize outra porta, ajuste o valor da `DATABASE_URL`.

Suba o banco de dados com Docker:

```bash
docker compose up -d
```

Rode o backend:

```bash
npm run dev
```

O backend ficará disponível em:

```txt
http://localhost:3000
```

A documentação da API estará disponível em:

```txt
http://localhost:3000/api-docs
```

### 3. Configure o frontend

Em outro terminal, volte para a raiz do projeto e entre na pasta do frontend:

```bash
cd front-end
```

Instale as dependências:

```bash
npm install
```

Rode o frontend:

```bash
npm run dev
```

O frontend ficará disponível em:

```txt
http://localhost:5173
```

## Dados de Demonstração

O projeto possui um arquivo de seed com dados fictícios para popular o banco e facilitar testes, demonstrações e screenshots.

Com o container do PostgreSQL rodando, execute:

```powershell
Get-Content .\back-end\database\seed.sql | docker exec -i contactflow_db psql -U postgres -d contactflow
```

Esse comando executa o arquivo `seed.sql` dentro do banco PostgreSQL do container Docker.

## Principais Endpoints

### Health Check

```txt
GET /health
GET /db-health
```

### Contatos

```txt
GET    /api/contacts
GET    /api/contacts/:id
POST   /api/contacts
PATCH  /api/contacts/:id
DELETE /api/contacts/:id
```

### Interações

```txt
GET    /api/contacts/:id/interactions
POST   /api/contacts/:id/interactions
DELETE /api/contacts/:id/interactions/:interactionId
```

### Dashboard

```txt
GET /api/dashboard
```

## Documentação da API

A API possui documentação interativa com Swagger/OpenAPI.

Após iniciar o backend, acesse:

```txt
http://localhost:3000/api-docs
```

Por essa página é possível visualizar:

- Endpoints disponíveis
- Parâmetros esperados
- Corpo das requisições
- Estrutura das respostas
- Possíveis erros da API

## Aprendizados

Durante o desenvolvimento deste projeto, pratiquei:

- Criação de API REST com Node.js e Express
- Organização do backend em rotas, controllers e repositories
- Integração com PostgreSQL usando SQL puro
- Relacionamento entre tabelas
- Uso de constraints no banco de dados
- Uso de trigger para atualização automática de data
- Consumo de API no React
- Formulários controlados
- Renderização condicional
- React Router
- Dashboard com dados dinâmicos
- Gráficos com Recharts
- Documentação de API com Swagger/OpenAPI
- CSS responsivo com abordagem mobile-first
- Versionamento com Git

## Status do Projeto

MVP concluído.

O projeto possui as principais funcionalidades funcionando:

- CRUD de contatos
- Histórico de interações
- Dashboard com métricas
- Gráficos
- Documentação da API
- Interface responsiva

## Melhorias Futuras

- Autenticação e autorização
- Migração para TypeScript
- Testes automatizados
- Melhor validação de dados
- Melhor tratamento de erros
- Paginação na lista de contatos
- Deploy do frontend e backend
- CI/CD
- Upload de imagem para contatos
- Sistema de lembretes ou follow-up
- Integração com WhatsApp ou e-mail

## Autor

Desenvolvido por Marcos Vinicius de Azevedo.