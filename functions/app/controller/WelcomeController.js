const Auth = require('../middleware/auth/Auth');
const Campaign = require('../core/Campaign');
const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const UserRepository = require('../repository/UserRepository');

class WelcomeController {

    constructor(conv){
        this.chat;
        this.conv = conv;
        this.auth = new Auth(conv);
        this.campaign = new Campaign(conv);
        this.entity = new SessionEntities(conv);
        this.user = new UserRepository;
    }

    async welcome(){
        return [`Olá ${this.auth.getUserName()}, como posso te ajudar?`];
    }

    login(){
        //if(this.auth.isLogged()){
            return this.welcome();
        //}else{
            //return this.auth.signIn();
        //}
    }

    async loginConfirmation(parameters){
        if(parameters.status == 'OK'){
            const isAllowed = await this.auth.signInConfirmation();
            if(isAllowed){
                return this.welcome();
            }
            else{
                return ['Desculpe, seu acesso ainda não foi liberado, por favor entre em contato com a Crane. Obrigado!'];
            }
        }else {
            return  ['Você precisa estar logado para que eu possa te auxiliar'];
        }
    }



}

module.exports = WelcomeController;