const CampaignRepository = require('../repository/CampaignRepository');
const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class CampaignController {
    
    constructor(conv){
        this.campaign = new CampaignRepository;
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);

        this.chat = [];
        this.conv = conv;
        this.campaignName = '';
    }

    async findCampaign(param){
        let msg = '';
     
        const companyId = 1;
        const result = await this.campaign.findNameStart(param.campaignName,companyId);
        const len = result.length;
        const last = len - 1;

        this.sessionEntities.setEntity('campaign');

        if( len > 1 ){
            msg = "Encontrei mais de uma campanha com o nome que me informou, estas são: ";
            for(let i = 0; i < len; i++){
                this.campaignName = result[i].campaignName.toUpperCase();
                if(i == 0){
                    msg += this.campaignName;
                }else if ( i == last ){
                    msg += " e "+ this.campaignName + ".";
                }else{
                    msg += ", " + this.campaignName; 
                }  
                this.sessionEntities.updateEntity(this.campaignName,result[i].campaignId,i+1);
            }
            msg += ' Me confirma qual delas deseja obter o relatório.';
        } else {

            //this.campaignName = result[0].campaignName.toUpperCase();
            //this.sessionEntities.updateEntity(this.campaignName,result[0].campaignId);
            //msg = 'Encontrei a campanha ' + this.campaignName + ' seria esta mesmo correto?';
            this.contexts.setContextName("report", 5);
            this.contexts.setContextParameters("campaignId", result[0].campaignId);
            msg = 'Certo encontrei sua campanha, qual seria o tipo de report?';
        }

        /*
        WHEN USE A SESSION ENTITIES, IS NECESSARY TO SEND A ASK THROUGH OWN CLASS METHOD
        BEACUSE IF YOU SERIALIZE BEFORE DO GET A ASK FUNCITON, THIS WILL MAKE AN ERROR.
        SO THE RETURN NEEDS TO BE A NULL ARRAY.
        */
        this.conv.ask(msg);
        this.conv.json(this.sessionEntities.getEntities());
        this.conv.json(this.contexts.getContexts());
        
        return [];
        
    }

}

module.exports = CampaignController;