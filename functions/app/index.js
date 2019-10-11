'use strict';

const { dialogflow } = require('actions-on-google');
const intentMap = require('./mapping/intents.json');
const config = require('../config/services.json');
const FactoryController = require('./controller/FactoryController');
const ParseIntent = require('./middleware/ParseIntent');

// Instantiate the Dialogflow client with debug.
const app = dialogflow({
    debug: config.Dialogflow.debug,
	clientId: config.Dialogflow.clientId
});

// Verify wich intent request then redirect to function "goTo()"
app.intent(intentMap.intents,goTo);

// This function bind a controller that has the logical business about teh intent request
// afteward sends a response to Dialogflow
/**
 * @parameters = data[0];
 * @argumentsParsed = data[1];
 * @argumentsStatu = data[2];
 */
async function goTo(conv,...data){
    
    // Verify the intent name
    let intent = (conv.intent).trim();
    
    // Build a require controller
    let controller = new FactoryController(intentMap.callback[intent], conv);
    
    //get paramenters from Dialogflow
    let parser = new ParseIntent(data); 
    
    // Make a conversation about intent
    //let chat = await controller.chat(conv,params,paremeter);

    let chat = await controller.chat(intent, parser.getParameter());
    
    // send responses to DialogFlow
	for (let i = 0; i < chat.length; i++ ) {
		conv.ask(chat[i]);
    }

}

module.exports = app;