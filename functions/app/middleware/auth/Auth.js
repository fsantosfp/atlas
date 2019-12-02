const UserRepository = require('../../repository/UserRepository');
class Auth {

    constructor(){
        this.user = new UserRepository;
    }

    async logIn(user = null){
        if(user){
            return await this.user.isActive(user);
        }
        return false;
    }
}

module.exports = Auth;