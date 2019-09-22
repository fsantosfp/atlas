const { SignIn } = require('actions-on-google');

module.exports ={
    createConversation(conv){

        let chat; 
        const singIn = new SignIn('Ok, vamos iniciar');

        chat = [ singIn ];
        
        return chat;
    }
}