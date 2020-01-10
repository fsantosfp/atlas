const Database = require('../database/Database');

class ReportDAO extends Database {

    constructor(){
        super();
        this.query = '';
        this.result = '';
    }

    async selectCustomReport(name,userId){
        this.query = 'SELECT metric from customReports INNER JOIN metricsReports on reportId = customReports.id WHERE name = "'+name+'" and userId = ' + userId;
        this.result = await this.execute(this.query);
        return this.result;
    }

}

module.exports = ReportDAO;