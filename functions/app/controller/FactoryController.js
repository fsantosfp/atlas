class factoryController{
    constructor(controller, conv){
        let _controller = require(`./${controller}`);
        this.controller = new _controller(conv);
    }

    chat(action,parameters){
        return this.controller[action](parameters);
    }
}

module.exports = factoryController;