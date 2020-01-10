const DataBase = require('../database/Database');

class PlatformDAO extends DataBase {

    constructor(){
        super();
    }

    async selectExistingRowsByName(name){
        return await this.execute('SELECT COUNT(*) as Valid from platforms WHERE platformName = "' + name.trim() + '"');
    }

    async selectAllByCampaign(campaignId){
        return await this.execute('SELECT platformId as id, platformName as name from platforms INNER JOIN access on platformId = accessPlatformId WHERE accessCampaignId = ' + campaignId);
    }

    async selectByCampaign(campaignId,dataSource){
        return await this.execute('SELECT platformId as id, platformName as name from platforms INNER JOIN access on platformId = accessPlatformId WHERE accessCampaignId = ' + campaignId +' AND platformName = "'+ dataSource+'"');
    }

    async selectById(id){
        return await this.execute('SELECT platformName AS name from platforms WHERE platformId = '+id);
    }

}

module.exports = PlatformDAO;