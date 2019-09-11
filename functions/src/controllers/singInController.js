const { SignIn } = require('actions-on-google');

module.exports ={
    createConversation(conv){

        let chat; 
        const singIn = new SignIn();

        chat = [ singIn ];
        
        return chat;
    }
}