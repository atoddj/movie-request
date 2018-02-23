const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var db;

MongoClient.connect('mongodb://' + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASS + '@ds147118.mlab.com:47118/movie-requests', (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db('movie-requests');
  app.listen(8000, () => {
    console.log('listening on port 8000');
  });
});

app.get('/', (req, res) => {
  var cursor = db.collection('requests').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {movies: result});
  });

});

app.post('/request', (req, res) => {
  req.body.timestamp = new Date();
  req.body.status = 'pending';
  db.collection('requests').save(req.body, (err, result) => {
    if(err) return console.log(err);
    console.log('saved to database');
    res.redirect('/');
  });
});
