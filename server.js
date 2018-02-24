const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
var routes = require(‘routes/router’);

// Use the EJS templating engine
app.set('view engine', 'ejs');

// Setup routes for express
routes(app);

// Use the bodyparser to pass form info (middleware)
// https://www.npmjs.com/package/body-parser
app.use(bodyParser.urlencoded({extended: true}));
var db;

//Connect to mongo database using system environment variables
MongoClient.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS + '@ds147118.mlab.com:47118/movie-requests', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db('movie-requests');
  app.listen(8000, () => {
    console.log('listening on port 8000');
  });
});
