const SuperMetrics = require('../../service/supermetrics/Supermetrics');
const DataParser = require('./DataParser');

class DataProvider {

    constructor(){
        this.platform;
        this.startDate;
        this.endDate;
        this.metrics;

        this.parser = new DataParser;
        this.service = new SuperMetrics;
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

        // montar esta classe para consumir os dados e devolver para os reports

        // modelo de requisição
        this.service.config(
            {
                metrics : ['Impressions','Clicks','CTR'],
                splitByColumn : [],
                splitByRow : [],
                accounts : [{
                    "ID" : "ALL_ACCOUNTS", 
                    "name" : "ALL ACCOUNTS" }],
                dataSource : "google-ads",
                userId : 9989174917,
                apiKey : "api_iyceoEvIBH4PSrPGdzMS_Z1KamUUCCKUwj2CTJkajpTPbsEQB8pDjaHnhFnZa01CecijWh8TtbK5xVQhj4mGBo9iJCqiz2KvIfLg"
            }
        );

        this.service.get();
    }


}

module.exports = DataProvider;