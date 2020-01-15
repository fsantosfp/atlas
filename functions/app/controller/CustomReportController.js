const CustomReportRepository = require('../repository/CustomReportRepository')
const UserRepository = require('../repository/UserRepository');
const MediaRepository = require('../repository/MediaRepository');

class CustomReportController {

    constructor(conv){
        this.conv = conv;
        this.report = new CustomReportRepository;
        this.user = new UserRepository;
        this.mediaRepo = new MediaRepository;
        this.report_id = 0;
    }

    async create(param){

        const userId = await this.user.getId(this.conv.user.profile.payload.email);
        
        this.report_id = await this.report.add(userId,param.customReportName);

        if(param.campaign != "null"){this.report.belongsTo(this.report_id, param.campaign)};

        param.metrics.map((metric)=>{ this.report.addMetrics(this.report_id, metric) });
        
        for(let i = 0; i < param.dataSources.length; i++){
            let result = await this.mediaRepo.find(param.dataSources[i]);
            this.report.addPlayer(this.report_id, result[0].id);
        }

        return [`Pronto relatório customizado criado! Quando quiser solicita-lo, basta pedir por Meus Relatórios, ${param.customReportName}. Até mais!`]
    }

    question(){
        this.conv.followup('teste');
        return [''];
    }

}
module.exports = CustomReportController;