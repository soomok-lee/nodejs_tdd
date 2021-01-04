// nodejs_tdd
// https://github.com/devJRL/TDD-Node.js-APIserver

var express = require('express');
var bodyParser = require('body-parser'); // npm i body-parser --save
var app = express();
var morgan = require('morgan'); // npm i morgan --save
var user = require('./api/user');

if(process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev')); // server log
}
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded

// router
app.use('/users', user);

module.exports = app;

