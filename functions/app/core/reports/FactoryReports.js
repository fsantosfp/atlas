const OverviewReport = require('../../template/OverviewReport');
const UniqueOverviewReport = require('../../template/UniqueOverviewReport');
const MetricsReports = require('../../template/MetricsReport');
const CostReport = require('../../template/CostReport');

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