const GoogleAds = require('../../service/supermetrics/mapping/google-ads.json');
const FacebookAds = require('../../service/supermetrics/mapping/facebook-ads.json');

class DataParser {

    constructor(){
        this.map;
        //this.data = [[]];
        
    }

    load(datasource){
        switch(datasource){
            case 'google-ads' :
                this.map = GoogleAds;
                break;
            case 'facebook-ads':
                this.map = FacebookAds;
                break;
        }
    }

    transform(data, datasource){
        
        this.data = {
            'datasource' : datasource,
            'data' : {}
        };
        let len = data[0].length;
        let _metric = {};
        for(let i = 0; i < len; i++){
            let metric = data[0][i];
            for(let i = 0; i < this.map.metrics.length; i++){
                let index = this.map.metrics[i].indexOf(metric);
                if(index >= 0){
                    _metric[this.map.metrics[i][0]] = data[1][i];
                }
            }
        }

        this.data.data = _metric;
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