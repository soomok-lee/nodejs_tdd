const app = require('../index')
const syncDb = require('./sync-db'); // DB 동기화

syncDb().then(()=> {
    console.log('sync database!');
    app.listen(3000, ()=> {
        console.log('start server listening on port 3000!');
    });
})