const FactoryReport = require('../reports/FactoryReports');
const DataProvider = require('../middleware/dataprovider/DataProvider');

const AccessRepository = require('../repository/AccessRepository');
const CampaignRepository = require('../repository/CampaignRepository');
const PlaformRepository = require('../repository/PlatformRepository');

const Campaign = require('../media/Campaign');

class CompleteRequestController extends FactoryReport{

    constructor(conv){

        super();
        this.report;
        this.conv = conv;
        this.chat = [];

        this.provider = new DataProvider;
        this.access = new AccessRepository;    
        this.repoCampaign = new CampaignRepository;
        this.repoPlatform = new PlaformRepository;
        this.campaign = new Campaign(conv);
        
    }

    async request(param){

        const companyId = 1;
        const resultCampaign = await this.repoCampaign.findNameStart(param.campaignName,companyId);

        if(resultCampaign.length == 0 ) return this.campaign.notFound(param.dataSources,param.metrics,param.period);

        if(resultCampaign.length > 1) return this.campaign.setChoice(resultCampaign,param.dataSources,param.metrics,param.period);

        let msg = this.make(param,resultCampaign[0].campaignId);
        this.chat.push(msg);
        
        return this.chat;
    }

    async make(param, campaignId){

        const campaingData = [];
        const len = param.dataSources.length;
        let startDate = param.period.startDate.split("T")[0]
        let endDate = param.period.endDate !== undefined ? param.period.endDate.split("T")[0] : startDate;

        for( let i = 0; i < len; i++){
            let isValid = await this.repoPlatform.isValid(param.dataSources[i]);
            if(isValid){
                const _access = await this.access.getAccessByPlatform(param.dataSources[i], campaignId);
                this.provider.setDataSource(_access[0].platformName, _access[0].accessUserId);
                this.provider.setAccount(_access[0].accessAccountId, _access[0].accessAccountName);
                this.provider.setPeriod(startDate, endDate);
                this.provider.setMetrics(param.metrics); //Validar no DIALOGFLOW
                let data = await this.provider.getData();
                campaingData.push(data);
            }else {
                this.chat.push('Não consegui localizar sua campanha na plataforma '+param.dataSources[i]+'!');
            }            
        }

        this.report = this.create('metrics');
        this.report.make(campaingData);
        return this.report.getInsight(); 
    }

}

module.exports = CompleteRequestController;