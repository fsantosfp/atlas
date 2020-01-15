const CustomReportRepository = require('../repository/CustomReportRepository')
const UserRepository = require('../repository/UserRepository');
const MediaRepository = require('../repository/MediaRepository');
const {split_date, date_diff_indays} = require('../util/Util');

class CustomReport {

    constructor(){
        this.report = new CustomReportRepository;
        this.user = new UserRepository;
        this.mediaRepo = new MediaRepository;
        this.report_id = 0;
    }

    async save(param,email){

        const period  = split_date(param);
        const period_indays = date_diff_indays(period.startDate, period.endDate);

        const userId = await this.user.getId(email);
        this.report_id = await this.report.add(userId,param.customReportName, period_indays);

        if(param.campaign != "null"){this.report.belongsTo(this.report_id, param.campaign)};

        param.metrics.map((metric)=>{ this.report.addMetrics(this.report_id, metric) });
        param.dataSources.map((player_id) => { this.report.addPlayer(this.report_id, player_id)});

        /*
        for(let i = 0; i < param.dataSources.length; i++){
            let result = await this.mediaRepo.find(param.dataSources[i]);
            this.report.addPlayer(this.report_id, result[0].id);
        }*/
        
        return [`Pronto relatório customizado criado! Quando quiser solicita-lo, basta pedir por Meus Relatórios, ${param.customReportName}.`]
    }

    dateDiff(date){

    }



}

module.exports = CustomReport;