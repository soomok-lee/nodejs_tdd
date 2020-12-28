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

app.get('/users', function(req, res) {
    res.json(users);
});

app.listen(3000, function() {
    console.log('start server listening on port 3000!');
});

module.exports = app;