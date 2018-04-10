var express = require('express');
var app = express();
var db = require('./db');
var requestController = require('./request/requestController');
var postController = require('./post/postController');
// Use the EJS templating engine
app.set('view engine', 'ejs');
app.use(express.static('resources'));
app.use('/', postController);
app.use('/request', requestController);

module.exports = app;
