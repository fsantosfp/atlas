'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client with debug.
const app = dialogflow({
    debug: true,
    clientId: "858718028532-em6c9hicc740gngas5k56r27aun3iaai.apps.googleusercontent.com",
});

// Import a json map file with all intents that has some business logical
const intentMap = require('./src/intentMaping/intents.json');

// Verify wich intent request then redirect to function "goTo()"
app.intent(intentMap.intents,goTo);

// This function bind a controller that has the logical business about teh intent request
// afteward sends a response to Dialogflow
function goTo(conv,params,paremeter){

	let intent = (conv.body.queryResult.intent.displayName).trim(); // Verify the intent name
	let controller = require(`./src/controllers/${intentMap.callback[intent]}`); // build a require controller
	let conversation = controller.createConversation(conv, params, paremeter); // make a conversation about intent

	// send responses to DialogFlow
	for (let i = 0; i < conversation.length; i++ ) {
		conv.ask(conversation[i]);
    }
}

//exports to firebase actions
exports.webhook = functions.https.onRequest(app);