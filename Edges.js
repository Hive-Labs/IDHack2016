var mongoose = require('mongoose'),


    var Edges = new mongoose.Schema {
        lat: Number,
        lon: Number,
        label: String
    }

module.export = mongoose.model('Eges', Edges)