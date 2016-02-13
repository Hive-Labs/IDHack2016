var mongoose = require('mongoose');
var HackEdges = new mongoose.Schema({
    lat: Number,
    lon: Number,
    label: String
});

module.exports = mongoose.model('Edges', HackEdges)