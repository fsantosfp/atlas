const { SignIn } = require('actions-on-google');
//const Auth = require('../middleware/auth.js');  CONTINUAR DAQUI

/**
 * @parameters = data[0];
 * @argumentsParsed = data[1];
 * @argumentsStatu = data[2];
 */

class AuthController {

    constructor(conv){
        this.chat = [];
        this.payload;
        this.conv = conv;
    }

    ask_for_sign_in(){
        return [new SignIn('Ok, vamos iniciar')];
    }

    async ask_for_sign_in_confirmation(parameters){

        if(parameters.status !== 'OK'){
            this.chat = ['Você precisa estar logado para que eu possa te auxiliar'];
         } else {
            let allowed = await Auth.logIn(this.conv.profile.payload.email);
            if(allowed){
                this.conv.user.storage.userName = this.conv.user.profile.payload.name;
                this.chat = [
                    'Obrigado por fazer o login! Agora consigo te passar todos os dados de suas campanhas'
                ];
            } else {
                this.chat = [
                    'Desculpe, seu acesso ainda não foi liberado, por favor entre em contato com a Crane. Obrigado!'
                ];
            }
        }

        return this.chat;
    }
}

module.exports = AuthController;