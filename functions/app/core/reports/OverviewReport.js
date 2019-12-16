const BaseReports = require('./BaseReports');

class OverviewReport extends BaseReports {

    constructor(){
        super();
        this.metrics = ['impressions','clicks','ctr'];
        this.error = '';
    }

    get(data){
        for(let i = 0; i < data.length; i++){
            if(data[i].errors.length == 0){
                this.datasource = data[i].datasource;
                this.impressions = data[i].data.impressions;
                this.clicks = data[i].data.clicks;
                this.ctr = this.calcule.ctr(this.clicks, this.impressions);
                
                this.setInsight();
            }else{
                this.setError(data[0].errors);
            }
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
       return this.error + " " +this.insights;
    }

    setError(error){
        error.map((e)=>{
            this.error = e;
        });
    }


}

module.exports = OverviewReport;