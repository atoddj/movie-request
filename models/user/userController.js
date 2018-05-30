var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
var User = require('./user');

// CREATE A NEW USER
router.post('/register', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }, (err, user) => {
    if (err) return res.status(500).send('There was a problem adding user into the database');
    res.status(200).send(user);
  });
});

// GET LIST OF ALL USERS
router.get('/listAll', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).send('There was a problem listing users');
    }
    res.status(200).send(users);
  });
});

module.exports = router;
