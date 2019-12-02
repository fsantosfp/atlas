const DataBase = require('../database/Database');

class PlatformDAO extends DataBase {

    constructor(){
        super();
    }

    async selectExistingRowsByName(name){
        return await this.execute('SELECT COUNT(*) as Valid from platforms WHERE platformName = "' + name.trim() + '"');
    }

}

module.exports = PlatformDAO;