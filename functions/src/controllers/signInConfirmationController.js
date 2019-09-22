const auth = require('../auth/atlasAuth');

module.exports ={
    createConversation(conv, params,signin){

        let chat;

        if(signin.status !== 'OK') {
            chat = ['Você precisa estar logado para que eu possa te auxiliar'];
        } else {
            // Validar email informado
            const payload = conv.user.profile.payload;
            
            if(auth.logIn(payload.email)){
                // store de user name, to future acess.
                conv.user.storage.userName = payload.name;
                chat = [
                    `Olá ${payload.name}, Agora consigo te passar todos os dados de suas campanhas`
                ];
            } else {
                chat = [
                    'Desculpe, seu acesso ainda não foi liberado, por favor entre em contato com a Crane. Obrigado!'
                ];
            }
        }

        return chat;
    }
}