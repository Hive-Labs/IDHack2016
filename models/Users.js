var mongoose = require('mongoose');

var User = new mongoose.Schema({
  name: String,
  role: String
});

// User.methods.defineRole = function(num) {
//   var roles = ['normal', 'fellow', 'admin'];
//   return roles[num];
// }
//
// var user = new User();
// user.defineRole()
module.exports = mongoose.model('Users', User);
