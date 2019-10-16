const { expect } = require('chai');
//const chaiAsPromised = require('chai-as-promised');

const Supermetrics = require('../app/service/supermetrics/Supermetrics');

//chai.use(chaiAsPromised).should();

describe('Supermetrics.parseMetrics()', () => {
    context('Solicitando metricas de Impressão, click e CTR do Google Ads', () =>{
        it('Deve retornar "Impression,Clicks,CTR_perc"', () => {
            Supermetrics.setMetrics(['impression','click','ctr']);
            expect(Supermetrics.parseMetrics('google-ads')).to.equal('Impressions,Clicks,CTR_perc');
        });
    });

    context('Sem Informar as metricas', () =>{
        it('Deve retornar "Impression,Clicks,CTR_perc" com Default', () => {
            expect(Supermetrics.parseMetrics('google-ads')).to.equal('Impressions,Clicks,CTR_perc');
        });
    });
});