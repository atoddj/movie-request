const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var routes = require('./routes/router');
var config = require('./config/config');

// Use the EJS templating engine
app.set('view engine', 'ejs');
app.use(express.static('resources'));

// Setup routes for express
routes(app);

//Connect to mongo database using system environment variables
MongoClient.connect(config.mongodb.uri, (err, database) => {
  if (err) {
    return console.log(err);
  }
  app.db = database.db('movie-requests');
  app.listen(8000, () => {
    console.log('listening on port 8000');
  });
});
