const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class Campaign {

    constructor(conv){
        this.msg = '';
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);
        this.conv = conv;
        this.campaignName = '';
    }

    setChoice(options,datasource,metrics,period){
        let msg = "Encontrei mais de uma campanha com o nome que me informou, estas são: ";

        const len = options.length;
        const last = len - 1;

        this.sessionEntities.setEntity('campaign');

        for(let i = 0; i < len; i++){
            this.campaignName = options[i].campaignName.toUpperCase();
            if(i == 0){
                msg += this.campaignName;
            }else if ( i == last ){
                msg += " e "+ this.campaignName + ".";
            }else{
                msg += ", " + this.campaignName; 
            }  
            this.sessionEntities.updateEntity(this.campaignName,options[i].campaignId,i+1);
        }

        msg += ' Me confirma, qual desta seria a campanha correta?';
        this.contex(metrics,datasource,period);
        /*
        this.contexts.setContextName("optionsCampaign", 1);
        this.contexts.setContextParameters("metrics", metrics);
        this.contexts.setContextParameters("dataSource", datasource);
        this.contexts.setContextParameters("period", period);*/

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

    notFound(datasource,metrics,period){
        this.contex(datasource,metrics,period);
        this.conv.ask('Não consegui localizar sua campanha! Poderia me dizer o nome novamente?');
        this.conv.json(this.contexts.getContexts());

        return [];
    }

    entity(){
        
    }

    contex(datasource,metrics,period){
        this.contexts.setContextName("optionsCampaign", 1);
        this.contexts.setContextParameters("metrics", metrics);
        this.contexts.setContextParameters("dataSource", datasource);
        this.contexts.setContextParameters("period", period);
    }



}

module.exports = Campaign;