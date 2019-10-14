const Firebase = require('./Firebase');

class Database {

    constructor(table){
        this.Firebase = new Firebase(table);
    }

    async execute(query){
        return await this.Firebase.get(query);
    }

}

module.exports = Database;