const OverviewReport = require('./OverviewReport');
const DataProvider = require('../../service/DataProvider');
class Reports {

    constructor(startDate, endDate, platforms){
        this.startDate = startDate;
        this.endDate = endDate;
        this.platforms = platforms;
    }

    overview(){
        
        DataProvider.setMetrics(OverviewReport.getMetrics());
        DataProvider.setPeriod(this.startDate, this.endDate);

        for(let i = 0; i < this.platforms.length; i++){    
            DataProvider.setPlatform(this.platforms[i]);
            let data = DataProvider.getData();
        }
    }


}