const Database = require('../database/Database');

class UserDAO extends Database{

    constructor(){
        super();
        this.query = '';
    }

    async selectActiveUser(email){
        this.query = 'SELECT userActive FROM users WHERE userEmail = "' + email + '"';
        const result = await this.execute(this.query);
        return result[0].userActive;
    }

    async selectCompanyId(email){
        this.query = 'SELECT userCompanyId FROM users WHERE userEmail = "' + email + '"';
        const result = await this.execute(this.query);
        return result[0].userCompanyId;
    }

}

module.exports = UserDAO;