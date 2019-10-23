const GoogleAds = require('../../service/supermetrics/mapping/google-ads.json');

class DataParser {

    constructor(){
        this.map;
        this.data = [[]];
    }

    load(datasource){
        switch(datasource){
            case 'google-ads' :
                this.map = GoogleAds;
        }
    }

    transform(data){

        let len = data[0].length;
        for(let i = 0; i < len; i++){
            let metric = data[0][i];
            for(let i = 0; i < this.map.metrics.length; i++){
                let index = this.map.metrics[i].indexOf(metric);
                if(index >= 0){
                    this.data[0].push(this.map.metrics[i][0]);
                }
            }
        }

        len = data.length;
        for(let i = 1; i < len; i++){
            this.data.push(data[i]);
        }

        return this.data;

    }

    getMetric(value){
        for(let i = 0; i < this.map.metrics.length; i++){
            let index = this.map.metrics[i].indexOf(value);
            if(index >= 0){
                return this.map.metrics[i][1];
            }
        }
    }

    getDimension(value){

    }
}

module.exports = DataParser;