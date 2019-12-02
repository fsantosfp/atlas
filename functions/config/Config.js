require('dotenv').config({path: __dirname + '/config.env'});

const App = {
    MODE_DEV : true,
};

const Database = {
    Firebase : {
        databaseURL : process.env.FIREBASE_DATABASE_URL,
        credential : {
            type : process.env.FIREBASE_TYPE,
            project_id : process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: process.env.FIREBASE_PRIVATE_KEY,
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_AUTH_URI,
            token_uri: process.env.FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        },
    },
    MySQL : {
        host : process.env.MYSQL_HOST,
        port : process.env.MYSQL_PORT,
        user : process.env.MYSQL_USER,
        pswd : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE
    }
};

const Services = {
    Dialogflow : {
        debug : process.env.DIALOGFLOW_DEBUG,
        clientId : process.env.DIALOGFLOW_CLIENT_ID
    },
};


module.exports = { App, Database, Services } 