'use strict';

const { dialogflow } = require('actions-on-google');
const intentMap = require('./mapping/intents.json');
const FactoryController = require('./controller/FactoryController');
const ParseParameters = require('./middleware/dialogflow/parser/ParseParameters');
const Config = require('../config/Config'); 

const app = dialogflow({
    debug: Config.Services.Dialogflow.debug,
	clientId: Config.Services.Dialogflow.clientId
});

// Verify wich intent request then redirect to function "goTo()"
app.intent(intentMap.intents,goTo);

// This function bind a controller that has the logical business about teh intent request
// afteward sends a response to Dialogflow

async function goTo(conv,...data){
    // UTILIZAR CONV.ACTION COMO PARAMETRO de METHODO A SER EXECUTADO EM UM CONTROLLER
    // Verify the intent name
    let intent = (conv.intent).trim();
    let action = (conv.action).trim();
    
    // Build a require controller
    let controller = new FactoryController(intentMap.callback[intent], conv);
    
    //get paramenters from Dialogflow
    let parser = new ParseParameters(data); 
    
    // Make a conversation about intent
    //let chat = await controller.chat(conv,params,paremeter);

    let chat = await controller.chat(action, parser.getParameter());
    // send responses to DialogFlow
	for (let i = 0; i < chat.length; i++ ) {
		conv.ask(chat[i]);
    }

}

module.exports = app;