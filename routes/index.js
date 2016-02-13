var express = require('express');
var router = express.Router(),
  HackEdges = require('../models/Edges.js'),
  HackJobs = require('../models/jobEdges.js'),
  mongoose = require('mongoose');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
/* GET home page. */
router.get('/', function(req, res, next) {
  HackEdges.aggregate([{
    $group: {
      _id: "$label",
      refCount: {
        $sum: 1
      }
    }
  }, {
    $sort: {
      refCount: -1
    }
  }], (err, result) => {
    HackJobs.find({}, function(e,result2){
      res.render('index', {
        supplies: result,
        jobs: result2
      });
    });
  });
});

module.exports = router;
