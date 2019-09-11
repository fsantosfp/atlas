'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client with debug.
const app = dialogflow({debug: true});

// Import a json map file with all intents that has some business logical
const intentMap = require('./src/intentMaping/intents.json');

// Verify wich intent request then redirect to function "goTo()"
app.intent(intentMap.intents,goTo);


// This function bind a controller that has the logical business about teh intent request
// afteward sends a response to Dialogflow
function goTo(conv,params,permission){

	let intent = (conv.body.queryResult.intent.displayName).trim(); // Verify the intent name
	let controller = require(`./src/controllers/${intentMap.callback[intent]}`); // build a require controller
	let conversation = controller.createConversation(intent , conv, params, permission); // make a conversation about intent

	// send responses to DialogFlow
	for (let i = 0; i < conversation.length; i++ ) {
		conv.ask(conversation[i]);
	}
}

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);