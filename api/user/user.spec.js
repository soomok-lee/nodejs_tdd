/*
// test script 등록
// node_modules/.bin/mocha index.spec.js

// package.json
"scripts": {
    "test": "mocha api/user/user.spec.js",
    "start": "node index.js"
  }

// npm test
// npm start
*/
const app = require('../../');
const models = require('../../models')
const request = require('supertest'); // npm i supertest --save-dev
const should = require('should');

// .only 해당 테스트만 실행
// GET
describe('GET /users', ()=> {
    describe('success, ', ()=> { 
        const users =  [{name: 'ella'}, {name: 'mari'}, {name: 'jessie'}, {name: 'leah'}];
        before(()=> models.sequelize.sync({force: true}));
        before(()=> models.User.bulkCreate(users));

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

// GET
describe('GET /users/:id', ()=> {
    const users =  [{name: 'ella'}, {name: 'mari'}, {name: 'jessie'}, {name: 'leah'}];
        before(()=> models.sequelize.sync({force: true}));
        before(()=> models.User.bulkCreate(users));

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

// DELETE
describe('DELETE /users/:id', ()=> {
    const users =  [{name: 'ella'}, {name: 'mari'}, {name: 'jessie'}, {name: 'leah'}];
        before(()=> models.sequelize.sync({force: true}));
        before(()=> models.User.bulkCreate(users));

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

// POST
describe('POST /users', ()=> {
    const users =  [{name: 'ella'}, {name: 'mari'}, {name: 'jessie'}, {name: 'leah'}];
        before(()=> models.sequelize.sync({force: true}));
        before(()=> models.User.bulkCreate(users));

    describe('success, ', ()=> {
        let name = 'daniel', 
            body;
        before(done=> {
            request(app)
                .post('/users')
                .send({name: name})
                .expect(201)
                .end((err, res)=> {
                    body = res.body;
                    done();
                });
        });

        it('response with created user.', ()=> {
            body.should.have.property('id');
        });  

        it('response with input name', ()=> {
            body.should.have.property('name', name);
        });    
    });

    describe('fail, ', ()=> {
        it('response with the status code 400 if name is missing.', (done)=> {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);  
        });   

        it('response with the status code 409 if name is conflicting.', (done)=> {
            request(app)
                .post('/users')
                .send({name: 'daniel'})
                .expect(409)
                .end(done);  
        });   
    });
});

// PUT
describe('PUT /users/:id', ()=> {
    const users =  [{name: 'ella'}, {name: 'mari'}, {name: 'jessie'}, {name: 'leah'}];
        before(()=> models.sequelize.sync({force: true}));
        before(()=> models.User.bulkCreate(users));

    describe('success, ', ()=> {        
        it('response with updated user name.', (done)=> {
            const name = 'charlie';
            request(app)
                .put('/users/3')
                .send({name: name})
                .end((err, res)=> {
                    res.body.should.have.property('name', name);
                    done();
                });
        });   
    });

    describe('fail, ', ()=> {
        it('response with the status code 400 if the id is not Number.', (done)=> {
            request(app)
                .put('/users/one')
                .expect(400)
                .end(done);  
        }); 

        it('response with the status code 400 if name is missing.', (done)=> {
            request(app)
                .put('/users/1')
                .send({})
                .expect(400)
                .end(done);  
        });  

        it('response with the status code 404 if the id is not found.', (done)=> {
            request(app)
                .put('/users/999')
                .send({name: 'kate'})
                .expect(404)
                .end(done);  
        });  

        it('response with the status code 409 if name is conflicting.', (done)=> {
            request(app)
                .put('/users/3')
                .send({name: 'mari'})
                .expect(409)
                .end(done);  
        });   
    })
});