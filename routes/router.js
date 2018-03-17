var bodyParser = require('body-parser');
var Slack = require('node-slackr');
var config = require('../config/config.js');
var request = require('request');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({extended: true}));
  slack = new Slack(config.tori.incoming_webhook, config.tori.options);

  // Displays the homepage
  app.get('/', (req, res) => {
    var cursor = app.db.collection('updates').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.render('index.ejs', {posts: result, searchQuery: null});
    });
  });

  app.get('/request', (req, res) => {
    app.db.collection('requests').find().toArray((err, result) => {
      if (err) return console.log(err);
      if (req.query.q) {
        request({
          uri: config.tmdb.movieSearch,
          qs: {
            api_key: config.tmdb.api_key,
            query: req.query.q
          }
        }, (err, response, body) => {
          if(err) console.log(err);
          req.query.results = JSON.parse(body);
          res.render('request.ejs', {movies: result, searchQuery: req.query});
        });
      } else {
        res.render('request.ejs', {movies: result, searchQuery: null});
      }
    });
  });

  // Handles new movie/show requests
  app.post('/request', (req, res) => {
    req.body.timestamp = new Date();
    req.body.status = 'pending';
    app.db.collection('requests').save(req.body, (err, result) => {
      if(err) return console.log(err);
      res.redirect('/request');
    });
    config.setupSlackMessageFormat(req.body);
    slack.notify(config.tori.newRequest);
  });

  app.get('/add', (req, res) => {
    console.log(req.query);
    res.render('add.ejs');
  });
};
