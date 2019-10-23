const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const chaiJsonSchema = require('chai-json-schema');

const Supermetrics = require('../app/service/supermetrics/Supermetrics');
const valid_default_google_metrics = require('./fixtures/valid_default_google_metrics');

chai.use(chaiAsPromised).should();
chai.use(chaiJsonSchema);

describe('isNull()',() => {
    context('Informando valores', () => {
        it('deve retornar TRUE', () => {
            let supermetrics = new Supermetrics;
            expect(supermetrics.isNull('nao-estou-vazio')).to.be.false;
        });
    });

    context('Sem valores iformado', () => {
        it('Deve retornar FALSE', () => {
            let supermetrics = new Supermetrics;
            expect(supermetrics.isNull()).to.be.true;
        });
    });
});

describe('required()', () => {
    context('Todos os parametros informados', () => {
        it('Deve retornar TRUE', () => {
            // Parameters
            let apiKey = 'api_ApeNasUmTesteDeVAlidacao';
            let userId = 9989174917;
            let dataSource = 'google-ads';
            let account = 'ALL_ACCOUNT';

            let supermetrics = new Supermetrics;
            expect(supermetrics.required(apiKey,userId,dataSource,account)).to.be.true;
        });
    });

    context('Apenas um parametro vazio', () => {
        it('Deve retornar FALSE', () => {
            // Parameters
            let apiKey = '';
            let userId = 9989174917;
            let dataSource = 'google-ads';
            let account = 'ALL_ACCOUNT';

            let supermetrics = new Supermetrics;
            expect(supermetrics.required(apiKey,userId,dataSource,account)).to.be.false;
        });
    });

    context('Todos os parametro vazio', () => {
        it('Deve retornar FALSE', () => {
            // Parameters
            let apiKey = '';
            let userId = '';
            let dataSource = '';
            let account = '';

            let supermetrics = new Supermetrics;
            expect(supermetrics.required(apiKey,userId,dataSource,account)).to.be.false;
        });
    });

    context('Todos os parametro null', () => {
        it('Deve retornar FALSE', () => {
            // Parameters
            let apiKey;
            let userId;
            let dataSource;
            let account;

            let supermetrics = new Supermetrics;
            expect(supermetrics.required(apiKey,userId,dataSource,account)).to.be.false;
        });
    });

    context('Parametros não informados', () => {
        it('Deve retornar FALSE', () => {
            let supermetrics = new Supermetrics;
            expect(supermetrics.required()).to.be.false;
        });
    });
});

describe('getDataSource()',() => {
    context('Google-ads com letra maiuscula', () => {
        it('deve retornar AW', () => {
            let supermetrics = new Supermetrics;
            supermetrics.setDataSource('Google-ads');
            expect(supermetrics.getDataSource()).to.equal('AW');
        });
    });

    context('google-ads com letra minuscula', () => {
        it('Deve retornar FALSE', () => {
            let supermetrics = new Supermetrics;
            supermetrics.setDataSource('google-ads');
            expect(supermetrics.getDataSource()).to.equal('AW');
        });
    });

    context('Informando metrica errada', () =>{
        it('Deve retornar mensagem de erro', () => {
            let supermetrics = new Supermetrics;
            expect(
                function(){supermetrics.setDataSource('google');}
            ).to.be.throws(/não é um datasource válido/);
        });
    });
});

describe('getMetrics()',() => {
    context('Solicitando metricas de Impressão, click e CTR do Google Ads', () => {
        it('Deve retornar "Impression,Clicks,CTR_perc"', () => {
            let supermetrics = new Supermetrics;
            supermetrics.setMetrics(['impressions','clicks','ctr'],'google-ads');
            expect(supermetrics.getMetrics()).to.equal('Impressions,Clicks,CTR_perc');
        });
    });

    context('Informando metrica errada', () =>{
        it('Deve retornar mensagem de erro', () => {
            let supermetrics = new Supermetrics;
            expect(
                function(){supermetrics.setMetrics(['impression','click','ctr'],'google-ads');}
            ).to.be.throws(/A metrica informada não existe/);
        });
    });
});

describe('config()', () => {
    context('Faltando parametros obrigatórios', () => {
        it('Deve retornar mensagem de erro', () => {
            let config = {
                metrics : ['Impressions','clicks','ctr'],
                splitByColumn : [],
                splitByRow : [],
                accounts : [{
                    "ID" : "All_ACCOUNTS", 
                    "name" : "ALL ACCOUNTS" }],
                dataSource : "",
                userId : 1234567890,
                apiKey : "api_ParaTesteApenas"};

            let supermetrics = new Supermetrics;

            expect(
                function(){supermetrics.config(config);}
            ).to.be.throws(/são informações obrigatórias/);
        });
    });

    context('informando data source inválido', () => {
        it('Deve retornar mensagem de erro', () => {
            let config = {
                metrics : ['Impressions','clicks','ctr'],
                splitByColumn : [],
                splitByRow : [],
                accounts : [{
                    "ID" : "All_ACCOUNTS", 
                    "name" : "ALL ACCOUNTS" }],
                dataSource : "teste",
                userId : 1234567890,
                apiKey : "api_ParaTesteApenas"};

            let supermetrics = new Supermetrics;

            expect(
                function(){supermetrics.config(config);}
            ).to.be.throws(/não é um datasource válido/);
        });
    });

    context('Sem metricas informadas', () => {
        it('Deve retornar as metricsa Deafult de Impressão, click e ctr', () => {
            let config = {
                splitByColumn : [],
                splitByRow : [],
                accounts : [{
                    "ID" : "All_ACCOUNTS", 
                    "name" : "ALL ACCOUNTS" }],
                dataSource : "google-ads",
                userId : 1234567890,
                apiKey : "api_ParaTesteApenas"};

            let supermetrics = new Supermetrics;
            supermetrics.config(config);
            expect(supermetrics.getMetrics()).to.equal('Impressions,Clicks,CTR_perc');
        });
    });
});

describe('execute()', () => {
    context('URL Inválida', () => {
        it('deve retornar um erro', () => {
            let supermetrics = new Supermetrics;

            supermetrics.execute('https://supermetrics.com/api/v1/getData').should.eventually.to.be.throws(/não é um datasource válido/);
        });
    });
});

describe('get()',() => {
    context('Solicitando metricas de Impressão, click e CTR do Google Ads', () => {
        it('Deve retornar "Impression,Clicks,CTR_perc"', () => {
            let config = {
                metrics : ['Impressions'],
                splitByColumn : [],
                splitByRow : [],
                accounts : [{
                    "ID" : "All_ACCOUNTS", 
                    "name" : "ALL ACCOUNTS" }],
                dataSource : "google-ads",
                userId : 1234567890,
                apiKey : "api_ParaTesteApenas"};

            let supermetrics = new Supermetrics;
            supermetrics.config(config);
            supermetrics.get().should.eventually.to.be.eql(valid_default_google_metrics);
            
        });
    });
});


/*
chai.use(chaiAsPromised).should();

describe('Supermetrics.parseMetrics()', () => {
    context('Solicitando metricas de Impressão, click e CTR do Google Ads', () =>{
        it('Deve retornar "Impression,Clicks,CTR_perc"', () => {
            let sMetrics = new Supermetrics;
            sMetrics.setMetrics(['impressions','clicks','ctr']);
            expect(sMetrics.parseMetrics('google-ads')).to.equal('Impressions,Clicks,CTR_perc');
        });
    });

    context('Informando metrica errada', () =>{
        it('Deve retornar mensagem de erro', () => {
            let sMetrics = new Supermetrics;
            sMetrics.setMetrics(['impression','click','ctr']);
            expect(
                function(){ sMetrics.parseMetrics('google-ads'); }
            ).to.be.throws(/A metrica informada não existe/);
        });
    });

    context('Sem Informar as metricas', () =>{
        let sMetrics = new Supermetrics;
        it('Deve retornar "Impression,Clicks,CTR_perc" como Default', () => {
            expect(sMetrics.parseMetrics('google-ads')).to.equal('Impressions,Clicks,CTR_perc');
        });
    });
});*/