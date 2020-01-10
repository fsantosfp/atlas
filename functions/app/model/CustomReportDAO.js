const Database = require('../database/Database');

class CustomReportDAO extends Database {

    constructor(){
        super();
        this.query = '';
        this.result = '';
    }

    async insertCustomReport(name, user_id){
        this.query = `INSERT INTO customReports (name,userId) VALUES ('${name}', ${user_id}); SELECT LAST_INSERT_ID();`;
        this.result = await this.execute(this.query);
        return this.result;
    }

    insertPlayer(report_id, player_id){
        this.query = `INSERT INTO playerReports (report_id, player_id) VALUES (${report_id}, ${player_id});`;
        this.execute(this.query);
    }

    insertMetrics(report_id, metric){
        this.query = `INSERT INTO metricsReports (report_id, metric) VALUES (${report_id}, '${metric}');`;
        this.execute(this.query);
    }

   async selectByName(name, user_id){
        this.query = `SELECT id FROM customReports WHERE name = '${name}' AND userId = ${user_id}`;
        this.result = await this.execute(this.query);
        return this.result;
    }

    async selectStructure(user_id, report_id){
        this.query = `SELECT platformName, campaignId, metric FROM customReports 
                        INNER JOIN playerReports ON (playerReports.report_id = customReports.id)
                        INNER JOIN metricsReports ON (metricsReports.reportId = customReports.id)
                        INNER JOIN platforms ON (platformId = player_id)
                        WHERE customReports.id = ${report_id} and userId = ${user_id}
                     `
        this.result = await this.execute(this.query);
        return this.result;
    }
}

module.exports = CustomReportDAO;