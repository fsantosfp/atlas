const MediaDAO = require ('../model/MediaDAO');

class MediaRepository {

    constructor(){
        this.dao = new MediaDAO;
    }

    async isValid(name){
        const result = await this.dao.selectExistingRowsByName(name);
        return result[0].Valid > 0 ? true : false;
    }

    async getAllByCampaign(campaignId){
        return await this.dao.selectAllByCampaign(campaignId);
    }

    async findByCampaign(campaignId,dataSourceName){
        return await this.dao.selectByCampaign(campaignId,dataSourceName);
    }

    async getName(id){
        const result = await this.dao.selectById(id);
        return result[0].name;
    }

    async find(dataSourceName){
        return await this.dao.selectId(dataSourceName);
    }

}

module.exports = MediaRepository;