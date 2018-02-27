module.exports = (app) => {
  const bodyParser = require('body-parser');
  const Slack = require('node-slackr');
  const config = require('../config/config.js');
  // Use the bodyparser to pass form info (middleware)
  // https://www.npmjs.com/package/body-parser
  app.use(bodyParser.urlencoded({extended: true}));
  slack = new Slack(config.tori.incoming_webhook, config.tori.options);

  // Displays the homepage
  app.get('/', (req, res) => {
    var cursor = app.db.collection('updates').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.render('index.ejs', {posts: result});
    });
  });
  
  app.get('/request', (req, res) => {
    app.db.collection('requests').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.render('request.ejs', {movies: result});
    });
  });

  // Handles new movie/show requests
  app.post('/request', (req, res) => {
    req.body.timestamp = new Date();
    req.body.status = 'pending';
    app.db.collection('requests').save(req.body, (err, result) => {
      if(err) return console.log(err);
      res.redirect('/');
    });
    config.setupSlackMessageFormat(req.body);
    slack.notify(config.tori.newRequest);
  });
};
