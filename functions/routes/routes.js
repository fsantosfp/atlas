 const express = require('express');
 const app = require('../app/index.js');

 const routes = express.Router();

 /*
 |--------------------------------------------------------------------------
 | FULFIMENT ROUTES
 |--------------------------------------------------------------------------
 |
 | Here is where you can register fulfilment routes for application.
 | Fulfillment is a method used for Dialogflow do request actions about many
 | intent of conversation.
 |
 */
routes.post('/fulfillment',app);

module.exports = routes;