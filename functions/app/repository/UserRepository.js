const UserDAO = require('../model/UserDAO');

class UserRepository {

    constructor(){
        this.user = new UserDAO;
    }

    async getActive(id){
        return await this.user.findActiveUser(id);
    }

}

module.exports = UserRepository;