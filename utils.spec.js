// .spec : test code

// mocha // test runner
// http://mochajs.org/
// npm i mocha --save-dev
// node_modules/.bin/mocha utils.spec.js

// shouldjs  // assertion library
// https://github.com/tj/should.js/
// npm i should --save-dev

// unit test - function
// integration test - api

// SuperTest(통합테스트, 익스프레스 통합 테스트용 라이브러리, 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.)
// SuperTest is an HTTP assertions library that allows you to test your Node.js HTTP servers.

const utils = require('./utils.js');
// const assert = require('assert');
const should = require('should');

describe('the function capitalize of the module utils.js ', ()=> {
    it('converts the first letter to upper case.', ()=> {
        const result = utils.capitalize('hello');
        // assert.strictEqual(result, 'Hello');
        result.should.be.equal('Hello');
    })
})