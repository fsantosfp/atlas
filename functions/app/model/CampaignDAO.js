const Database = require('../database/Database');

class CampaignDAO extends Database {

    constructor(){
        super();
        this.query = '';
        this.result = '';
    }

    async selectCampaignByUser(userid){
        this.query = 'Select campaignId, campaignName from campaigns Where userId = ' + userid;
        this.result = await this.execute(this.query);
        return this.result;
    }

    async selectCampaignNameLike(name,companyId){
        this.query = 'SELECT campaignId, campaignName FROM campaigns WHERE campaignName LIKE "'+ name +'%" AND campaignCompanyId = ' + companyId;
        this.result = await this.execute(this.query);
        return this.result;
    }


}

module.exports = CampaignDAO;