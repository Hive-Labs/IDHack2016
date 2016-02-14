var mongoose = require('mongoose');

var User = new mongoose.Schema({
  name: String,
  role: String
});

module.exports = mongoose.model('Users', User);
