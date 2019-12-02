class WelcomeController {

    constructor(conv){
        this.chat;
        this.conv = conv;
    }

    welcome(){
        const name = this.conv.user.storage.userName;

        if( !name ) {
            this.chat = [ 'Pelo que vejo, este é seu primeiro acesso.', 'Para que eu possa te auxiliar corretamente, preciso que faça o login'];
        } else {
            this.chat =  [ `Olá ${name}, como posso te ajudar?` ];
        }

        return this.chat;
    }

}

module.exports = WelcomeController;