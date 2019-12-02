const PlatformDAO = require ('../model/PlatformDAO');

class PlatformRepository {

    constructor(){
        this.platform = new PlatformDAO;
    }

    async isValid(name){
        const result = await this.platform.selectExistingRowsByName(name);
        return result[0].Valid > 0 ? true : false;
    }


}

module.exports = PlatformRepository;