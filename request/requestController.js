var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var Request = require('./request');
var config = require('../config/config');
var Slack = require('node-slackr');
var slack = new Slack(config.tori.incoming_webhook, config.tori.options);
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

// Handles new movie/show requests
router.post('/', (req, res) => {
  req.body.timestamp = new Date();
  req.body.status = 'pending';
  Request.create(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
  config.setupSlackMessageFormat(req.body); //function sets up config.tori.newRequest object for slack.notify()
  slack.notify(config.tori.newRequest);
});

// List requests
router.get('/', (req, res) => {
  Request.find({status: 'pending'}, (err, result) => {
    if (err) return console.log(err);
    if (req.query.q) {
      request({
        uri: config.tmdb.movieSearch,
        qs: {
          api_key: config.tmdb.api_key,
          query: req.query.q
        }
      }, (err, response, body) => {
        body = JSON.parse(body);
        if(err) console.log(err);
        req.query.results = body;
        console.log(body);
        res.render('request.ejs', {movies: result, searchQuery: req.query});
      });
    } else {
      res.render('request.ejs', {movies: result, searchQuery: null});
    }
  });
});
module.exports = router;