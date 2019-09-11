const { Suggestions } = require('actions-on-google');

module.exports ={
    createConversation(conv,params,permissionGranted){        
        
        let chat;
        const suggestions = new Suggestions('Relatório de Campanhas');

        if( !permissionGranted){
            chat = [ 'Ok, sem problemas. Como posso te ajudar?', suggestions];
        } else {
            conv.user.storage.userName = conv.user.name.display;
            chat = [`Obrigado, ${ conv.user.storage.userName }. Como posso te ajudar?`, suggestions];
        }

        return chat;
    }
}