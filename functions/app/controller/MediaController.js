const Media = require('../media/Media');

class MediaController {

    constructor(conv){
        this.conv = conv;
        this.media = new Media(conv);
    }

    async findMedia(param){

        if(param.dataSources == "null"){
            const list = await this.media.getListByCampaign(param.campaign);
            const len = list.length;

            if( len > 1 ){
                this.media.setChoice(param.campaign);
            }
            else if( len == 1 ){
                //return ['Sua campanha está veiculando apenas em ' + this.media];
                this.media.contex(param);
                this.conv.ask('Sua campanha está veiculando apenas em ' + this.media);
                this.conv.json(this.media.getContexts());
            }
            else{
                this.conv.close('Houve um erro, parece que sua campanha ainda não está veiculando. Por favor entre em contato com a CRANE.');
            }
        }else{
            await this.media.findByCampaign(param.campaign, param.dataSources);
        }

        return [];
    }

    async getAll(param){
        return await this.media.setAll(param.campaign);
    }

}

module.exports = MediaController;