var mongoose = require('mongoose');
var config = require('./config/config');
mongoose.connect(config.mongodb.uri);