const FactoryReports = require('./reports/FactoryReports');
const DataProvider = require('../middleware/dataprovider/DataProvider');
const AccessRepository = require('../repository/AccessRepository');
const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');
const DateFormat = require('../util/Util');

class Reports extends FactoryReports {

    constructor(conv){
        super();

        this.provider = new DataProvider;
        this.access = new AccessRepository;
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);

        this.conv = conv;
        this.startDate;
        this.endDate;
        this.report;
        this.campaignData = [];
        this.insight = '';
    }

    getDefaultReports(param){
        this.conv.ask("Atualmente estas são as opções: diga 1 para Overview, 2 para Unique Overview, 3 para Relatório de custo.");
        
        this.sessionEntities.setEntity('reports');
        this.sessionEntities.updateEntity('overview','overview',1);
        this.sessionEntities.updateEntity('uniqueoverview','uniqueoverview',2);
        this.sessionEntities.updateEntity('costreport','costreport',3);
        this.contexts.setContextName("chooseReport", 1);
        this.contexts.setContextParameters("campaign", param.campaign);
        this.contexts.setContextParameters("dataSources", param.dataSources);
        
        this.conv.json(this.sessionEntities.getEntities());
        this.conv.json(this.contexts.getContexts());

        return [];
    }

    async makeDefault(param){
        this.report = this.create(param.report);
        return await this.make(param);
    }

    async makeCustom(param){
        this.report = this.create('metrics');
        this.report.setMetrics(param.metrics);
        return await this.make(param);
    }

    async make(param){

        const period = DateFormat.split_date(param);
        this.startDate = period.startDate;
        this.endDate = period.endDate;

        if(param.year != undefined){
            const year = DateFormat.split_year(param);
            this.startDate = DateFormat.merge(this.startDate,year);
        }

        const access = await this.access.getAcessAccount(param.campaign,param.dataSources);

        const result = access.map(async (data)=>{
            this.provider.setDataSource(data.datasource, data.userId);
            this.provider.setAccount(data.accountId, data.accountName);
            this.provider.setPeriod(this.startDate, this.endDate);
            this.provider.setMetrics(this.report.getMetrics());
            let response = await this.provider.getData();
            this.campaignData.push(response);
        });

        await Promise.all(result).then(()=>{
            this.report.get(this.campaignData);
            this.insight = this.report.getInsight(); 
        });

        return [this.insight];
    }

}

module.exports = Reports;