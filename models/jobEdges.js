var mongoose = require('mongoose');

var JobEdges = new mongoose.Schema({
  JobTitle: String, // Will be populated at the point that needs it in a bit
  Organization: String,
  Location: String,
  EligibleCitizenship: String,
  JobFunction: String,
  IssueArea: String,
  About: String
});

module.exports = mongoose.model('jobEdges', JobEdges)
