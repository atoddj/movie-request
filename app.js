var express = require('express');
var app = express();
var db = require('./db');
var requestController = require('./models/request/requestController');
var postController = require('./models/post/postController');
var userController = require('./models/user/userController');
// Use the EJS templating engine
app.set('view engine', 'ejs');
app.use(express.static('resources'));
app.use('/', postController);
app.use('/request', requestController);
app.use('/user', userController);

module.exports = app;
