module.exports ={
    createConversation(conv){

        let chat; 

        // google account username
        const name = conv.user.storage.userName;
        
        // if name is empty request to sign in
        // else use user display name in chat
        if( !name ) {
            chat = [ 'Pelo que vejo, este é seu primeiro acesso.', 'Para que eu possa te auxiliar corretamente, preciso que faça o login'];
        } else {
            chat =  [ `Olá ${name}, como posso te ajudar?` ];
        }

        return chat;
    }
}