const firebase = require('firebase-admin');

firebase.initializeApp({
    credential: firebase.credential.applicationDefault(),
    databaseURL: 'https://atlas-jgweik.firebaseio.com/'
});

module.exports = {
    findUser(email_hash) {
        return firebase.database().ref(email_hash).once('value').then(function(snapshot) {
            let user;
            if(snapshot.exists()) {
                user = true;
            } else {
                user = false;
            }
            return user;
        });
    }
}