var express = require('express');
var router = express.Router();
var Post = require('./post');

// Handles new movie/show requests
router.post('/post/create', (req, res) => {
  Post.create(req.body, (err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// List requests
router.get('/', (req, res) => {
  Post.find({}, (err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {posts: result, searchQuery: null});
  });
});
module.exports = router;