const app = require('./index');
const request = require('supertest'); // npm i supertest --save-dev
const should = require('should');

describe('GET /users', ()=> {
    describe('success, ', ()=> {
        it('respond with an array of user objects.', (done)=> {
            request(app)
                .get('/users')
                .end((err, res)=> {
                    // console.log(res.body);
                    res.body.should.be.instanceof(Array)
                    done();
                })    
        })
    })
})

/*
// test script 등록
// node_modules/.bin/mocha index.spec.js

// package.json
"scripts": {
    "test": "mocha index.spec.js",
    "start": "node index.js"
  }

// npm test
// npm start
*/