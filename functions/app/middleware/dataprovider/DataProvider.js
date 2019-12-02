const SuperMetrics = require('../../service/supermetrics/Supermetrics');
const DataParser = require('../parser/DataParser');

class DataProvider {

    constructor(){
        this.platform;
        this.startDate;
        this.endDate;
        this.metrics;
        this.dataSource;
        this.userId;

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
        //this.metrics = metrics;

        this.parser.load(this.dataSource);
        this.metrics = "";

        for( let i = 0; i < metrics.length ; i++){
            
            let metric = this.parser.getMetric(metrics[i].toLowerCase());
            
            if(this.metrics.length > 0 ){
                this.metrics += ',';
            }
            
            if( metric !== undefined ){
                this.metrics += metric;
            }
        }

    }

    setDataSource(datasource, id){
        this.dataSource = datasource;
        this.userId = id;
    }

    setAccount(id,name){
        this.account = {"ID" : id, "name" : name};
    }

    async getData(){

        // montar esta classe para consumir os dados e devolver para os reports

        // modelo de requisição
        this.service.config(
            {
                metrics : this.metrics,
                startDate : this.startDate,
                endDate : this.endDate,
                splitByColumn : [],
                splitByRow : [],
                accounts : [this.account],
                dataSource : this.dataSource,
                userId : this.userId,
                apiKey : "api_5hG2GsVc9w8oEdSEVA4P7zEn_iVGSA1PL9PTTU3Bt6Hw6JycrnW_sf9aXsaB3EQHAo_cwPaiSpcWUiz2helGYEaVZhaD8hLK9WMh"
            }
        );

        let data = await this.service.get();
        
        this.parser.load(this.dataSource);
        return this.parser.transform(data,this.dataSource);
    }


}

module.exports = DataProvider;