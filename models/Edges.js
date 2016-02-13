var mongoose = require('mongoose');

var HackEdges = new mongoose.Schema({
  lat: Number,
  lon: Number,
  label: String,
  subscribers: [String],
  messages: [String]
});

var Messages = new mongoose.Schema({
  created: {
    type: Date,
    default: new Date()
  },
  message: String,
  owner: String
});

module.exports = mongoose.model('Edges', HackEdges)
