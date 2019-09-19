module.exports = {

    getUserByEmail(email){
        const VALID_EMAIL = ['a9a205d3f5656f632d35b09c42fbcf3a', 'f555e89d4bcfe4dcbe2bc5881581aa34'];

        return VALID_EMAIL.indexOf(email) > 0 ? VALID_EMAIL[VALID_EMAIL.indexOf(email)] :'';
        // This validade is only a test, this need make an original check
        //return email === emailTeste ? emailTeste :'';
    }
}