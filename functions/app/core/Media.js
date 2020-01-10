const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

const MediaRepository = require('../repository/MediaRepository');

class Media {

    constructor(conv){
        this.repository = new MediaRepository;
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);
        this.conv = conv;

        this.media = [];
        this.name = '';
        this.msg = '';
    }

    async getListByCampaign(campaignId){
        this.media = await this.repository.getAllByCampaign(campaignId);
       return  this.media;
    }

    async findByCampaign(campaignId, dataSource){
        this.media = await this.repository.findByCampaign(campaignId,dataSource);
        if(this.media.length > 0){
            
            this.contexts.setContextName("chooseMedia", 1);
            this.contexts.setContextParameters("campaign", campaignId);
            this.contexts.setContextParameters("dataSources", this.media[0].id);
            this.conv.ask('Certo, encontrei a media que deseja. Gostaria de obter dados de uma alguma métrica especifica?');
            this.conv.json(this.contexts.getContexts());
        }else{
            await this.getListByCampaign(campaignId);
            this.setChoice(campaignId);
        }

        return [];
    }

    setChoice(campaignId){

        const len = this.media.length;
        const last = len - 1;

        this.sessionEntities.setEntity('media');
        this.msg = "Sua campanha está veiculando nas seguintes medias, por favor diga ";
        for(let i = 0; i < len; i++){
            this.name = this.media[i].name;
            if(i == 0){
                this.msg += (i+1) +' para '+ this.name;
            }else if ( i == last ){
                this.msg += " e "+ (i+1) +' para '+ this.name + ".";
            }else{
                this.msg += ", " + (i+1) +' para '+ this.name; 
            }

            //this.sessionEntities.updateEntity(this.name,this.media[i].id,i+1);
            this.sessionEntities.updateEntity(this.name,this.name,i+1);
        }

        this.conv.ask(this.msg);

        this.contexts.setContextName("chooseMedia", 1);
        this.contexts.setContextParameters("campaign", campaignId);
        this.conv.json(this.sessionEntities.getEntities());
        this.conv.json(this.contexts.getContexts());

        return [];

    }

    async setAll(campaignId){
        await this.getListByCampaign(campaignId);
        const len = this.media.length;

        let dataSources = [];
        this.contexts.setContextName("chooseMedia", 1);
        for(let i = 0; i < len; i++){
            dataSources.push(this.media[i].id);
        }
        this.contexts.setContextParameters("dataSources", dataSources);
        this.contexts.setContextParameters("campaign", campaignId);
        
        this.conv.ask('Deseja obter alguma métrica específica?');
        this.conv.json(this.contexts.getContexts());

        return [];

    }

    setContext(campaignId, dataSourceId){
        this.contexts.setContextName("chooseMedia", 1);
        this.contexts.setContextParameters("campaign", campaignId);
        this.contexts.setContextParameters("dataSources", dataSourceId);
    }

    getContext(){
        return this.contexts.getContexts();
    }
}

module.exports = Media;