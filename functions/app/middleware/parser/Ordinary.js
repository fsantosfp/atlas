class Ordinary {
    constructor(){

    }

    toOrdinary(number){
        switch(number){
            case 1 :
                return 'primeiro';
            case 2 :
                return 'segundo';
            case 3 :
                return 'terceiro';
            case 4 :
                return 'quarto';
            case 5 : 
            return 'quinto';
        }
    }
}

module.exports = Ordinary;