const Reports = require('../core/Reports');
//const Metrics = require();

class requestController {

    constructor(conv){
        this.conv = conv;
        this.reports = new Reports(conv);
        //this.metrics = new Metrics;
    }

    async getData(param){
        let data = ""; 
        if(param.report != "null"){
           data = await this.reports.makeDefault(param);
        }else{
            data = await this.reports.makeCustom(param);
        }

        data.push(' Gostaria de fazer uma nova consulta?');
        return data;
    }
}

module.exports = requestController;