const UserDAO = require('../model/UserDAO');
const encrypt = require('../security/encrypt');

module.exports = {
    async logIn(email){
        const email_hash = encrypt.encrypt(email);
        const response = await UserDAO.findUser(email_hash)
            .then((value) => {
                return value;
            });
        return response; // Return true or false
    }
}