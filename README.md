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
Crie um projeto no [DialogFlow] (https://console.dialogflow.com), no menu lateral vá em "**Integration**" e escolha a opção "**Google Assistant > Integration Settings", vincule ao seu projeto criado no Google Actions.

### Instalando Firebase Tools
Instale o firebase-tools, `nmp -g install firebase-tools`, faça o login através do `firebase login`.

## WEBHOOK
Baixe ou clone projeto de webhook
[Link Webhook] (https://github.com/fsantosfp/dialogWebhook.git)
`git clone https://github.com/fsantosfp/dialogWebhook.git`,
rode o `npm install` na pasta **functions** para instalar as dependências.


## CONSIDERAÇÕES
Este projeto é apenas um teste de possibilidades para genrenciamentos de rotas, de acordo com as intents enviadas ao webhook hospedado em um servidor externo ao invés de utilizar Inline Editor.



