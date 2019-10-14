# Atlas

Este é simples teste de webhook em NodeJs, que gerencia as "Intents" do DialogFlow através do "Fufillment".

## Requisitos

* Actions Google
* DialogFlow
* Firebase Tools
* NodeJS

## SETUP

### Criando uma Action
Crie um projeto no [Actions Google] (https://console.actions.google.com/), escolha a opção "**Conversational**", crie uma "**Action**" e selecione a opção "**Custom Intent**".

### Integrando DialogFlow com Google Assisten
Crie um projeto no [DialogFlow] (https://console.dialogflow.com), no menu lateral vá em "**Integration**" e escolha a opção "**Google Assistant > Integration Settings**", vincule ao seu projeto criado no Google Actions.

### Instalando Firebase Tools
Instale o firebase-tools, `nmp -g install firebase-tools`, faça o login através do `firebase login`.

## WEBHOOK
Baixe ou clone projeto de webhook
[Link Webhook] (https://github.com/fsantosfp/dialogWebhook.git)
`git clone https://github.com/fsantosfp/dialogWebhook.git`,
rode o `npm install` na pasta **functions** para instalar as dependências.

# GUIDE

## Estrutura
Este projeto está estruturado da seguinte forma:
- [functions](#functions)
    - [app](#app)
    - [config](#config)
    - [enviroment](#enviroment)
    - node_modules
    - [routes](#routes)
    - [test](#test)
    - [index.js](#index)

### functions
Esta pasta é essencial para o Firebase Functions, toda a aplicação deve ficar dentro desta pasta.
Caso vá utilizar o webhook em um projeto separado para testes não esqueça de incluir o **.firebaserc** no **.gitignore** para que evitar que o deploy seja feito no projeto errado.

### app
Nesta pasta deve ficar todo o core da aplicação. Onde temos:
- [Controller](#controller)
- [Mapping](#mapping)
- [Middleware](#middleware)
- [Model](#model)
- [Repository](#repository)
- [Service](#service)

#### Controller
Responsável por gerenciar as regras de negócios da aplicação.
O nome das funções de um controller representa uma determinada ação de uma determina intenção/intent. Ex:

Intenção
- Fazer Login `AuthController`

- Ações
    - Solicitar Acesso - `signIn()`
    - Validar Acesso - `signInConfirmation()`

Por isso o nome da função deve ser o mesmo nome utilizado na intent do Dialogflow

#### Mapping
Funciona como uma **Rota** de intenções, e neste arquivo onde mapeamos para qual **controller** uma determinada **inteção** deve ser direcionada.


#### Middleware
Responsável por pequenos serviços utilizados entre a aplicação e outros serviços externos ou não.
Ex: 
- Realizar uma autenticação de usuário
- Realizar conexão com Banco de dados, etc ...

#### Model
Nesta pasta alocamos os DAO (Data Access Object), que cuidará de toda regra de acesso aos dados **(QUERY)** de um determinado objeto ex: Usários.

#### Repository
Se trata de abstração para requisições de banco de dados, esta camada não sabe nada sobre como as requisições (QUERY) são feitas ela apesa requisita de forma abstrata.

#### Repository
Responsável por gerenciar os serviços externos que a aplicação utlizará como por exemplo Google Analitics, Facebook, etc ...

### Config
Nesta pasta fica toda a parte de configuração da plataforma como por exemplo chaves de configuração do banco de dados, e contas do firebase. Todos os valores ficam armazenados em um **.env**.

Obs: Para configurar seu ambiente de desenvolvimento basta alterar o arquivo **sample-config.env** para **config.env** e preencher as variáveis com as informações necessárias. (Não esqueça de incluir seu **config.env** no **.gitignore**)

O arquivo **sample-config.env** deve ser traqueado, e sempre que for necessário uma variável de configuração nova inclua neste aquivo. 

### Enviroment
Nesta pasta temos um server configurado para que possa ser feitos teste de forma local, sem a necessidade de fazer deploy a toda alteração feita na aplicação.

Para rodar localmente basta executar `npm run local`.

### Routes
Apesar de aplicação possuir atualmente uma unica rota de acesso, é aqui que estamos organizando as rotas para aplicação.

### Test
Aqui ficam os arquivos de teste automatizados quem devem ser feitos afim de validar todo o código desenvolvido. Por padrão utilizaremos a seguinte nomenclatura ***UnidadeTestada.test.js*** ex: ***SignIn.test.js***

Para rodar os teste após instalar todas as dependencias, basta executar `npm run test`.

Para mais detalhes sobre como realizar teste segue algumas matérias sobre mocha e chai.
**Document Mocha Framework** https://mochajs.org
**Document Chai Framework** https://www.chaijs.com/
**Medium** https://codeburst.io/javascript-unit-testing-using-mocha-and-chai-1d97d9f18e71

#### CONSIDERAÇÕES
Este projeto é apenas um teste de possibilidades para genrenciamentos de rotas, de acordo com as intents enviadas ao webhook hospedado em um servidor externo ao invés de utilizar Inline Editor.



