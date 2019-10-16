const axios = require('axios');
const metricsMapping = require('./mapping/metrics.json');

class Supermetrics{

    constructor(){
        this.URL = 'https://supermetrics.com/api/v1/getData';
        this.metrics = '';
        this.startDate;
        this.endDate;
        this.dateRangeType = 'thisyear';
        this.profiles = [];
        this.dataSource = '';
        this.apiKey = '';
        this.dsUser = 0;
    }

    //metrics=Impressions,Clicks
    setMetrics(metrics = ['impressions', 'clicks', 'ctr']){
        this.metrics = metrics;
    }

    parseMetrics(dataSource){
        let parsedMetrics = '';
        for( let i = 0; i < this.metrics.length ; i++){
            if(parsedMetrics.length > 0 ){
                parsedMetrics += ',';
            }
            parsedMetrics += metricsMapping[dataSource][this.metrics[i]];
        }
        return parsedMetrics;
    }

    //&dimensions=Accountname,Campaignname
    setSplitBy(type = 'dimensions',values = ['Account Name']){
        
        if(type == 'dimensions'){
            // split by row dimensions

        }else{
            // split by conlumns pdimensions

        }
    }
    //&dataRangeType=
    setPeriod(){

    }
    //&profiles=[{"ID":"","name":""}] 
    setAccount(id = "All_ACCOUNTS", name = "ALL ACCOUNTS"){
        this.accountId = id;
        this.accountName = name;
    }

    //&dataSource=
    setDataSource(datasource, id){
        switch(datasource){
            case 'facebook-ads':
                this.dataSource = 'FA';
                break;
            case 'google-ads':
                this.dataSource = 'AW';
                break;
        }
        this.dsUser = id;
        this.setAccount();
    }


    async get(dataSource){

        this.setDataSource(dataSource);
        this.parseMetrics(dataSource);

        let endPoint = this.URL + '?metrics=' + this.metrics + '&dimensions= ' + this.dimensions + '&pdimensions=' + this.splitBy
                        + '&maxResults=' + this.maxResults + '&maxCategories=' + this.maxCategories + '&dateRangeType=' + this.dateRangeType
                        + '&profiles=' + this.profiles + '&otherParams=[]' + '&dataSource=' + this.dataSource + '&dsUser=' + this.dsUser + '&apiKey=' + this.apiKey;
        //this.execute(endPoint);
    }
/*
    execute(endPoint){
        try{
            let result = await axios.get(endPoint);
            console.log(result.data);
            return result.data;
        }catch (error) {
            console.error(error);
        }
    } */

}


module.exports = new Supermetrics();