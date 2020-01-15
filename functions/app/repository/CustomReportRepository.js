const CustomReportDAO = require('./../model/CustomReportDAO');

class CustomReportRepository {

    constructor(){
        this.customReport = new CustomReportDAO;
    }

    async find(name,userId){
        return this.customReport.selectByName(name, userId);
    }

    async get(userId,reportId){
        return this.customReport.selectStructure(userId, reportId)
    }

    async add(userId, name){
        let reportId = await this.customReport.insertCustomReport(name, userId);
        return reportId;
     }
     
     async getId(){
         let result = await this.customReport.getLastId();
         return result;
     }

    addPlayer(reportId,playerId){
        this.customReport.insertPlayer(reportId, playerId);
    }

    addMetrics(reportId,metric){
        this.customReport.insertMetrics(reportId, metric);
    }
    
    belongsTo(reportId, campaingId){
        this.customReport.insertCampaign(reportId, campaingId);
    }
}

module.exports = CustomReportRepository;