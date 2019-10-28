const OverviewReport = require('./OverviewReport');

class FactoryReports {

    constructor(){}

    create(type){
        switch(type){
            case 'overview' :
                return new OverviewReport;
        }
    }
}

module.exports = FactoryReports;