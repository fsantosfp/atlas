const FactoryReport = require('../reports/FactoryReports');
const DataProvider = require('../middleware/dataprovider/DataProvider');
const AccessRepository = require('../repository/AccessRepository');

class ReportController extends FactoryReport{

    constructor(){
        super();
        this.provider = new DataProvider;
        this.access = new AccessRepository;
        this.report;

        this.chat = [];
    }

    async reports(param){
        switch(param.report){
            case 'overview':
                return await this.overiew(param);
        }
    }

    async onlyMetrics(param){
        const _access = await this.access.getAcessAccount(param.campaignId);
    }

    async overiew(param){
       
        const _access = await this.access.getAcessAccount(param.campaignId);

        let startDate = param.period.startDate.split("T")[0];
        let endDate = param.period.endDate.split("T")[0];

        this.report = this.create('overview');
        
        const campaingData = [];
        let len = _access.length;
    
        for( let i = 0; i < len; i++){
        
            this.provider.setDataSource(_access[i].platformName, _access[i].accessUserId);
            this.provider.setAccount(_access[i].accessAccountId, _access[i].accessAccountName);
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