// nodejs_tdd
// https://github.com/devJRL/TDD-Node.js-APIserver

var express = require('express');
var app = express();
var users = [
    {id:1, name: 'ella'},
    {id:2, name: 'mari'},
    {id:3, name: 'jessie'},
    {id:4, name: 'lia'},
];

// GET
app.get('/users', function(req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)) return res.status(400).end();
    
    res.json(users.slice(0, limit));
});

// GET
app.get('/users/:id', function(req, res) {
   const id = parseInt(req.params.id, 10);
   if(Number.isNaN(id)) return res.status(400).end();
    
   const user = users.filter(user=> user.id === id)[0];
   if(!user) return res.status(404).end();

   res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    users = users.filter(user=> user.id !== id); // 해당 id user만 리스트에서 삭제
    res.status(204).end();
});

app.listen(3000, function() {
    console.log('start server listening on port 3000!');
});

module.exports = app;