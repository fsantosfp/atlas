const Reports = require('./Reports');

class OverviewReport extends Reports {

    constructor(){
        super();
        this.metrics = ['impressions','clicks','ctr'];
    }

    make(data){
        for(let i = 0; i < data.length; i++){
            this.datasource = data[i].datasource;
            this.impressions = data[i].data.impressions;
            this.clicks = data[i].data.clicks;
            this.ctr = this.calcule.ctr(this.clicks, this.impressions);
            
            this.setInsight();
        }
    }

    setInsight(){
        if(this.insights == ''){
            this.insights += 'Sua campanha no '+ this.datasource +' está com '+ this.impressions + ' de impressões e ' + this.clicks + ' clicks com um CTR de ' + this.ctr +' porcento. ';
        }else{
            this.insights += 'No '+ this.datasource + ' está com ' + this.impressions + ' de impressões e ' + this.clicks + ' clicks com um CTR de ' + this.ctr + ' porcento. ';
        }
    }

    getInsight(){
       return this.insights;
    }

}

module.exports = OverviewReport;