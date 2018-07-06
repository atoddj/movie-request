var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
  body: String,
  title: String,
  author: String
  },{
    collection: 'updates'
  }
);
mongoose.model('Post', requestSchema);
module.exports = mongoose.model('Post');