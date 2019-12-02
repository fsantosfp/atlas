'use strict';

// Import the core atlas application
const app = require('./app/index'); 

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Exports to firebase actions
exports.webhook = functions.https.onRequest(app);