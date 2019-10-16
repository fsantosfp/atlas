const SuperMetrics = require('./supermetrics/Supermetrics');

class DataProvider {

    constructor(){
        this.platform;
        this.startDate;
        this.endDate;
        this.metrics;
    }

    setPeriod(startDate, endDate){
        this.startDate = startDate;
        this.endDate = endDate;
    }

    setPlatform(platform){
        this.platform = platform;
    }

    setMetrics(metrics){
        this.metrics = metrics;
    }

    getData(){
        SuperMetrics.setMetrics();
        SuperMetrics.setPeriod();
        //SuperMetrics.setDataSource();
        SuperMetrics.get();
    }


}

module.exports = DataProvider;