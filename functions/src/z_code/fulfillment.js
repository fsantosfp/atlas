// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const md5 = require('md5');

// Firebase
const firebase = require('firebase-admin');
firebase.initializeApp({
	credential: firebase.credential.applicationDefault(),
    databaseURL: 'https://atlas-jgweik.firebaseio.com/'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }

  // Cadastrar no banco de dados
  //function mensagem_enviar(agent) {
  //	var newKey = firebase.database().ref().child('mensagens').push().key;
  //  firebase.database().ref('mensagens/'+newKey).set({
  //  	assunto: agent.parameters['assunto-mensagem'],
  //    	texto: agent.parameters['texto-mensagem'],
  //  });
  //  agent.add('Sua mensagem foi devidamente registrada!');
  //}

  // Consultar no banco de dados
  //function mensagem_ler(agent) {
  //  return firebase.database().ref('/mensagens').once('value').then(function(snapshot) {
  //  	snapshot.forEach(function(data) {
  //        	agent.add('Assunto: '+data.child('assunto').val());
  //        	agent.add('Mensagem: '+data.child('texto').val());
  //        	agent.add('-----x-----');
  //      });
  //  });
  //}

  // CADASTRAR CAMPANHA
    function nova_campanha(agent) {
        let email_usuario = 'clebertsilva28@gmail.com';
        let idUsuario = md5(email_usuario);
        let idCampanha = agent.parameters['id-campanha'];
        firebase.database().ref(idUsuario+'/'+idCampanha).set({
            '12-9-2019': {
                ga: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                fb: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                it: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
            },
            '11-9-2019': {
                ga: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                fb: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                it: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
            },
            '10-9-2019': {
                ga: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                fb: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
        
                it: {
                    conversoes: 1398,
                    impressoes: 2465,
                },
            },
        });
        agent.add('Sua campanha foi cadastrada com sucesso!');
    }


  // INFO CAMPANHA (Funcionando)
  //function info_campanha(agent) {
  //  return firebase.database().ref('/idusuario001/idcampanha/ga').once('value').then(function(snapshot) {
  //     agent.add('Impressoes: '+snapshot.child('impressoes').val());
  //  });
  //}

  // INFO CAMPANHA 2
    function info_campanha(agent) {
        let idUsuario = 'idusuario001';
        let idCampanha = agent.parameters['id-campanha'];
        let data = agent.parameters['periodo-data'];
        return firebase.database().ref(idUsuario+'/'+idCampanha).once('value').then(function(snapshot) {
            agent.add('Está campanha tem um total de '+snapshot.child('ga/impressoes').val()+' impressoes.');
            agent.add('Data: '+data);
            agent.add(new Suggestion('Mais detalhes'));
        });
    }

  // USUARIO LOGIN
    function usuario_login(agent) {
        let idUsuario = agent.parameters['id-usuario'];
        return firebase.database().ref(idUsuario).once('value').then(function(snapshot) {
            if(snapshot.exists()) {
                agent.add('Seu usuário foi encontrado!');
            } else {
                agent.add('Seu usuário não foi encontrado.');
            }
        });
    }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    intentMap.set('info.campanha', info_campanha);
    intentMap.set('nova.campanha', nova_campanha);
    intentMap.set('usuario.login', usuario_login);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);
});
