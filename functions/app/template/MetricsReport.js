const BaseReports = require('../core/reports/BaseReports');

class MetricsReport extends BaseReports  {

    constructor(){
        super();
        this.metrics = '';
        this.columns = []
        this.errors = ''; 
    }

    get(data){
        data.forEach((value,indice) => {
            if(value.errors.length == 0){
                this.setAbout(value.datasource);
                //this.setErrors(value.errors, value.datasource);
                for(var metric in value.data){
                    this.setInsight(value.data[metric], metric);
                }
            }else{
                this.noData(value.errors);
            }
        });
    }

    setAbout(datasource){
        if(this.insights == ''){
            this.insights += 'Sua campanha no ' + datasource + ' está com ';
        }else{
            this.insights += 'No '+ datasource + ' está com ';
        }
    }

    setInsight(value,metric){
        if(this.metrics != ''){
            this.metrics += ', e ';
        }

        if(metric == 'ctr'){
            this.metrics += Number(value).toFixed(2) + ' de ' + metric;
        }else{
            this.metrics += value + ' de ' + metric;
        }
        
    }

    noData(error){
        error.map((e)=>{
            this.errors = e;
        });
    }
/*
    setErrors(errors, datasource){
        
        let len = errors.length; 
        if(len > 0){
            this.errors = 'A métrica '; 
            if( len > 1){this.errors = 'As métricas ';}

            for(let i = 0; i < len; i++){
                if(i >= 1){ this.errors += ' e ';}
                this.errors += errors[i];
            }

            if( len > 1){
                this.errors += ' não existem na plataforma ';
            }else{
                this.errors += ' não existe na plataforma ';
            }

            this.errors += datasource+ '. Mas ';
        }
    }*/


    setMetrics(metrics){
        metrics.map((metric)=>{
            this.columns.push(metric);
        });
    }

    getMetrics(){
        return this.columns;
    }

    getInsight(){
        return this.errors + this.insights + this.metrics;
    }

}

module.exports = MetricsReport;