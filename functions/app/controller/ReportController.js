const FactoryReport = require('../reports/FactoryReports');
const DataProvider = require('../middleware/dataprovider/DataProvider');

class ReportController extends FactoryReport{

    constructor(){
        super();
        this.provider = new DataProvider;
        this.report;

        this.chat = [];
    }

    async infoCampaigns(param){
        switch(param.reportType){
            case "overview" :
                return await this.overiew(param);
        }
    }

    async overiew(param){
       
        let campaigns = {
            "facebook-ads" : {
                "accountName" : "[CAT]VANGUARD SOLUTIONS",
                "accountId" : 'act_356407048375036',
                "userId" : 138411284219629,
            },
            "google-ads" : {
                "accountName" : "CATERPILAR | GCI | LATAM",
                "accountId" : 8131806833,
                "userId" : 9989174917,
            }
        };

        let startDate = param.period.startDate.split("T")[0];
        let endDate = param.period.endDate.split("T")[0];

        this.report = this.create('overview');
        const campaingData = [];
        for( let dataSource in campaigns){
            this.provider.setDataSource(dataSource,campaigns[dataSource].userId);
            this.provider.setAccount(campaigns[dataSource].accountId, campaigns[dataSource].accountName);
            this.provider.setPeriod(startDate, endDate);
            this.provider.setMetrics(this.report.getMetrics());
            let data = await this.provider.getData();
            campaingData.push(data);
        }

        this.report.make(campaingData);
        let msg = this.report.getInsight(); 
        this.chat.push(msg);
        
        return this.chat;
    }

}

module.exports = ReportController;