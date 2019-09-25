const md5 = require('md5');

module.exports = {
    encrypt(email) {
        return md5(email);
    }
}