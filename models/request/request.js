var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
  _id: String,
  movie_name: String,
  url: String,
  year: String,
  status: String,
  timestamp: Object,
  mediatype: String
},{
  collection: 'requests'
});
mongoose.model('Request', requestSchema);
module.exports = mongoose.model('Request');