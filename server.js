var express = require('express');
var app = require('./app')
var config = require('./config/config');
var port = process.env.PORT || 8000;

var server = app.listen(port, () => {
  console.log('listening on port ' + port);
});
