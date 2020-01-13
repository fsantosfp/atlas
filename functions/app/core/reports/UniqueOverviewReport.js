const BaseReports = require('./BaseReports');

class UniqueOverviewReport extends BaseReports {

    constructor(){
        super();
        this.metrics = ['reach','uniqueClicks','uniqueCookies','clicks'];
        this.error = '';
    }

    get(data){
        for(let i = 0; i < data.length; i++){
            if(data[i].errors.length == 0){
                this.datasource = data[i].datasource;
                this.impressions = data[i].data.reach == undefined ? data[i].data.uniqueCookies : data[i].data.reach;
                this.clicks = data[i].data.uniqueClicks == undefined ? data[i].data.clicks : data[i].data.uniqueClicks;
                this.ctr = this.calcule.ctr(this.clicks, this.impressions);
                
                this.setInsight();
            }else{
                this.setError(data[0].errors);
            }
        }
    }

    setInsight(){
        if(this.insights == ''){
            this.insights += 'Sua campanha no '+ this.datasource +' está com '+ this.impressions + ' de impressões únicas e ' + this.clicks + ' clicks únicos com um CTR único de ' + this.ctr +' porcento. ';
        }else{
            this.insights += 'No '+ this.datasource + ' está com ' + this.impressions + ' de impressões únicas e ' + this.clicks + ' clicks únicos com um CTR único de ' + this.ctr + ' porcento. ';
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

module.exports = UniqueOverviewReport;