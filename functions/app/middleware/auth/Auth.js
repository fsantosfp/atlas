const { SignIn } = require('actions-on-google');
const UserRepository = require('../../repository/UserRepository');
class Auth {

    constructor(conv){
        this.user = new UserRepository;
        this.conv = conv;
        this.userName = '';
    }

    async isAllowed(user = null){
        if(user){
            return await this.user.isActive(user);
        }
        return false;
    }

    isLogged(){
        return !this.conv.user.storage.userName ? false : true;
    }

    signIn(){
        return [ new SignIn('Para que eu possa te auxiliar corretamente, preciso que faça o login') ];
    }

    async signInConfirmation(parameters){
            let allowed = await this.isAllowed(this.conv.user.profile.payload.email);
            if(allowed){
                this.conv.user.storage.userName = this.conv.user.profile.payload.name;
                this.conv.user.storage.userId = await this.user.getId(this.conv.user.profile.payload.email);
                //this.conv.user.storage.companyId = await this.user.findCompanyId(this.conv.user.profile.payload.email);
                return true;
            } else {                
                return false;
            }
    }

    getUserName(){
        if(this.isLogged()){
            return this.conv.user.storage.userName
        }

        return this.conv.user.profile.payload.name;
    }

    getUser(){
        return this.conv.user.profile.payload.email;
    }
}

module.exports = Auth;