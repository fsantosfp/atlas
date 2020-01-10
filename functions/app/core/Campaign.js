const CampaignRepository = require('../repository/CampaignRepository');
const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class Campaign {

    constructor(conv){
        this.msg = '';
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);
        this.conv = conv;
        this.campaignName = '';
        this.repository = new CampaignRepository;
        this.listCampaign;
    }

    async getAll(userId){
        this.listCampaign = await this.repository.getAllByUser(userId);
        return this.listCampaign;
    }

    setChoice(datasource,metrics,period){
        //const result = await this.campaign.getAllByUser(userId);
        const len = this.listCampaign.length;
        const last = len - 1;

        this.sessionEntities.setEntity('campaign');

        this.msg = "Você tem acesso a mais de uma campanha, por favor diga ";
        for(let i = 0; i < len; i++){
            this.campaignName = this.listCampaign[i].campaignName.toUpperCase();
            if(i == 0){
                this.msg += (i+1) +' para '+ this.campaignName;
            }else if ( i == last ){
                this.msg += " e "+ (i+1) +' para '+ this.campaignName + ".";
            }else{
                this.msg += ", " + (i+1) +' para '+ this.campaignName; 
            }  
            this.sessionEntities.updateEntity(this.campaignName,this.listCampaign[i].campaignId,i+1);
        }
        //this.msg += ' Me confirma qual delas deseja obter os dados.';
        //this.contex(metrics,datasource,period);

        this.conv.ask(this.msg);
        this.conv.json(this.sessionEntities.getEntities());
        //this.conv.json(this.contexts.getContexts());

        return [];
    }

    notFound(datasource,metrics,period){
        this.contex(datasource,metrics,period);
        this.conv.ask('Não consegui localizar sua campanha! Poderia me dizer o nome novamente?');
        this.conv.json(this.contexts.getContexts());

        return [];
    }

    contex(campaignId){
        this.contexts.setContextName("chooseCampaign", 1);
        this.contexts.setContextParameters("campaign", campaignId);
    }

    getContext(){
        return this.contexts.getContexts();
    }



}

module.exports = Campaign;