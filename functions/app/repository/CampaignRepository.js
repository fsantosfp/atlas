const CampaignDAO = require('../model/CampaignDAO')

class CampaignRepository extends CampaignDAO{

    constructor(){
        super();
    }

    async findNameStart(name,companyId){
        return await this.selectCampaignNameLike(name,companyId);
    }

    findByName(name){
        this.selectCampaign(name);
    }

}

module.exports = CampaignRepository;