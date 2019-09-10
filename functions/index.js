'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const intentMap = require('./src/intentMaping/intents.json');

app.intent(intentMap.intents,goTo);

function goTo(conv,params,permission){
	
	let intent = (conv.body.queryResult.intent.displayName).trim();
	let controller = require(`./src/controllers/${intentMap.callback[intent]}`);
	let conversation = controller.createConversation(intent , conv, params, permission);

	for (let i = 0; i < conversation.length; i++ ) {
		conv.ask(conversation[i]);
	}
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);