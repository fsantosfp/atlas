const email = 'clebert@getbots.com.br';
const encrypt = require('../security/encrypt');
const UserDAO = require('../model/UserDAO');

module.exports = {
    async createConversation(conv,params,paremeter) {
        let chat;
        const email_hash = encrypt.encrypt(email);
        const response = await UserDAO.findUser(email_hash)
            .then((value) => {
                if(value) {
                    chat = [`O usuário já está cadastrado.`];
                } else {
                    chat = [`O usuário não está cadastrado`];
                }
                return chat;
            });
        return response;
    }
}