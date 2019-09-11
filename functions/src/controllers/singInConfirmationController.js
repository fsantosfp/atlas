const { SignIn } = require('actions-on-google');

module.exports ={
    createConversation(conv, params, signin){

        let chat;

        if(signin.status !== 'OK') {
            chat = ['Você precisa estar logado para usar o App'];
        } else {
            chat = ['Ótimo! Obrigado por logar'];
        }

        return chat;
    }
}