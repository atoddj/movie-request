const express = require('express');
const MongoClient = require('mongodb').MongoClient;
var app = require('./app')
var config = require('./config/config');
var port = process.env.PORT || 3000;

//Connect to mongo database using system environment variables
MongoClient.connect(config.mongodb.uri, (err, database) => {
  if (err) {
    return console.log(err);
  }
  app.db = database.db('movie-requests');
  app.listen(port, () => {
    console.log('listening on port ' + port);
  });
});
