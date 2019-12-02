const express = require('express');
const routes = express.Router();

const md5 = require('md5');
const Supermetrics = require('../app/service/supermetrics/Supermetrics');
const DataParser = require('../app/middleware/parser/DataParser');
const Controller = require('../app/controller/ReportController');
const Database = require('../app/repository/UserRepository');

/*
 |--------------------------------------------------------------------------
 | TESTS ROUTES
 |--------------------------------------------------------------------------
 |
 | Here is where you can register tests routes for application.
 |
 */

routes.get('/md5',async (req, res)=>{
    
    res.json(md5('fulano@agencia.com.br'));
});

routes.get('/supermetrics', async(req, res) => {

    let config = {
        metrics : ['Impressions','Clicks','CTR'],
        splitByColumn : [],
        splitByRow : [],
        accounts : [{
            "ID" : "ALL_ACCOUNTS", 
            "name" : "ALL ACCOUNTS" }],
        dataSource : "google-ads",
        userId : 9989174917,
        apiKey : "api_iyceoEvIBH4PSrPGdzMS_Z1KamUUCCKUwj2CTJkajpTPbsEQB8pDjaHnhFnZa01CecijWh8TtbK5xVQhj4mGBo9iJCqiz2KvIfLg"};

    let supermetrics = new Supermetrics;
    supermetrics.config(config);
    let response = await supermetrics.get();
    let parser = new DataParser;
    parser.load(config.dataSource);
    let result = parser.transform(response.data);
    res.send(result);
});


routes.get('/overview', async (req, res) => {
    let report = new Controller;

    let startDate = "2019-01-01";
    let endDate = "2019-10-24";
    let result = await report.overiew(startDate, endDate);

    res.send(result);
});

routes.get('/db', async(req, res) => {
    let db = new Database;
    let r = await db.isActive('a9a205d3f5656f632d35b09c42fbcf3a');
    res.json(r);
});

module.exports = routes;