const mysql = require('mysql2');
const fs = require('fs');
const {Database} = require('../../../config/Config');

class MySQLDatabase {

    constructor(){
        /*
        this.pool = mysql.createPool({
            user : Database.MySQL.user,
            password : Database.MySQL.pswd,
            host : Database.MySQL.host,
            database : Database.MySQL.database,
            ssl : {
                key : fs.readFileSync(__dirname + '/cert/client-key.pem'),
                cert : fs.readFileSync(__dirname + '/cert/client-cert.pem'),
                ca : fs.readFileSync(__dirname + '/cert/server-ca.pem')
            },
            waitForConnections : true,
        });
        */
        this.pool;
        this.createPool();
    }

    createPool(){
        this.pool = mysql.createPool({
            user : Database.MySQL.user,
            password : Database.MySQL.pswd,
            database : Database.MySQL.database,
            socketPath : '/cloudsql/actions-codelab-92615:us-east1:codelab'
        });
    }

    async execute(query){
        const promisePool = this.pool.promise();
        const [rows, fields] = await promisePool.query(query);
        return rows;
    }

}

module.exports = MySQLDatabase;