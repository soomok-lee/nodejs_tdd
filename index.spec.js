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
const app = require('./index');
const request = require('supertest'); // npm i supertest --save-dev
const should = require('should');

describe('GET /users', ()=> {
    describe('success, ', ()=> {
        it('response with an array of user objects.', (done)=> {
            request(app)
                .get('/users')
                .end((err, res)=> {
                    // console.log(res.body);
                    res.body.should.be.instanceof(Array)
                    done();
                })    
        });

        it('response is within the limit.', (done)=> {
            request(app)
                .get('/users?limit=2')
                .end((err, res)=> {
                    res.body.should.have.lengthOf(2)
                    done();
                })    
        });
    });

    describe('fail, ', ()=> {
        it('response with the status code 400 if the limit is not Number.', (done)=> {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
    });
});

describe('GET /users/:id', ()=> {
    describe('success, ', ()=> {
        it('response with an user object with id 1.', (done)=> {
            request(app)
                .get('/users/1')
                .end((err, res)=> {
                    res.body.should.have.property('id', 1)
                    done();
                })    
        });    
    });

    describe('fail, ', ()=> {
        it('response with the status code 400 if the id is not Number.', (done)=> {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);  
        });   
        
        it('response with the status code 404 if the id is not found.', (done)=> {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);  
        });  
    });
});

describe('DELETE /users/:id', ()=> {
    describe('success, ', ()=> {
        it('response with the status code 204.', (done)=> {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);   
        });    
    });

    describe('fail, ', ()=> {
        it('response with the status code 400 if the id is not Number.', (done)=> {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);  
        });   
    });
});