const GoogleAds = require('../../service/supermetrics/mapping/google-ads.json');
const FacebookAds = require('../../service/supermetrics/mapping/facebook-ads.json');
const Error = require('../../log/Errors');

class DataParser {

    constructor(){
        this.map;
        this.data = {
            'datasource' : '',
            'data' : {},
            'errors' : []
        };
        this.datasource = '';
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
        this.datasource = datasource;
    }

    transform(data, datasource){
        /*
        this.data = {
            'datasource' : datasource,
            'data' : {},
            'errors' : []
        };*/
        this.data.datasource = datasource;
        let len = data[0].length;
        let _metric = {};
        for(let i = 0; i < len; i++){
            let metric = data[0][i];
            for(let y = 0; y < this.map.metrics.length; y++){
                let index = this.map.metrics[y].indexOf(metric);
                if(index >= 0){
                    _metric[this.map.metrics[y][0]] = data[1][i];
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
        this.data.errors.push(value);
    }

    getDimension(value){

    }
}

module.exports = DataParser;