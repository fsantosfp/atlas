class Contexts {

    constructor(conv){
        this.name;
        this.parameters = {};
        this.responseBody;
        this.conv = conv;
        this.lifespanCount = 5;
    }

    setContextName(name,lifespan){
        this.name = this.conv.body.session + '/contexts/' + name;
        this.lifespanCount = lifespan;
    }

    getContexts(){
        this.responseBody = this.conv.serialize();
        this.responseBody['outputContexts'] = [{
            name : this.name,
            lifespanCount : this.lifespanCount,
            parameters : this.parameters
        }];

        return this.responseBody;
    }

    setContextParameters(name, value){
        this.parameters[name] = value;
    }

}

module.exports = Contexts;