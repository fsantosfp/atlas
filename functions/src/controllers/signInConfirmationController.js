const auth = require('../auth/atlasAuth');

module.exports ={
    async createConversation(conv, params,signin){
        let chat;
        if(signin.status !== 'OK') {
            return chat = ['Você precisa estar logado para que eu possa te auxiliar'];
        }
        const payload = conv.user.profile.payload; // user data
        const login = await auth.logIn(payload.email) // validates if user exists in Firebase
            .then((value) => {
                return value; // return true or false
            })
            .catch((err) => { console.log(err) }); // error case
        if(login){
            conv.user.storage.userName = payload.name; // store de user name, to future acess.
            chat = [`Olá ${payload.name}, agora consigo te passar todos os dados de suas campanhas`];
        } else {
            chat = ['Desculpe, seu acesso ainda não foi liberado, por favor entre em contato com a Crane. Obrigado!'];
        }
        return chat;
    }
}