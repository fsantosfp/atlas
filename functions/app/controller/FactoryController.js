class factoryController{
    constructor(controller, conv){
        let _controller = require(`./${controller}`);
        this.controller = new _controller(conv);
    }

    chat(intent,parameters){
        return this.controller[intent](parameters);
    }
}

module.exports = factoryController;