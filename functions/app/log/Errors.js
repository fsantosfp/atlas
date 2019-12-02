class Errors {

    constructor(){
        this.errors = [];
    }

    set(value){
        this.errors.push(value);
    }

    get(){
        return this.errors;
    }

}

module.exports = Errors;