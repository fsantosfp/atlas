const OverviewReport = require('./OverviewReport');
const MetricsReports = require('./MetricsReport');

class FactoryReports {

    constructor(){}

    create(type){
        switch(type){
            case 'overview' :
                return new OverviewReport;
            case 'metrics' :
                return new MetricsReports;
        }
    }
}

module.exports = FactoryReports;