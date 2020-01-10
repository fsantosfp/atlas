const { SignIn } = require('actions-on-google');
const Auth = require('../middleware/auth/Auth');
const UserRepository = require('../repository/UserRepository');

class AuthController {

    constructor(conv){
        this.chat = [];
        this.payload;
        this.conv = conv;
        this.auth = new Auth;
        this.user = new UserRepository;
    }

    //signIn(){ return [new SignIn('Ok, vamos iniciar')];}

    async signInConfirmation(parameters){
        return this.auth.signInConfirmation();
        /*
        if(parameters.status !== 'OK'){
            this.chat = ['Você precisa estar logado para que eu possa te auxiliar'];
         } else {
            let allowed = await this.auth.logIn(this.conv.user.profile.payload.email);
            if(allowed){
                this.conv.user.storage.userName = this.conv.user.profile.payload.name;
                this.conv.user.storage.companyId = await this.user.findCompanyId(this.conv.user.profile.payload.email);
                this.chat = [
                    'Obrigado por fazer o login! Agora consigo te passar todos os dados de suas campanhas'
                ];
            } else {
                this.chat = [
                    'Desculpe, seu acesso ainda não foi liberado, por favor entre em contato com a Crane. Obrigado!'
                ];
            }
        }*/

        //return this.chat;
    }
}

module.exports = AuthController;