const Database = require('../middleware/database/Database');

class UserDAO {

    constructor(){
        this.Database = new Database('users');
        this.query = '';
    }

    async findActiveUser(id){
       this.query = id + '/' + 'actived';
       let result = await this.Database.execute(this.query);
       return result !== null ? result : false;
    }

    async getUserCompany(id){
        this.query = id + '/' + 'company';
        let result = await this.Database.execute(this.query);
        return result;
    }

}

module.exports = UserDAO;