var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/Edges';
// Connect to our database
mongoose.connect('mongodb://localhost:27017');

// Registered connection: connected, error and disconnected
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

// Registered error event for connection then produce error message
mongoose.connection.on('error', function(err) {
  console.log('Mongoose disconnected error: ' + err);
});

// Listen for disconnect event during the connection
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected to ' + dbURI);
});

// Close current mongoose connection then output to console
var gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

/*
 * This following three method is use to listen for three scenario listed below.
 * It will gracefully closes the Mongoose connection before it actually ends.
 *
 * nodemon use SIGUSR2, we use once() to only listen for one time
 */
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Listen for SIGINT emitted on application termination
// This normally happens when user click on ctrl + c
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

// Listen for SIGTERM emitted when Heroku shuts down process
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

// Bring in schema and model
// locations.js
exports.HackEdges = require('./Edges');
exports.HackUsers = require('./Users');
exports.HackJobs = require('./jobEdges');
