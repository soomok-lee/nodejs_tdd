const app = require('./index');
const request = require('supertest'); // npm i supertest --save-dev

describe('GET /users', ()=> {
    it('', (done)=> {
        request(app)
            .get('/users')
            .end((err, res)=> {
                console.log(res.body);
                done();
            })

    })
})