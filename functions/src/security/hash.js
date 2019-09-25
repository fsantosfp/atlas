//const crypto = require('crypto');
const md5 = require('md5');

module.exports = {
    
    encrypt(data){
        // return crypto.createHash('md5').update(data).digest("hex");
        return md5(data);
    },

    validade(hash,data){
        let validHash = this.encrypt(data);
        return hash === validHash;
    }
}