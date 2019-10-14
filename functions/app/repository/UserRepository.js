const UserDAO = require('../model/UserDAO');

class UserRepository {

    constructor(){
        this.user = new UserDAO;
    }

    async getActive(id){
        return await this.user.findUserActive(id);
    }

}

module.exports = UserRepository;