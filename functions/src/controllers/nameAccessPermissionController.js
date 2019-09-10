const { Suggestions } = require('actions-on-google');

module.exports ={
    createConversation(conv,params,permissionGranted){        
        
        let chat;
        const suggestions = new Suggestions('Azul', 'Vermelho', 'Verde');

        if( !permissionGranted){
            chat = [ 'Ok, sem problemas. Qual sua cor favorita?', suggestions];
        } else {
            conv.user.storage.userName = conv.user.name.display;
            chat = [`Obrigado, ${ conv.user.storage.userName }. Qual sua cor favorita?`, suggestions];
        }

        return chat;
    }
}