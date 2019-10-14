const {App, Database} = require('../../../config/Config');
const firebase = require('firebase-admin');

class Firebase {
    constructor(table){
        this.credential = App.MODE_DEV ? firebase.credential.cert(Database.Firebase.credential) : firebase.credential.applicationDefault();
        this.databaseURL = Database.Firebase.databaseURL;
        this.table = table;
        this.db = '';
        this.ref;

        this.connect();
    }

    connect(){
        firebase.initializeApp({
            credential : this.credential,
            databaseURL : this.databaseURL
        });
    }

    get(query){
        let ref = this.table + "/" + query;
        return firebase.database().ref(ref).once('value').then((snapshot)=>{
            return snapshot.val();
        });
    }
}

class Singleton {
    constructor(table){
        if(!Singleton.instance){
            Singleton.instance = new Firebase(table)
        }
    }

    getInstance(){
        return Singleton.instance;
    }
}


module.exports = Singleton;