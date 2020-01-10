const CustomReportDAO = require('./../model/CustomReportDAO');

class CustomReportRepository {

    constructor(){
        this.customReport = new CustomReportDAO;
    }

    async add(userId, name, playerId,metrics){
       let reportId = await this.customReport.insertCustomReport(name, userId);
       this.customReport.insertPlayer(reportId, playerId);
       metrics.map((metric) => { this.customReport.insertMetrics(reportId, metric) });
       return;
    }

    async find(name,userId){
        return this.customReport.selectByName(name, userId);
    }

    async get(userId,reportId){
        return this.customReport.selectStructure(userId, reportId)
    }
}

module.exports = CustomReportRepository;