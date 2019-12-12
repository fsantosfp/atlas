const FactoryReports = require('./reports/FactoryReports');

const SessionEntities = require('../middleware/dialogflow/entity/SessionEntities');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class Reports extends FactoryReports {

    constructor(conv){
        super();

        this.conv = conv;
        this.sessionEntities = new SessionEntities(conv);
        this.contexts = new SessionContexts(conv);
    }

    getDefaultReports(param){
        this.conv.ask("Atualmente estas são as opções: diga 1 para Overview.");
        
        this.sessionEntities.setEntity('reports');
        this.sessionEntities.updateEntity('overview','overview',1);
        this.contexts.setContextName("chooseReport", 1);
        this.contexts.setContextParameters("campaign", param.campaign);
        this.contexts.setContextParameters("dataSources", param.dataSources);
        
        this.conv.json(this.sessionEntities.getEntities());
        this.conv.json(this.contexts.getContexts());

        return [];
    }

}

module.exports = Reports;