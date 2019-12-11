const UserDAO = require('../model/UserDAO');

class UserRepository {

    constructor(){
        this.user = new UserDAO;
    }

    async isActive(email){
        return await this.user.selectActiveUser(email);
    }

    async findCompanyId(email){
        return await this.user.selectCompanyId(email);
    }

    async getId(email){
        return await this.user.selectUserId(email);
    }

}

module.exports = UserRepository;