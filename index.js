// nodejs_tdd
// https://github.com/devJRL/TDD-Node.js-APIserver

var express = require('express');
var bodyParser = require('body-parser'); // npm i body-parser --save
var app = express();
var user = require('./api/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// router
app.use('/users', user);

app.listen(3000, function() {
    console.log('start server listening on port 3000!');
});

module.exports = app;

