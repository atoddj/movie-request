var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  username: {type: String, trim: true, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default: 'user'}
},{
  collection: 'users'
});
mongoose.model('User', userSchema);
module.exports = mongoose.model('User');
