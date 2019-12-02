const MySQL = require('./mysql/MySQLDatabase');

class Database {

    constructor(){
        this.database = new MySQL;
    }

    async execute(query){
        return await this.database.execute(query);
    }

}

module.exports = Database;