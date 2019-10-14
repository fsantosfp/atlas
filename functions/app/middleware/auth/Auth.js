const md5 = require('md5');
const UserRepository = require('../../repository/UserRepository');

class Auth {

    constructor(){
        this.UserRepository = new UserRepository;
    }

    async logIn(user = null){
        if(user){
            const _user = md5(user);
            return await this.UserRepository.getActive(_user);
        }
        return false;
    }
}

module.exports = Auth;