const Firebase = require('../../service/Firebase');

class Database {

    constructor(table){
        this.Firebase = new Firebase(table).getInstance();
    }

    async execute(query){
        return await this.Firebase.get(query);
    }

}

module.exports = Database;