const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const Auth = require('../app/middleware/auth/Auth');

chai.use(chaiAsPromised).should();

describe('Auth.logIn()', () => {

    context('Usuário válido e ativo', () => {
        it('Deve retornar verdadeiro', () => {
            let auth = new Auth;
            return auth.logIn('fsantos@operatum.net').should.eventually.be.true;
        });
    });

    context('Usuário válido e inativo', () => {
        it('Deve retornar falso', () => {
            let auth = new Auth;
            return auth.logIn('rmartes@operatum.net').should.eventually.be.false;
        });
    });

    context('Usuário inválido', () => {
        it('Deve retornar false', () => {
            let auth = new Auth;
            return auth.logIn('fulano@agencia.net').should.eventually.be.false;
        });
    });

    context('Nenhum usuário informado', () => {
        it('Deve retornar false', () => {
            let auth = new Auth;
            return auth.logIn().should.eventually.be.false;
        });
    });

});




