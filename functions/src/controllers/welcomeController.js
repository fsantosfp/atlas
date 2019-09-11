const { Permission } = require('actions-on-google');

module.exports ={
    createConversation(conv,params){

        let chat; 

        // google account username
        const name = conv.user.storage.userName;
        
        // Instantiate Google Accout Permission,
        // to obtain user information such as user's display name
        const permissions = new Permission({
            context : 'Olá, posso te chamar pelo seu nome? Mas para isto',
            permissions : 'NAME' 
        });

        // if name is empty request permission
        // else use user display name in chat
        if( !name ) {
            chat = [ permissions ];
        } else {
            chat =  [ `Olá ${name}, como posso te ajudar?` ];
        }

        return chat;
    }
}