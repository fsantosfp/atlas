const Reports = require('../core/Reports');
//const Metrics = require();

class requestController {

    constructor(conv){
        this.conv = conv;
        this.reports = new Reports(conv);
        //this.metrics = new Metrics;
    }

    request(param){
        if(param.reports != "null"){
            this.reports.make();
        }

        //this.metrics.make();
    }


}

module.exports = requestController;