const Reports = require('../core/Reports');
const DateFormat = require('../util/Util');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');
//const Metrics = require();

class requestController {

    constructor(conv){
        this.conv = conv;
        this.reports = new Reports(conv);
        this.contexts = new SessionContexts(conv);
        //this.metrics = new Metrics;
    }

    async getData(param){
        let data = ""; 

        const period = DateFormat.split_date(param);

        if((DateFormat.getYear(period.startDate) > DateFormat.getCurrentYear() && param.year == undefined) || param.year != undefined && param.year > DateFormat.getCurrentYear()){
            return this.confirmDate(param);
        }else{
            if(param.report != "null"){
                data = await this.reports.makeDefault(param);
             }else{
                 data = await this.reports.makeCustom(param);
             }
     
             data.push(' Gostaria de fazer uma nova consulta?');
             return data;    
        }
    }

    confirmDate(param){
        
        this.contexts.setContextName("confirmYear", 1);
        this.contexts.setContextParameters("campaign", param.campaign);
        this.contexts.setContextParameters("dataSources", param.dataSources);
        this.contexts.setContextParameters("metrics", param.metrics);
        this.contexts.setContextParameters("period", param.period);
        this.contexts.setContextParameters("report", param.report);
        this.conv.ask('Encontrei uma inconsistência no período informado, pode me confirmar o ano?');
        this.conv.json(this.contexts.getContexts());
        return [];
    }
}

module.exports = requestController;