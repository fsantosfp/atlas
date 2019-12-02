const Reports = require('./Reports');

class MetricsReport extends Reports  {

    constructor(){
        super();
        this.metrics = '';
        this.errors = ''; 
    }

    // VERIFICAR COMO OS DADOS SÃO RETORNADOS E COMO OBTER A METRICA QUE FOI SOLICITADA
    /*
        SERÁ PRECISO OBTER:
        $metricName
        $metricValue
    */


    make(data){

        console.log(data);

        data.forEach((value,indice) => {
            console.log(value.datasource);
            this.setAbout(value.datasource);
            this.setErrors(value.errors, value.datasource);
            for(var metric in value.data){
                console.log(metric + ' = ' + value.data[metric]);
                this.setInsight(value.data[metric], metric);
            }
        });

        /*
        
        for(let i = 0; i < data.length; i++){
            this.datasource = data[i].datasource;
            this.impressions = data[i].data.impressions;
            this.clicks = data[i].data.clicks;
            this.ctr = this.calcule.ctr(this.clicks, this.impressions);
            
            this.setInsight();
        }*/
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
            this.metrics += value + ' de ' + metric;
    }

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
    }

    getInsight(){
        return this.errors + this.insights + this.metrics;
    }

}

module.exports = MetricsReport;