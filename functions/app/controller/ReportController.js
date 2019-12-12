const FactoryReport = require('../reports/FactoryReports');
const DataProvider = require('../middleware/dataprovider/DataProvider');
const AccessRepository = require('../repository/AccessRepository');

const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

const Reports = require('../core/Reports');

//class ReportController extends FactoryReport{
class ReportController{

    constructor(conv){
        /*
        super();
        this.provider = new DataProvider;
        this.access = new AccessRepository;

        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);*/

        this.report = new Reports(conv);
        this.chat = [];
        this.conv = conv;
    }

    async reports(param){
        switch(param.report){
            case 'overview':
                return await this.overiew(param);
        }
    }

    getDefaultReports(param){
        this.report.getDefaultReports(param);
/*
        this.conv.ask("Atualmente estas são as opções: diga 1 para Overview.");
        
        this.sessionEntities.setEntity('reports');
        this.sessionEntities.updateEntity('overview','overview',1);
        this.contexts.setContextName("chooseReport", 1);
        this.contexts.setContextParameters("campaign", param.campaign);
        this.contexts.setContextParameters("dataSources", param.dataSources);
        
        this.conv.json(this.sessionEntities.getEntities());
        this.conv.json(this.contexts.getContexts());

        return [];*/

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