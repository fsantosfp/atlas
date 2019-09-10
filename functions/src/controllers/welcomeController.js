const { Permission } = require('actions-on-google');

module.exports ={
    createConversation(conv,params){
        const name = conv.user.storage.userName;
        const permissions = new Permission({
            context : 'Olá, posso te chamar pelo seu nome? Mas para isto',
            permissions : 'NAME' 
        });

        let chat;

        if( !name ) {
            chat = [ permissions ];
        } else {
            chat =  [ `Olá ${name}, como posso te ajudar?` ];
        }

        return chat;
    }
}