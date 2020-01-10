const OverviewReport = require('./OverviewReport');
const UniqueOverviewReport = require('./UniqueOverviewReport');
const MetricsReports = require('./MetricsReport');
const CostReport = require('./CostReport');

class FactoryReports {

    constructor(){}

    create(type){
        switch(type){
            case 'overview' :
                return new OverviewReport;
            case 'uniqueoverview' :
                return new UniqueOverviewReport;
            case 'metrics' :
                return new MetricsReports;
            case 'costreport' :
                return new CostReport;
        }
    }
}

module.exports = FactoryReports;