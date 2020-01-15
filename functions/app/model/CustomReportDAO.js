const Database = require('../database/Database');

class CustomReportDAO extends Database {

    constructor(){
        super();
        this.query = '';
        this.result = '';
    }

    async insertCustomReport(name, user_id){
        this.query = `INSERT INTO customReports (name,userId) VALUES ('${name}', ${user_id});`;
        await this.execute(this.query);
        this.query = `SELECT LAST_INSERT_ID() AS id`;
        let result = await this.execute(this.query);
        return result[0].id;
    }

    insertPlayer(report_id, player_id){
        this.query = `INSERT INTO playerReports (report_id, player_id) VALUES (${report_id}, ${player_id});`;
        console.log(this.query);
        this.execute(this.query);
    }

    insertMetrics(report_id, metric){
        this.query = `INSERT INTO metricsReports (report_id, metric) VALUES (${report_id}, '${metric}');`;
        this.execute(this.query);
    }

    insertCampaign(reportId, campaignId){
        this.query = `INSERT INTO customReport_Campaign (report_id, campaign_id) VALUES (${reportId}, ${campaignId})`;
        this.execute(this.query);
    }

   async selectByName(name, user_id){
        this.query = `SELECT id FROM customReports WHERE name = '${name}' AND userId = ${user_id}`;
        this.result = await this.execute(this.query);
        return this.result;
    }

    async selectStructure(user_id, report_id){
        this.query = `SELECT platformName, campaign_id, metric FROM customReports 
                        INNER JOIN playerReports ON (playerReports.report_id = customReports.id)
                        INNER JOIN metricsReports ON (metricsReports.reportId = customReports.id)
                        INNER JOIN platforms ON (platformId = player_id)
                        LEFT JOIN customReport_Campaign on (customReports.id = customReport_Campaign.report_id)
                        WHERE customReports.id = ${report_id} and userId = ${user_id}
                     `
        this.result = await this.execute(this.query);
        return this.result;
    }
}

module.exports = CustomReportDAO;