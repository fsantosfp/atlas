const axios = require('axios');
const SupermetricsParser = require('../../middleware/dataprovider/DataParser');

class Supermetrics{

    constructor(){
        this.URL = 'https://supermetrics.com/api/v1/getData';
        this.defaultConfig = {
            metrics : ['impressions','clicks','ctr'],
            splitByColumn : [],
            splitByRow : [],
            accounts : [{
                "ID" : "All_ACCOUNTS", 
                "name" : "ALL ACCOUNTS" }],
            dataSource : "",
            userId : 0,
            apiKey : ""
        };
        this.metrics = '';
        this.startDate;
        this.endDate;
        this.dateRangeType = 'thisyear';
        this.profiles = [];
        this.dataSource = '';
        this.apiKey = '';
        this.dsUser = 0;
        this.dimensions = '';
        this.pDimensions = '';
        this.maxResults = 1000;
        this.maxCategories = 20;

        this.parser = new SupermetricsParser;
    }

    required(apikey, userId, dataSource, accounts){
        if(this.isNull(apikey) || this.isNull(userId) || this.isNull(dataSource) || this.isNull(accounts)){
            return false;
        } 
        return true;
    }

    isNull(value){
        if(value == undefined || value == null || value == '' || value == 0 || value.length == 0) return true;
        return false;
    }

    config(params){
        if(this.required(params.apiKey, params.userId, params.dataSource, params.accounts)){
            
            this.setApiKey(params.apiKey);
            this.setUserId(params.userId);
            this.setDataSource(params.dataSource);
            this.setAccounts( !this.isNull(params.accounts) ? params.accounts : this.defaultConfig.accounts );
        
            let metrics = !this.isNull(params.metrics) ? params.metrics : this.defaultConfig.metrics;
            let columns = !this.isNull(params.splitByColumn) ? params.splitByColumn : this.defaultConfig.splitByColumn;
            let rows = !this.isNull(params.splitByRow) ? params.splitByRow : this.defaultConfig.splitByRow;
            
            this.setMetrics(metrics, params.dataSource);
            this.setSplitByColumn(columns);
            this.setSplitByRow(rows);
        }else{
            throw 'apikey, userId, datasource e accounts são informações obrigatórias';
        }
    }

    setApiKey(apiKey){
        this.apiKey = apiKey;
    }

    getApiKey(){
        return this.apiKey;
    }

    setUserId(userId){
        this.userId = userId;
    }

    getUserId(){
        return this.userId;
    }

    setDataSource(datasource){
        switch(datasource.toLowerCase()){
            case 'facebook-ads':
                this.dataSource = 'FA';
                break;
            case 'google-ads':
                this.dataSource = 'AW';
                break;
            default :
                throw datasource + 'não é um datasource válido';
        }
    }

    getDataSource(){
        return this.dataSource;
    }

    setAccounts(accounts){
        this.accounts = JSON.stringify(accounts);
    }

    getAccounts(){
        return this.accounts;
    }

    setMetrics(metrics,datasource){
        
        this.parser.load(datasource);

        for( let i = 0; i < metrics.length ; i++){
            
            let metric = this.parser.getMetric(metrics[i].toLowerCase());
            
            if(this.metrics.length > 0 ){
                this.metrics += ',';
            }
            
            if( metric !== undefined ){
                this.metrics += metric;
            } else {
                throw 'A metrica '+ metrics[i] + ' não existe';
            }
        }
    }

    getMetrics(){
        return this.metrics;
    }

    setSplitByColumn(dimensions){
        for(let i = 0; i < dimensions.length; i++){
            if(this.dimensions.length > 0 ){ this.dimensions += "," }
            this.dimensions += dimensions[i];
        }
    }

    getSplitByColumn(){
        return this.dimensions;
    }

    setSplitByRow(dimensions){
        for(let i = 0; i < dimensions.length; i++){
            if(this.pDimensions.length > 0 ){ this.pDimensions += "," }
            this.pDimensions += dimensions[i];
        }
    }

    getSplitByRow(){
        return this.pDimensions;
    }

    async get(){
        let endPoint = this.URL + '?metrics=' + encodeURIComponent(this.getMetrics()) + '&dimensions= ' + encodeURIComponent(this.getSplitByColumn()) + '&pdimensions=' + encodeURIComponent(this.getSplitByRow())
                        + '&maxResults=' + encodeURIComponent(this.maxResults) + '&maxCategories=' + encodeURIComponent(this.maxCategories) + '&dateRangeType=' + encodeURIComponent(this.dateRangeType)
                        + '&profiles=' + encodeURIComponent(this.getAccounts()) + '&otherParams='+encodeURIComponent('[]') + '&dataSource=' + encodeURIComponent(this.getDataSource()) + '&dsUser=' + encodeURIComponent(this.getUserId()) + '&apiKey=' + encodeURIComponent(this.getApiKey());
        return await this.execute(endPoint);
    }

    async execute(endPoint){
        try{
            let response = await axios.get(endPoint);
            return response.data;
        } catch (error){
            throw 'Não foi possível obter os dados solicitados';
        }
    }
}
    
module.exports = Supermetrics;