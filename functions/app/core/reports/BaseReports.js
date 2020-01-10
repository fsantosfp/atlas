const MediaMath = require('../../util/MediaMath');
const Util = require('../../util/Util');

class BaseReports {

    constructor(){
        this.datasource = [];
        this.campaingName = '';
        this.startDate = '';
        this.endDate = '';
        this.metrics;
        this.impressions = 0;
        this.clicks = 0;
        this.ctr = 0;
        this.insights = '';
        this.errors = '';

        this.calcule = new MediaMath;
        
    }

    getMetrics(){
        return this.metrics;
    }

    setDate(period){
        let dates = Util.splitDate(period);
        this.startDate = Util.date_format(dates[0]);
        this.endDate  = dates[1] !== undefined ? Util.date_format(dates[1]) : this.startDate;
    }

    getStartDate(){
        return this.startDate;
    }

    getEndDate(){
        return this.endDate;
    }

    setCampaign(campaignId){
        this.campaignId = campaignId;
    }

    getCampaign(){
        return this.campaignId;
    }

    setDataSource(dataSource){
        this.datasource.push(dataSource);
    }

    getDataSource(){
        return this.datasource;
    }

}

module.exports = BaseReports;