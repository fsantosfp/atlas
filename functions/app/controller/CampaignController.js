const Campaign = require('../media/Campaign');
const UserRepository = require('../repository/UserRepository');
const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class CampaignController {
    
    constructor(conv){
        this.campaign = new Campaign(conv);
        this.user = new UserRepository;
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);

        this.chat = [];
        this.conv = conv;
        this.campaignName = '';
    }

    async findCampaign(param){
        const userId = await this.user.getId(this.conv.user.profile.payload.email);
        const listCampaigns = await this.campaign.getAll(userId);

        const len = listCampaigns.length;

        if( len > 1 ){
            this.campaign.setChoice(param.dataSources,param.metrics,param.period);
        }else if( len == 1){
            this.campaign.contex(listCampaigns[0].campaignId);
            this.conv.ask('Atualmente sua campanha ativa é ' + listCampaigns[0].campaignName.toUpperCase() +'. Você deseja obter dados de algum veiculo especifico?' );
            this.conv.json(this.campaign.getContext());
        }else{
            this.campaign.notFound(param.dataSources,param.metrics,param.period);
        }

        return [];
    }

}

module.exports = CampaignController;