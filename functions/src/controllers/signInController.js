const { SignIn } = require('actions-on-google');

module.exports ={
    createConversation(conv){

        let chat; 
        const singIn = new SignIn('Para acessar os dados de suas campanhas');

        chat = [ singIn ];
        
        return chat;
    }
}