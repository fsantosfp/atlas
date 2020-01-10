const AccessDAO = require('../model/AccessDAO');

class AccessRepository {

    constructor(){
        this.access = new AccessDAO;
    }

    async getAcessAccount(id,dataSource){
        return await this.access.selectAccessAccount(id,dataSource);
    }

    async findCompanyId(email){
        return await this.user.selectCompanyId(email);
    }

    async getAccessByPlatform(platformName, campaignId){
        return await this.access.selectAccessByPlatform(platformName, campaignId);
    }

}

module.exports = AccessRepository;