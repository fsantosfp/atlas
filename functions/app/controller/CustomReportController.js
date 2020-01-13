const CustomReportRepository = require('../repository/CustomReportRepository')

class CustomReportController {

    constructor(conv){
        this.conv = conv;
        this.repository = new CustomReportRepository();
    }

    create(param){
        if(param.campaign == "null"){

        }else{

        }
        return [`Pronto relatório customizado criado! Quando quiser solicita-lo, basta pedir por Meus Relatórios, ${param.customReportName}. Até mais!`]
    }

}
module.exports = CustomReportController;