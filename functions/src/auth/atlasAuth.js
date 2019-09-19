const database = require('../middleware/database/firebase');
const security = require('../security/hash');

module.exports = {

    logIn(email){
        let user = security.encrypt(email);
        let result = database.getUserByEmail(user);
        
        return (result.length > 0 ? true : false);
    },

}