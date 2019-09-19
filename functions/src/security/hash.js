const crypto = require('crypto');

module.exports = {
    
    encrypt(data){
        return crypto.createHash('md5').update(data).digest("hex");
    },

    validade(hash,data){
        let validHash = this.encrypt(data);
        return hash === validHash;
    }
}