const CustomReport = require('../template/CustomReport');

class CustomReportController {

    constructor(conv){
        this.conv = conv;
        this.report = new CustomReport(conv);
    }

    async create(param){
        let email = this.conv.user.profile.payload.email;
        return await this.report.save(param,email);
    }

    question(param){
        if(param.report == "null"){
            this.conv.followup('newCustomReport');
            return [''];
        }else{
            this.conv.close('Ok! Nos vemos em breve. Até mais.');
            return [''];
        }
        
    }


}
module.exports = CustomReportController;