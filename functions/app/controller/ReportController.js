const Reports = require('../core/Reports');

class ReportController{

    constructor(conv){

        this.report = new Reports(conv);
        this.chat = [];
        this.conv = conv;
    }

    async reports(param){
        switch(param.report){
            case 'overview':
                return await this.overiew(param);
        }
    }

    getDefaultReports(param){
         return this.report.getDefaultReports(param);
    }
   
}

module.exports = ReportController;