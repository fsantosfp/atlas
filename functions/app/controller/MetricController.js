const DataParser = require('../middleware/parser/DataParser');
const MediaRepository = require('../repository/MediaRepository');
const SessionContexts = require('../middleware/dialogflow/contexts/Contexts');

class MetricController {
    
    constructor(conv){
        this.conv = conv;
        this.parser = new DataParser;
        this.media = new MediaRepository;
        this.contexts = new SessionContexts(conv);
        this.dataSource;
        this.metrics;
        this.msg = '';
        this.invalidMetrics = 0;
        this.validMetrics = 0;
    }

    async findMetric(param){
        if(param.metrics == "null"){
            // LIBERAR ROTA DE HELP FUTURAMENTE
            //return ['Caso precise, posso te mostrar as possíveis métricas disponíveis. Basta dizer Ajuda ou me diga qual métrica tem interesse'];
            return ['Quais seriam as métricas que deseja?'];
        }else{
            
            const dataSource = Array.isArray(param.dataSources) ? param.dataSources : [param.dataSources];
            const metrics = Array.isArray(param.metrics) ? param.metrics : [param.metrics];
            
            this.msg = 'Ok, você quer ';

            const result = dataSource.map(async (mediaId)=>{
                let media = await this.media.getName(mediaId);
                this.makeMsg('para '+media+' os dados de ');
                this.parser.load(media);

                metrics.map((value)=>{
                    if(this.parser.isValid(value)){
                        this.makeMsg(value + ', ');
                        this.validMetrics ++;
                    }else{
                        this.makeMsg(value + ' mas esta não é uma metrica válida para este veículo, ');
                        this.invalidMetrics++;
                    }
                });
            });

            await Promise.all(result).then(()=>{
                if(this.invalidMetrics > 0 && this.validMetrics == 0){
                    this.makeMsg(' preciso que me informe ao menos uma métrica válida!');
                    this.contexts.setContextName("chooseMetrics", 1);
                    this.contexts.setContextParameters("campaign", param.campaign);
                    this.contexts.setContextParameters("dataSources", param.dataSources);
                    this.conv.ask(this.msg);
                    this.conv.json(this.contexts.getContexts());
                }else{
                    this.makeMsg(' qual seria o período para análise?');
                    this.contexts.setContextName("getRequest", 1);
                    this.contexts.setContextParameters("campaign", param.campaign);
                    this.contexts.setContextParameters("dataSources", param.dataSources);
                    this.contexts.setContextParameters("metrics", param.metrics);
                    this.conv.ask(this.msg);
                    this.conv.json(this.contexts.getContexts());
                }
            });

            return [];
        }

    }

    makeMsg(msg){
        this.msg += msg;
    }

}

module.exports = MetricController;