
class ReportController{

    async overiew(startDate, endDate, campaign, platforms){
        report = new Report(startDate, endDate, campaign, platforms );
        return await report.overiew();
    }

}

module.exports = ReportController;