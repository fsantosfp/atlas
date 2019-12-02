const Database = require('../database/Database');

class CampaignDAO extends Database {

    constructor(){
        super();
        this.query = '';
        this.result = '';
    }

    async selectCampaignName(id){/*
        let ref = 'customers/1/campaings';
        let data = this.table.ref(ref).once('value').then((snapshot) => {
            return snapshot.val();
        });*/
    }

    async selectCampaignNameLike(name,companyId){
        this.query = 'SELECT campaignId, campaignName FROM campaigns WHERE campaignName LIKE "'+ name +'%" AND campaignCompanyId = ' + companyId;
        this.result = await this.execute(this.query);
        return this.result;
    }


}

module.exports = CampaignDAO;