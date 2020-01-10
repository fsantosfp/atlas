const Ordinary = require('../../parser/Ordinary');

class SessionEntities {

    constructor(conv){
        this.name;
        this.entities = [];
        this.entity;
        this.responseBody;
        this.conv = conv;
        this.position = new Ordinary;
    }

    setEntity(name){
        this.name = this.conv.body.session + '/entityTypes/' + name;
    }

    getEntities(){
        this.responseBody = this.conv.serialize();
        
        this.responseBody['sessionEntityTypes'] = [{
            name : this.name,
            entities : this.entities,
            entityOverrideMode : 'ENTITY_OVERRIDE_MODE_OVERRIDE'
        }];

        return this.responseBody;
    }

    updateEntity(name, id, synom){

        this.entity = [];        
        let synonyms;

        if(typeof(synom) == "number"){
            //let position = this.position.toOrdinary(synom); 
            this.entity.push(synom);
        }else{
           this.entity.push('isso','esta mesma','essa mesmo','essa mesma','correto','sim');
       }

        this.entity.push(name);
        this.entities.push( {value : id, synonyms : this.entity} );
    }

    clearEntity(){

    }

}

module.exports = SessionEntities;