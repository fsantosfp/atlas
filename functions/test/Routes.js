const express = require('express');
const routes = express.Router();

const md5 = require('md5');

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

// const SuperMetrics = require('../app/service/supermetrics/Supermetrics');
// routes.get('/supermetrics',async (req, res)=>{
//     sMetrics = SuperMetrics;    
//     res.json(await sMetrics.get('https://supermetrics.com/api/v1/getData?metrics=Impressions%2CClicks%2CCTR_perc&dateRangeType=thisyear&profiles=%5B%7B%22ID%22%3A%228131806833%22%2C%22name%22%3A%22CATERPILAR%20%7C%20GCI%20%7C%20LATAM%22%7D%5D&otherParams=%5B%5D&dataSource=AW&dsUser=9989174917&apiKey=api_iyceoEvIBH4PSrPGdzMS_Z1KamUUCCKUwj2CTJkajpTPbsEQB8pDjaHnhFnZa01CecijWh8TtbK5xVQhj4mGBo9iJCqiz2KvIfLg'));
// });

module.exports = routes;