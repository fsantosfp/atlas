const BaseReports = require('./BaseReports');

class CostReport extends BaseReports {

    constructor(){
        super();
        this.metrics = ['cpc','cost','ctr','impressions', 'clicks'];
        this.error = '';
        this.cost = 0;
        this.cpc = 0;
    }

    /*
    if(this.pattern.exec(value) == null)
        this.pattern = RegExp(/[0-9]/);
    */

    get(data){
        for(let i = 0; i < data.length; i++){
            if(data[i].errors.length == 0){
                this.datasource = data[i].datasource;
                this.impressions = data[i].data.impressions;
                this.clicks = data[i].data.clicks;
                this.ctr = this.calcule.ctr(this.clicks, this.impressions);
                this.cost = data[i].data.cost.toFixed(2);
                this.cpc = data[i].data.cpc.toFixed(2);
                
                this.setInsight();
            }else{
                this.setError(data[0].errors);
            }
        }
    }

    setInsight(){
        if(this.insights == ''){
            this.insights += 'Sua campanha teve um custo de '+ this.cost +' reais no periodo informado, obtendo assim '+ this.impressions + ' impressões e ' + this.clicks + ' clicks com um CTR de ' + this.ctr +' porcento, gerando um cpc de ' + this.cpc + '.';
        }else{
            this.insights += 'No '+ this.datasource + ' o custo foi de ' + this.cost +' reais no periodo informado, obtendo assim '+ this.impressions + ' impressões e ' + this.clicks + ' clicks com um CTR de ' + this.ctr +' porcento, gerando um cpc de ' + this.cpc + '.';
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

module.exports = CostReport;