const express = require('express');
const routes = express.Router();

const md5 = require('md5');
const Supermetrics = require('../app/service/supermetrics/Supermetrics');
const DataParser = require('../app/middleware/dataprovider/DataParser');

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

module.exports = routes;