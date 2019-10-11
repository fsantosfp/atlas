class ParseParameters{

    constructor(data = []){
        this.parameters = {};
        this.splitData(data);
    }

    getParameter(){
        return this.parameters;
    }

    splitData(data){
        for(let i = 0; i < data.length ; i++){
            let param = data[i];
            for(let key in param){
                if(param.hasOwnProperty(key)){
                    this.parameters[key] = param[key];
                }
            }
        }
    }

}

module.exports = ParseParameters;